import type { ReactNode } from "react";
import styles from "@/components/PageHeader.module.css";

/**
 * The masthead every interior page opens with: an optional uppercase kicker,
 * the title, a lede, and an optional metadata line. Shared so the rule under
 * the title lands at the same height across the site.
 */
export const PageHeader = ({
  kicker,
  title,
  lede,
  meta,
}: {
  kicker?: string;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
}) => (
  <header className={styles.header}>
    {kicker && (
      <div className={`${styles.kicker} label`}>
        <span className={styles.index}>&#47;&#47;</span>
        <span>{kicker}</span>
      </div>
    )}
    <h1 className={styles.title}>{title}</h1>
    {lede && <p className={styles.lede}>{lede}</p>}
    {meta && <div className={`${styles.meta} label`}>{meta}</div>}
  </header>
);
