import type { MetadataRoute } from "next";

import { config } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
