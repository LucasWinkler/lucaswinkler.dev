import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32">
      <Container>
        <h1 className="font-heading 2xs:text-4xl mb-3 text-2xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Hi, I'm Lucas —
          <br /> a full-stack developer.
        </h1>
        <p className="2xs:text-lg text-foreground-dark-secondary mb-4 text-base leading-normal sm:text-xl md:text-2xl">
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
              View my work
              <ArrowTopRightIcon
                className="transition-transform duration-300 group-hover/cta:rotate-45"
                aria-hidden="true"
              />
            </Link>
          </Button>
          <Button className="group/cta" variant="ghost" type="button" asChild>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View my resume
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
