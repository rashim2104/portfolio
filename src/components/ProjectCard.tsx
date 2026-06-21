"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
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
}) => {
  return (
    <article className="project-card">
      {images.length > 0 && (
        <Link href={"/" + href} aria-label={`View ${title}`} style={{ display: "block" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
            <Image
              src={images[0]}
              alt={`${title} — project preview`}
              fill
              priority={priority}
              sizes="(max-width: 960px) 100vw, 960px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      )}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {title && (
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "-0.96px",
              lineHeight: "32px",
              color: "var(--color-primary)",
              margin: 0,
            }}
          >
            <Link href={"/" + href} style={{ color: "inherit", textDecoration: "none" }}>
              {title}
            </Link>
          </h2>
        )}
        {description?.trim() && (
          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "var(--color-secondary)",
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
        {avatars?.length > 0 && (
          <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
            {avatars.map((avatar, index) => (
              <Image
                key={index}
                src={avatar.src}
                alt=""
                width={24}
                height={24}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid var(--gray-200)",
                }}
              />
            ))}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "row", gap: "16px", flexWrap: "wrap" }}>
          {content?.trim() && (
            <Link
              href={"/" + href}
              style={{
                fontSize: "14px",
                color: "var(--color-accent)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none",
              }}
            >
              View project details →
            </Link>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "14px",
                color: "var(--color-secondary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none",
              }}
            >
              ↗ Live project
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
