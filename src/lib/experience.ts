import type { ExperienceItem } from '@/types/experience';

export function formatDateRange(start: string, end: string | null): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  });

  const startDate = formatter.format(new Date(`${start}-01T12:00:00`));
  const endDate = end ? formatter.format(new Date(`${end}-01T12:00:00`)) : 'Present';

  return `${startDate} – ${endDate}`;
}

export function formatExperienceDateTime(start: string, end: string | null): string {
  if (!end) {
    return start;
  }

  return `${start}/${end}`;
}

export function sortReverseChronological(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => b.start.localeCompare(a.start));
}
