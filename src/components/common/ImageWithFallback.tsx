import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  category?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category = 'general',
  className = '',
  aspectRatio = '4/3'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Vector Schematics based on automotive category
  const renderCategoryVector = () => {
    switch (category) {
      case 'engine-diagnostics':
        return (
          <svg className="w-16 h-16 text-[#168C91]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            <circle cx="12" cy="12" r="5" fill="#18324A" fillOpacity="0.4" />
            <path d="M10 12h4M12 10v4" stroke="#F07838" strokeWidth="2" />
          </svg>
        );
      case 'brake-services':
        return (
          <svg className="w-16 h-16 text-[#F07838]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
            <circle cx="12" cy="12" r="2" fill="#18324A" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeWidth="2" />
          </svg>
        );
      case 'battery-electrical':
      case 'hybrid-ev':
        return (
          <svg className="w-16 h-16 text-[#168C91]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M6 3v3M18 3v3M9 13h6M12 10v6" stroke="#F07838" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'ac-climate':
        return (
          <svg className="w-16 h-16 text-cyan-400/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" strokeLinecap="round" />
          </svg>
        );
      case 'suspension-steering':
        return (
          <svg className="w-16 h-16 text-amber-400/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M8 6l8 4-8 4 8 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.8 2 11 2 11.2V16c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" fill="#18324A" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" fill="#18324A" />
          </svg>
        );
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/9':
        return 'aspect-video';
      case '4/3':
        return 'aspect-[4/3]';
      case '1/1':
        return 'aspect-square';
      default:
        return '';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#18324A] via-[#1E3E5B] to-[#122436] rounded-xl flex items-center justify-center ${getAspectClass()} ${className}`}>
      {/* Background Engineering Grid Texture */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Subtle Brand Ambient Lighting Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#168C91]/25 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#F07838]/15 rounded-full blur-2xl" />

      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 relative z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      {/* Styled Fallback / Decorative Motif when loading or fallback */}
      {(!src || hasError || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner mb-3">
            {renderCategoryVector()}
          </div>
          <span className="text-xs font-semibold tracking-wide text-white/90 uppercase line-clamp-1">
            {alt}
          </span>
          <span className="text-[11px] text-[#DCE3E8]/70 mt-1 font-mono">
            DriveCraft Certified Standard
          </span>
        </div>
      )}
    </div>
  );
};
