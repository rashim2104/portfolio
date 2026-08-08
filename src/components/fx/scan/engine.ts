// Block scan — a diagonal front that clears a field of small coloured blocks,
// so whatever sits under the canvas appears to assemble out of them.
//
// This is the pixel-scan idea rebuilt for a list of cards. The original is a
// WebGL fragment shader that rasterises a word and sprays it into blocks; that
// would mean one GL context per card, created and destroyed on every hover,
// and a canvas sitting on top of the page's most important headings. Here the
// blocks are drawn in plain Canvas 2D and they only ever REMOVE themselves —
// the artwork underneath is untouched DOM, so nothing is obscured once the
// sweep finishes and nothing is hidden from a crawler at any point.
//
// The front runs on the diagonal (x + y), so the reveal travels corner to
// corner rather than as a flat wipe. Each cell carries a small deterministic
// jitter, which is what stops the boundary reading as a ruled edge.

const CELL = 12; // CSS px
const DURATION = 620; // ms for the front to cross
const FEATHER = 0.22; // width of the transition zone, in progress units

function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export class ScanEngine {
  readonly ok: boolean = false;

  private host: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private palette: string[];

  private w = 0;
  private h = 0;
  private dpr = 1;

  private raf = 0;
  private startedAt = 0;
  private running = false;

  constructor(host: HTMLElement, palette: string[]) {
    this.host = host;
    this.palette = palette.length ? palette : ["#888888"];

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    host.appendChild(canvas);
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    this.ctx = ctx;
    this.ok = true;

    this.resize();
  }

  setPalette(palette: string[]) {
    if (palette.length) this.palette = palette;
  }

  resize() {
    if (!this.ok) return;
    const r = this.host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = r.width;
    this.h = r.height;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private draw(progress: number) {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    if (progress >= 1) return;

    const cols = Math.ceil(w / CELL);
    const rows = Math.ceil(h / CELL);
    // Normalised so the far corner reaches 1 exactly, whatever the aspect.
    const span = cols + rows;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r = hash(x, y);
        const diagonal = (x + y) / span;
        // Cells clear as the front passes; the jitter smears the boundary so
        // it reads as a spray rather than a ruled line.
        const threshold = diagonal * (1 - FEATHER) + r * FEATHER;
        if (threshold < progress) continue;

        ctx.fillStyle = this.palette[Math.floor(r * this.palette.length) % this.palette.length];
        // Sub-cell inset varies with the hash so the field is not a solid grid.
        const inset = r > 0.75 ? 2 : 0;
        ctx.fillRect(x * CELL + inset, y * CELL + inset, CELL - inset * 2, CELL - inset * 2);
      }
    }
  }

  private tick = (now: number) => {
    if (!this.running) return;
    if (!this.startedAt) this.startedAt = now;
    const progress = Math.min(1, (now - this.startedAt) / DURATION);
    this.draw(progress);

    if (progress >= 1) {
      this.running = false;
      this.raf = 0;
      return;
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  /** Replay the sweep from the top. */
  play() {
    if (!this.ok) return;
    this.resize();
    this.stop();
    this.startedAt = 0;
    this.running = true;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /** Clear the field entirely — the resting state, artwork fully visible. */
  clear() {
    if (!this.ok) return;
    this.stop();
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  destroy() {
    this.stop();
    this.canvas.remove();
  }
}
