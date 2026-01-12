import React from 'react';
import { useLanguage } from '../components/LanguageContext';

interface Certificate {
    id: number;
    title: string;
    institution: string;
    date: string;
    link: string;
    projectLink?: string;
    type: 'PDF' | 'IMAGE';
}

// Data moved to translations.ts

const Certifications: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-bold mb-2 text-primary dark:text-white">{t('certificates.title')}</h1>
                <p className="text-slate-500 dark:text-text-secondary mb-12">
                    {t('certificates.subtitle')}
                </p>

                <div className="grid gap-4">
                    {t('certificates.items').map((cert: Certificate) => (
                        <div
                            key={cert.id}
                            className="group relative bg-white/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-surface-dark/80 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm font-medium text-slate-500 dark:text-text-secondary">
                                            {cert.institution}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <span className="text-sm text-slate-400 dark:text-slate-500">
                                            {cert.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {cert.type === 'PDF' ? 'picture_as_pdf' : 'image'}
                                        </span>
                                        {t('certificates.viewCertificate')}
                                    </a>

                                    {cert.projectLink && (
                                        <a
                                            href={cert.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all transform active:scale-95 shadow-lg shadow-black/20"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                description
                                            </span>
                                            {t('certificates.viewProject')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Certifications;
