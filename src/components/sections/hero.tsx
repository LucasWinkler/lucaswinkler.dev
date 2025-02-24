import { Container } from "@/components/layout/container";
import { BackgroundEffect } from "@/components/features/hero/background-effect";
import { CTAs } from "@/components/features/hero/ctas";
import { AvailabilityBadge } from "@/components/features/hero/availability-badge";

export interface HeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  isAvailable: boolean;
}

export const Hero = ({ title, description, isAvailable }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative -mt-[var(--header-height)] pt-[var(--header-height)]"
    >
      <BackgroundEffect />
      <Container className="grid items-center py-12 sm:py-16 md:py-20">
        {isAvailable && <AvailabilityBadge className="mb-4 sm:mb-6" />}
        <h1 className="font-heading 2xs:text-[3rem] mb-6 bg-gradient-to-br from-white via-slate-200 to-indigo-200 bg-clip-text text-[2.5rem] leading-[1.05] font-bold text-transparent sm:mb-8 sm:text-[4rem] md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="2xs:text-lg text-foreground-dark-tertiary mb-8 max-w-[48ch] text-base sm:mb-10 md:text-xl xl:text-xl">
          {description}
        </p>
        <CTAs />
      </Container>
    </section>
  );
};
