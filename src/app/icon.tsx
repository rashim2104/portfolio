import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const avatarData = await readFile(join(process.cwd(), "public/images/avatar.jpg"));
  const base64 = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <img src={base64} width={32} height={32} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size }
  );
}
