import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 xl:py-40">
      <BackgroundEffect />
      <Container className="grid items-center md:grid-cols-[1fr,auto]">
        <h1 className="font-heading 2xs:text-4xl mb-3 text-2xl font-bold tracking-tight text-white sm:text-5xl md:mb-4 md:text-6xl lg:text-7xl xl:text-8xl">
          Hi, I&apos;m Lucas —
          <br /> a full-stack developer.
        </h1>
        <p className="2xs:text-lg text-foreground-dark-secondary mb-5 text-base leading-normal md:mb-6 md:text-xl xl:text-2xl">
          I build web apps that are user-focused, fast and intuitive.
          <br />
          Currently based in Ontario, Canada.
        </p>
        <div className="flex gap-4">
          <Button
            className="group/cta"
            variant="secondary"
            type="button"
            asChild
          >
            <Link href="/projects">
              See my work
              <ArrowTopRightIcon
                className="transition-transform duration-300 group-hover/cta:rotate-45"
                aria-hidden="true"
              />
            </Link>
          </Button>
          <Button className="group/cta" variant="ghost" type="button" asChild>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in new tab"
            >
              See my resume
              <ArrowTopRightIcon
                className="transition-transform duration-300 group-hover/cta:rotate-45"
                aria-hidden="true"
              />
            </Link>
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
