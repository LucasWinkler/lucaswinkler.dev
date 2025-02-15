import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero
        title={
          <>
            Hi, I&apos;m Lucas —
            <br /> a full-stack developer.
          </>
        }
        description="I build web apps that are user-focused, fast and intuitive. Currently based in Ontario, Canada."
        isAvailable={true}
      />
      <Projects />
      <Skills />
      <CTA />
    </>
  );
}
