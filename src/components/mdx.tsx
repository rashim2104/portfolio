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

// Link colour and underline come from `.prose a` — styling them here as well
// would mean two places to change when the palette moves.
function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...(props as any)}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
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

  // The one place a bare <img> is still right. Images inside a post body come
  // from markdown with no dimensions and no fixed aspect, and next/image needs
  // either explicit width/height or a `fill` parent with a locked ratio —
  // which would crop whatever the author actually wrote into the post.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt || ""} loading="lazy" decoding="async" />;
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
      <HeadingLink level={level} id={slug}>
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

// Normalises the fenced-code shape MDX produces into a plain pre > code, and
// nothing else — `.prose pre` owns how it looks, in both themes.
function Code({ children }: { children?: ReactNode }) {
  const codeEl = children as React.ReactElement<{ className?: string; children?: ReactNode }>;
  const className = codeEl?.props?.className || "";
  const raw = codeEl?.props?.children;
  const code = (Array.isArray(raw) ? raw.join("") : String(raw ?? "")).replace(/\n$/, "");

  return (
    <pre>
      <code className={className}>{code}</code>
    </pre>
  );
}

const components = {
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
