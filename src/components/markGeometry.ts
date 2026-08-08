/**
 * Single source of truth for the knockout monogram.
 *
 * The letter lives on a 5x7 cell grid inside a 20x20 plate, inset 5 cells
 * horizontally and 3 vertically. Mark.tsx renders it as an even-odd SVG path;
 * the icon routes render the same cells as boxes, because Satori rasterises
 * flex boxes reliably and complex fill-rule paths less so.
 */

export const PLATE = 20;
export const CELL = 2;
export const INSET_X = 5;
export const INSET_Y = 3;

/** [col, row, cols, rows] in cell units. */
export const STROKES: readonly [number, number, number, number][] = [
  [0, 0, 1, 7], // stem
  [1, 0, 3, 1], // bowl, top
  [4, 1, 1, 2], // bowl, right
  [1, 3, 3, 1], // bowl, bottom
  [2, 4, 1, 1], // leg
  [3, 5, 1, 1],
  [4, 6, 1, 1],
];

/** Cell rects projected into a plate of `size` pixels. */
export function strokeRects(size: number) {
  const s = size / PLATE;
  return STROKES.map(([x, y, w, h]) => ({
    left: (INSET_X + x * CELL) * s,
    top: (INSET_Y + y * CELL) * s,
    width: w * CELL * s,
    height: h * CELL * s,
  }));
}
