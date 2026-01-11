import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const techStack = [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'React', icon: 'deployed_code' },
    { name: 'TypeScript', icon: 'terminal' },
    { name: 'Python', icon: 'terminal' },
    { name: 'SQL', icon: 'database' },
    { name: 'Angular', icon: 'code' },
    { name: 'Postman', icon: 'send' },
    { name: 'RPA', icon: 'smart_toy' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col pt-6">

      <header className="flex items-center px-6 py-2 w-full max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">terminal</span>
          <h1 className="text-lg font-bold tracking-tight">PORTFÓLIO</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-between pt-4 px-6 pb-16 w-full max-w-md mx-auto relative z-0">
        {/* Profile Section */}
        <div className="flex flex-col gap-4 mb-4 items-start">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 to-transparent rounded-lg opacity-70 blur-sm"></div>
            <div className="relative h-28 w-28 rounded-lg overflow-hidden bg-surface-dark border border-white/10 shadow-2xl profile-image-container">
              <img
                alt="Developer Portrait"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 no-invert"
                src="/assets/leon-profile.jpg"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-5xl font-bold leading-[0.9] tracking-tighter text-slate-900 dark:text-white">
              Leon Hauck   <br />
            </h2>
            <p className="text-slate-500 dark:text-text-secondary text-xl font-light leading-relaxed max-w-[320px] border-l-2 border-primary/30 pl-4 mt-4">
              Desenvolvedor e Analista de dados. Transformando lógica complexa em experiências fluidas e eficientes.
            </p>

            <div className="flex flex-col gap-2 mt-8 pl-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">workspace_premium</span>
                <span>Black Belt Lean Six Sigma</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">precision_manufacturing</span>
                <span>Automação de Processos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">handshake</span>
                <span>Negociação</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">analytics</span>
                <span>Manipulação de Dados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">psychology</span>
                <span>Resolução de Problemas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">diversity_3</span>
                <span>Liderança</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">translate</span>
                <span>Português e Inglês</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Ticker */}
        <div className="w-full overflow-hidden mask-gradient-x">
          <div className="animate-marquee gap-3 no-scrollbar pb-2">
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <span key={`${tech.name}-${index}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded text-xs font-medium text-slate-600 dark:text-text-secondary whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px]">{tech.icon}</span> {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white dark:bg-surface-dark rounded-lg p-1 border border-black/5 dark:border-white/5 shadow-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/projects"
              className="flex items-center justify-center gap-2 h-14 bg-primary text-white text-sm font-bold tracking-wide rounded hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              <span>Ver Projetos</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-center gap-2 h-14 bg-transparent border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-sm font-bold tracking-wide rounded hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              <span>Sobre Mim</span>
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-between items-center px-4 border-t border-black/5 dark:border-white/5 pt-4">
          <p className="text-xs text-slate-400 dark:text-text-secondary font-mono">EST. 2026</p>
          <div className="flex gap-4">
            <a href="https://github.com/leonhauck" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.185 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/leon-hauck/" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-text-secondary hover:text-primary dark:hover:text-white transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
