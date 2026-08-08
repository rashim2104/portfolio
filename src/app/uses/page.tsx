import React from "react";
import { baseURL } from "@/app/resources";
import { uses, person } from "@/app/resources/content";
import { PageHeader } from "@/components/PageHeader";
import { BadgeTrail } from "@/components/fx/BadgeTrail";
import styles from "@/styles/page.module.css";

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

const trailWords = Array.from(
  new Set(
    uses.groups
      .flatMap((group) => group.items.map((item) => item.name))
      .flatMap((name) => name.split("·"))
      .map((word) => word.trim())
      .filter((word) => word.length > 1 && word.length <= 14),
  ),
);

export default function Uses() {
  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      {/* Trail words come from the page's own content, so the two can never
          drift apart as the kit changes. Compound entries are split on their
          separator and anything long is dropped — a badge is a chip, not a
          sentence. */}
      <BadgeTrail words={trailWords} />

      <PageHeader kicker="Setup" title="Uses" lede={uses.intro} />

      {uses.groups.map((group, index) => (
        <section key={group.title} className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} label`}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span>{group.title}</span>
            </h2>
            <span className="label">{group.items.length} items</span>
          </div>
          <div className={styles.rows}>
            {group.items.map((item) => (
              <div key={item.name} className={styles.row}>
                <span className={styles.rowName}>{item.name}</span>
                <span className={styles.rowValue}>{item.detail}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
