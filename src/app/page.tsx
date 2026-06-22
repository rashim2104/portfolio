import React from "react";
import Link from "next/link";
import Image from "next/image";
import { baseURL } from "@/app/resources";
import { home, person, social } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";

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
    <div style={{ maxWidth: "var(--max-w-md)", width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>

      {/* Hero */}
      <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center", flexWrap: "wrap" }}>
          <Image
            src={person.avatar}
            alt={`${person.name} — Software Developer based in Chennai`}
            width={88}
            height={88}
            priority
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "var(--radius-full)",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", minWidth: "240px", flex: 1 }}>
            <h1 style={{ fontSize: "36px", fontWeight: 600, letterSpacing: "-1.6px", lineHeight: "40px", color: "var(--color-primary)", margin: 0 }}>
              {person.name}
            </h1>
            <p style={{ fontSize: "16px", lineHeight: "24px", color: "var(--color-secondary)", margin: 0 }}>
              {home.headline}
            </p>
          </div>
        </div>

        <p style={{ fontSize: "16px", lineHeight: "26px", color: "var(--color-secondary)", margin: 0, maxWidth: "60ch" }}>
          {home.intro}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>
          <Link href="/blog" className="btn btn-primary">
            Read the blog
          </Link>
          <Link href="/work" className="btn btn-secondary">
            See what I've built
          </Link>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Writing */}
      {posts.length > 0 && (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.96px", lineHeight: "32px", color: "var(--color-primary)", margin: 0 }}>
            Writing
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="post-row"
              >
                <span style={{ fontSize: "14px", lineHeight: "20px", color: "var(--color-primary)" }}>
                  {post.metadata.title}
                </span>
                <span style={{ fontSize: "13px", lineHeight: "18px", color: "var(--color-secondary)", whiteSpace: "nowrap", marginLeft: "var(--space-4)" }}>
                  {formatDate(post.metadata.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
          <Link href="/blog" style={{ fontSize: "13px", lineHeight: "18px", color: "var(--color-secondary)", textDecoration: "none" }}>
            View all
          </Link>
        </section>
      )}

      {/* Interests */}
      <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.96px", lineHeight: "32px", color: "var(--color-primary)", margin: 0 }}>
          Beyond the keyboard
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "var(--space-3)" }}>
          {home.interests.map((interest) => (
            <div
              key={interest.title}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
                padding: "var(--space-4)",
                border: "1px solid var(--gray-400)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, lineHeight: "18px", color: "var(--color-primary)" }}>
                {interest.title}
              </span>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "var(--color-secondary)" }}>
                {interest.description}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
