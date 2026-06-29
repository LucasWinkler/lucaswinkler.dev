import type { ExperienceItem } from '@/types/experience';

export function toIsoDate(month: string): string {
  return `${month}-01`;
}

export function formatDateRangeParts(start: string, end: string | null): { start: string; end: string } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  });

  const startLabel = formatter.format(new Date(`${start}-01T12:00:00`));
  const endLabel = end ? formatter.format(new Date(`${end}-01T12:00:00`)) : 'Present';

  return { start: startLabel, end: endLabel };
}

export function formatDateRange(start: string, end: string | null): string {
  const { start: startLabel, end: endLabel } = formatDateRangeParts(start, end);
  return `${startLabel} – ${endLabel}`;
}

export function sortReverseChronological(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => b.start.localeCompare(a.start));
}
