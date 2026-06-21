import React from "react";
import { baseURL } from "@/app/resources";

export async function generateMetadata() {
  const title = "Resume - Rashim R B | Software Developer";
  const description = "Rashim R B's professional resume. Software Developer at Skcript with expertise in TypeScript, React Native, Node.js, PostgreSQL, Docker, and AWS. Based in Chennai, India.";
  const ogImage = `https://${baseURL}/og?type=resume&title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/resume`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Resume() {
  return (
    <div style={{ maxWidth: "var(--max-w-lg)", width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-1.28px", lineHeight: "40px", color: "var(--color-primary)", margin: 0 }}>
          Resume
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px", color: "var(--color-secondary)", margin: 0 }}>
          View my resume below or download it for offline viewing.
        </p>
      </div>

      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <a
          href="/resumes/Rashim_Resume.pdf"
          download="Rashim_Resume.pdf"
          className="btn btn-primary"
        >
          Download Resume
        </a>
        <a
          href="/resumes/Rashim_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Open in New Tab
        </a>
      </div>

      <div
        style={{
          width: "100%",
          height: "80vh",
          border: "1px solid var(--gray-400)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <iframe
          src="/resumes/Rashim_Resume.pdf"
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
          title="Rashim R B Resume"
        />
      </div>
    </div>
  );
}
