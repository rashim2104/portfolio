// Kinetic typography — a letter warped through a tile grid, in duotone.
//
// The core: draw the letter once to an offscreen buffer, cut the frame into a
// grid of tiles, and for each tile copy from a SOURCE rectangle offset by a sine
// wave whose phase depends on frameCount and the tile's position. That slips
// neighbouring tiles out of phase and the letter ripples.
//
// Four upgrades on top of that base:
//   1. Two-axis interference — the source offset is the SUM of two waves at
//      different frequencies, so the ripple crosses itself (cloth/water) instead
//      of sliding as one flat sheet.
//   2. Chromatic split — the warped letter is composited in the ink colour plus
//      two accent copies pushed a few px apart, so warped edges bloom into a
//      coloured fringe.
//   3. Depth shading — each warped tile is drawn at an alpha set by how much it
//      moved, so tiles in motion catch a bit of light and the letter gains relief.
//   4. A faint grain + scanline veil over the whole card for analog warmth.
//
// PERFORMANCE: the warp is done ONCE per frame with plain drawImage tile copies
// (no per-tile compositing — that was the slow path). Duotone + chroma are three
// whole-frame composites, so their cost is constant no matter the tile count.
//
// Adapted for this site: colours arrive as resolved hex from the React wrapper
// (which reads them off the design tokens and re-reads on theme change), and the
// display face is the site's mono stack rather than a bespoke display font.

export interface KineticParams {
  text: string;
  paper: string;
  ink: string;
  accent: string;
  tiles: number; // grid columns; rows derived from aspect
  offset: number; // max source displacement, CSS px
  speed: number; // wave speed per frame
  spread: number; // the x*y phase term — low = uniform, high = turbulent
  chroma: number; // chromatic-split strength 0..1
  shade: number; // depth-shading strength 0..1
  grain: number; // grain/scanline strength 0..1
}

