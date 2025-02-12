import type { ElementType } from 'react';

export interface LinkBase {
  label: string;
  href: string;
}

export type NavLink = LinkBase & {
  description?: string;
  sublinks?: {
    label: string;
    description?: string;
    links: NavLink[];
  };
};

export type SocialLink = LinkBase & {
  icon: ElementType;
};
