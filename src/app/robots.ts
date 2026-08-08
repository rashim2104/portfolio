import { baseURL } from "@/app/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /l/* are short-link redirects, not pages worth crawling.
        disallow: ["/l/"],
      },
    ],
    sitemap: `https://${baseURL}/sitemap.xml`,
  };
}
