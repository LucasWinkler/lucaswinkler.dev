import { Technology } from "@/types/technology";

export const technologies: Technology[] = [
  {
    name: "React",
    description: "JavaScript library",
    icon: "/icons/react.svg",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    description: "React framework",
    icon: "/icons/nextjs.svg",
    color: "#ffffff",
  },
  {
    name: "JavaScript",
    description: "Programming language",
    icon: "/icons/javascript.svg",
    color: "#f7df1e",
  },
  {
    name: "TypeScript",
    description: "JavaScript with types",
    icon: "/icons/typescript.svg",
    color: "#3178c6",
  },
  {
    name: "Tailwind CSS",
    description: "CSS framework",
    icon: "/icons/tailwind.svg",
    color: "#38BDF8",
  },
  {
    name: "Node.js",
    description: "Runtime environment",
    icon: "/icons/nodejs.svg",
    color: "#8CC84B",
  },
  {
    name: "Git",
    description: "Version control system",
    icon: "/icons/git.svg",
    color: "#F05133",
  },
  {
    name: "PostgreSQL",
    description: "Relational database",
    icon: "/icons/postgresql.svg",
    color: "#336791",
  },
  {
    name: "SASS/SCSS",
    description: "CSS preprocessor",
    icon: "/icons/sass.svg",
    color: "#CD6799",
  },
  {
    name: "Prisma",
    description: "TypeScript ORM",
    icon: "/icons/prisma.svg",
    color: "#5a67d8",
  },
  {
    name: "Drizzle ORM",
    description: "TypeScript ORM",
    icon: "/icons/drizzle.svg",
    color: "#c5f74f",
  },
  {
    name: "Figma",
    description: "Design tool",
    icon: "/icons/figma.svg",
    color: "#F24E1E",
  },
] as const;
