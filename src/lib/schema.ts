import { config } from "@/config";
import { Project } from "@/types/project";

export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.name,
    email: config.contactEmail,
    url: config.baseUrl,
    sameAs: [
      "https://github.com/lucaswinkler",
      "https://www.linkedin.com/in/lucas-winkler/",
      "https://x.com/lucasjwinkler",
    ],
    jobTitle: "Full-Stack Developer",
    image: `${config.baseUrl}/images/portrait.webp`,
    description: config.appDescription,
  };
};

export const generateProjectSchema = (project: Project) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: config.name,
    },
    programmingLanguage: project.tags,
    codeRepository: project.links.source,
    url: project.links.demo,
  };
};
