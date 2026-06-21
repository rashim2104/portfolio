import React from "react";
import { baseURL } from "@/app/resources";
import { uses, person } from "@/app/resources/content";

export async function generateMetadata() {
  const title = `Uses - ${person.name}`;
  const description = uses.description;
  const ogImage = `https://${baseURL}/og?type=default&title=${encodeURIComponent("Uses")}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/uses` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/uses`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Uses() {
  return (
    <div style={{ maxWidth: "var(--max-w-content)", width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-1.28px", lineHeight: "40px", color: "var(--color-primary)", margin: 0 }}>
          Uses
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px", color: "var(--color-secondary)", margin: 0 }}>
          {uses.intro}
        </p>
      </div>

      {uses.groups.map((group) => (
        <section key={group.title} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.4px", lineHeight: "26px", color: "var(--color-primary)", margin: 0 }}>
            {group.title}
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {group.items.map((item, i) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "var(--space-4)",
                  padding: "var(--space-3) 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--gray-200)",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-primary)", flexShrink: 0 }}>
                  {item.name}
                </span>
                <span style={{ fontSize: "13px", lineHeight: "18px", color: "var(--color-secondary)", textAlign: "right" }}>
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
