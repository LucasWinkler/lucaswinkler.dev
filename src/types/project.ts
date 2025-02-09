export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo: string;
    github: string;
  };
}
