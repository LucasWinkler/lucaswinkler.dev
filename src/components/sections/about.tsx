import { Container } from "@/components/layout/container";
import Image from "next/image";

import portrait from "@/../public/images/portrait.webp";

export interface AboutProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export const About = ({ eyebrow, heading, description }: AboutProps) => {
  return (
    <section
      id="about"
      className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
    >
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-full sm:w-56 lg:w-72">
            <Image
              src={portrait}
              alt="Lucas Winkler"
              fill
              className="object-cover"
              sizes="(min-width: 64rem) 288px, (min-width: 40rem) 224px, 192px"
              unoptimized
              draggable={false}
            />
          </div>
          <div className="text-center lg:text-start">
            <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
              {eyebrow}
            </span>
            <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-6 text-[1.75rem] leading-[1.1] font-bold sm:mb-8 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
              {heading}
            </h2>
            <p className="text-foreground-dark-secondary space-y-4 text-base sm:text-lg md:text-xl">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
