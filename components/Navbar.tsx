
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const Navbar: React.FC = () => {
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

  const languageLabel = language === 'pt' ? 'Switch to English' : 'Mudar para Português';

  return (
    <>
      {/* Desktop: top bar */}
      <header className="hidden md:block fixed top-0 left-0 w-full z-50 border-b border-primary/15 bg-background-dark/80 backdrop-blur-lg">
        <div className="flex items-center justify-between h-16 max-w-6xl mx-auto px-6">
          <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight group">
            <span className="text-matrix text-glow">&gt;_</span>
            <span className="text-white group-hover:text-primary-light transition-colors">leon.hauck</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3 py-2 font-mono text-xs font-medium tracking-widest transition-colors ${isActive ? 'text-matrix text-glow' : 'text-text-secondary hover:text-white'
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-px h-0.5 rounded bg-matrix shadow-glow-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                  />
                </Link>
              );
            })}

            <button
              onClick={toggleLanguage}
              aria-label={languageLabel}
              className="flex items-center gap-1.5 ml-3 pl-4 h-8 border-l border-border-dark font-mono text-xs font-bold tracking-widest text-text-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span className={language === 'pt' ? 'text-matrix' : ''}>PT</span>
              <span className="text-border-dark">/</span>
              <span className={language === 'en' ? 'text-matrix' : ''}>EN</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile: bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-dark/95 backdrop-blur-lg border-t border-primary/15 z-50 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 px-2">
        <div className="flex justify-between items-end max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 group flex-1 min-w-0 transition-all ${isActive ? 'text-matrix' : 'text-text-secondary'
                  }`}
              >
                <div
                  className={`w-8 h-0.5 rounded mb-1 transition-all duration-300 ${isActive ? 'bg-matrix shadow-glow-sm' : 'bg-transparent'
                    }`}
                />
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform duration-300 group-active:scale-90 ${isActive ? 'fill-1' : ''
                    }`}
                >
                  {item.icon}
                </span>
                <span className={`text-[8.5px] font-bold tracking-tight truncate w-full text-center px-0.5 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            aria-label={languageLabel}
            className="flex flex-col items-center gap-1 group flex-1 min-w-0 transition-all text-text-secondary hover:text-white"
          >
            <div className="w-8 h-0.5 rounded mb-1 bg-transparent" />
            <span className="material-symbols-outlined text-[22px] transition-transform duration-300 group-active:scale-90">
              translate
            </span>
            <span className="text-[8.5px] font-bold tracking-tight uppercase">
              {language === 'pt' ? 'EN' : 'PT'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
