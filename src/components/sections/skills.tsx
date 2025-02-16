import { Container } from "@/components/layout/container";
import { Technologies } from "@/components/features/skills/technologies";
import type { Technology } from "@/types/technology";

export interface SkillsProps {
  eyebrow: string;
  heading: string;
  description: string;
  technologies: Technology[];
}

export const Skills = ({
  eyebrow,
  heading,
  description,
  technologies,
}: SkillsProps) => {
  return (
    <section
      id="skills"
      className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
    >
      <Container>
        <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
          {eyebrow}
        </span>
        <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold sm:mb-6 sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="text-foreground-dark-secondary 2xs:text-lg mb-6 max-w-[60ch] text-base sm:mb-8 sm:text-lg md:mb-10 md:text-xl">
          {description}
        </p>
        <Technologies technologies={technologies} />
      </Container>
    </section>
  );
};
