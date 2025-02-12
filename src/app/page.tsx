import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Lucas Winkler – Portfolio",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <CTA />
    </>
  );
}
