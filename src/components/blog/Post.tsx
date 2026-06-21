"use client";

import Link from "next/link";
import styles from "./Post.module.css";
import { formatDate } from "@/app/utils/formatDate";

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  const formattedDate = formatDate(post.metadata.publishedAt);

  return (
    <Link href={`/blog/${post.slug}`} className={styles.postLink}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: 0 }}>
        {post.metadata.image && thumbnail && (
          <img
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            style={{
              width: "100%",
              borderRadius: "var(--radius-sm)",
              objectFit: "cover",
              aspectRatio: "16 / 9",
              marginBottom: "8px",
            }}
          />
        )}
        <span className={styles.title}>{post.metadata.title}</span>
        {post.metadata.tag && (
          <span
            style={{
              fontSize: "12px",
              color: "var(--color-secondary)",
              border: "1px solid var(--gray-alpha-400)",
              borderRadius: "var(--radius-full)",
              padding: "2px 8px",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            {post.metadata.tag}
          </span>
        )}
      </div>
      {formattedDate && (
        <time className={styles.date}>{formattedDate}</time>
      )}
    </Link>
  );
}
