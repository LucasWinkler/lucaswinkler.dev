export type ApproachItem = {
  id: string;
  label: string;
  line: string;
};

export const approach: ApproachItem[] = [
  {
    id: 'ui',
    label: 'UI',
    line: 'Layouts, type, spacing — the details that make something feel finished.',
  },
  {
    id: 'motion',
    label: 'Motion',
    line: 'Transitions that feel smooth and natural, not added for show.',
  },
  {
    id: 'access',
    label: 'Accessibility',
    line: 'Keyboard nav, focus states, reduced motion — part of the build, not an afterthought.',
  },
];
