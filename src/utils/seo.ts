import { config } from '@/config';
import type { Metadata } from 'next';

type MetadataConfig = Metadata & {
  canonicalUrlRelative?: string;
  extraTags?: Record<string, string>;
};

export const createMetadata = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: MetadataConfig): Metadata => {
  return {
    title: title || config.appName,
    description: description || config.appDescription,
    applicationName: config.appName,
    keywords: keywords,
    metadataBase: new URL(config.baseUrl),
    openGraph: {
      type: 'website',
      url: openGraph?.url || config.baseUrl,
      locale: 'en_CA',
      title: openGraph?.title || config.appName,
      siteName: openGraph?.siteName || config.appName,
      description: openGraph?.description || config.appDescription,
      // images: [
      //   {
      //     url: `/og.png`,
      //     width: 1200,
      //     height: 630,
      //     alt: 'Homepage screenshot showing a hero section with a ...',
      //     type: 'image/png',
      //   },
      // ],
    },
    twitter: {
      creator: config.twitterHandle,
      card: 'summary_large_image',
    },
    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),
    ...extraTags,
  };
};
