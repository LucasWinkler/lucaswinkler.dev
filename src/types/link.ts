import type { ElementType } from 'react';

export interface Link {
  label: string;
  href: string;
  description?: string;
  sublinks?: {
    label: string;
    description?: string;
    links: Link[];
  };
}

export type LinkWithIcon = Link & {
  icon: ElementType;
};
