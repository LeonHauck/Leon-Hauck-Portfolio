
import React, { useState } from 'react';
import { Project } from '../types';
import { useLanguage } from '../components/LanguageContext';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(t('projects.categories.all'));
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const projects: Project[] = t('projects.items');

  const categories = [t('projects.categories.all'), t('projects.categories.mobile'), t('projects.categories.web'), t('projects.categories.backend'), t('projects.categories.design'), t('projects.categories.data')];
  const filteredProjects = filter === t('projects.categories.all') ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-6 px-4 max-w-lg mx-auto md:max-w-2xl">
      <header className="mb-6">
        <div className="flex items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t('projects.title')}</h1>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium uppercase tracking-wide">{t('projects.version')}</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex h-9 shrink-0 items-center justify-center px-4 rounded-lg text-sm font-medium transition-all ${filter === cat
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-surface-dark border border-black/10 dark:border-white/10 text-slate-600 dark:text-gray-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="bg-white dark:bg-surface-dark rounded-lg overflow-hidden border border-black/5 dark:border-white/5 shadow-sm group transition-transform active:scale-[0.99]"
          >
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <div className="flex gap-2 mb-1">
                  {project.isFeatured && (
                    <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{t('projects.featured')}</span>
                  )}
                  <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-white/10">{project.category}</span>
                </div>
                <h2 className="text-white text-xl font-bold leading-tight">{project.title}</h2>
              </div>
            </div>

            <div className="p-5">
              <p className="text-slate-600 dark:text-[#B0B0B0] text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] font-medium text-slate-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
              <div className="border-t border-black/5 dark:border-white/5 pt-4 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 dark:text-gray-500 font-mono">
                  {project.version || 'v1.0.0'} {project.updatedAt && `• ${project.updatedAt}`}
                </span>
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center h-8 w-8 rounded bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white transition-colors ${!project.githubUrl && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.185 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"></path></svg>
                  </a>
                  {project.linkedinUrl && (
                    <a
                      href={project.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-8 w-8 rounded bg-black/5 dark:bg-white/5 hover:bg-[#0077b5] hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                  )}
                  {project.gallery ? (
                    <button
                      onClick={() => setSelectedGallery(project.gallery!)}
                      className="flex items-center justify-center h-8 px-3 gap-1 rounded bg-primary text-white text-[10px] font-bold uppercase hover:bg-primary-light transition-colors"
                    >
                      <span>{t('projects.viewPhotos')}</span>
                      <span className="material-symbols-outlined text-[14px]">grid_view</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Grid Gallery Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold">{t('projects.galleryTitle')}</h3>
              <button
                onClick={() => setSelectedGallery(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto no-scrollbar">
              {selectedGallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setFullscreenImage(img)}
                  className="aspect-video rounded-lg overflow-hidden border border-black/5 dark:border-white/5 cursor-zoom-in group relative"
                >
                  <img src={img} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" alt="Thumbnail" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all">fullscreen</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-8 right-8 z-[10000] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>

          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain rounded shadow-2xl animate-in zoom-in-90 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
