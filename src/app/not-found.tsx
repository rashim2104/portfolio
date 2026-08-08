import Link from "next/link";
import { Metadata } from "next";
import { DatamoshBand } from "@/components/fx/DatamoshBand";
import styles from "@/app/not-found.module.css";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist. Return to explore projects, blog posts, and more.",
  // Overrides the layout's site-wide index/follow. Next emits its own noindex
  // for this route, and without this the two tags would contradict each other.
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "404 — Page Not Found",
    description: "The page you're looking for doesn't exist. Return to explore projects, blog posts, and more.",
    url: "https://rashim.in/404",
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={`${styles.status} label`}>
        <span className={styles.dot} aria-hidden="true" />
        <span>No route</span>
      </div>

      <h1 className={styles.code}>404</h1>

      <DatamoshBand />

      <p className={styles.body}>
        Nothing resolves at this address. It may have moved, or it may never have existed.
      </p>

      <div className={styles.actions}>
        <Link href="/" className="btn btn-primary">
          Index
        </Link>
        <Link href="/work" className="btn btn-secondary">
          Work
        </Link>
        <Link href="/blog" className="btn btn-secondary">
          Writing
        </Link>
      </div>
    </div>
  );
}
