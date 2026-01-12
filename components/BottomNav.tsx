
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const BottomNav: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: t('nav.home'), path: '/', icon: 'home' },
    { label: t('nav.projects'), path: '/projects', icon: 'grid_view' },
    { label: t('nav.certificates'), path: '/certificates', icon: 'workspace_premium' },
    { label: t('nav.about'), path: '/about', icon: 'person' },
    { label: t('nav.contact'), path: '/contact', icon: 'mail' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-black/5 dark:border-white/10 z-50 pb-6 pt-3 px-6 transition-colors duration-300">
      <div className="flex justify-between items-end max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 group w-16 transition-all ${isActive ? 'text-primary dark:text-white' : 'text-slate-400 dark:text-text-secondary'
                }`}
            >
              <div
                className={`w-10 h-1 rounded mb-1 transition-all duration-300 ${isActive ? 'bg-primary' : 'bg-transparent'
                  }`}
              />
              <span
                className={`material-symbols-outlined transition-transform duration-300 group-active:scale-90 ${isActive ? 'fill-1' : ''
                  }`}
              >
                {item.icon}
              </span>
              <span className={`text-[10px] font-bold tracking-wider ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex flex-col items-center gap-1 group w-16 transition-all text-slate-400 dark:text-text-secondary hover:text-primary dark:hover:text-white"
        >
          <div className="w-10 h-1 rounded mb-1 bg-transparent" />
          <span className="material-symbols-outlined transition-transform duration-300 group-active:scale-90">
            translate
          </span>
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {language === 'pt' ? 'EN' : 'PT'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
