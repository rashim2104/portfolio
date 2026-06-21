import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import { person, about, social } from "@/app/resources/content";
import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

export async function generateMetadata() {
  const title = "About Rashim R B - Full Stack Developer";
  const description = "Learn about Rashim R B, a full stack developer at Skcript building scalable systems with TypeScript, React Native, Node.js, PostgreSQL, and cloud technologies. Based in Chennai.";
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
  github: <FaGithub size={18} />,
  linkedin: <FaLinkedin size={18} />,
  x: <FaXTwitter size={18} />,
  email: <FaEnvelope size={18} />,
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

  return (
    <div style={{ maxWidth: "var(--max-w-md)", width: "100%" }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
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

      {about.tableOfContent.display && (
        <TableOfContents structure={structure} about={about} />
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {about.avatar.display && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)", paddingBottom: "var(--space-8)" }}>
            <img
              src={person.avatar}
              alt={person.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "var(--radius-full)",
                objectFit: "cover",
                border: "1px solid var(--gray-400)",
              }}
            />
            <span style={{ fontSize: "13px", color: "var(--color-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
              📍 {person.location}
            </span>
          </div>
        )}

        <div style={{ width: "100%", maxWidth: "640px" }}>
          <div
            id={about.intro.title}
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "160px",
              justifyContent: "center",
              marginBottom: "var(--space-8)",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-2.4px",
                lineHeight: "48px",
                color: "var(--color-primary)",
                margin: 0,
              }}
            >
              {person.name}
            </h1>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 400,
                color: "var(--color-secondary)",
                marginTop: "var(--space-2)",
                marginBottom: 0,
              }}
            >
              {person.role}
            </p>

            {social.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-2)",
                  paddingTop: "20px",
                  paddingBottom: "var(--space-2)",
                  alignItems: "center",
                }}
              >
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
                  href="/resumes/Rashim-Resume.pdf"
                  download="Rashim-Resume.pdf"
                  className="btn btn-primary btn-sm"
                >
                  Download Resume
                </a>
              </div>
            )}
          </div>

          {about.intro.display && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                marginBottom: "var(--space-10)",
                fontSize: "16px",
                lineHeight: "24px",
                color: "var(--color-primary)",
              }}
            >
              {about.intro.description}
            </div>
          )}

          {about.work.display && (
            <div style={{ marginBottom: "var(--space-10)" }}>
              <h2
                id={about.work.title}
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  letterSpacing: "-0.96px",
                  lineHeight: "32px",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-6)",
                  marginTop: 0,
                }}
              >
                {about.work.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                {about.work.experiences.map((experience, index) => (
                  <div key={`${experience.company}-${experience.role}-${index}`} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      <strong
                        id={experience.company}
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--color-primary)",
                        }}
                      >
                        {experience.company === "Bulkpe" ? (
                          <a href="https://bulkpe.in" target="_blank" rel="noopener noreferrer">
                            {experience.company}
                          </a>
                        ) : (
                          experience.company
                        )}
                      </strong>
                      <span style={{ fontSize: "13px", color: "var(--color-secondary)" }}>
                        {experience.timeframe}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--color-accent)",
                        marginBottom: "var(--space-4)",
                        marginTop: 0,
                      }}
                    >
                      {experience.role}
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingLeft: "var(--space-4)", margin: 0 }}>
                      {experience.achievements.map((achievement: React.ReactElement, i: number) => (
                        <li
                          key={`${experience.company}-${i}`}
                          style={{ fontSize: "14px", lineHeight: "22px", color: "var(--color-primary)" }}
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {about.volunteering.display && (
            <div style={{ marginBottom: "var(--space-10)" }}>
              <h2
                id={about.volunteering.title}
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  letterSpacing: "-0.96px",
                  lineHeight: "32px",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-6)",
                  marginTop: 0,
                }}
              >
                {about.volunteering.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                {about.volunteering.experiences.map((experience, index) => (
                  <div key={`${experience.company}-${experience.role}-${index}`} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      <strong
                        id={experience.company}
                        style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-primary)" }}
                      >
                        {experience.company}
                      </strong>
                      <span style={{ fontSize: "13px", color: "var(--color-secondary)" }}>
                        {experience.timeframe}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--color-accent)",
                        marginBottom: "var(--space-4)",
                        marginTop: 0,
                      }}
                    >
                      {experience.role}
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingLeft: "var(--space-4)", margin: 0 }}>
                      {experience.achievements.map((achievement: React.ReactElement, i: number) => (
                        <li
                          key={`${experience.company}-${i}`}
                          style={{ fontSize: "14px", lineHeight: "22px", color: "var(--color-primary)" }}
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {about.studies.display && (
            <div style={{ marginBottom: "var(--space-10)" }}>
              <h2
                id={about.studies.title}
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  letterSpacing: "-0.96px",
                  lineHeight: "32px",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-6)",
                  marginTop: 0,
                }}
              >
                {about.studies.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                {about.studies.institutions.map((institution, index) => (
                  <div key={`${institution.name}-${index}`} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                    <strong
                      id={institution.name}
                      style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-primary)" }}
                    >
                      {institution.name}
                    </strong>
                    <span style={{ fontSize: "13px", color: "var(--color-secondary)" }}>
                      {institution.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {about.technical.display && (
            <div style={{ marginBottom: "var(--space-10)" }}>
              <h2
                id={about.technical.title}
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  letterSpacing: "-0.96px",
                  lineHeight: "32px",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-10)",
                  marginTop: 0,
                }}
              >
                {about.technical.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                {about.technical.skills.map((skill, index) => (
                  <div key={`${skill.title}-${index}`} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                    <strong style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-primary)" }}>
                      {skill.title}
                    </strong>
                    <span style={{ fontSize: "14px", lineHeight: "20px", color: "var(--color-secondary)" }}>
                      {skill.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
