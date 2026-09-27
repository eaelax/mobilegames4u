'use client';

import React from 'react';

interface WebsiteLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function WebsiteLogo({ className = '', showText = true, size = 'md' }: WebsiteLogoProps) {
  // Proportioned to match the full height of both lines of text
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11 sm:w-12 sm:h-12', // 44px-48px matching both text logo lines
    lg: 'w-14 h-14',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Square Vector Device Logo expanded to fit both text lines */}
      <div className={`relative shrink-0 ${iconDimensions} flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Outer Dark Frame (Navy / Charcoal) */}
          <rect x="18" y="18" width="164" height="164" rx="46" fill="#111622" />

          {/* Top Camera Dot (White) */}
          <circle cx="100" cy="32" r="4.5" fill="#FFFFFF" />

          {/* Bottom Bar (White) */}
          <rect x="85" y="163" width="30" height="4.5" rx="2.25" fill="#FFFFFF" />

          {/* Inner Screen (White) */}
          <rect x="42" y="42" width="116" height="116" rx="30" fill="#FFFFFF" />

          {/* Download Arrow (Crimson Red) */}
          <path
            d="M89 62 H111 V98 H133 L100 134 L67 98 H89 Z"
            fill="#D72323"
          />

          {/* Bottom Tray Line (Crimson Red) */}
          <rect x="72" y="142" width="56" height="7.5" rx="3.75" fill="#D72323" />
        </svg>
      </div>

      {/* Typography with Tagline: VERIFIED MOD APK */}
      {showText && (
        <div className="flex flex-col text-left justify-center">
          <div className="flex items-center gap-1 font-black tracking-tight text-[17px] sm:text-[19px] leading-tight">
            <span className="text-[#111827] font-black tracking-tight">MOBILEGAMES</span>
            <span className="text-[#D72323] font-black">4U</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-[#6B7280] font-bold tracking-wider uppercase mt-0.5 leading-tight">
            VERIFIED MOD APK
          </span>
        </div>
      )}
    </div>
  );
}
