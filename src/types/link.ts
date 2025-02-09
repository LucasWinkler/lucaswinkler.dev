import type { IconName } from "./icon";

export interface Link {
  label: string;
  href: string;
}

export type LinkWithIcon = Link & {
  icon: IconName;
};
