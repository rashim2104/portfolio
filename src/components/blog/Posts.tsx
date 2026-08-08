import Post from "@/components/blog/Post";
import styles from "@/components/blog/Posts.module.css";

interface PostItem {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
}

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  posts: PostItem[];
}

export function Posts({ range, thumbnail = false, posts }: PostsProps) {
  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  const start = range ? range[0] - 1 : 0;
  const end = range ? (range.length === 2 ? range[1] : sortedPosts.length) : sortedPosts.length;
  const displayedPosts = sortedPosts.slice(start, end);

  if (displayedPosts.length === 0) return null;

  return (
    <div className={styles.list}>
      {displayedPosts.map((post, i) => (
        <Post
          key={post.slug}
          post={post}
          thumbnail={thumbnail}
          // Counted from the oldest post, so an entry keeps its number for good
          // instead of every id shifting each time something new is published.
          ordinal={sortedPosts.length - (start + i)}
        />
      ))}
    </div>
  );
}
