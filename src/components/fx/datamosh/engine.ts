// Datamosh — the corrupted-video look: flat blocks of colour that fall,
// stretch open through the middle of the frame, and squeeze shut again.
//
// THE ONE THING TO GET RIGHT: nothing moves horizontally. The column grid is
// fixed for the life of the element; only the vertical tiling animates.
//
// THE COLUMNS: not a uniform grid. Edge i sits at x = W * (i/N)^1.65, so
// columns are narrow on the left and wide on the right. That non-uniform grid
// is what makes the field read as receding perspective instead of a flat mosaic.
//
// THE FALL: each column holds a stack of tiles whose boundaries come from one
// sigmoid curve. Steepness IS tile height, so a tile enters the top as a sliver,
// snaps open to roughly half the height as it crosses the centre, and compresses
// shut again on the way out. The tile count is ODD so exactly one tile sits dead
// centre and takes the whole bulge — with an even count the middle is split
// between two tiles and the peak is roughly halved however hard you push.
//
// Adapted for this site: the palette is injected rather than hardcoded, so the
// 404 corrupts in the site's own colours instead of a stock rainbow, and the
// engine exposes the shared CanvasEngine shape (resize/renderStatic) with no
// ResizeObserver of its own — useEngineLifecycle already owns that.

const COLS = 11;
const POWER = 1.65;
const TILES = 15; // odd on purpose: one tile owns the centre bulge
const CYCLE = 0.2;
const STAGGER = 0.006;
const STRETCH = 8.5;
const EARLY = 1.0;
const SPRING_K = 1.6;
const BLEED = 0.012;
const COL_PHASE = -0.4;

const SPRING_NORM = 1 - Math.exp(-SPRING_K);

function springStep(p: number): number {
  const half = (t: number) => (1 - Math.exp(-SPRING_K * t)) / SPRING_NORM;
  return p < 0.5 ? 0.5 * half(2 * p) : 1 - 0.5 * half(2 * (1 - p));
}

function pickDifferent(from: number, avoid: number[], len: number): number {
  for (let i = 1; i <= len; i++) {
    const c = (from + i) % len;
    if (!avoid.includes(c)) return c;
  }
  return from;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class DatamoshEngine {
  readonly ok: boolean = false;

  private host: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private palette: string[];

  private w = 0;
  private h = 0;
  private dpr = 1;

  private raf = 0;
  private running = false;
  private lastT = 0;
  private elapsed = 0;
  private seed: number;

  private edges: number[] = [];
  private strip: number[] = [];

  constructor(host: HTMLElement, palette: string[], seed = 1) {
    this.host = host;
    this.palette = palette.length ? palette : ["#000000", "#ffffff"];
    this.seed = seed;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);
    this.canvas = canvas;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    this.ctx = ctx;
    ctx.imageSmoothingEnabled = false;
    this.ok = true;

    this.buildColours();
    this.resize();
  }

  setPalette(palette: string[]) {
    if (!palette.length) return;
    this.palette = palette;
    this.buildColours();
    if (!this.running) this.renderStatic();
  }

  // A repeating strip of colour indices with no two neighbours alike, so a
  // falling column never shows the same colour twice in a row.
  private buildColours() {
    const rand = mulberry32(this.seed);
    const len = this.palette.length;
    const LEN = 61;
    const strip: number[] = [];

    for (let n = 0; n < LEN; n++) {
      let next = Math.floor(rand() * len);
      if (n > 0 && next === strip[n - 1]) {
        next = pickDifferent(next, [strip[n - 1]], len);
      }
      strip.push(next);
    }

    if (LEN > 2 && strip[LEN - 1] === strip[0]) {
      strip[LEN - 1] = pickDifferent(strip[LEN - 1], [strip[LEN - 2], strip[0]], len);
    }

    this.strip = strip;
  }

  resize() {
    if (!this.ok) return;
    const r = this.host.getBoundingClientRect();
    if (!r.width || !r.height) return;

    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = Math.max(1, Math.round(r.width * this.dpr));
    this.h = Math.max(1, Math.round(r.height * this.dpr));
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.ctx.imageSmoothingEnabled = false;

    this.edges = [];
    for (let i = 0; i <= COLS; i++) {
      this.edges.push(Math.round(this.w * Math.pow(i / COLS, POWER)));
    }

    if (!this.running) this.renderStatic();
  }

  private tileEdge(k: number): number {
    const u = k / TILES;
    if (u < 0) return u * 0.05;
    if (u > 1) return 1 + (u - 1) * 0.05;
    const v = Math.pow(u, EARLY);
    const a = Math.pow(v, STRETCH);
    return a / (a + Math.pow(1 - v, STRETCH));
  }

  private draw() {
    const { ctx, h, edges } = this;
    if (!edges.length) return;

    for (let i = 0; i < COLS; i++) {
      const x0 = edges[i];
      const cw = edges[i + 1] - x0;
      if (cw <= 0) continue;

      const delay = (COLS - 1 - i) * STAGGER;
      const t = this.elapsed - delay;
      const raw = t <= 0 ? 0 : t / CYCLE;

      const linear = raw + i * COL_PHASE;
      const step = Math.floor(linear);
      const frac = linear - step;
      const flow = step + springStep(frac);

      const bleed = Math.round(BLEED * h);
      const base = -Math.floor(flow);

      for (let n = TILES + 2; n >= -2; n--) {
        const id = base + n;
        const k = id + flow;
        const top = Math.round(this.tileEdge(k) * h);
        const bot = Math.round(this.tileEdge(k + 1) * h) + bleed;
        if (bot <= top || bot <= 0 || top >= h) continue;

        const y = Math.max(0, top);
        const th = Math.min(h, bot) - y;
        if (th <= 0) continue;

        const s = id - i;
        const len = this.strip.length;
        ctx.fillStyle = this.palette[this.strip[((s % len) + len) % len]];
        ctx.fillRect(x0, y, cw, th);
      }
    }
  }

  private tick = (now: number) => {
    if (!this.running) return;
    const dt = this.lastT ? Math.min(0.05, (now - this.lastT) / 1000) : 0;
    this.lastT = now;
    this.elapsed += dt;
    this.draw();
    this.raf = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.running || !this.ok) return;
    this.running = true;
    this.lastT = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  // Held mid-cycle rather than at rest, so the still frame catches the tiles
  // mid-bulge instead of showing a flat, evenly banded grid.
  renderStatic() {
    if (!this.ok) return;
    this.elapsed = CYCLE * 0.45 + COLS * STAGGER;
    this.draw();
  }

  destroy() {
    this.stop();
    this.canvas.remove();
  }
}
