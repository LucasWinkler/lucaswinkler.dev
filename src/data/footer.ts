import { navItems } from '@/data/nav';
import { email } from '@/data/site';

export const footerLinks = [
  ...navItems,
  { label: 'Email', href: `mailto:${email}` },
  { label: 'GitHub', href: 'https://github.com/lucaswinkler' },
];
