import type { ComponentType, SVGProps } from "react";

export type Icon = ComponentType<IconProps>;
export type IconName = "github" | "linkedin" | "x";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  name: IconName;
  size?: number;
  colour?: string;
  className?: string;
};
