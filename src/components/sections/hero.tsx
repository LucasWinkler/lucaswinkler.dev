import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";

export const Hero = () => {
  return (
    <section className="relative -mt-[var(--header-height)] overflow-hidden pt-[var(--header-height)]">
      <BackgroundEffect />
      <Container className="grid items-center py-16 sm:py-20 md:grid-cols-[1fr,auto]">
        <Badge variant="status" className="mb-6">
          <span className="relative mr-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Available for opportunities
        </Badge>

        <h1 className="font-heading 2xs:text-[3rem] mb-8 text-[2.5rem] leading-[1.05] font-bold text-white sm:text-[4rem] md:text-7xl lg:text-8xl">
          Hi, I&apos;m Lucas —
          <br /> a full-stack developer.
        </h1>
        <p className="2xs:text-lg text-foreground-dark-tertiary mb-8 max-w-[48ch] text-base md:text-xl xl:text-xl">
          I build web apps that are user-focused, fast and intuitive. Currently
          based in Ontario, Canada.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            className="group/cta xs:w-auto w-full"
            variant="default"
            size="lg"
            type="button"
            asChild
          >
            <Link href="/projects">See my work</Link>
          </Button>
          <Button
            className="group/cta xs:w-auto w-full"
            variant="ghost"
            size="sm"
            type="button"
            asChild
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in new tab"
            >
              See my resume
              <ArrowRightIcon
                className="ease-snappy transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};

const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Container className="relative h-full">
        <div className="absolute inset-0">
          <div className="absolute top-[100px] -left-[100px] h-[400px] w-[400px] transform-gpu rounded-full bg-gradient-to-tr from-purple-500/[0.12] via-purple-500/[0.08] to-transparent blur-[120px]" />
          <div className="absolute top-[50px] right-[50px] h-[300px] w-[300px] transform-gpu rounded-full bg-gradient-to-bl from-indigo-500/[0.15] via-indigo-500/[0.1] to-transparent blur-[130px] sm:h-[500px] sm:w-[500px]" />
          <div className="absolute top-[150px] right-[100px] h-[250px] w-[250px] transform-gpu rounded-full bg-gradient-to-tr from-blue-500/[0.15] via-blue-500/[0.1] to-transparent blur-[130px] sm:h-[400px] sm:w-[400px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.2) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </Container>
    </div>
  );
};
