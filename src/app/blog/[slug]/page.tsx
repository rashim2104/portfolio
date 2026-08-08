import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import styles from "@/styles/article.module.css";

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
    <section className={styles.article}>
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

      <Link href="/blog" className={`${styles.back} label`}>
        <span aria-hidden="true">&#8592;</span> Writing
      </Link>

      <header className={styles.masthead}>
        <div className={`${styles.meta} label`}>
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
          {post.metadata.tag && (
            <>
              <span className={styles.sep} aria-hidden="true">/</span>
              <span>{post.metadata.tag}</span>
            </>
          )}
        </div>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        {post.metadata.summary && <p className={styles.summary}>{post.metadata.summary}</p>}
      </header>

      {post.metadata.images && post.metadata.images.length > 0 ? (
        <div className={styles.figures}>
          {post.metadata.images.map((image: string, i: number) => (
            <div key={i} className={styles.figure}>
              <Image
                src={image}
                alt={
                  post.metadata.alts?.[i] ||
                  `${post.metadata.title} — photo ${i + 1} of ${post.metadata.images.length}`
                }
                fill
                priority={i === 0}
                sizes="(max-width: 899px) 100vw, 760px"
              />
            </div>
          ))}
        </div>
      ) : post.metadata.image ? (
        <div className={styles.figure}>
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            priority
            sizes="(max-width: 899px) 100vw, 760px"
          />
        </div>
      ) : null}

      <article className={`prose ${styles.body}`}>
        <CustomMDX source={post.content} />
      </article>

      <ScrollToHash />
    </section>
  );
}
