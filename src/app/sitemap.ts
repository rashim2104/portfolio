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
