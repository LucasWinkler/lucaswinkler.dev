export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string | null;
  employmentType?: 'full-time' | 'contract' | 'volunteer';
  industry?: string;
  website?: string;
  websiteLabel?: string;
  accentFrom: string;
  accentTo: string;
  highlights: string[];
};

export type EducationItem = {
  id: string;
  credential: string;
  institution: string;
  location: string;
};
