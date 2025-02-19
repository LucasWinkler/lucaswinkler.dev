import { StaticImageData } from "next/image";

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: {
    src?: string | StaticImageData;
    alt: string;
  };
  tags?: string[];
  links: {
    demo: string;
    source: string;
  };
}
