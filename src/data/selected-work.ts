import nineForeCoverImage from '@/assets/images/9fore-cover.png';
import eventcaddyCoverImage from '@/assets/images/eventcaddy-cover.png';
import golfNorthCoverImage from '@/assets/images/gn-cover.png';
import teeonCoverImage from '@/assets/images/teeon-cover.png';

import type { SelectedWorkItem } from '@/types/work';

export const selectedWork: SelectedWorkItem[] = [
  {
    id: 'tee-on',
    brand: 'Tee-On',
    domain: 'teeon.com',
    url: 'https://www.teeon.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tech: ['React', 'TS', 'SCSS'],
    image: teeonCoverImage.src,
    logo: '/images/tee-on.ico',
    brandColor: '#4168B1',
  },
  {
    id: 'golfnorth',
    brand: 'GolfNorth International',
    domain: 'golfnorthinternational.com',
    url: 'https://golfnorthinternational.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tech: ['Astro', 'React', 'TS', 'SCSS'],
    image: golfNorthCoverImage.src,
    logo: '/images/golfnorth.svg',
    brandColor: '#212221',
  },
  {
    id: '9fore',
    brand: '9Fore',
    domain: '9fore.ca',
    url: 'https://9fore.ca',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tech: ['Astro', 'React', 'TS', 'SCSS'],
    image: nineForeCoverImage.src,
    logo: '/images/9fore.svg',
    brandColor: '#0F2043',
  },
  {
    id: 'eventcaddy',
    brand: 'EventCaddy',
    domain: 'dev-landing.eventcaddy.com',
    url: 'https://dev-landing.eventcaddy.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tech: ['Astro', 'React', 'TS', 'SCSS'],
    image: eventcaddyCoverImage.src,
    logo: '/images/eventcaddy.svg',
    brandColor: '#1E241D',
  },
];
