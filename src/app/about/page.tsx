import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import { person, about, social } from "@/app/resources/content";
import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { slug } from "@/app/utils/slug";
import styles from "@/app/about/about.module.css";

export async function generateMetadata() {
  const title = "About — Software Developer in Chennai";
  const description = "Rashim R B — Software Developer at Skcript. Backend systems, mobile apps, and the occasional voice-AI experiment. TypeScript, React Native, Node.js, Postgres. Based in Chennai.";
  const ogImage = `https://${baseURL}/og?type=about&title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: { canonical: `https://${baseURL}/about` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
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

const iconMap: Record<string, React.ReactElement> = {
  github: <FaGithub size={15} />,
  linkedin: <FaLinkedin size={15} />,
  x: <FaXTwitter size={15} />,
  email: <FaEnvelope size={15} />,
};

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.volunteering.title,
      display: about.volunteering.display,
      items: about.volunteering.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  // Numbering runs over the sections that actually render, so a hidden section
  // does not leave a gap in the sequence.
  const visible = structure.filter((section) => section.display).map((section) => section.title);
  const ordinal = (title: string) => String(visible.indexOf(title) + 1).padStart(2, "0");

  return (
    <div className={styles.layout}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.description,
            url: `https://${baseURL}/about`,
            image: `https://${baseURL}${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />

      <div className={styles.column}>
        <header className={styles.masthead}>
          {about.avatar.display && (
            <Image
              src={person.avatar}
              alt={`${person.name} — Software Developer based in ${person.location}`}
              width={104}
              height={104}
              priority
              className={styles.portrait}
            />
          )}

          <div className={styles.identity}>
            <h1 className={styles.name}>{person.name}</h1>

            <div className={`${styles.roleLine} label`}>
              <span>{person.role}</span>
              <span className={styles.sep} aria-hidden="true">/</span>
              <span>{person.location}</span>
            </div>

            <div className={styles.contact}>
              {social.map(
                (item) =>
                  item.link && (
                    <a
                      key={item.name}
                      href={item.link}
                      className="icon-btn"
                      target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={item.name}
                    >
                      {iconMap[item.icon] ?? <span>{item.name}</span>}
                    </a>
                  ),
              )}
              <a
                href="/resumes/Rashim_Resume.pdf"
                download="Rashim_Resume.pdf"
                className="btn btn-secondary btn-sm"
              >
                Resume
              </a>
            </div>
          </div>
        </header>

        {about.intro.display && (
          <section id={slug(about.intro.title)} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className="label">
                <span className={styles.index}>{ordinal(about.intro.title)}</span>{" "}
                <span>{about.intro.title}</span>
              </h2>
            </div>
            <div className={styles.prose}>{about.intro.description}</div>
          </section>
        )}

        {about.work.display && (
          <section id={slug(about.work.title)} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className="label">
                <span className={styles.index}>{ordinal(about.work.title)}</span>{" "}
                <span>{about.work.title}</span>
              </h2>
            </div>

            <div className={styles.roles}>
              {about.work.experiences.map((experience, index) => (
                <article
                  key={`${experience.company}-${experience.role}-${index}`}
                  id={slug(experience.company)}
                  className={styles.role}
                >
                  <div className={styles.roleHead}>
                    <span className={styles.company}>{experience.company}</span>
                    <span className="label">{experience.timeframe}</span>
                  </div>
                  <span className={`${styles.roleTitle} label`}>{experience.role}</span>

                  <div className={styles.achievements}>
                    {experience.achievements.map((achievement: React.ReactElement, i: number) => (
                      <p key={`${experience.company}-${i}`} className={styles.achievement}>
                        <span className={styles.bullet} aria-hidden="true">
                          &#8250;
                        </span>
                        <span>{achievement}</span>
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {about.studies.display && (
          <section id={slug(about.studies.title)} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className="label">
                <span className={styles.index}>{ordinal(about.studies.title)}</span>{" "}
                <span>{about.studies.title}</span>
              </h2>
            </div>

            <div className={styles.rows}>
              {about.studies.institutions.map((institution) => (
                <div key={institution.name} id={slug(institution.name)} className={styles.row}>
                  <span className={styles.rowName}>{institution.name}</span>
                  <span className={styles.rowValue}>
                    {institution.description}
                    {institution.timeframe ? ` · ${institution.timeframe}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {about.technical.display && (
          <section id={slug(about.technical.title)} className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className="label">
                <span className={styles.index}>{ordinal(about.technical.title)}</span>{" "}
                <span>{about.technical.title}</span>
              </h2>
            </div>

            <div className={styles.rows}>
              {about.technical.skills.map((skill) => (
                <div key={skill.title} id={slug(skill.title)} className={styles.row}>
                  <span className={styles.rowName}>{skill.title}</span>
                  <span className={styles.rowValue}>{skill.description}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {about.tableOfContent.display && <TableOfContents structure={structure} about={about} />}
    </div>
  );
}
