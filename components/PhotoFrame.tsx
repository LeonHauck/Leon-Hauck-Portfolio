import React from 'react';

interface PhotoFrameProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean; // above-the-fold image: load it first
  className?: string; // size and aspect ratio come from the caller
}

const corner = 'absolute h-4 w-4 border-matrix/80';

const PhotoFrame: React.FC<PhotoFrameProps> = ({ src, alt, caption, priority = false, className = '' }) => {
  return (
    <figure className={`relative ${className}`}>
      <div className="absolute -inset-3 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.22),transparent_70%)] blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-lg border border-primary/40 bg-surface-dark shadow-glow profile-image-container">
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover no-invert"
        />
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background-dark/95 via-background-dark/60 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] tracking-wide text-primary-light">
            <span className="h-1.5 w-1.5 rounded-full bg-matrix shadow-glow-sm" />
            {caption}
          </figcaption>
        )}
      </div>
      <span className={`${corner} -left-1.5 -top-1.5 border-l-2 border-t-2`} />
      <span className={`${corner} -right-1.5 -top-1.5 border-r-2 border-t-2`} />
      <span className={`${corner} -bottom-1.5 -left-1.5 border-b-2 border-l-2`} />
      <span className={`${corner} -bottom-1.5 -right-1.5 border-b-2 border-r-2`} />
    </figure>
  );
};

export default PhotoFrame;
