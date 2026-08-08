import { ImageResponse } from "next/og";
import { strokeRects } from "@/components/markGeometry";

export const runtime = "nodejs";

/**
 * Social cards.
 *
 * These are the highest-visibility surface the site has — they render in search
 * previews, Twitter, LinkedIn and iMessage — so they carry the brand exactly as
 * the site does: dark plate, IBM Plex Mono, the knockout monogram, a hairline
 * rule and an uppercase kicker.
 *
 * One parameterised template rather than a copy per page type. The variants
 * only ever differed by their kicker.
 */

const SURFACE = "#0a0b0d";
const SURFACE_SUNKEN = "#060708";
const INK = "#e6e8ea";
const INK_DIM = "#979ca3";
const INK_FAINT = "#757b83";
const RULE = "#1b1e22";
const ACCENT = "#8b7cff";

const KICKERS: Record<string, string> = {
  blog: "Writing",
  work: "Work",
  about: "About",
  resume: "Document",
  default: "Index",
};

const MARK_SIZE = 64;

function Mark() {
  return (
    <div
      style={{
        width: MARK_SIZE,
        height: MARK_SIZE,
        background: INK,
        position: "relative",
        display: "flex",
        flexShrink: 0,
      }}
    >
      {strokeRects(MARK_SIZE).map((r, i) => (
        <div key={i} style={{ position: "absolute", background: SURFACE, ...r }} />
      ))}
    </div>
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Rashim R B";
  const type = url.searchParams.get("type") || "default";
  const description = url.searchParams.get("description") || "";
  const date = url.searchParams.get("date") || "";

  const origin = url.origin;
  const [regular, semibold] = await Promise.all([
    fetch(`${origin}/fonts/IBMPlexMono-Regular.ttf`).then((r) => r.arrayBuffer()),
    fetch(`${origin}/fonts/IBMPlexMono-SemiBold.ttf`).then((r) => r.arrayBuffer()),
  ]);

  const kicker = KICKERS[type] ?? KICKERS.default;

  // Long titles need to step down or they overflow the plate.
  const titleSize = title.length > 68 ? 52 : title.length > 40 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: SURFACE,
          fontFamily: "Plex",
          // A faint recessed panel, echoing the site's sunken surfaces.
          backgroundImage: `linear-gradient(160deg, ${SURFACE} 0%, ${SURFACE_SUNKEN} 100%)`,
        }}
      >
        {/* Top rail: mark + uppercase kicker */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mark />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: INK_FAINT,
              }}
            >
              {kicker}
            </span>
            <span style={{ fontSize: 22, color: INK_DIM }}>rashim.in</span>
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", width: 96, height: 2, background: ACCENT }} />
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: INK,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.45,
                color: INK_DIM,
                maxWidth: 900,
              }}
            >
              {description.length > 150 ? `${description.slice(0, 150)}…` : description}
            </div>
          )}
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: INK_FAINT,
          }}
        >
          <span>Rashim R B — Software Developer</span>
          <span>{date || "Chennai"}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Plex", data: regular, weight: 400, style: "normal" },
        { name: "Plex", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
