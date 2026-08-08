import React from "react";
import Link from "next/link";
import Image from "next/image";
import { baseURL } from "@/app/resources";
import { home, person, social } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";
import styles from "@/app/page.module.css";

export async function generateMetadata() {
  const title = "Rashim R B - Software Developer";
  const description = "Software Developer at Skcript. I build email infrastructure, mobile apps, and backend systems with TypeScript, React Native, and Node.js. Based in Chennai.";
  const ogImage = `https://${baseURL}/og?type=default&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${baseURL}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

const githubLink = social.find((s) => s.name === "GitHub")?.link ?? "https://github.com/rashim2104";

export default function Home() {
  const posts = getPosts(["src", "app", "blog", "posts"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.name}>{person.name}</h1>

          <div className={`${styles.kicker} label`}>
            <span>{person.role}</span>
            <span className={styles.sep} aria-hidden="true">/</span>
            <span>{person.location}</span>
          </div>

          <p className={styles.lede}>{home.headline}</p>

          <p className={styles.intro}>{home.intro}</p>

          <div className={styles.actions}>
            <Link href="/work" className="btn btn-primary">
              Work
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Writing
            </Link>
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              GitHub
            </a>
          </div>
        </div>

        <Image
          src={person.avatar}
          alt={`${person.name} — Software Developer based in Chennai`}
          width={116}
          height={116}
          priority
          className={styles.portrait}
        />
      </section>

      {posts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} label`}>
              <span className={styles.index}>01</span>
              <span>Writing</span>
            </h2>
            <Link href="/blog" className="label">
              View all
            </Link>
          </div>

          <div className={styles.posts}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post}>
                <span className={styles.postTitle}>{post.metadata.title}</span>
                <span className={`${styles.postDate} label`}>
                  {formatDate(post.metadata.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={`${styles.sectionTitle} label`}>
            <span className={styles.index}>02</span>
            <span>Beyond the keyboard</span>
          </h2>
        </div>

        <div className={`${styles.grid} ${styles.interests}`}>
          {home.interests.map((interest) => (
            <div key={interest.title} className={styles.cell}>
              <span className={styles.interestTitle}>{interest.title}</span>
              <span className={styles.interestBody}>{interest.description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
