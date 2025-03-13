import audiophile from "@/../public/images/audiophile.webp";
import poitogo from "@/../public/images/poitogo.webp";
import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    title: "PoiToGo",
    slug: "poitogo",
    description:
      "A web app that lets users discover and save points of interest. Features include custom list creation, nearby search, user profiles, and social sharing capabilities.",
    image: {
      src: poitogo,
      alt: "PoiToGo Homepage",
    },
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
    ],
    links: {
      demo: "https://poitogo.vercel.app/",
      source: "https://github.com/LucasWinkler/poitogo",
    },
  },
  {
    title: "Audiophile Ecommerce",
    slug: "audiophile-ecommerce",
    description:
      "An e-commerce solution for a fictional audio equipment store. It features a fully responsive design and a mock checkout process. The goal was to follow the original design with precision.",
    image: {
      src: audiophile,
      alt: "Audiophile Ecommerce Homepage",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      demo: "https://fem-audiophile-ecommerce.vercel.app/",
      source: "https://github.com/LucasWinkler/audiophile-ecommerce",
    },
  },
  {
    title: "Elevate Careers",
    slug: "elevate-careers",
    description:
      "A job board that scrapes job listings from Indeed and displays them in a clean and organized way. The goal was to practice webscraping and build a useful tool for job seekers.",
    alert: {
      type: "warning",
      message:
        "Demo is currently non-functional due to webscraping API costs. Please check out the source code instead!",
    },
    image: {
      src: undefined,
      alt: "Elevate Careers Homepage",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Webscraping"],
    links: {
      demo: "https://elevate-careers.vercel.app/",
      source: "https://github.com/LucasWinkler/elevate-careers",
    },
  },
  // {
  //   title: "Online Learning Platform",
  //   slug: "online-learning-platform",
  //   description:
  //     "A learning management system that allows the teacher to create and sell courses while students can enroll and attend the lessons with a dashboard and progress tracking.",
  //   image: {
  //     src: undefined,
  //     alt: "Online Learning Platform",
  //   },
  //   tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
  //   links: {
  //     demo: "https://lw-online-learning-platform.vercel.app/",
  //     source: "https://github.com/LucasWinkler/online-learning-platform",
  //   },
  // },
] as const;
