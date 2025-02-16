import type { NavLink, SocialLink } from "@/types/link";
import { PROJECTS } from "./projects";
import { Github, Linkedin } from "lucide-react";

export const MAX_PROJECTS = 3;
export const MAX_SUBLINKS = 5;

export const NAV_LINKS: NavLink[] = [
  {
    label: "Projects",
    href: "/projects",
    sublinks: {
      label: "All Projects",
      description: "View all of my noteworthy projects.",
      links: PROJECTS.slice(0, MAX_PROJECTS).map((project) => ({
        label: project.title,
        href: `/projects/${project.slug}`,
        description: project.description,
      })),
    },
  },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Get in touch", href: "/#cta" },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/lucaswinkler",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-winkler/",
    icon: Linkedin,
  },
] as const;
