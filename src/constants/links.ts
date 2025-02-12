import type { NavLink, SocialLink } from "@/types/link";
import { PROJECTS } from "./projects";
import { Github, Linkedin } from "lucide-react";
import { X } from "@/components/icons/x-icon";

export const MAX_PROJECTS = 3;
export const MAX_SUBLINKS = 5;

export const NAV_LINKS: NavLink[] = [
  // { label: 'Home', href: '/' },
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
  // { label: 'About', href: '/about' },
] as const;

export const NAV_CTA: NavLink = {
  label: "Get in touch",
  href: "/contact",
};

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
  // {
  //   label: 'X',
  //   href: 'https://x.com/lucasjwinkler',
  //   icon: X,
  // },
  // {
  //   label: 'Email',
  //   href: 'mailto:hello@lucaswinkler.dev',
  //   icon: Mail,
  // },
] as const;
