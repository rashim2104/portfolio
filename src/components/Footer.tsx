import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { person, social } from "@/app/resources/content";
import styles from "@/components/Footer.module.css";

const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub size={15} />,
  linkedin: <FaLinkedin size={15} />,
  x: <FaXTwitter size={15} />,
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
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
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.colophon}>
          <span className={styles.label}>Colophon</span>
          <span className={styles.note}>
            Set in IBM Plex Mono and Geist Sans. Built with Next.js, deployed on Vercel.
          </span>
          <span className={styles.note}>
            &copy; {currentYear} {person.name}
          </span>
        </div>

        <div className={styles.links}>
          <div className={styles.linkRow}>
            <Link href="/now" className={styles.link}>
              Now
            </Link>
            <Link href="/uses" className={styles.link}>
              Uses
            </Link>
          </div>

          <div className={styles.social}>
            {social.map(
              (item) =>
                item.link && (
                  <a
                    key={item.name}
                    href={item.link}
                    className={styles.iconLink}
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
      </div>
    </footer>
  );
};
