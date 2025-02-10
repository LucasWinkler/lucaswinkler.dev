import Link from 'next/link';
import { createMetadata } from '@/lib/seo';
import { PROJECTS } from '@/constants/projects';
import { config } from '@/config';
import { Container } from '@/components/layout/container';

export const metadata = createMetadata({
  title: 'Projects',
  description: `${config.name}'s personal projects and experiments, featuring accessible and intuitive web applications that showcase modern full-stack development.`,
  canonicalUrlRelative: '/projects',
});

export default function Projects() {
  return (
    <Container>
      <h1 className='text-2xl'>Projects:</h1>
      <ul>
        {PROJECTS.map(project => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
