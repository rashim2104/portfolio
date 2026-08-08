import React from "react";
import { baseURL } from "@/app/resources";
import { PageHeader } from "@/components/PageHeader";
import styles from "@/styles/page.module.css";

export async function generateMetadata() {
  const title = "Resume — Software Developer";
  const description = "Rashim R B's resume. Software Developer at Skcript working in TypeScript, React Native, Node.js, Postgres, Docker, and AWS. Based in Chennai, India.";
  const ogImage = `https://${baseURL}/og?type=resume&title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/resume` },
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
    <div className={styles.page}>
      <PageHeader
        kicker="Document"
        title="Resume"
        lede="Read it below, or take a copy."
      />

      <div className={styles.section}>
        <div className={styles.actions}>
          <a
            href="/resumes/Rashim_Resume.pdf"
            download="Rashim_Resume.pdf"
            className="btn btn-primary"
          >
            Download PDF
          </a>
          <a
            href="/resumes/Rashim_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Open in new tab
          </a>
        </div>

        <div className={styles.viewer}>
          <iframe
            src="/resumes/Rashim_Resume.pdf"
            width="100%"
            height="100%"
            title="Rashim R B Resume"
          />
        </div>
      </div>
    </div>
  );
}
