# Google SEO Improvement Design

**Date:** 2026-03-04
**Goal:** Improve Google name-based ranking for "Rashim R B" on rashimrb.in
**Trigger:** Site verified in Google Search Console; domain/metadata inconsistencies identified

---

## Problem Summary

The site has three different domains referenced across the codebase (`rashimrb.com`, `rashim.codes`, `rashimrb.in`), causing Google to be unable to consolidate signals. Structured data is also stale (references old role/employer) and duplicated.

---

## Section 1: Domain Fix

**File:** `src/app/resources/config.js`

- Change `baseURL` from `rashimrb.com` → `rashimrb.in`
- This propagates automatically to: all page metadata, OG URLs, canonical URLs, sitemap, and robots

---

## Section 2: Global Metadata

**File:** `src/app/layout.tsx`

- `authors[0].url`: `rashimrb.com` → `https://rashimrb.in`
- OpenGraph `description`: replace stale student/GPA copy with current role — "Software Developer at Skcript building production-grade systems. TypeScript, React Native, Node.js, cloud-native."
- Twitter `description`: same update
- OG image URL will resolve correctly once baseURL is fixed

---

## Section 3: JSON-LD Consolidation

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`

- Remove duplicate `Person` schema from `page.tsx` (keep only in `layout.tsx`)
- Update `layout.tsx` Person schema:
  - `url`: `https://www.rashim.codes` → `https://rashimrb.in`
  - `worksFor`: Sri Sairam Institute of Technology → Skcript
  - Add `alumniOf`: Sri Sairam Institute of Technology (IT)
  - `sameAs`: add `https://x.com/rashimbuilds`
  - `knowsAbout`: update to TypeScript, React Native, Expo, Node.js, Redis, PostgreSQL, Docker, AWS
  - Add `email: "hello@rashim.in"`

---

## Section 4: robots.ts

**File:** `src/app/robots.ts`

- Add explicit `allow: "/"` to the wildcard rule
- Add `disallow: "/gallery"` if the route is empty/unfinished

---

## Section 5: Sitemap Priorities

**File:** `src/app/sitemap.ts`

| Route | Priority | changefreq |
|-------|----------|------------|
| `/` | 1.0 | weekly |
| `/about`, `/work`, `/blog`, `/resume` | 0.8 | monthly |
| `/work/[slug]`, `/blog/[slug]` | 0.6 | never |

---

## Section 6: Home Page Canonical

**File:** `src/app/page.tsx`

- Add `alternates: { canonical: \`https://${baseURL}\` }` to `generateMetadata`

---

## Section 7: BreadcrumbList JSON-LD

Add a `BreadcrumbList` schema (as a second `<script type="application/ld+json">`) to:

- `src/app/blog/page.tsx` → Home > Blog
- `src/app/work/page.tsx` → Home > Projects
- `src/app/blog/[slug]/page.tsx` → Home > Blog > {post.metadata.title}
- `src/app/work/[slug]/page.tsx` → Home > Projects > {post.metadata.title}

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/resources/config.js` | baseURL → rashimrb.in |
| `src/app/layout.tsx` | Fix metadata descriptions, JSON-LD |
| `src/app/page.tsx` | Add canonical, remove duplicate Person schema |
| `src/app/robots.ts` | Add explicit allow rule |
| `src/app/sitemap.ts` | Add priority + changefreq |
| `src/app/blog/page.tsx` | Add BreadcrumbList |
| `src/app/work/page.tsx` | Add BreadcrumbList |
| `src/app/blog/[slug]/page.tsx` | Add BreadcrumbList |
| `src/app/work/[slug]/page.tsx` | Add BreadcrumbList |
