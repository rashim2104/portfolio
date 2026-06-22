import React from "react";
import { baseURL } from "@/app/resources";
import { now, person } from "@/app/resources/content";

export async function generateMetadata() {
  const title = `Now - ${person.name}`;
  const description = now.description;
  const ogImage = `https://${baseURL}/og?type=default&title=${encodeURIComponent("Now")}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/now` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/now`,
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

export default function Now() {
  return (
    <div style={{ maxWidth: "var(--max-w-content)", width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-1.28px", lineHeight: "40px", color: "var(--color-primary)", margin: 0 }}>
          Now
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px", color: "var(--color-secondary)", margin: 0 }}>
          What I'm focused on at the moment. This is a{" "}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
            now page
          </a>
          .
        </p>
        <p style={{ fontSize: "13px", lineHeight: "18px", color: "var(--color-secondary)", margin: 0, fontFamily: "var(--font-mono)" }}>
          Last updated {now.updated}
        </p>
      </div>

      {now.sections.map((section) => (
        <section key={section.title} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.4px", lineHeight: "26px", color: "var(--color-primary)", margin: 0 }}>
            {section.title}
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", margin: 0, paddingLeft: "var(--space-4)", listStyle: "disc" }}>
            {section.items.map((item, i) => (
              <li key={i} style={{ fontSize: "16px", lineHeight: "24px", color: "var(--color-secondary)" }}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p style={{ fontSize: "14px", lineHeight: "20px", color: "var(--color-secondary)", margin: 0, fontStyle: "italic" }}>
        better late than never.
      </p>
    </div>
  );
}
