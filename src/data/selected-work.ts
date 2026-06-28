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
    description: 'All-in-one golf course management software. Marketing site redesign on the existing React platform.',
    tech: ['React', 'TS', 'SCSS'],
    image: teeonCoverImage.src,
    imageWidth: teeonCoverImage.width,
    imageHeight: teeonCoverImage.height,
    logo: '/images/tee-on.ico',
    brandColor: '#4168B1',
  },
  {
    id: 'golfnorth',
    brand: 'GolfNorth International',
    domain: 'golfnorthinternational.com',
    url: 'https://golfnorthinternational.com',
    description:
      'Corporate site for a national golf operator — course management, software, leasing, hospitality, and retail.',
    tech: ['Astro', 'React', 'TS', 'SCSS'],
    image: golfNorthCoverImage.src,
    imageWidth: golfNorthCoverImage.width,
    imageHeight: golfNorthCoverImage.height,
    logo: '/images/golfnorth.svg',
    brandColor: '#212221',
  },
  {
    id: '9fore',
    brand: '9Fore',
    domain: '9fore.ca',
    url: 'https://9fore.ca',
    description:
      'Canadian distributor of turf equipment and golf carts for golf facilities across Ontario and select provinces.',
    tech: ['Astro', 'React', 'TS', 'SCSS'],
    image: nineForeCoverImage.src,
    imageWidth: nineForeCoverImage.width,
    imageHeight: nineForeCoverImage.height,
    logo: '/images/9fore.svg',
    brandColor: '#0F2043',
  },
  {
    id: 'eventcaddy',
    brand: 'EventCaddy',
    domain: 'eventcaddy.com',
    url: 'https://www.eventcaddy.com',
    description:
      'Tournament management platform for golf events — registration, sponsorships, payments, and live scoring.',
    tech: ['Astro', 'React', 'TS', 'SCSS'],
    image: eventcaddyCoverImage.src,
    imageWidth: eventcaddyCoverImage.width,
    imageHeight: eventcaddyCoverImage.height,
    logo: '/images/eventcaddy.svg',
    brandColor: '#1E241D',
  },
];
