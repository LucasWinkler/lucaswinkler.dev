import nineForeCoverImage from '@/assets/images/9fore-cover.png';
import eventcaddyCoverImage from '@/assets/images/eventcaddy-cover.png';
import golfNorthCoverImage from '@/assets/images/gn-cover.png';
import teeonCoverImage from '@/assets/images/teeon-cover.png';

import type { SelectedWorkItem } from '@/types/work';
import type { ImageMetadata } from 'astro';

type SelectedWorkSourceItem = Omit<SelectedWorkItem, 'image'> & {
  coverImage?: ImageMetadata;
};

export const selectedWork: SelectedWorkSourceItem[] = [
  {
    id: 'tee-on',
    brand: 'Tee On',
    domain: 'teeon.com',
    url: 'https://www.teeon.com',
    tech: ['React', 'TS', 'SCSS'],
    coverImage: teeonCoverImage,
    logo: '/images/tee-on.svg',
    logoScale: 0.75,
    brandColor: '#4168B1',
  },
  {
    id: 'golfnorth',
    brand: 'GolfNorth International',
    domain: 'golfnorthinternational.com',
    url: 'https://golfnorthinternational.com',
    tech: ['Astro', 'TS', 'SCSS'],
    coverImage: golfNorthCoverImage,
    logo: '/images/golfnorth-international.svg',
    brandColor: '#212221',
  },
  {
    id: '9fore',
    brand: '9Fore Distributing',
    domain: '9fore.ca',
    url: 'https://9fore.ca',
    tech: ['Astro', 'TS', 'SCSS'],
    coverImage: nineForeCoverImage,
    logo: '/images/9fore.svg',
    logoScale: 0.75,
    brandColor: '#0F2043',
  },
  {
    id: 'eventcaddy',
    brand: 'EventCaddy',
    domain: 'eventcaddy.com',
    url: 'https://www.eventcaddy.com',
    tech: ['Astro', 'TS', 'SCSS'],
    coverImage: eventcaddyCoverImage,
    logo: '/images/eventcaddy.svg',
    brandColor: '#1E241D',
  },
];
