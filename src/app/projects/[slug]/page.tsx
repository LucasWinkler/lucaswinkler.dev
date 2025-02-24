import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { config } from "@/config";
import { PROJECTS } from "@/constants/projects";
import { createMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const project = PROJECTS.find((project) => project.slug === slug);
  if (!project) {
    notFound();
  }

  return createMetadata({
    title: project.title,
    description: `Discover ${project.title} by ${config.name} — ${project.description}`,
    canonicalUrlRelative: `/projects/${project.slug}`,
  });
};

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="pt-[calc(var(--header-height)/2+4rem)] pb-16 sm:pt-[calc(var(--header-height)/2+6rem)] sm:pb-24 md:pt-[calc(var(--header-height)/2+8rem)] md:pb-32 xl:pt-[calc(var(--header-height)/2+10rem)] xl:pb-40">
      Project: {slug}
    </Container>
  );
}
