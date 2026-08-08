import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

type ChangeFrequency = "weekly" | "monthly" | "yearly";

// Hand-maintained dates for the routes whose content is not derived from MDX.
// Stamping `new Date()` here instead would move every lastmod on every deploy,
// which teaches crawlers to ignore the field. Bump these when the page changes.
const STATIC_ROUTES: Record<
  string,
  { priority: number; changeFrequency: ChangeFrequency; lastModified: string }
> = {
  "/": { priority: 1.0, changeFrequency: "weekly", lastModified: "2026-08-08" },
  "/about": { priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-08" },
  "/now": { priority: 0.7, changeFrequency: "weekly", lastModified: "2026-06-01" },
  "/uses": { priority: 0.6, changeFrequency: "monthly", lastModified: "2026-08-08" },
  "/resume": { priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-08" },
};

// /blog and /work are indexes over MDX, so their lastmod is the newest thing
// they list rather than a date anyone has to remember to update.
const DERIVED_ROUTES: Record<string, { priority: number; changeFrequency: ChangeFrequency }> = {
  "/blog": { priority: 0.8, changeFrequency: "monthly" },
  "/work": { priority: 0.8, changeFrequency: "monthly" },
};

const newestPublishedAt = (posts: { metadata: { publishedAt: string } }[]) =>
  posts.reduce((newest, post) => (post.metadata.publishedAt > newest ? post.metadata.publishedAt : newest), "");

export default async function sitemap() {
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  const workProjects = getPosts(["src", "app", "work", "projects"]);

  const blogs = blogPosts.map((post) => ({
    url: `https://${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  const works = workProjects.map((post) => ({
    url: `https://${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  const derivedLastModified: Record<string, string> = {
    "/blog": newestPublishedAt(blogPosts),
    "/work": newestPublishedAt(workProjects),
  };

  const routes = Object.keys(routesConfig)
    .filter((route) => routesConfig[route])
    .map((route) => {
      const derived = DERIVED_ROUTES[route];
      const meta = derived
        ? { ...derived, lastModified: derivedLastModified[route] }
        : (STATIC_ROUTES[route] ?? {
            priority: 0.5,
            changeFrequency: "monthly" as ChangeFrequency,
            lastModified: "2026-08-08",
          });

      return {
        url: `https://${baseURL}${route !== "/" ? route : ""}`,
        lastModified: meta.lastModified,
        priority: meta.priority,
        changeFrequency: meta.changeFrequency,
      };
    });

  return [...routes, ...blogs, ...works];
}
