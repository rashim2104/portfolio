# Google SEO Improvement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all domain inconsistencies, stale metadata, and structured data across rashimrb.in to improve Google name-based ranking for "Rashim R B".

**Architecture:** Seven targeted changes across nine files. The root fix is `baseURL` in `config.js` — all pages consume it, so it propagates automatically. Remaining tasks update stale/wrong metadata and add BreadcrumbList JSON-LD to inner pages.

**Tech Stack:** Next.js 14 App Router, TypeScript, Schema.org JSON-LD

---

### Task 1: Fix baseURL

**Files:**
- Modify: `src/app/resources/config.js:1`

**Step 1: Make the change**

```js
const baseURL = "rashimrb.in";
```

**Step 2: Verify it propagates**

Start the dev server and check `http://localhost:3000/sitemap.xml` — every URL should now say `rashimrb.in`.

```bash
npm run dev
```

**Step 3: Commit**

```bash
git add src/app/resources/config.js
git commit -m "fix: set baseURL to rashimrb.in"
```

---

### Task 2: Fix global metadata in layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Fix `authors` URL and OG/Twitter descriptions**

In `layout.tsx`, update these fields inside the `metadata` export:

```ts
authors: [{ name: "Rashim R B", url: "https://rashimrb.in" }],
```

Replace the `openGraph.description` and `twitter.description` values:

```ts
openGraph: {
  title: `${person.name} - Software Developer`,
  description: `Software Developer at Skcript building production-grade systems. TypeScript, React Native, Node.js, Redis, PostgreSQL, Docker, AWS.`,
  url: baseURL,
  siteName: `${person.name}'s Portfolio`,
  locale: "en_US",
  type: "website",
  images: [
    {
      url: `${baseURL}/images/avatar.jpg`,
      width: 1200,
      height: 630,
      alt: "Rashim R B - Software Developer",
    }
  ],
},
twitter: {
  card: "summary_large_image",
  title: `${person.name} - Software Developer`,
  description: `Software Developer at Skcript. Building production-grade systems with TypeScript, React Native, Node.js, and cloud-native architectures.`,
  images: [`${baseURL}/images/avatar.jpg`],
  creator: "@rashimbuilds",
},
```

Also update the root `description` in metadata:

```ts
description: `Software Developer at Skcript specializing in TypeScript, React Native, Node.js, and cloud-native architectures. Building production-grade systems.`,
```

**Step 2: Verify in browser**

Open `http://localhost:3000` and inspect `<head>` — confirm `og:description` and `twitter:description` are updated.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: update global OG/Twitter metadata to current role"
```

---

### Task 3: Fix and consolidate JSON-LD Person schema

**Files:**
- Modify: `src/app/layout.tsx` (update schema)
- Modify: `src/app/page.tsx` (remove duplicate)

**Step 1: Replace the `jsonLd` object in `layout.tsx`**

Replace the entire `jsonLd` const with:

```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rashim R B",
  "url": "https://rashimrb.in",
  "email": "hello@rashim.in",
  "image": "https://rashimrb.in/images/avatar.jpg",
  "sameAs": [
    "https://github.com/rashim2104",
    "https://linkedin.com/in/rashimraseethali",
    "https://x.com/rashimbuilds"
  ],
  "jobTitle": "Software Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Skcript"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Sri Sairam Institute of Technology",
    "department": "Information Technology"
  },
  "knowsAbout": [
    "TypeScript",
    "JavaScript",
    "React Native",
    "Expo",
    "React.js",
    "Next.js",
    "Node.js",
    "Redis",
    "PostgreSQL",
    "Docker",
    "AWS",
    "REST APIs",
    "Web Development"
  ],
  "description": "Software Developer at Skcript building production-grade systems with TypeScript, React Native, and cloud-native architectures."
};
```

**Step 2: Remove duplicate Person schema from `page.tsx`**

In `src/app/page.tsx`, delete the entire `<script type="application/ld+json">` block (lines 39–55) that contains the Person schema. The layout already injects it globally.

**Step 3: Verify no duplicate schemas**

In the browser at `http://localhost:3000`, open DevTools → Elements, search for `application/ld+json` — should see only one Person schema (from layout) and no second one on the home page.

**Step 4: Validate structured data**

Paste the homepage HTML into https://validator.schema.org/ and confirm no errors on the Person schema.

**Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "fix: consolidate Person JSON-LD, update worksFor to Skcript, add X sameAs"
```

---

### Task 4: Fix robots.ts

**Files:**
- Modify: `src/app/robots.ts`

**Step 1: Add explicit allow and disallow rules**

```ts
import { baseURL } from "@/app/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/gallery",
      },
    ],
    sitemap: `https://${baseURL}/sitemap.xml`,
  };
}
```

> Note: `/gallery` is listed in routes but appears to be empty. Disallowing it prevents Google from crawling a dead page. If you later build out the gallery, remove the disallow.

**Step 2: Verify**

Visit `http://localhost:3000/robots.txt` — should show:

