import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import PhotoFrame from '../components/PhotoFrame';
import { projects, certificates, localize } from '../data';
import { Localized } from '../types';

interface ImpactItem {
  before?: string; // how it was; shown as "before →" above the number
  value: string;
  label: string;
  context: string;
}

// Types the text out once, like a terminal; shows it whole when the user prefers reduced motion
const useTypewriter = (text: string, speed = 40) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLength(text.length);
      return;
    }
    setLength(0);
    const interval = setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return text.slice(0, length);
};

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const role: string = t('about.role');
  const typedRole = useTypewriter(role);
  const impact: ImpactItem[] = t('home.impact.items');

  // Same stack as the résumé. A name that changes with the language is written as { pt, en }
  const techStack: { name: Localized; icon: string }[] = [
    { name: 'Python', icon: 'terminal' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'data_object' },
    { name: 'SQL', icon: 'database' },
    { name: 'Java', icon: 'local_cafe' },
    { name: 'HTML/CSS', icon: 'html' },
    { name: 'React', icon: 'deployed_code' },
    { name: 'Angular', icon: 'change_history' },
    { name: 'Node.js', icon: 'dns' },
    { name: 'PHP', icon: 'php' },
    { name: { pt: 'APIs REST', en: 'REST APIs' }, icon: 'api' },
    { name: 'SQL Server', icon: 'storage' },
    { name: 'PostgreSQL', icon: 'dataset' },
    { name: 'MySQL', icon: 'table_rows' },
    { name: 'Firebase', icon: 'local_fire_department' },
    { name: 'Power BI', icon: 'bar_chart' },
    { name: 'AWS', icon: 'cloud' },
    { name: 'Azure', icon: 'cloud_sync' },
    { name: 'Git / GitHub', icon: 'account_tree' },
    { name: { pt: 'IA Generativa', en: 'Generative AI' }, icon: 'robot_2' },
    { name: 'RPA', icon: 'precision_manufacturing' },
    { name: 'VBA', icon: 'table_chart' },
  ];

  const skills = [
    { label: t('home.skills.fullStack'), icon: 'devices' },
    { label: t('home.skills.blackBelt'), icon: 'workspace_premium' },
    { label: t('home.skills.automation'), icon: 'precision_manufacturing' },
    { label: t('home.skills.negotiation'), icon: 'handshake' },
    { label: t('home.skills.data'), icon: 'analytics' },
    { label: t('home.skills.problemSolving'), icon: 'psychology' },
    { label: t('home.skills.leadership'), icon: 'diversity_3' },
    { label: t('home.skills.languages'), icon: 'translate' },
  ];

  const stats = [
    { value: projects.length, label: t('nav.projects'), path: '/projects' },
    { value: certificates.length, label: t('nav.certificates'), path: '/certificates' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-8 md:pt-14 lg:pt-20">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="min-w-0">
          {/* A terminal prompt: user@machine:folder$ followed by the command. `whoami` prints the current user — the name below is its "output" */}
          <p className="mono-label normal-case tracking-normal text-xs flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span className="text-text-secondary">leon@portfolio:~$</span> whoami
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tighter text-white">
            {t('home.title')}
          </h1>

          {/* The invisible copy reserves the final height, so typing never shifts the layout */}
          <p className="grid mt-4 font-mono text-sm sm:text-base text-matrix text-glow">
            <span className="invisible col-start-1 row-start-1" aria-hidden="true">{role}_</span>
            <span className="col-start-1 row-start-1" aria-label={role}>
              <span aria-hidden="true">{typedRole}</span>
              <span className="animate-blink" aria-hidden="true">_</span>
            </span>
          </p>

          <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed max-w-xl border-l-2 border-primary/50 pl-4 mt-6">
            {t('home.subtitle')}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-8 text-sm text-slate-300 font-medium">
            {skills.map((skill) => (
              <li key={skill.icon} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary-light">{skill.icon}</span>
                <span>{skill.label}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Link to="/projects" className="btn-primary h-14 sm:px-8">
              <span>{t('home.viewProjects')}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link to="/about" className="btn-ghost h-14 sm:px-8">
              <span>{t('home.aboutMe')}</span>
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>
          </div>
        </div>

        <div className="order-first lg:order-last flex flex-col items-center gap-6">
          <PhotoFrame
            src="/assets/leon-profile.webp"
            alt="Leon Hauck"
            caption="Juiz de Fora, Brasil"
            priority
            className="w-52 sm:w-64 lg:w-full lg:max-w-sm aspect-[4/5]"
          />

          <div className="hidden lg:grid grid-cols-2 gap-3 w-full max-w-sm">
            {stats.map((stat) => (
              <Link key={stat.path} to={stat.path} className="panel panel-hover px-4 py-3 group">
                <span className="block font-mono text-3xl font-bold text-white group-hover:text-matrix transition-colors">
                  {String(stat.value).padStart(2, '0')}
                </span>
                <span className="mono-label text-[10px]">{stat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results in numbers */}
      <section className="mt-14 lg:mt-20">
        <h2 className="mono-label flex items-center gap-3 mb-5">
          <span className="material-symbols-outlined text-[18px]">trending_up</span>
          {t('home.impact.title')}
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {impact.map((item) => (
            <div key={item.value} className="panel flex flex-col p-4 lg:p-5">
              {/* The "before" line keeps its height even when empty, so every number sits on the same line */}
              <p className="h-5 font-mono text-xs text-text-secondary">
                {item.before && <>{item.before} <span className="text-primary-light">→</span></>}
              </p>
              <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-matrix text-glow">{item.value}</p>
              <p className="mt-3 text-sm leading-snug text-slate-300">{item.label}</p>
              <p className="mono-label mt-auto pt-3 text-[10px] text-text-secondary">{item.context}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full overflow-hidden mask-gradient-x mt-12 lg:mt-16">
        <div className="animate-marquee gap-3 no-scrollbar py-2">
          {[...techStack, ...techStack].map((tech, index) => (
            <span key={`${tech.icon}-${index}`} className="chip px-3 py-1.5 text-xs transition-colors hover:border-primary/50">
              <span className="material-symbols-outlined text-[16px] text-primary-light">{tech.icon}</span> {localize(tech.name, language)}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-between items-center border-t border-border-dark mt-6 pt-5">
        <p className="text-xs text-text-secondary font-mono">{t('home.est')}</p>
        <div className="flex gap-4">
          <a href="https://github.com/leonhauck" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-secondary hover:text-matrix transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.185 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/leon-hauck/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-secondary hover:text-matrix transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
