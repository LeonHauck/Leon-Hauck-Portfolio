
import React from 'react';
import { Experience } from '../types';
import { useLanguage } from '../components/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const experiences: Experience[] = t('about.experiences');

  return (
    <div className="flex flex-col gap-8 px-6 pt-6 max-w-lg mx-auto">
      {/* Profile Header */}
      <section className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="size-32 rounded-lg overflow-hidden border-2 border-primary/20 bg-white dark:bg-surface-dark shadow-xl profile-image-container">
            <img
              src="/assets/leon-profile.jpg"
              alt="Leon Hauck Profile"
              className="w-full h-full object-cover brightness-110 contrast-110 no-invert"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-background-dark p-1 rounded-full">
            <div className="size-4 bg-emerald-500 rounded-full border-2 border-white dark:border-background-dark"></div>
          </div>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Leon Hauck</h2>
          <p className="text-primary font-medium tracking-wide uppercase text-sm">{t('about.role')}</p>
          <p className="text-slate-500 dark:text-text-secondary text-xs flex items-center justify-center gap-1 mt-2">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            Juiz de Fora, Brasil
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white dark:bg-surface-dark p-6 rounded shadow-sm border border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-xl">fingerprint</span>
          <h3 className="text-lg font-bold tracking-tight">{t('about.profile')}</h3>
        </div>
        <p className="text-slate-600 dark:text-text-secondary leading-relaxed text-sm font-body whitespace-pre-line">
          {t('about.bio')}
        </p>
      </section>

      {/* Experience Timeline */}
      <section className="relative">
        <h3 className="text-lg font-bold mb-6 px-1">{t('about.journey')}</h3>
        <div className="relative space-y-8 pl-2">
          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-black/10 dark:bg-white/10 rounded-full"></div>
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 group">
              <div className={`absolute left-0 top-1.5 rounded-full border-[4px] border-background-light dark:border-background-dark z-10 transition-all ${exp.isCurrent ? 'size-[24px] bg-primary' : 'size-[16px] left-[4px] bg-slate-300 dark:bg-zinc-700'
                }`} />
              <div className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className={`text-base font-bold ${exp.isCurrent ? 'text-primary dark:text-white' : 'text-slate-500 dark:text-text-secondary'}`}>{exp.role}</h4>
                  <span className="text-[10px] font-mono font-medium text-primary mt-1">{exp.period}</span>
                </div>
                <p className="text-sm font-semibold opacity-80">{exp.company}</p>
                <p className="text-xs text-slate-500 dark:text-text-secondary mt-1 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download CV */}
      <div className="flex flex-col gap-4 mb-8">
        <a
          href="/assets/Leon Hauck - Perfil - Portugues.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Leon Hauck - Perfil - Portugues.pdf"
          className="w-full bg-primary text-white font-bold py-4 rounded shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          <span className="material-symbols-outlined group-hover:animate-bounce">download</span>
          {t('about.downloadCvPt')}
        </a>
        <a
          href="/assets/Leon Hauck - Profile - English.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Leon Hauck - Profile - English.pdf"
          className="w-full bg-slate-800 dark:bg-zinc-800 text-white font-bold py-4 rounded shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          <span className="material-symbols-outlined group-hover:animate-bounce">download</span>
          {t('about.downloadCvEn')}
        </a>
      </div>
    </div>

  );
};


export default About;
