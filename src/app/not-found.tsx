import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Rashim R B",
  description: "The page you're looking for doesn't exist. Return to explore projects, blog posts, and more.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "404 - Page Not Found | Rashim R B",
    description: "The page you're looking for doesn't exist. Return to explore projects, blog posts, and more.",
    url: "https://rashim.in/404",
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-16)",
        minHeight: "60vh",
        gap: "var(--space-4)",
        maxWidth: "600px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1,
          color: "var(--color-accent)",
          margin: 0,
        }}
      >
        404
      </h1>
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
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "16px",
          lineHeight: "24px",
          color: "var(--color-secondary)",
          margin: 0,
        }}
      >
        Oops! The page you&apos;re looking for seems to have vanished into the digital void.
        Let&apos;s get you back on track!
      </p>
      <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-6)", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
        <Link href="/work" className="btn btn-secondary">
          View Projects
        </Link>
      </div>
    </div>
  );
}
