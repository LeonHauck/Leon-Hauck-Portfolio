import React, { useMemo } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { getCertificates } from '../data';
import { Certificate } from '../types';

// Data lives in data/certificates.ts

const Certifications: React.FC = () => {
    const { t, language } = useLanguage();
    const certificates: Certificate[] = useMemo(() => getCertificates(language), [language]);

    // The year sections come from the data: most recent first; inside a year, the order of the file
    const years = Array.from(new Set(certificates.map(cert => cert.year))).sort((a, b) => b - a);

    return (
        <div className="max-w-lg md:max-w-5xl mx-auto px-6 pt-8 md:pt-12">
            <p className="mono-label mb-2">{String(certificates.length).padStart(2, '0')} · {years[years.length - 1]} — {years[0]}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t('certificates.title')}</h1>
            <p className="text-text-secondary mb-10">
                {t('certificates.subtitle')}
            </p>

            <div className="flex flex-col gap-10">
                {years.map(year => (
                    <section key={year}>
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="font-mono text-xl font-bold text-matrix text-glow">{year}</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {certificates.filter(cert => cert.year === year).map(cert => (
                                <div
                                    key={cert.id}
                                    className="panel panel-hover group flex flex-col justify-between gap-4 p-5"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold leading-snug text-white group-hover:text-primary-light transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm font-medium text-text-secondary mt-1">
                                            {cert.institution}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary h-10 px-4 text-xs"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {cert.type === 'PDF' ? 'picture_as_pdf' : 'image'}
                                            </span>
                                            {t('certificates.viewCertificate')}
                                        </a>

                                        {cert.projectLink && (
                                            <a
                                                href={cert.projectLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-ghost h-10 px-4 text-xs"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">
                                                    description
                                                </span>
                                                {t('certificates.viewProject')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};


export default Certifications;
