import { PROJECTS } from '@/constants/projects';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  return PROJECTS.map(project => ({
    slug: project.slug,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;

  return {
    title: slug,
  };
};

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(project => project.slug === slug);

  if (!project) {
    notFound();
  }

  return <div>Project: {slug}</div>;
}
