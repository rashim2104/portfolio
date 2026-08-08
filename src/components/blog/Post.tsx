import Link from "next/link";
import Image from "next/image";
import styles from "./Post.module.css";
import { formatDate } from "@/app/utils/formatDate";

interface PostProps {
  post: any;
  thumbnail: boolean;
  ordinal?: number;
}

export default function Post({ post, thumbnail, ordinal }: PostProps) {
  const formattedDate = formatDate(post.metadata.publishedAt);

  return (
    <Link href={`/blog/${post.slug}`} className={styles.postLink}>
      {post.metadata.image && thumbnail && (
        <span className={styles.thumb}>
          <Image
            src={post.metadata.image}
            alt={`Thumbnail of ${post.metadata.title}`}
            fill
            sizes="(max-width: 899px) 100vw, 760px"
          />
        </span>
      )}

      <span className={`${styles.ordinal} label`} aria-hidden="true">
        {String(ordinal ?? 0).padStart(2, "0")}
      </span>

      {/* A div rather than a span, because the title is a real heading and
          phrasing content cannot hold one. */}
      <div className={styles.body}>
        <h2 className={styles.title}>{post.metadata.title}</h2>
        {post.metadata.summary && (
          <span className={styles.summary}>{post.metadata.summary}</span>
        )}
        {post.metadata.tag && <span className={`${styles.tag} tag`}>{post.metadata.tag}</span>}
      </div>

      {formattedDate && (
        <time className={`${styles.date} label`}>{formattedDate}</time>
      )}
    </Link>
  );
}
