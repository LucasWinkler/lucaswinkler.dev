export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string | null;
};

export type EducationItem = {
  id: string;
  credential: string;
  institution: string;
  location: string;
};
