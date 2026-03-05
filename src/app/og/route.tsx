import { ImageResponse } from "next/og";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Rashim R B";
  let type = url.searchParams.get("type") || "default";
  let description = url.searchParams.get("description") || "";
  let date = url.searchParams.get("date") || "";

  const font = fetch(new URL("../../../public/fonts/Inter.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  const fontData = await font;

  // Blog post template
  if (type === "blog") {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "linear-gradient(135deg, #151515 0%, #1a1a1a 100%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {date && (
              <span
                style={{
                  fontSize: "1.5rem",
                  color: "#888",
                  fontWeight: "400",
                }}
              >
                {date}
              </span>
            )}
            <h1
              style={{
                fontSize: "5rem",
                lineHeight: "1.1",
                color: "white",
                margin: 0,
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: "2rem",
                  color: "#aaa",
                  margin: 0,
                  lineHeight: "1.4",
                  fontWeight: "400",
                }}
              >
                {description.length > 100 ? description.substring(0, 100) + "..." : description}
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid #333",
            }}
          >
            <img
              src={"https://" + baseURL + person.avatar}
              alt={person.name}
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "1.2rem", color: "white", fontWeight: "600" }}>
                {person.name}
              </span>
              <span style={{ fontSize: "1rem", color: "#888" }}>{person.role}</span>
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  }

  // Work/Project template
  if (type === "work") {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "linear-gradient(135deg, #151515 0%, #1a1a1a 100%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              color: "#888",
              fontWeight: "400",
              marginBottom: "1rem",
            }}
          >
            Project
          </span>
          <h1
            style={{
              fontSize: "5.5rem",
              lineHeight: "1.1",
              color: "white",
              margin: "0 0 2rem 0",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: "2rem",
                color: "#aaa",
                margin: 0,
                lineHeight: "1.4",
                fontWeight: "400",
                maxWidth: "90%",
              }}
            >
              {description.length > 120 ? description.substring(0, 120) + "..." : description}
            </p>
          )}
        </div>
      </div>,
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  }

  // About template
  if (type === "about") {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "linear-gradient(135deg, #151515 0%, #1a1a1a 100%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            gap: "5rem",
          }}
        >
          <img
            src={"https://" + baseURL + person.avatar}
            alt={person.name}
            style={{
              width: "14rem",
              height: "14rem",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h1
              style={{
                fontSize: "4.5rem",
                color: "white",
                margin: 0,
                fontWeight: "700",
                lineHeight: "1.1",
              }}
            >
              About Me
            </h1>
            <p
              style={{
                fontSize: "2.5rem",
                color: "#aaa",
                margin: 0,
                fontWeight: "400",
              }}
            >
              {person.role}
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                color: "#888",
                margin: "1rem 0 0 0",
                fontWeight: "400",
              }}
            >
              {person.location}
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  }

  // Resume template
  if (type === "resume") {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "linear-gradient(135deg, #151515 0%, #1a1a1a 100%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "5.5rem",
              color: "white",
              margin: "0 0 1rem 0",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            Resume
          </h1>
          <p
            style={{
              fontSize: "3rem",
              color: "#aaa",
              margin: "1rem 0 0 0",
              fontWeight: "400",
            }}
          >
            {person.name}
          </p>
          <p
            style={{
              fontSize: "2rem",
              color: "#888",
              margin: "0.5rem 0 0 0",
              fontWeight: "400",
            }}
          >
            {person.role} • {person.location}
          </p>
        </div>
      </div>,
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  }

  // Default template
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "8rem",
        background: "#151515",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "4rem",
          fontFamily: "Inter",
          fontStyle: "normal",
          color: "white",
        }}
      >
        <span
          style={{
            fontSize: "8rem",
            lineHeight: "8rem",
            letterSpacing: "-0.05em",
            whiteSpace: "pre-wrap",
            textWrap: "balance",
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          <img
            src={"https://" + baseURL + person.avatar}
            alt={person.name}
            style={{
              width: "12rem",
              height: "12rem",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontSize: "4.5rem",
                lineHeight: "4.5rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
              }}
            >
              {person.name}
            </span>
            <span
              style={{
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
                opacity: "0.6",
              }}
            >
              {person.role}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
