"use client";

import { Grid } from "@/once-ui/components";
import Post from "@/components/blog/Post";

interface Post {
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
  posts: Post[];
}

export function Posts({ range, columns = "1", thumbnail = false, posts }: PostsProps) {
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedPosts = range
    ? sortedPosts.slice(range[0] - 1, range.length === 2 ? range[1] : sortedPosts.length)
    : sortedPosts;

  return (
    <>
      {displayedPosts.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="m">
          {displayedPosts.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
}
