export interface Project {
  title: string;
  slug: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  tags?: string[];
  links: {
    demo: string;
    source: string;
  };
}
