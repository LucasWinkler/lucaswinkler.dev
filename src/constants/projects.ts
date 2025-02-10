import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    title: 'PoiToGo',
    slug: 'poitogo',
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
    title: 'Online Learning Platform',
    slug: 'online-learning-platform',
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
    title: 'Audiophile Ecommerce',
    slug: 'audiophile-ecommerce',
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
