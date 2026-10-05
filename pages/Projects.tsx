
import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { getProjects } from '../data';
import { Project } from '../types';

const isVideo = (media: string) => media.toLowerCase().endsWith('.mp4');

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [filterIndex, setFilterIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const projects: Project[] = useMemo(() => getProjects(language), [language]);

  // Only categories that actually have projects, so no filter leads to an empty list
  const categories: string[] = [t('projects.categories.all'), ...Array.from(new Set(projects.map(p => p.category)))];

  const activeCategory = categories[filterIndex] || categories[0];
  const filteredProjects = filterIndex === 0 ? projects : projects.filter(p => p.category === activeCategory);

  const stepFullscreen = (direction: 1 | -1) => {
    if (!selectedGallery || !fullscreenImage) return;
    const total = selectedGallery.length;
    const currentIndex = selectedGallery.indexOf(fullscreenImage);
    setFullscreenImage(selectedGallery[(currentIndex + direction + total) % total]);
  };

  const isModalOpen = selectedGallery !== null || fullscreenImage !== null;

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Closes one layer at a time: lightbox first, then the gallery
        if (fullscreenImage) setFullscreenImage(null);
        else setSelectedGallery(null);
      }
      if (e.key === 'ArrowLeft') stepFullscreen(-1);
      if (e.key === 'ArrowRight') stepFullscreen(1);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, selectedGallery, fullscreenImage]);

  return (
    <div className="pt-8 md:pt-12 px-4 sm:px-6 max-w-lg mx-auto md:max-w-6xl">
      <header className="mb-8">
        <p className="mono-label mb-2">{t('projects.version')}</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t('projects.title')}</h1>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-5 pb-1">
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => setFilterIndex(index)}
              aria-pressed={filterIndex === index}
              className={`flex h-9 shrink-0 items-center justify-center gap-2 px-4 rounded-lg font-mono text-xs font-medium tracking-wide transition-all ${filterIndex === index
                ? 'bg-primary text-white shadow-glow-sm'
                : 'bg-surface-dark/80 border border-border-dark text-slate-300 hover:border-primary/50 hover:text-white'
                }`}
            >
              {cat}
              <span className={filterIndex === index ? 'text-white/70' : 'text-text-secondary'}>
                {index === 0 ? projects.length : projects.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => {
          const isExpanded = expandedId === project.id;
          return (
            <article
              key={project.id}
              className="panel panel-hover flex flex-col overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden bg-background-dark">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-black/30 to-transparent z-10" />
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded bg-matrix px-2.5 py-1 text-[10px] font-bold uppercase text-background-dark shadow-glow-sm transition-colors hover:bg-white"
                  >
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    {t('projects.viewLive')}
                  </a>
                )}
                <div className="absolute bottom-3 left-4 right-4 z-20">
                  <div className="flex gap-2 mb-1.5">
                    {project.isFeatured && (
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{t('projects.featured')}</span>
                    )}
                    <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-white/10">{project.category}</span>
                  </div>
                  <h2 className="text-white text-lg font-bold leading-tight">{project.title}</h2>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                {project.impact && (
                  <p className="flex items-center gap-1.5 mb-3 font-mono text-xs text-matrix">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    {project.impact}
                  </p>
                )}
                <p className={`text-slate-300 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>
                  {project.description}
                </p>
                {project.description.length > 190 && (
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    aria-expanded={isExpanded}
                    className="self-start mt-1.5 font-mono text-[11px] text-primary-light hover:text-matrix transition-colors"
                  >
                    {isExpanded ? `− ${t('projects.readLess')}` : `+ ${t('projects.readMore')}`}
                  </button>
                )}
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="border-t border-border-dark mt-auto pt-4 flex justify-between items-center gap-2">
                  <span className="text-[10px] text-text-secondary font-mono">
                    {project.version || 'v1.0.0'} {project.updatedAt && `• ${project.updatedAt}`}
                  </span>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub — ${project.title}`}
                        className="icon-btn"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.185 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"></path></svg>
                      </a>
                    )}
                    {project.linkedinUrl && (
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn — ${project.title}`}
                        className="icon-btn hover:!border-[#0077b5] hover:!bg-[#0077b5]"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                    )}
                    {project.gallery ? (
                      <button
                        onClick={() => setSelectedGallery(project.gallery!)}
                        className="flex items-center justify-center h-9 px-3 gap-1 rounded bg-primary text-white text-[10px] font-bold uppercase hover:bg-primary-light transition-colors"
                      >
                        <span>{t('projects.viewPhotos')}</span>
                        <span className="material-symbols-outlined text-[14px]">grid_view</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Grid Gallery Modal */}
      {selectedGallery && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('projects.galleryTitle')}
          className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in"
          onClick={() => setSelectedGallery(null)}
        >
          <div
            className="bg-surface-dark border border-primary/25 w-full max-w-3xl rounded-2xl overflow-hidden shadow-glow relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-border-dark flex items-center justify-between">
              <h3 className="text-lg font-bold">{t('projects.galleryTitle')}</h3>
              <button
                onClick={() => setSelectedGallery(null)}
                aria-label={t('common.close')}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-5 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto no-scrollbar">
              {selectedGallery.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setFullscreenImage(media)}
                  className="aspect-video rounded-lg overflow-hidden border border-border-dark hover:border-primary/60 cursor-zoom-in group relative bg-black/40 transition-colors"
                >
                  {isVideo(media) ? (
                    <span className="block w-full h-full relative">
                      <video
                        src={media}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => {
                          const v = e.target as HTMLVideoElement;
                          v.pause();
                          v.currentTime = 0;
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">play_circle</span>
                      </span>
                    </span>
                  ) : (
                    <img src={media} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={`${t('projects.galleryTitle')} ${idx + 1}`} />
                  )}
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all">fullscreen</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            aria-label={t('common.close')}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[24px] md:text-[32px]">close</span>
          </button>

          {selectedGallery && selectedGallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stepFullscreen(-1);
                }}
                aria-label={t('common.previous')}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[24px] md:text-[32px]">chevron_left</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stepFullscreen(1);
                }}
                aria-label={t('common.next')}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[24px] md:text-[32px]">chevron_right</span>
              </button>

              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10000] font-mono text-xs text-white/70">
                {selectedGallery.indexOf(fullscreenImage) + 1} / {selectedGallery.length}
              </span>
            </>
          )}

          {isVideo(fullscreenImage) ? (
            <video
              key={fullscreenImage}
              src={fullscreenImage}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-full rounded shadow-2xl animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              key={fullscreenImage}
              src={fullscreenImage}
              alt={t('projects.galleryTitle')}
              className="max-w-full max-h-full object-contain rounded shadow-2xl animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
