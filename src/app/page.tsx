import React from "react";
import Link from "next/link";
import { baseURL } from "@/app/resources";
import { home, person } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";

export async function generateMetadata() {
  const title = "Rashim R B - Full Stack Developer";
  const description = "Full Stack Developer at Skcript specializing in TypeScript, React Native, Node.js. Building production-grade email services, mobile apps, and scalable systems. Based in Chennai.";
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

export default function Home() {
  const posts = getPosts(["src", "app", "blog", "posts"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div style={{ maxWidth: "var(--max-w-md)", width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>

      {/* Overview */}
      <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.96px", lineHeight: "32px", color: "var(--color-primary)", margin: 0 }}>
          Overview
        </h2>
        <div style={{ display: "flex", gap: "var(--space-8)", alignItems: "flex-start", flexWrap: "wrap-reverse" }}>
          <p style={{ fontSize: "16px", lineHeight: "24px", color: "var(--color-secondary)", flex: 1, minWidth: "200px", margin: 0 }}>
            {home.about}
          </p>
          <img
            src={person.avatar}
            alt={person.name}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "var(--radius-full)",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        </div>
      </section>

      {/* Interests */}
      <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.96px", lineHeight: "32px", color: "var(--color-primary)", margin: 0 }}>
          Interests
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
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
                flex: "1 1 180px",
                maxWidth: "280px",
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
    </div>
  );
}
