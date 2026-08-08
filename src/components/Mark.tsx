import { PLATE, CELL, INSET_X, INSET_Y, STROKES } from "@/components/markGeometry";

/**
 * Knockout monogram. The R is the hole, not the ink — the plate is filled and
 * the glyph is cut out of it, so the mark reads as a solid block at any size.
 * Built on a 5x7 cell grid to match the monospace identity, which also keeps
 * it exact at 16px where an outline letterform would turn to mush.
 */

const path = [
  `M0 0H${PLATE}V${PLATE}H0Z`,
  ...STROKES.map(([x, y, w, h]) => {
    const x0 = INSET_X + x * CELL;
    const y0 = INSET_Y + y * CELL;
    return `M${x0} ${y0}H${x0 + w * CELL}V${y0 + h * CELL}H${x0}Z`;
  }),
].join("");

export const Mark = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${PLATE} ${PLATE}`}
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path d={path} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
