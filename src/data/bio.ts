import { selectedWork } from '@/data/selected-work';

export const siteDescription =
  'Lucas Winkler is a software developer building interfaces with care for detail, motion, feel, and accessibility.';

const teeOnWork = selectedWork.find(item => item.id === 'tee-on');

if (!teeOnWork) {
  throw new Error('Tee On work item is required for the hero employer link.');
}

export const heroEmployer = {
  name: teeOnWork.brand,
  url: teeOnWork.url,
  logo: '/images/tee-on-white.svg',
} as const;

export const heroClient = {
  name: 'GolfNorth',
  url: 'https://golfnorth.ca',
  logo: '/images/golfnorth-white.svg',
} as const;

export const hero = {
  headlineLines: ['I build clean interfaces', 'that feel right.'],
  headlineAccentWords: ['feel'],
  imageAlt: 'Blue abstract dithered texture',
  intro: {
    before: "I'm a software developer at ",
    middle: ', building golf software and marketing sites across the ',
    after: ' portfolio. I care deeply about craft and how interfaces feel.',
  },
} as const;