```
User-agent: *
Allow: /
Disallow: /gallery

Sitemap: https://rashimrb.in/sitemap.xml
```

**Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "fix: add explicit allow and disallow rules to robots.txt"
```

---

### Task 5: Add priority and changefreq to sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

**Step 1: Update sitemap to include priority and changefreq**

```ts
import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

const STATIC_PRIORITIES: Record<string, { priority: number; changeFrequency: string }> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/about": { priority: 0.8, changeFrequency: "monthly" },
  "/work": { priority: 0.8, changeFrequency: "monthly" },
  "/blog": { priority: 0.8, changeFrequency: "monthly" },
  "/resume": { priority: 0.8, changeFrequency: "monthly" },
};

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `https://${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    priority: 0.6,
    changeFrequency: "never" as const,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `https://${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    priority: 0.6,
    changeFrequency: "never" as const,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route] && route !== "/gallery");

  const routes = activeRoutes.map((route) => {
    const meta = STATIC_PRIORITIES[route] ?? { priority: 0.5, changeFrequency: "monthly" };
    return {
      url: `https://${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
      priority: meta.priority,
      changeFrequency: meta.changeFrequency as "weekly" | "monthly" | "never",
    };
  });

  return [...routes, ...blogs, ...works];
}
```

**Step 2: Verify**

Visit `http://localhost:3000/sitemap.xml` — confirm `/` has priority 1.0 and individual posts have 0.6. Also confirm `/gallery` is absent.

**Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add priority and changefreq to sitemap entries"
```

---

### Task 6: Add canonical to home page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add canonical to `generateMetadata`**

Update the return value of `generateMetadata` in `page.tsx`:

```ts
export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${baseURL}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
```

**Step 2: Verify**

In browser DevTools at `http://localhost:3000`, confirm `<link rel="canonical" href="https://rashimrb.in">` is present in `<head>`.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: add canonical URL to home page metadata"
```

---

### Task 7: Add BreadcrumbList to /blog

**Files:**
- Modify: `src/app/blog/page.tsx`

**Step 1: Add BreadcrumbList JSON-LD script**

Inside the `Blog` component's return, add a second `<script>` block before the existing one (or right after it):

```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://${baseURL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `https://${baseURL}/blog`
        }
      ]
    }),
  }}
/>
```

**Step 2: Verify**

Open `http://localhost:3000/blog` and check DevTools — should see two `application/ld+json` scripts: one `Blog` type and one `BreadcrumbList` type.

**Step 3: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: add BreadcrumbList JSON-LD to /blog"
```

---

### Task 8: Add BreadcrumbList to /work

**Files:**
- Modify: `src/app/work/page.tsx`

**Step 1: Add BreadcrumbList JSON-LD script**

Same pattern as Task 7, inside the `Work` component's return:

```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://${baseURL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": `https://${baseURL}/work`
        }
      ]
    }),
  }}
/>
```

**Step 2: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat: add BreadcrumbList JSON-LD to /work"
```

---

### Task 9: Add BreadcrumbList to /blog/[slug]

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`

**Step 1: Add BreadcrumbList JSON-LD script**

Inside the `BlogPost` component's return, alongside the existing `BlogPosting` schema:

```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://${baseURL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `https://${baseURL}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.metadata.title,
          "item": `https://${baseURL}/blog/${post.slug}`
        }
      ]
    }),
  }}
/>
```

**Step 2: Verify on a live post**

Open `http://localhost:3000/blog/payload-pursuit-ctf` and confirm two JSON-LD scripts: `BlogPosting` and `BreadcrumbList`.

**Step 3: Commit**

```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "feat: add BreadcrumbList JSON-LD to blog post pages"
```

---

### Task 10: Add BreadcrumbList to /work/[slug]

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

**Step 1: Add BreadcrumbList JSON-LD script**

Inside the `Project` component's return, alongside the existing `CreativeWork` schema:

```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://${baseURL}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": `https://${baseURL}/work`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.metadata.title,
          "item": `https://${baseURL}/work/${post.slug}`
        }
      ]
    }),
  }}
/>
```

**Step 2: Verify on a live project**

Open `http://localhost:3000/work/eventify` and confirm two JSON-LD scripts: `CreativeWork` and `BreadcrumbList`.

**Step 3: Final validation**

Run Google's Rich Results Test on each page type after deploying:
- https://search.google.com/test/rich-results

**Step 4: Commit**

```bash
git add src/app/work/[slug]/page.tsx
git commit -m "feat: add BreadcrumbList JSON-LD to project pages"
```

---

## Post-Deploy Checklist

After deploying to production:

1. Submit sitemap in Google Search Console: `https://rashimrb.in/sitemap.xml`
2. Use "URL Inspection" tool on the homepage to request re-indexing
3. Validate structured data with Google's Rich Results Test on `/`, `/blog`, `/work`, and one of each slug page
4. Check `https://rashimrb.in/robots.txt` is live and correct
