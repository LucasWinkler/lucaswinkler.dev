import { experience } from '@/data/experience';
import { selectedWork } from '@/data/selected-work';
import { email, jobTitle, knowsAbout, localeLanguage, sameAsUrls, siteName, siteUrl } from '@/data/site';

type SchemaInput = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl: string;
};

function formatExperienceLabel(role: string, company: string, start: string, end: string | null): string {
  const range = end ? `${start} – ${end}` : `${start} – Present`;
  return `${role} at ${company} (${range})`;
}

export function buildProfileSchema({ title, description, canonicalUrl, ogImageUrl }: SchemaInput) {
  const websiteId = `${siteUrl}/#website`;
  const personId = `${siteUrl}/#person`;
  const webpageId = `${canonicalUrl}#webpage`;
  const currentEmployer = experience.find(item => item.end === null);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteName,
        url: siteUrl,
        inLanguage: localeLanguage,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: siteName,
        url: siteUrl,
        jobTitle,
        description,
        email,
        image: ogImageUrl,
        sameAs: [...sameAsUrls],
        knowsAbout: [...knowsAbout],
        ...(currentEmployer
          ? {
              worksFor: {
                '@type': 'Organization',
                name: currentEmployer.company,
              },
            }
          : {}),
      },
      {
        '@type': ['ProfilePage', 'WebPage'],
        '@id': webpageId,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'ItemList',
        name: 'Work Experience',
        itemListElement: experience.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: formatExperienceLabel(item.role, item.company, item.start, item.end),
          item: {
            '@type': 'Organization',
            name: item.company,
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Selected Work',
        itemListElement: selectedWork.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'WebSite',
            name: item.brand,
            url: item.url,
          },
        })),
      },
    ],
  };
}
