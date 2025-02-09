import type { Link, LinkWithIcon } from '@/types/link';

export const NAV_LINKS: Link[] = [
  // { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  // { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS: LinkWithIcon[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/lucaswinkler',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucas-winkler/',
    icon: 'linkedin',
  },
  {
    label: 'X',
    href: 'https://x.com/lucasjwinkler',
    icon: 'x',
  },
] as const;
