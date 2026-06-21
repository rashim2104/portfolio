"use client";

import React from "react";
import styles from "./about.module.css";

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

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <div className={styles.sidebar}>
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              className={styles.sidebarItem}
              onClick={() => scrollTo(section.title, 80)}
            >
              <div className={styles.line} />
              <span>{section.title}</span>
            </div>
            {about.tableOfContent.subItems && section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={styles.sidebarItem}
                style={{ paddingLeft: "24px" }}
                onClick={() => scrollTo(item, 80)}
              >
                <div className={styles.line} style={{ width: "8px" }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TableOfContents;
