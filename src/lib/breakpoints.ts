export const breakpointRem = {
  xs: '30rem',
  sm: '40rem',
  md: '48rem',
  work: '56.25rem',
  lg: '64rem',
} as const;

export type BreakpointKey = keyof typeof breakpointRem;

export function minWidth(breakpoint: BreakpointKey): string {
  return `(width >= ${breakpointRem[breakpoint]})`;
}
