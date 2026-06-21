import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { person, social } from "@/app/resources/content";

const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub size={18} />,
  linkedin: <FaLinkedin size={18} />,
  x: <FaXTwitter size={18} />,
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--gray-200)",
        padding: "var(--space-6) var(--space-6)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-w-md)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            lineHeight: "18px",
            color: "var(--color-secondary)",
          }}
        >
          &copy; {currentYear} {person.name}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
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
                  {iconMap[item.icon] ?? null}
                </a>
              ),
          )}
        </div>
      </div>
    </footer>
  );
};
