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
