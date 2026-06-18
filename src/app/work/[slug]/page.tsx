import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

interface WorkParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: WorkParams) {
  const { slug } = await params;
  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  let ogImage = image
    ? `https://${baseURL}${image}`
    : `https://${baseURL}/og?type=work&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/work/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/work/${post.slug}`,
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

export default async function Project({ params }: WorkParams) {
  const { slug } = await params;
  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <section
      style={{
        maxWidth: "var(--max-w-content)",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
      }}
    >
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
                "name": "Projects",
                "item": `https://${baseURL}/work`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.metadata.title,
                "item": `https://${baseURL}/work/${post.slug}`
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
            "@type": "CreativeWork",
            name: post.metadata.title,
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/work/${post.slug}`,
            author: post.metadata.team?.map((member) => ({
              "@type": "Person",
              name: member.name,
            })) || [{
              "@type": "Person",
              name: person.name,
              url: `https://${baseURL}`,
            }],
            creator: {
              "@type": "Person",
              name: person.name,
              url: `https://${baseURL}`,
            },
          }),
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <Link href="/work" className="btn btn-tertiary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "4px", width: "fit-content" }}>
          <span>←</span> Projects
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
      {post.metadata.images.length > 0 && (
        <img
          src={post.metadata.images[0]}
          alt={`${post.metadata.title} project screenshot`}
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: "var(--radius-md)",
            display: "block",
          }}
        />
      )}
      <article>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            alignItems: "center",
            marginBottom: "var(--space-6)",
          }}
        >
          {avatars.length > 0 && (
            <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar.src}
                  alt=""
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid var(--gray-200)",
                  }}
                />
              ))}
            </div>
          )}
          <span
            style={{
              fontSize: "13px",
              lineHeight: "18px",
              color: "var(--color-secondary)",
            }}
          >
            {formatDate(post.metadata.publishedAt)}
          </span>
        </div>
        <div className="prose">
          <CustomMDX source={post.content} />
        </div>
      </article>
      <ScrollToHash />
    </section>
  );
}
