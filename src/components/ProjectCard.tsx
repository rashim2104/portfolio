import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScanReveal } from "@/components/fx/ScanReveal";
import styles from "@/components/ProjectCard.module.css";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  ordinal?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  priority = false,
  ordinal,
}) => {
  const hasMedia = images.length > 0;

  return (
    // Projects without artwork collapse to a single column rather than leaving
    // an empty half of the row.
    <article className={`${styles.card}${hasMedia ? "" : ` ${styles.cardTextOnly}`}`}>
      <div className={styles.body}>
        {ordinal !== undefined && (
          <span className={`${styles.ordinal} label`}>
            {String(ordinal).padStart(2, "0")}
          </span>
        )}

        {title && (
          <h2 className={styles.title}>
            <Link href={`/${href}`}>{title}</Link>
          </h2>
        )}

        {description?.trim() && <p className={styles.summary}>{description}</p>}

        {avatars?.length > 0 && (
          <div className={styles.team}>
            {avatars.map((avatar, index) => (
              <Image key={index} src={avatar.src} alt="" width={22} height={22} />
            ))}
          </div>
        )}

        <div className={styles.links}>
          {content?.trim() && (
            <Link href={`/${href}`} className={`${styles.link} ${styles.linkPrimary} label`}>
              Read the case &#8594;
            </Link>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} label`}
            >
              Live &#8599;
            </a>
          )}
        </div>
      </div>

      {hasMedia && (
        <ScanReveal className={styles.mediaWrap}>
          <Link href={`/${href}`} aria-label={`View ${title}`} className={styles.media}>
            <Image
              src={images[0]}
              alt={`${title} — project preview`}
              fill
              priority={priority}
              sizes="(max-width: 899px) 100vw, 480px"
            />
          </Link>
        </ScanReveal>
      )}
    </article>
  );
};
