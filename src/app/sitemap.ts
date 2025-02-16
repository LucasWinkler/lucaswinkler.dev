import { config } from "@/config";
import { PROJECTS } from "@/constants/projects";
import type { MetadataRoute } from "next";

// TODO: Uncomment changeFrequency and priority when the site is live
export default function sitemap(): MetadataRoute.Sitemap {
  // const projects = PROJECTS.map(project => ({
  //   url: `${config.baseUrl}/projects/${project.slug}`,
  //   lastModified: new Date(),
  //   // changeFrequency: 'yearly' as const,
  //   // priority: 0.8,
  // }));

  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // {
    // url: `${config.baseUrl}/projects`,
    // lastModified: new Date(),
    // changeFrequency: 'monthly',
    // priority: 0.9,
    // },
    // {
    //   url: `${config.baseUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.6,
    // },
    // ...projects,
  ];
}
