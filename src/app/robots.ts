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
