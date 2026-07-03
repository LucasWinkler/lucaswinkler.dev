import { email, githubUrl } from '@/data/site';

export const contactLinks = [
  { label: 'Email', href: `mailto:${email}` },
  { label: 'GitHub', href: githubUrl },
] as const;
