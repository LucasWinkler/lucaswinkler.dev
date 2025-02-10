import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { config } from '@/config';
import { PROJECTS } from '@/constants/projects';
import { createMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  return PROJECTS.map(project => ({
    slug: project.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const project = PROJECTS.find(project => project.slug === slug);
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
  const project = PROJECTS.find(project => project.slug === slug);

  if (!project) {
    notFound();
  }

  return <Container>Project: {slug}</Container>;
}
