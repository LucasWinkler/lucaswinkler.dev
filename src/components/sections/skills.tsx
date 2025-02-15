import { Container } from "@/components/layout/container";
import { Technologies } from "@/components/features/skills/technologies";
import { technologies } from "@/constants/technologies";

export const Skills = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        <h2 className="font-heading text-foreground-dark mb-8 text-2xl font-bold">
          Skills
        </h2>
        <Technologies technologies={technologies} />
      </Container>
    </section>
  );
};
