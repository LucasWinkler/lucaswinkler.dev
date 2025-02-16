import { Container } from "@/components/layout/container";
import Image from "next/image";

export const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-full sm:w-56 lg:w-72">
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-black/20" />
              <Image
                src="/images/portrait.webp"
                alt="Lucas Winkler"
                fill
                className="object-cover object-[80%_top]"
                unoptimized
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 192px"
              />
            </div>
            <div className="text-center lg:text-left">
              <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
                About me
              </span>
              <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-6 text-[1.75rem] leading-[1.1] font-bold sm:mb-8 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
                The person behind
                <br />
                the code
              </h2>
              <p className="text-foreground-dark-secondary space-y-4 text-base sm:text-lg md:text-xl">
                I&apos;m Lucas, a full-stack developer from Ontario who loves
                building things for the web. What started with editing gaming
                videos as a hobby grew into a passion for web development. When
                I&apos;m not coding, you&apos;ll find me playing competitive
                games or building custom mechanical keyboards.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
