import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import Link from "next/link";

import { HeadingLink } from "@/components";

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} style={{ color: "var(--color-accent)" }} {...(props as any)}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} style={{ color: "var(--color-accent)" }} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }} {...props}>
      {children}
    </a>
  );
}

type CreateImageProps = {
  alt?: string;
  src: string;
  [key: string]: unknown;
};

function createImage({ alt, src }: CreateImageProps) {
  if (!src) {
    console.error("createImage requires a valid 'src' property.");
    return null;
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      style={{ width: "100%", borderRadius: "var(--radius-sm)", margin: "16px 0" }}
    />
  );
}

function getTextContent(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node)) {
    return getTextContent((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children }: { children?: ReactNode }) => {
    const slug = slugify(getTextContent(children));
    return (
      <HeadingLink
        style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-3)" }}
        level={level}
        id={slug}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({ children }: { children?: ReactNode }) {
  return (
    <p
      style={{
        lineHeight: "175%",
        fontSize: "14px",
        color: "var(--color-secondary)",
        marginTop: "8px",
        marginBottom: "12px",
      }}
    >
      {children}
    </p>
  );
}

function Code({ children }: { children?: ReactNode }) {
  const codeEl = children as React.ReactElement<{ className?: string; children?: ReactNode }>;
  const className = codeEl?.props?.className || "";
  const raw = codeEl?.props?.children;
  const code = (Array.isArray(raw) ? raw.join("") : String(raw ?? "")).replace(/\n$/, "");

  return (
    <div style={{ margin: "8px 0 12px", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
      <pre
        style={{
          background: "#1a1a1a",
          color: "#e5e5e5",
          padding: "var(--space-4)",
          overflowX: "auto",
          fontSize: "13px",
          lineHeight: "1.6",
          fontFamily: "var(--font-mono)",
          margin: 0,
        }}
      >
        <code className={className}>{code}</code>
      </pre>
    </div>
  );
}

const components = {
  p: createParagraph as any,
  pre: Code as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  img: createImage as any,
  a: CustomLink as any,
  Table,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    // @ts-ignore: Suppressing type error for MDXRemote usage
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
