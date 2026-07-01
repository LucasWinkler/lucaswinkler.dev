import { selectedWork } from '@/data/selected-work';

export const siteDescription = 'Lucas Winkler — software developer focused on polished, accessible web interfaces.';

const teeOnWork = selectedWork.find(item => item.id === 'tee-on');

if (!teeOnWork) {
  throw new Error('Tee On work item is required for the hero employer link.');
}

export const heroEmployer = {
  name: teeOnWork.brand,
  url: teeOnWork.url,
  logo: '/images/tee-on-white.svg',
} as const;

export const hero = {
  headlineLines: ['I build clean interfaces', 'that feel right.'],
  headlineAccentWords: ['feel'],
  imageAlt: 'Blue abstract dithered texture',
  intro: {
    before: "I'm a software developer at ",
    after:
      ', building golf software and marketing sites for GolfNorth. I care deeply about craft and how interfaces feel.',
  },
} as const;
