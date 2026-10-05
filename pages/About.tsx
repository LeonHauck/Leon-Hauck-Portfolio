
import React from 'react';
import { Experience } from '../types';
import { useLanguage } from '../components/LanguageContext';
import PhotoFrame from '../components/PhotoFrame';

// Turns **text** into bold: this is how the numbers in the journey are highlighted
const renderBold = (text: string) =>
  text.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index} className="font-semibold text-white">{part}</strong> : part
  );

const About: React.FC = () => {
  const { t } = useLanguage();
  const experiences: Experience[] = t('about.experiences');

  return (
    <div className="grid gap-10 px-6 pt-8 md:pt-12 max-w-lg lg:max-w-5xl mx-auto lg:grid-cols-[280px_1fr] lg:gap-14 lg:items-start">
      {/* Profile Header */}
      <aside className="flex flex-col items-center gap-6 lg:sticky lg:top-28">
        <PhotoFrame
          src="/assets/leon-avatar.webp"
          alt="Leon Hauck"
          priority
          className="size-36 lg:size-48"
        />
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Leon Hauck</h1>
          <p className="mono-label text-balance">{t('about.role')}</p>
          <p className="text-text-secondary text-xs flex items-center justify-center gap-1 pt-2">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            Juiz de Fora, Brasil
          </p>
        </div>

        {/* Download CV */}
        <div className="flex flex-col gap-3 w-full">
          <a
            href="/assets/Leon Hauck - Perfil - Portugues.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Leon Hauck - Perfil - Portugues.pdf"
            className="btn-primary w-full py-3.5 text-xs group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:animate-bounce">download</span>
            {t('about.downloadCvPt')}
          </a>
          <a
            href="/assets/Leon Hauck - Profile - English.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Leon Hauck - Profile - English.pdf"
            className="btn-ghost w-full py-3.5 text-xs group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:animate-bounce">download</span>
            {t('about.downloadCvEn')}
          </a>
        </div>
      </aside>

      <div className="flex flex-col gap-10 min-w-0">
        {/* Bio */}
        <section className="panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary-light text-xl">fingerprint</span>
            <h2 className="text-lg font-bold tracking-tight">{t('about.profile')}</h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm font-body whitespace-pre-line">
            {t('about.bio')}
          </p>
        </section>

        {/* Experience Timeline */}
        <section className="relative">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-6 px-1">
            <span className="material-symbols-outlined text-primary-light text-xl">timeline</span>
            {t('about.journey')}
          </h2>
          <div className="relative space-y-8 pl-2">
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-matrix/70 via-primary/30 to-border-dark rounded-full"></div>
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 group">
                <div className={`absolute left-0 top-1.5 rounded-full border-[4px] border-background-dark z-10 transition-all ${exp.isCurrent ? 'size-[24px] bg-matrix shadow-glow' : 'size-[16px] left-[4px] bg-zinc-600 group-hover:bg-primary'
                  }`} />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <h3 className={`text-base font-bold sm:flex-1 sm:min-w-0 sm:pr-3 ${exp.isCurrent ? 'text-white' : 'text-slate-300'}`}>{exp.role}</h3>
                    <span className="text-[11px] font-mono font-medium text-primary-light mt-1 sm:shrink-0 sm:whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-sm font-semibold text-white/80">{exp.company}</p>
                  {exp.description && (
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.highlights && (
                    <ul className="mt-2 space-y-2">
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5 text-sm text-text-secondary leading-relaxed">
                          <span className="mt-[0.55em] size-1.5 shrink-0 rotate-45 bg-primary-light" />
                          <span>{renderBold(highlight)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

  );
};


export default About;
