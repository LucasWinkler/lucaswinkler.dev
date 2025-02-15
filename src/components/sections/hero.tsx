import { Container } from "@/components/layout/container";
import { BackgroundEffect } from "@/components/features/hero/background-effect";
import { CTAs } from "@/components/features/hero/ctas";
import { AvailabilityBadge } from "@/components/features/hero/availability-badge";

interface HeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  isAvailable: boolean;
}

export const Hero = ({ title, description, isAvailable }: HeroProps) => {
  return (
    <section className="relative -mt-[var(--header-height)] overflow-hidden pt-[var(--header-height)]">
      <BackgroundEffect />
      <Container className="grid items-center py-16 sm:py-20 md:grid-cols-[1fr,auto]">
        {isAvailable && <AvailabilityBadge />}
        <h1 className="font-heading 2xs:text-[3rem] mb-8 bg-gradient-to-br from-white via-slate-200 to-indigo-200 bg-clip-text text-[2.5rem] leading-[1.05] font-bold text-transparent sm:text-[4rem] md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="2xs:text-lg text-foreground-dark-tertiary mb-8 max-w-[48ch] text-base md:text-xl xl:text-xl">
          {description}
        </p>
        <CTAs />
      </Container>
    </section>
  );
};
