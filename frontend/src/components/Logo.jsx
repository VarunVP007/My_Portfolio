import { useState } from 'react';

/**
 * Logo Component
 * 1. Attempts to load custom image from `/assets/logo.png` (placed in `frontend/public/assets/logo.png`).
 * 2. If `/assets/logo.png` is not added yet, displays the stylized electric-blue brush stroke "V" logo placeholder.
 */
const Logo = ({ size = 36, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 flex-shrink-0 bg-[#0A0E17] ${className}`}
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        <img
          src="/assets/logo.png"
          alt="Varunprasad V Logo"
          className="w-full h-full object-cover rounded-xl"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Stylized Blue Paint-Stroke V Logo SVG Placeholder */
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-0.5"
        >
          <rect width="100" height="100" rx="22" fill="#0A0E17" />
          <circle cx="50" cy="50" r="48" fill="#0A0E17" stroke="#1E293B" strokeWidth="2" />
          <defs>
            <linearGradient id="v-blue-grad1" x1="20" y1="20" x2="55" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="50%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#0038FF" />
            </linearGradient>
            <linearGradient id="v-blue-grad2" x1="75" y1="15" x2="45" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00C8FF" />
              <stop offset="60%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#0040E0" />
            </linearGradient>
            <filter id="v-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Brush Stroke */}
          <path
            d="M 25 22 C 29 20, 36 28, 42 42 L 53 74 C 54 77, 49 83, 45 79 L 23 34 C 21 28, 21 24, 25 22 Z"
            fill="url(#v-blue-grad1)"
            filter="url(#v-glow-filter)"
          />

          {/* Right Brush Stroke */}
          <path
            d="M 75 18 C 77 22, 67 45, 57 64 L 46 86 C 44 89, 40 84, 43 78 L 69 24 C 72 19, 73 16, 75 18 Z"
            fill="url(#v-blue-grad2)"
            filter="url(#v-glow-filter)"
          />

          {/* Splatter Accents */}
          <path d="M 28 30 Q 32 38, 22 45 Q 26 35, 28 30 Z" fill="#00C8FF" opacity="0.8" />
          <path d="M 50 68 L 56 82 L 48 76 Z" fill="#0066FF" />
        </svg>
      )}
    </div>
  );
};

export default Logo;
