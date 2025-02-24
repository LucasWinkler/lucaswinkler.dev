import { PROJECTS } from "./projects";
import { technologies } from "./technologies";
import type { HeroProps } from "@/components/sections/hero";
import type { ProjectsProps } from "@/components/sections/projects";
import type { AboutProps } from "@/components/sections/about";
import type { SkillsProps } from "@/components/sections/skills";
import type { CTAProps } from "@/components/sections/cta";

export const HERO_CONTENT: HeroProps = {
  title: (
    <>
      Hi, I&apos;m Lucas —
      <br /> a full-stack developer.
    </>
  ),
  description:
    "I build user-focused, fast and intuitive web applications. Currently based in Ontario, Canada.",
  isAvailable: true,
};

export const PROJECTS_CONTENT: ProjectsProps = {
  eyebrow: "Featured work",
  heading: "What I've built",
  description:
    "Here are some of the projects I've worked on. Each one taught me something new and helped me grow as a developer.",
  projects: PROJECTS.slice(0, 3),
};

export const ABOUT_CONTENT: AboutProps = {
  eyebrow: "About me",
  heading: "The person behind the code",
  description:
    "I'm Lucas, a full-stack developer from Ontario who loves building things for the web. What started with editing gaming videos as a hobby grew into a passion for web development. When I'm not coding, you'll find me playing competitive games or building custom mechanical keyboards.",
};

export const SKILLS_CONTENT: SkillsProps = {
  eyebrow: "Featured tech",
  heading: "Tools and technologies",
  description:
    "I've worked with a variety of technologies over the years. Here's a collection that I use to build modern web apps.",
  technologies: technologies,
};

export const CTA_CONTENT: CTAProps = {
  eyebrow: "Get in touch",
  heading: "Let's build something together",
  description:
    "I'm actively seeking opportunities to contribute to cool projects. Whether you have a position available or would like to connect, I'd love to hear from you.",
};
