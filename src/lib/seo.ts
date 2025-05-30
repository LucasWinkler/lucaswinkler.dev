import type { Metadata } from "next";

import { config } from "@/config";

type MetadataConfig = Metadata & {
  canonicalUrlRelative?: string;
  extraTags?: Record<string, string>;
  thumbnail?: string;
};

export const createMetadata = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
  thumbnail,
}: MetadataConfig): Metadata => {
  return {
    title: title || config.appName,
    description: description || config.appDescription,
    applicationName: config.appName,
    keywords: keywords,
    metadataBase: new URL(config.baseUrl),
    openGraph: {
      type: "website",
      url: openGraph?.url || canonicalUrlRelative || config.baseUrl,
      locale: "en_CA",
      title: openGraph?.title || title || config.appName,
      siteName: openGraph?.siteName || config.appShortName,
      description:
        openGraph?.description || description || config.appDescription,
      images: [
        {
          url: `/og.png`,
          width: 1200,
          height: 630,
          alt: "Text saying Lucas Winkler, Full-Stack Developer",
          type: "image/png",
        },
      ],
    },
    twitter: {
      creator: config.twitterHandle,
      card: "summary_large_image",
    },
    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),
    ...extraTags,
    authors: [{ name: config.name, url: config.baseUrl }],
    creator: config.name,
    publisher: config.name,
    other: {
      thumbnail:
        thumbnail || "https://www.lucaswinkler.dev/images/portrait.webp",
      "yandex-verification": "053329650c32d210",
    },
  };
};
