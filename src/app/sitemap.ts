import { config } from "@/config";
import { PROJECTS } from "@/constants/projects";
import type { MetadataRoute } from "next";

const isProduction = process.env.NODE_ENV === "production";

// TODO: Uncomment changeFrequency and priority when the site is live
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = PROJECTS.map((project) => ({
    url: `${config.baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    ...(isProduction
      ? [
          {
            url: `${config.baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.9,
          },
          ...projects,
        ]
      : []),
  ];
}
