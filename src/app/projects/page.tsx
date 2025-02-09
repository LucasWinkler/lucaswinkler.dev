import Link from 'next/link';
import { createMetadata } from '@/utils/seo';
import { PROJECTS } from '@/constants/projects';

export const metadata = createMetadata({
  title: 'Projects',
  // description: 'TODO',
  canonicalUrlRelative: '/projects',
});

export default function Projects() {
  return (
    <div>
      <h1 className='text-2xl'>Projects:</h1>
      <ul>
        {PROJECTS.map(project => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
