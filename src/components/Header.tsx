"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "@/components/Header.module.css";
import { routes } from "@/app/resources";

export const Header = () => {
  const pathname = usePathname() ?? "";

  const navLinks = [
    { href: "/", label: "Home", match: (p: string) => p === "/" },
    { href: "/about", label: "About", match: (p: string) => p === "/about" },
    { href: "/blog", label: "Blog", match: (p: string) => p.startsWith("/blog") },
    { href: "/work", label: "Projects", match: (p: string) => p.startsWith("/work") },
    { href: "/resume", label: "Resume", match: (p: string) => p.startsWith("/resume") },
  ];

  return (
    <header className={styles.header}>
      <div
        style={{
          maxWidth: "var(--max-w-md)",
          margin: "0 auto",
          padding: "0 var(--space-6)",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--color-primary)",
            textDecoration: "none",
            letterSpacing: "-0.3px",
          }}
        >
          Rashim
        </Link>

        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          {navLinks.map(({ href, label, match }) => {
            const routeKey = href as keyof typeof routes;
            if (!routes[routeKey]) return null;

            const isActive = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link${isActive ? " active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
