import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const avatarData = await readFile(join(process.cwd(), "public/images/avatar.jpg"));
  const base64 = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          background: "#0a0a0a",
        }}
      >
        <img src={base64} width={180} height={180} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size }
  );
}
