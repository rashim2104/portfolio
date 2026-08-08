import React from "react";
import styles from "./about.module.css";
import { slug } from "@/app/utils/slug";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

/**
 * Section index for the about page. Plain anchor links rather than scripted
 * scrolling — they work without JS, they are keyboard and screen-reader
 * navigable, and smooth scrolling already comes from the global stylesheet.
 */
const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  if (!about.tableOfContent.display) return null;

  return (
    <nav className={styles.toc} aria-label="On this page">
      <span className={`${styles.tocLabel} label`}>On this page</span>

      {structure
        .filter((section) => section.display)
        .map((section) => (
          <React.Fragment key={section.title}>
            <a href={`#${slug(section.title)}`} className={`${styles.tocLink} label`}>
              <span className={styles.line} aria-hidden="true" />
              <span>{section.title}</span>
            </a>

            {about.tableOfContent.subItems &&
              section.items.map((item) => (
                <a
                  key={item}
                  href={`#${slug(item)}`}
                  className={`${styles.tocLink} ${styles.tocSub} label`}
                >
                  <span className={styles.line} aria-hidden="true" />
                  <span>{item}</span>
                </a>
              ))}
          </React.Fragment>
        ))}
    </nav>
  );
};

export default TableOfContents;