function parseHex(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  if (Number.isNaN(n) || h.length !== 6) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const rgb = ([r, g, b]: [number, number, number], a = 1) => `rgba(${r},${g},${b},${a})`;

// Tile rows are derived from the canvas's real aspect rather than a fixed 16:9,
// so the tiles stay square whatever shape the host element is given. With a
// fixed ratio a wide banner would ripple through visibly stretched cells.

export class KineticEngine {
  private stage: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  // `mask`: the letter drawn once as an opaque shape on a transparent ground, so
  // warping it is a plain fast drawImage copy. `warp`: the warped letter each
  // frame. We tint `warp` onto the main canvas at composite time.
  private mask: HTMLCanvasElement;
  private mctx: CanvasRenderingContext2D;
  private warp: HTMLCanvasElement;
  private wctx: CanvasRenderingContext2D;
  private grainCanvas: HTMLCanvasElement | null = null;
  private tintScratch: HTMLCanvasElement | null = null;
  private tctx: CanvasRenderingContext2D | null = null;

  private dpr = 1;
  private w = 0;
  private h = 0;
  private frame = 0;
  private raf = 0;
  private running = false;

  private p: KineticParams;
  private paperRGB: [number, number, number] = [255, 255, 255];
  private inkRGB: [number, number, number] = [0, 0, 0];
  private accentRGB: [number, number, number] = [91, 73, 232];
  private accentInv: [number, number, number] = [164, 182, 23];
  private box = { x0: 0, y0: 0, x1: 0, y1: 0 };

  constructor(stage: HTMLElement, params: KineticParams) {
    this.stage = stage;
    this.p = params;

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.display = "block";
    stage.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;

    this.mask = document.createElement("canvas");
    this.mctx = this.mask.getContext("2d", { willReadFrequently: true })!;
    this.warp = document.createElement("canvas");
    this.wctx = this.warp.getContext("2d")!;

    this.applyColors();
    this.resize();
  }

  setParams(params: KineticParams) {
    const textChanged = params.text !== this.p.text;
    const colorsChanged =
      params.paper !== this.p.paper ||
      params.ink !== this.p.ink ||
      params.accent !== this.p.accent;
    const grainChanged = params.grain !== this.p.grain;
    this.p = params;
    if (colorsChanged) this.applyColors();
    if (textChanged) this.drawLetter();
    if (grainChanged) this.buildGrain();
    if (!this.running) this.renderStatic();
  }

  private applyColors() {
    this.paperRGB = parseHex(this.p.paper);
    this.inkRGB = parseHex(this.p.ink);
    this.accentRGB = parseHex(this.p.accent);
    this.accentInv = [
      255 - this.accentRGB[0],
      255 - this.accentRGB[1],
      255 - this.accentRGB[2],
    ];
  }

  resize() {
    const rect = this.stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;

    const pw = Math.round(this.w * this.dpr);
    const ph = Math.round(this.h * this.dpr);
    for (const c of [this.canvas, this.mask, this.warp]) {
      c.width = pw;
      c.height = ph;
    }

    this.buildGrain();
    this.drawLetter();
    if (!this.running) this.renderStatic();
  }

  // Draw the letter once as an opaque shape on a TRANSPARENT ground, so the
  // warped tiles carry real alpha and can be tinted to any ink over any paper.
  private drawLetter() {
    const { mctx, mask } = this;
    const W = mask.width;
    const H = mask.height;
    if (!W || !H) return;
    mctx.clearRect(0, 0, W, H);

    const text = (this.p.text || "R").slice(0, 12);
    const single = text.length === 1;
    // The whole computed stack, not just its first entry — next/font families
    // resolve to generated names and the fallbacks matter if one is still loading.
    const stack =
      getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() ||
      "ui-monospace, monospace";

    let size = Math.round(H * (single ? 0.86 : 0.6));
    mctx.fillStyle = "#fff";
    mctx.textAlign = "center";
    mctx.textBaseline = "middle";
    const setFont = (s: number) => (mctx.font = `700 ${s}px ${stack}`);
    setFont(size);
    if (!single) {
      const maxW = W * 0.9;
      let guard = 0;
      while (mctx.measureText(text).width > maxW && size > 12 && guard++ < 40) {
        size -= 4;
        setFont(size);
      }
    }
    mctx.fillText(text, W / 2, H * 0.54);
    this.measureBox();
  }

  // Bounding box of the ink so the tile loop skips empty tiles. Runs only on
  // text/size change (not per frame), so getImageData here is fine.
  private measureBox() {
    const { mctx, mask } = this;
    const W = mask.width;
    const H = mask.height;
    try {
      const data = mctx.getImageData(0, 0, W, H).data;
      let x0 = W;
      let y0 = H;
      let x1 = 0;
      let y1 = 0;
      for (let y = 0; y < H; y += 2) {
        for (let x = 0; x < W; x += 2) {
          if (data[(y * W + x) * 4 + 3] > 20) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
      }
      if (x1 < x0) {
        x0 = 0;
        y0 = 0;
        x1 = W;
        y1 = H;
      }
      this.box = { x0, y0, x1, y1 };
    } catch {
      this.box = { x0: 0, y0: 0, x1: W, y1: H };
    }
  }

  private buildGrain() {
    if (this.p.grain <= 0) {
      this.grainCanvas = null;
      return;
    }
    const W = this.mask.width;
    const H = this.mask.height;
    if (!W || !H) return;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d")!;
    const img = g.createImageData(W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const v = 128 + (n - 0.5) * 255;
      d[i] = d[i + 1] = d[i + 2] = clamp255(v);
      d[i + 3] = 12;
    }
    g.putImageData(img, 0, 0);
    g.globalAlpha = 0.06;
    g.fillStyle = "#000";
    const step = Math.max(2, Math.round(3 * this.dpr));
    for (let y = 0; y < H; y += step) g.fillRect(0, y, W, Math.max(1, Math.round(this.dpr)));
    this.grainCanvas = c;
  }

  private renderFrame() {
    const { ctx, wctx, mask } = this;
    const W = mask.width;
    const H = mask.height;
    if (!W || !H) return;
    const p = this.p;
    const off = p.offset * this.dpr;

    // 1) Build the warped letter into `warp`. Plain tile copies — the fast path.
    //    Depth shade is baked in per-tile via alpha.
    wctx.globalCompositeOperation = "source-over";
    wctx.globalAlpha = 1;
    wctx.clearRect(0, 0, W, H);

    const TILES_X = Math.max(2, Math.round(p.tiles));
    const TILES_Y = Math.max(2, Math.round(p.tiles / (W / H)));
    const tileW = Math.floor(W / TILES_X);
    const tileH = Math.floor(H / TILES_Y);
    if (tileW > 0 && tileH > 0) {
      const cx0 = Math.max(0, Math.floor(this.box.x0 / tileW) - 1);
      const cy0 = Math.max(0, Math.floor(this.box.y0 / tileH) - 1);
      const cx1 = Math.min(TILES_X - 1, Math.ceil(this.box.x1 / tileW) + 1);
      const cy1 = Math.min(TILES_Y - 1, Math.ceil(this.box.y1 / tileH) + 1);
      const t = this.frame * p.speed;

      for (let y = cy0; y <= cy1; y++) {
        for (let x = cx0; x <= cx1; x++) {
          const phase = x * y;
          const wave1 = Math.sin(t + phase * p.spread);
          const wave2 = Math.sin(t * 0.7 + (x + y) * p.spread * 1.9 + 1.3);
          const mix = wave1 * 0.65 + wave2 * 0.45; // ~[-1.1, 1.1]
          const waveX = Math.round(mix * off);
          const waveY = Math.round(Math.sin(t * 0.9 + phase * p.spread * 0.6) * off * 0.7);

          const sx = x * tileW + waveX;
          const sy = y * tileH + waveY;
          const dx = x * tileW;
          const dy = y * tileH;
          const dw = x === TILES_X - 1 ? W - dx : tileW;
          const dh = y === TILES_Y - 1 ? H - dy : tileH;
          if (dw <= 0 || dh <= 0) continue;
          if (sx + dw <= 0 || sy + dh <= 0 || sx >= W || sy >= H) continue;

          wctx.globalAlpha =
            p.shade > 0 ? 1 - p.shade * 0.5 + Math.min(1, Math.abs(mix)) * p.shade * 0.5 : 1;
          wctx.drawImage(mask, sx, sy, dw, dh, dx, dy, dw, dh);
        }
      }
      wctx.globalAlpha = 1;
    }

    // 2) Composite `warp` onto the main canvas in DUOTONE with a chromatic split.
    //    The accent copies go down FIRST (offset, so their fringe peeks out from
    //    behind), then the ink on top at true position — so the letter body stays
    //    clean ink and only the warped edges show colour.
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = rgb(this.paperRGB);
    ctx.fillRect(0, 0, W, H);

    if (p.chroma > 0) {
      const shiftPx = Math.round(p.chroma * 5 * this.dpr) + 1;
      this.compositeTinted(this.accentRGB, shiftPx, 0.7 * p.chroma);
      this.compositeTinted(this.accentInv, -shiftPx, 0.6 * p.chroma);
    }
    this.compositeTinted(this.inkRGB, 0, 1);

    // 3) grain + scanline veil
    if (this.grainCanvas && p.grain > 0) {
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = p.grain;
      ctx.drawImage(this.grainCanvas, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }

  // Tint the warped letter to `col` and composite it, shifted by `dxPx`:
  //   scratch = warp            (letter shape, real alpha)
  //   scratch 'source-in' col   (fill col only where the letter is)
  //   main    'source-over'     (place it over the paper at any offset)
  // Correct for any ink/paper combo — no luminance-key assumptions.
  private compositeTinted(col: [number, number, number], dxPx: number, alpha: number) {
    const W = this.warp.width;
    const H = this.warp.height;
    if (!this.tintScratch) {
      this.tintScratch = document.createElement("canvas");
      this.tctx = this.tintScratch.getContext("2d")!;
    }
    if (this.tintScratch.width !== W || this.tintScratch.height !== H) {
      this.tintScratch.width = W;
      this.tintScratch.height = H;
    }
    const s = this.tctx!;
    s.globalCompositeOperation = "source-over";
    s.globalAlpha = 1;
    s.clearRect(0, 0, W, H);
    s.drawImage(this.warp, 0, 0);
    s.globalCompositeOperation = "source-in";
    s.fillStyle = rgb(col);
    s.fillRect(0, 0, W, H);
    s.globalCompositeOperation = "source-over";

    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(this.tintScratch, dxPx, 0);
    this.ctx.globalAlpha = 1;
  }

  renderStatic() {
    // Not frame 0: at t=0 every wave is in phase and the letter sits perfectly
    // flat, which reads as "failed to load" rather than "motion is off".
    this.frame = 140;
    this.renderFrame();
  }

  private tick = () => {
    if (!this.running) return;
    this.frame++;
    this.renderFrame();
    this.raf = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  refreshLetter() {
    this.drawLetter();
    if (!this.running) this.renderStatic();
  }

  destroy() {
    this.stop();
    this.canvas.remove();
  }
}
