import { getPosts } from "@/app/utils/utils";
import { Projects } from "@/components/work/Projects";
import { PageHeader } from "@/components/PageHeader";
import styles from "@/styles/page.module.css";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";

export async function generateMetadata() {
  const title = "Projects — Things I've Shipped";
  const description = "Projects I've shipped — an email service, React Native apps, and a few real-time tracking systems for events.";
  const ogImage = `https://${baseURL}/og?type=work&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/work` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work`,
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

export default async function Work() {
  let allProjects = await getPosts(["src", "app", "work", "projects"]);

  return (
    <div className={styles.page}>
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
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/work`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(work.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `https://${baseURL}`,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/work/${project.slug}`,
              image: project.metadata.image ? `https://${baseURL}${project.metadata.image}` : undefined,
            })),
          }),
        }}
      />
      <PageHeader
        kicker="Selected"
        title={work.title}
        lede={work.description}
        meta={`${allProjects.length} ${allProjects.length === 1 ? "project" : "projects"}`}
      />
      <Projects projects={allProjects} />
    </div>
  );
}
