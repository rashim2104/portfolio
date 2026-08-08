import Link from "next/link";
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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.metadata.image}
          alt={`Thumbnail of ${post.metadata.title}`}
          className={styles.thumb}
        />
      )}

      <span className={`${styles.ordinal} label`} aria-hidden="true">
        {String(ordinal ?? 0).padStart(2, "0")}
      </span>

      <span className={styles.body}>
        <span className={styles.title}>{post.metadata.title}</span>
        {post.metadata.summary && (
          <span className={styles.summary}>{post.metadata.summary}</span>
        )}
        {post.metadata.tag && <span className={`${styles.tag} tag`}>{post.metadata.tag}</span>}
      </span>

      {formattedDate && (
        <time className={`${styles.date} label`}>{formattedDate}</time>
      )}
    </Link>
  );
}
