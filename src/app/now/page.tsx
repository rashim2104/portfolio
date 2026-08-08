import React from "react";
import { baseURL } from "@/app/resources";
import { now, person } from "@/app/resources/content";
import { PageHeader } from "@/components/PageHeader";
import styles from "@/styles/page.module.css";

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
    <div className={`${styles.page} ${styles.narrow}`}>
      <PageHeader
        kicker="Status"
        title="Now"
        lede={
          <>
            What I&apos;m focused on at the moment. This is a{" "}
            <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">
              now page
            </a>
            .
          </>
        }
        meta={`Last updated ${now.updated}`}
      />

      {now.sections.map((section, index) => (
        <section key={section.title} className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} label`}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span>{section.title}</span>
            </h2>
          </div>
          <ul className={styles.list}>
            {section.items.map((item, i) => (
              <li key={i} className={styles.item}>
                <span className={styles.bullet} aria-hidden="true">
                  &#8250;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className={styles.note}>better late than never.</p>
    </div>
  );
}
