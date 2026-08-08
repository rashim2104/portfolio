import { ImageResponse } from "next/og";
import { strokeRects } from "@/components/markGeometry";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PLATE_COLOR = "#0a0b0d";
const KNOCKOUT = "#e6e8ea";

/**
 * Home-screen icons sit on the user's own wallpaper, so this one runs
 * dark-plate / light-letter — the inverse of the favicon, which needs to hold
 * its own against browser chrome.
 */
export default function AppleIcon() {
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
