
import type { Language, translations } from './translations';

// A text written once for both languages, or once per language
export type Localized = string | Record<Language, string>;

export type ProjectCategory = Exclude<keyof typeof translations.pt.projects.categories, 'all'>;

// What is written in data/projects.ts
export interface ProjectEntry {
  title: Localized;
  category: ProjectCategory;
  description: Localized;
  tech: string[];
  imageUrl: string;
  version?: string;
  updatedAt?: string; // 'YYYY-MM-DD'
  isFeatured?: boolean;
  impact?: Localized; // a measurable result, shown highlighted on the card
  liveUrl?: string; // where the project can be used right now
  githubUrl?: string;
  linkedinUrl?: string;
  gallery?: string[];
}

// What is written in data/certificates.ts
export interface CertificateEntry {
  title: Localized;
  institution: Localized;
  year: number;
  link: string;
  projectLink?: string;
}

// What the pages receive: already in the current language
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string;
  version?: string;
  updatedAt?: string;
  isFeatured?: boolean;
  impact?: string;
  status?: 'active' | 'legacy' | 'research';
  liveUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  gallery?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  year: number;
  link: string;
  projectLink?: string;
  type: 'PDF' | 'IMAGE';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description?: string;
  highlights?: string[]; // bullet points; **double asterisks** mark the part shown in bold
  isCurrent?: boolean;
}
