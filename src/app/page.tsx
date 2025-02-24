import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { CTA } from "@/components/sections/cta";
import {
  HERO_CONTENT,
  PROJECTS_CONTENT,
  ABOUT_CONTENT,
  SKILLS_CONTENT,
  CTA_CONTENT,
} from "@/constants/home-content";

export default function Home() {
  return (
    <>
      <Hero {...HERO_CONTENT} />
      <Projects {...PROJECTS_CONTENT} />
      <Skills {...SKILLS_CONTENT} />
      <About {...ABOUT_CONTENT} />
      <CTA {...CTA_CONTENT} />
    </>
  );
}
