import { createRef } from "react";

import { GithubIcon, GithubIconHandle } from "@/components/ui/icons/github";
import {
  LinkedinIcon,
  LinkedinIconHandle,
} from "@/components/ui/icons/linkedin";
import { TwitterIcon, TwitterIconHandle } from "@/components/ui/icons/twitter";
import type { NavLink } from "@/types/link";

export const MAX_PROJECTS = 3;
export const MAX_SUBLINKS = 5;

export const NAV_LINKS: NavLink[] = [
  {
    label: "Projects",
    href: "/#projects",
    // Remove until I create a projects page and project details page
    // sublinks: {
    //   label: "All Projects",
    //   description: "View all of my noteworthy projects.",
    //   links: PROJECTS.slice(0, MAX_PROJECTS).map((project) => ({
    //     label: project.title,
    //     href: `/projects/${project.slug}`,
    //     description: project.description,
    //   })),
    // },
  },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Get in touch", href: "/#cta" },
] as const;

// Dynamically create social links with appropriate refs for animations
export const createSocialLinks = () =>
  [
    {
      label: "GitHub",
      href: "https://github.com/lucaswinkler",
      icon: GithubIcon,
      iconRef: createRef<GithubIconHandle>(),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lucas-winkler/",
      icon: LinkedinIcon,
      iconRef: createRef<LinkedinIconHandle>(),
    },
    {
      label: "Twitter",
      href: "https://x.com/lucasjwinkler",
      icon: TwitterIcon,
      iconRef: createRef<TwitterIconHandle>(),
    },
  ] as const;
