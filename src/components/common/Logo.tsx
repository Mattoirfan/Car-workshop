import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean; // When rendered on dark background
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', lightMode = false, showTagline = false }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Automotive Engineering Emblem */}
      <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#18324A] to-[#168C91] p-1.5 shadow-sm flex items-center justify-center shrink-0">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
          {/* Outer Shield / Precision Hex */}
          <path
            d="M16 2L28 8V16C28 23 22 28.5 16 30C10 28.5 4 23 4 16V8L16 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="text-white/40"
          />
          {/* Dynamic Road Curves / Apex Motif */}
          <path
            d="M10 21L14.5 11H17.5L22 21"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          />
          {/* Burnt Orange Center Meridian / Calibration Dot */}
          <path
            d="M16 11V18"
            stroke="#F07838"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="16" cy="22" r="1.5" fill="#F07838" />
        </svg>
      </div>

      {/* Brand Typographic Lockup - Guaranteed Single Line */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className={`font-extrabold tracking-tight text-lg ${lightMode ? 'text-white' : 'text-[#18324A]'}`}>
            DRIVECRAFT
          </span>
          <span className="font-bold tracking-wider text-xs text-[#168C91] uppercase">
            AUTOCARE
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-wide text-slate-500 whitespace-nowrap font-medium mt-0.5">
            Expert Care · Clear Pricing
          </span>
        )}
      </div>
    </div>
  );
};
