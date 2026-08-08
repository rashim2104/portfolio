import React from "react";
import styles from "@/components/HeadingLink.module.css";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

/**
 * A prose heading with a linkable anchor.
 *
 * Previously this copied a URL to the clipboard on click, which meant the whole
 * heading was a click target with no visible affordance and nothing a keyboard
 * could reach. It is now a real anchor: focusable, follows on Enter, and can be
 * copied with the browser's own link menu.
 */
export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children }) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Tag id={id} className={styles.heading}>
      <a href={`#${id}`} className={styles.anchor}>
        {children}
        <span className={styles.icon} aria-hidden="true">
          #
        </span>
      </a>
    </Tag>
  );
};
