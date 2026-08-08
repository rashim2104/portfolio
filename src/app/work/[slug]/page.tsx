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
      <Link href="/work" className={`${styles.back} label`}>
        <span aria-hidden="true">&#8592;</span> Work
      </Link>

      <header className={styles.masthead}>
        <div className={`${styles.meta} label`}>
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
          {post.metadata.link && (
            <>
              <span className={styles.sep} aria-hidden="true">/</span>
              <a href={post.metadata.link} target="_blank" rel="noopener noreferrer">
                Live &#8599;
              </a>
            </>
          )}
        </div>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        {post.metadata.summary && <p className={styles.summary}>{post.metadata.summary}</p>}
        {avatars.length > 0 && (
          <div className={styles.team}>
            {avatars.map((avatar, index) => (
              <Image key={index} src={avatar.src} alt="" width={24} height={24} />
            ))}
          </div>
        )}
      </header>

      {post.metadata.images.length > 0 && (
        <div className={styles.figure}>
          <Image
            src={post.metadata.images[0]}
            alt={`${post.metadata.title} project screenshot`}
            fill
            priority
            sizes="(max-width: 899px) 100vw, 760px"
          />
        </div>
      )}

      <article className={`prose ${styles.body}`}>
        <CustomMDX source={post.content} />
      </article>
      <ScrollToHash />
    </section>
  );
}
