import { useState, useEffect, useCallback, useRef } from 'react';

interface Exhibit {
  slug: string;
  title: string;
  org: string;
  year: number;
  image?: string;
  videoId?: string;
  notable: string;
  channels: string[];
  sourceUrl?: string;
  sourceAttribution?: string;
}

interface LightboxProps {
  exhibits: string; // JSON-serialized Exhibit[]
  initialIndex: number;
}

export default function Lightbox({ exhibits: exhibitsJson, initialIndex }: LightboxProps) {
  const parsed: Exhibit[] = JSON.parse(exhibitsJson);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);

  const current = parsed[currentIndex];

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i < parsed.length - 1 ? i + 1 : i));
  }, [parsed.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        case 'ArrowRight':
          goNext();
          break;
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close, goNext, goPrev]);

  // Update URL without reload
  useEffect(() => {
    if (isOpen && current) {
      window.history.pushState({}, '', `/exhibit/${current.slug}`);
    }
  }, [isOpen, current]);

  // Click outside to close
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) {
      close();
    }
  }

  async function copyLink() {
    const url = `${window.location.origin}/exhibit/${current.slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
    }
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(`${window.location.origin}/exhibit/${current.slug}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  function shareTwitter() {
    const url = encodeURIComponent(`${window.location.origin}/exhibit/${current.slug}`);
    const text = encodeURIComponent(`${current.title} — Museum of Giving`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }

  // Expose open function globally for Astro to call
  useEffect(() => {
    (window as any).__lightboxOpen = open;
    return () => {
      delete (window as any).__lightboxOpen;
    };
  }, [open]);

  if (!isOpen || !current) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      style={{ animation: 'fadeIn 200ms ease-out' }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={close}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
        aria-label="Close"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Prev arrow */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Previous"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {currentIndex < parsed.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Next"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div className="max-w-4xl w-full mx-4 sm:mx-8 max-h-[90vh] overflow-y-auto bg-white rounded-sm p-6 sm:p-10">
        {/* Media */}
        <div className="flex justify-center mb-8">
          {current.videoId ? (
            <div className="w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${current.videoId}`}
                title={current.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <img
              src={current.image}
              alt={current.title}
              className="max-w-full max-h-[50vh] object-contain"
            />
          )}
        </div>

        {/* Info */}
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {current.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-900">{current.org}</span>
          <span>&middot;</span>
          <span>{current.year}</span>
        </div>

        {/* Channel tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {current.channels.map((ch) => (
            <span
              key={ch}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-500"
            >
              {ch.charAt(0).toUpperCase() + ch.slice(1)}
            </span>
          ))}
        </div>

        {/* Notable */}
        <div className="border-l-2 border-yellow-700 pl-5 mb-6">
          <p className="text-gray-500 leading-relaxed italic">{current.notable}</p>
        </div>

        {/* Source */}
        {current.sourceAttribution && (
          <p className="text-xs text-gray-400 mb-6">
            Source:{' '}
            {current.sourceUrl ? (
              <a
                href={current.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700"
              >
                {current.sourceAttribution}
              </a>
            ) : (
              current.sourceAttribution
            )}
          </p>
        )}

        {/* Share */}
        <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Share</span>
          <button onClick={shareLinkedIn} className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
          <button onClick={shareTwitter} className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer" title="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button onClick={copyLink} className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer" title="Copy link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
