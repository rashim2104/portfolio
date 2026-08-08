"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "@/components/Header.module.css";
import { routes } from "@/app/resources";
import { Mark } from "@/components/Mark";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Index", match: (p: string) => p === "/" },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/blog", label: "Writing", match: (p: string) => p.startsWith("/blog") },
  { href: "/work", label: "Work", match: (p: string) => p.startsWith("/work") },
  { href: "/now", label: "Now", match: (p: string) => p.startsWith("/now") },
  // /resume is intentionally unlinked — the route stays live for direct
  // sharing, but it is not part of the site's navigation.
];

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Rashim R B — home">
          <Mark size={18} />
          <span className={styles.brandName}>Rashim</span>
        </Link>

        <nav aria-label="Main navigation" className={styles.nav}>
          {navLinks.map(({ href, label, match }) => {
            const routeKey = href as keyof typeof routes;
            if (!routes[routeKey]) return null;

            const isActive = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`${styles.link}${isActive ? ` ${styles.active}` : ""}`}
              >
                {label}
              </Link>
            );
          })}
          <span className={styles.divider} aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
