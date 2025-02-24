import { config } from "@/config";

export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.name,
    email: config.contactEmail,
    url: config.baseUrl,
    jobTitle: "Full-Stack Developer",
    description: config.appDescription,
    sameAs: [
      "https://github.com/lucaswinkler",
      "https://www.linkedin.com/in/lucas-winkler/",
      "https://x.com/lucasjwinkler",
    ],
    image: {
      "@type": "ImageObject",
      contentUrl: `${config.baseUrl}/images/portrait.webp`,
      creator: {
        "@type": "Person",
        name: config.name,
      },
      creditText: config.name,
    },
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Front-End Development",
      "Back-End Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
      "C#",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
  };
};
