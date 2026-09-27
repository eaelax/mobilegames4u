'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GAMES_DATA } from '@/lib/games-data';
import { Download } from 'lucide-react';

export function RecentDownloadsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'entering' | 'visible' | 'exiting'>('entering');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial entrance
    const initialTimer = setTimeout(() => {
      setAnimationState('visible');
    }, 200);

    // Loop logic: show for 4s, animate out for 300ms, update data, animate in
    intervalRef.current = setInterval(() => {
      setAnimationState('exiting');

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % GAMES_DATA.length);
        setAnimationState('entering');

        setTimeout(() => {
          setAnimationState('visible');
        }, 80);
      }, 300);
    }, 4500);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const game = GAMES_DATA[currentIndex % GAMES_DATA.length];

  if (!game) return null;

  return (
    <div
      id="live-download-notification"
      className="fixed bottom-5 right-5 z-[9999] pointer-events-none max-w-[calc(100vw-2.5rem)] sm:max-w-sm"
      aria-live="polite"
    >
      {/* Low-height compact card with full red border on all sides */}
      <div
        className={`flex items-center gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D72323] shadow-md transition-all duration-300 ease-out transform ${
          animationState === 'visible'
            ? 'opacity-100 translate-y-0 scale-100'
            : animationState === 'entering'
            ? 'opacity-0 translate-y-2 scale-95'
            : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        {/* Compact Thumbnail with download badge */}
        <div className="relative shrink-0">
          <img
            src={game.iconUrl}
            alt={game.title}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover border border-[#E5E7EB] bg-[#F3F4F6]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&h=200&q=80';
            }}
          />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] border-2 border-[#FFFFFF]" />
          </span>
        </div>

        {/* Streamlined text info */}
        <div className="min-w-0 flex-1 leading-snug">
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
            <span>User just downloaded</span>
            <span className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
            <span className="font-mono text-[10px] text-[#9CA3AF]">Just now</span>
          </div>
          <div className="truncate text-xs sm:text-[13px] font-bold text-[#111827] mt-0.5">
            {game.title}
          </div>
        </div>

        {/* Mini direct download action icon */}
        <div className="shrink-0 w-7 h-7 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] text-[#D72323] flex items-center justify-center">
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
}
