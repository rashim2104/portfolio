import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources";
import { blog, person, newsletter } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";
import { Mailchimp } from "@/components";

export async function generateMetadata() {
  const title = "Technical Blog - Rashim R B";
  const description = "In-depth technical articles on TypeScript, React Native, Node.js, system design, and software engineering best practices.";
  const ogImage = `https://${baseURL}/og?type=blog&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/blog` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
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

export default function Blog() {
  const allPosts = getPosts(["src", "app", "blog", "posts"]);

  return (
    <div style={{ maxWidth: "var(--max-w-md)", width: "100%" }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `https://${baseURL}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `https://${baseURL}/blog`
              }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `https://${baseURL}`,
              image: {
                "@type": "ImageObject",
                url: `https://${baseURL}${person.avatar}`,
              },
            },
            blogPost: allPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.metadata.title,
              description: post.metadata.summary,
              url: `https://${baseURL}/blog/${post.slug}`,
              datePublished: post.metadata.publishedAt,
              image: post.metadata.image ? `https://${baseURL}${post.metadata.image}` : undefined,
              author: {
                "@type": "Person",
                name: person.name,
              },
            })),
          }),
        }}
      />
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 600,
          letterSpacing: "-1.28px",
          lineHeight: "40px",
          color: "var(--color-primary)",
          marginBottom: "var(--space-8)",
        }}
      >
        {blog.title}
      </h1>
      <Posts posts={allPosts} thumbnail columns="1" />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </div>
  );
}
