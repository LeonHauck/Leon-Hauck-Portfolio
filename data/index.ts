import { translations, Language } from '../translations';
import { Certificate, Localized, Project } from '../types';
import { projects } from './projects';
import { certificates } from './certificates';

export const localize = (value: Localized, language: Language): string =>
    typeof value === 'string' ? value : value[language];

// 'YYYY-MM-DD' -> dd/mm/yyyy (pt) or mm/dd/yyyy (en). Split by hand: new Date() would shift the day by timezone
const formatDate = (isoDate: string, language: Language): string => {
    const [year, month, day] = isoDate.split('-');
    return language === 'pt' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`;
};

// Newest first. The sort is stable, so entries with the same date keep the order of the file
export const getProjects = (language: Language): Project[] =>
    projects
        .map((entry, index) => ({ entry, index }))
        .sort((a, b) => (b.entry.updatedAt ?? '').localeCompare(a.entry.updatedAt ?? ''))
        .map(({ entry, index }) => ({
            ...entry,
            id: String(index),
            title: localize(entry.title, language),
            // A category without a translation still works: it shows up under its own name
            category: translations[language].projects.categories[entry.category] ?? entry.category,
            description: localize(entry.description, language),
            impact: entry.impact && localize(entry.impact, language),
            updatedAt: entry.updatedAt && formatDate(entry.updatedAt, language),
        }));

export const getCertificates = (language: Language): Certificate[] =>
    certificates.map((entry, index) => ({
        ...entry,
        id: String(index),
        title: localize(entry.title, language),
        institution: localize(entry.institution, language),
        type: entry.link.toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMAGE',
    }));

export { projects, certificates };
