export type ApproachItem = {
  id: string;
  label: string;
  line: string;
};

export const approach: ApproachItem[] = [
  {
    id: 'ui',
    label: 'UI',
    line: 'Built to match the design, not just get close. Fewer rounds of visual cleanup after handoff.',
  },
  {
    id: 'motion',
    label: 'Motion',
    line: "Transitions that ship in code, not just in Figma. Smooth when they help, restrained when they don't.",
  },
  {
    id: 'access',
    label: 'Accessibility',
    line: 'Keyboard support, focus states, and semantic markup built in from the start. Not a checklist before launch.',
  },
];
