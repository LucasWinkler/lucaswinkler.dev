import { config } from "@/config";

export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.name,
    description: config.appDescription,
    jobTitle: "Full-Stack Developer",
    nationality: "Canadian",
    gender: "Male",
    email: config.contactEmail,
    url: config.baseUrl,
    sameAs: [
      "https://github.com/lucaswinkler",
      "https://www.linkedin.com/in/lucas-winkler/",
      "https://x.com/lucasjwinkler",
      "https://dev.to/lucaswinkler",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    image: {
      "@type": "ImageObject",
      contentUrl: `${config.baseUrl}/images/portrait.webp`,
      creator: {
        "@type": "Person",
        name: config.name,
      },
      creditText: config.name,
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "McMaster University",
        sameAs: "https://en.wikipedia.org/wiki/McMaster_University",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Conestoga College",
        sameAs: "https://en.wikipedia.org/wiki/Conestoga_College",
      },
    ],
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Front-End Development",
      "Back-End Development",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "C#",
      "PostgreSQL",
    ],
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.appName,
    url: config.baseUrl,
    description: config.appDescription,
    author: {
      "@type": "Person",
      name: config.name,
    },
    inLanguage: "en-CA",
    copyrightYear: config.copyrightYear,
    creator: {
      "@type": "Person",
      name: config.name,
    },
  };
};
