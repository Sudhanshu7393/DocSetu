import { MetadataRoute } from "next";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://docsetu-app.vercel.app";

  const staticPages = [
    "",
    "/categories",
    "/pricing",
    "/about",
    "/help",
    "/contact",
    "/search",
    "/terms",
    "/privacy",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const documentPages = documents.map((d) => ({
    url: `${baseUrl}/documents/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...documentPages];
}
