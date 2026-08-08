import { ImageResponse } from "next/og";
import { strokeRects } from "@/components/markGeometry";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

const PLATE_COLOR = "#e6e8ea";
const KNOCKOUT = "#0a0b0d";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          background: PLATE_COLOR,
          position: "relative",
          display: "flex",
        }}
      >
        {strokeRects(size.width).map((r, i) => (
          <div key={i} style={{ position: "absolute", background: KNOCKOUT, ...r }} />
        ))}
      </div>
    ),
    { ...size },
  );
}
