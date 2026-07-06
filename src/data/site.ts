import { siteName } from '@/data/nav';

export const siteUrl = 'https://lucaswinkler.dev';

export function buildCanonicalUrl(pathname: string): string {
  if (pathname === '/' || pathname === '') {
    return siteUrl;
  }

  return `${siteUrl}${pathname.replace(/\/$/, '')}`;
}

export { siteName };

export const email = 'hello@lucaswinkler.dev';

export const githubUrl = 'https://github.com/lucaswinkler';

export const linkedInUrl = 'https://www.linkedin.com/in/lucas-winkler';

export const twitterHandle = 'LucasJWinkler';

export const twitterUrl = 'https://x.com/LucasJWinkler';

export const sameAsUrls = [githubUrl, linkedInUrl, twitterUrl] as const;

export const ogImageAlt = 'Lucas Winkler — software developer portfolio';

export const faviconVersion = '20260705';

export const locale = 'en_US';

export const localeLanguage = 'en-US';

export const themeColor = '#fcfcfb';

export const knowsAbout = [
  'React',
  'Astro',
  'TypeScript',
  'Tailwind CSS',
  'Motion',
  'SCSS',
  'Web accessibility',
] as const;

export const jobTitle = 'Software Developer';
