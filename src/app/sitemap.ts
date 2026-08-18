import type { MetadataRoute } from "next";
import { careerJobs } from "@/data/careers-page";
import { newsArticles } from "@/data/news";
import { getAllProductSlugs } from "@/data/product-detail";
import { getAllCaseStudySlugs } from "@/data/project-case-study";
import { getServiceSlugs } from "@/services/serviceService";
import { siteConfig } from "@/data/site";

const base = siteConfig.url.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/services",
    "/projects",
    "/blog",
    "/careers",
    "/contact",
    "/partners",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  const products = getAllProductSlugs().map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let serviceSlugs: string[] = [];
  try {
    serviceSlugs = await getServiceSlugs();
  } catch {
    serviceSlugs = [];
  }

  const services = (Array.isArray(serviceSlugs) ? serviceSlugs : []).map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projects = getAllCaseStudySlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogs = newsArticles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const careers = careerJobs.map((j) => ({
    url: `${base}/careers/${j.slug}`,
    lastModified: new Date(j.posted),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...products, ...services, ...projects, ...blogs, ...careers];
}
