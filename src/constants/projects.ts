import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    title: 'Project One',
    slug: 'project-one',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    image:
      'https://placehold.co/900x600/f4f4f5/71717a?text=Project+One&font=raleway',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    title: 'Project Two',
    slug: 'project-two',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    image:
      'https://placehold.co/900x600/f4f4f5/71717a?text=Project+Two&font=raleway',
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    links: {
      demo: '#',
      github: '#',
    },
  },

  {
    title: 'Project Three',
    slug: 'project-three',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    image:
      'https://placehold.co/900x600/f4f4f5/71717a?text=Project+Three&font=raleway',
    tags: ['React Native', 'Redux', 'Node.js'],
    links: {
      demo: '#',
      github: '#',
    },
  },
] as const;
