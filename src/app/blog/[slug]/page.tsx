import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const formattedDate = new Date(publishedTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let ogImage = image
    ? `https://${baseURL}${image}`
    : `https://${baseURL}/og?type=blog&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&date=${encodeURIComponent(formattedDate)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
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

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section style={{ maxWidth: "var(--max-w-content)", width: "100%", margin: "0 auto" }}>
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.metadata.title,
                "item": `https://${baseURL}/blog/${post.slug}`
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
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `https://${baseURL}`,
              email: person.email,
            },
            publisher: {
              "@type": "Person",
              name: person.name,
              url: `https://${baseURL}`,
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://${baseURL}/blog/${post.slug}`,
            },
          }),
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        <Link
          href="/blog"
          className="btn btn-tertiary btn-sm"
          style={{ display: "inline-flex", alignItems: "center", gap: "4px", width: "fit-content" }}
        >
          <span>←</span> Blog
        </Link>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 600,
            letterSpacing: "-1.28px",
            lineHeight: "40px",
            color: "var(--color-primary)",
            margin: 0,
          }}
        >
          {post.metadata.title}
        </h1>
      </div>

      {post.metadata.images && post.metadata.images.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          {post.metadata.images.map((image: string, i: number) => (
            <img
              key={i}
              src={image}
              alt={post.metadata.title}
              style={{
                width: "100%",
                borderRadius: "var(--radius-sm)",
                objectFit: "cover",
                aspectRatio: "16 / 9",
              }}
            />
          ))}
        </div>
      ) : post.metadata.image ? (
        <img
          src={post.metadata.image}
          alt={post.metadata.title}
          style={{
            width: "100%",
            borderRadius: "var(--radius-sm)",
            objectFit: "cover",
            aspectRatio: "16 / 9",
            marginBottom: "var(--space-6)",
          }}
        />
      ) : null}

      <article className="prose">
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-secondary)",
            marginBottom: "var(--space-6)",
          }}
        >
          {formatDate(post.metadata.publishedAt)}
        </p>
        <CustomMDX source={post.content} />
      </article>

      <ScrollToHash />
    </section>
  );
}
