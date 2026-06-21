"use client";

import React from "react";
import styles from "@/components/HeadingLink.module.css";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const fontStyles: Record<number, React.CSSProperties> = {
  1: { fontSize: "32px", fontWeight: 600, letterSpacing: "-1.28px", lineHeight: "40px" },
  2: { fontSize: "24px", fontWeight: 600, letterSpacing: "-0.96px", lineHeight: "32px" },
  3: { fontSize: "20px", fontWeight: 600, letterSpacing: "-0.4px", lineHeight: "26px" },
  4: { fontSize: "16px", fontWeight: 600, letterSpacing: "-0.32px", lineHeight: "24px" },
  5: { fontSize: "14px", fontWeight: 600, letterSpacing: "-0.28px", lineHeight: "20px" },
  6: { fontSize: "13px", fontWeight: 600, lineHeight: "18px" },
};

export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children, style }) => {
  const copyURL = (): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).catch(() => {});
  };

  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={styles.heading}
      onClick={copyURL}
      style={{
        ...fontStyles[level],
        color: "var(--color-primary)",
        fontFamily: "var(--font-sans)",
        margin: 0,
        ...style,
      }}
    >
      {children}
      <span className={styles.icon} aria-hidden="true">#</span>
    </Tag>
  );
};
