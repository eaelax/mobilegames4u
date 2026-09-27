'use client';

import React, { useState, useEffect } from 'react';
import { GameItem } from '@/lib/games-data';
import { getLockerUrl } from '@/lib/config';
import { 
  X, 
  Download, 
  ShieldCheck, 
  Star,
  HardDrive,
  Check
} from 'lucide-react';

interface DownloadModalProps {
  game: GameItem | null;
  onClose: () => void;
}

export function DownloadModal({ game, onClose }: DownloadModalProps) {
  const [isPreparing, setIsPreparing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (game) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [game]);

  if (!game) return null;

  const displayVersion = game.version.startsWith('v') ? game.version : `v${game.version}`;

  const handleDownloadClick = () => {
    setIsPreparing(true);
    setProgress(35);

    const targetLockerUrl = (game.contentLockerLink && game.contentLockerLink.trim().length > 0)
      ? game.contentLockerLink.trim()
      : getLockerUrl(game.id);

    // Fast progress feedback, then redirect directly
    setTimeout(() => {
      setProgress(80);
    }, 350);

    setTimeout(() => {
      setProgress(100);
      window.location.href = targetLockerUrl;
    }, 800);
  };

  return (
    <div 
      id="download-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-[8px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Compact Zero-Scroll Modal Card: Max width 480px-540px, strictly bounded height */}
      <div 
        id="download-modal-card"
        className="relative w-full max-w-[500px] rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] text-[#111827] overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-6 space-y-4">
          {/* 1. Header: Compact game icon, title, version, and clean verification */}
          <div className="flex items-start gap-3.5 pr-8">
            <img
              src={game.iconUrl}
              alt={`${game.title} icon`}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#E5E7EB] bg-[#F3F4F6] shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&h=200&q=80';
              }}
            />
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#111827] leading-tight truncate">
                {game.title} Mod APK
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded border border-[#E5E7EB]">
                  {displayVersion}
                </span>
                <span className="text-xs text-[#059669] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" /> Clean & Tested
                </span>
              </div>
            </div>
          </div>

          {/* Compact Mod Features List */}
          <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-1.5">
            <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block">
              Included Mod Unlocks:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#374151]">
              {game.modFeatures.slice(0, 2).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 truncate">
                  <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 stroke-[2.5]" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Metadata Row (Rating, File Size, Downloads) directly above button */}
          <div className="grid grid-cols-3 gap-1 py-1.5 px-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] text-center">
            <div>
              <span className="text-[10px] text-[#6B7280] block font-medium">Rating</span>
              <span className="font-bold flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" /> {game.rating}
              </span>
            </div>
            <div className="border-x border-[#E5E7EB]">
              <span className="text-[10px] text-[#6B7280] block font-medium">Size</span>
              <span className="font-mono font-medium flex items-center justify-center gap-1 text-[#374151]">
                <HardDrive className="w-3 h-3 text-[#6B7280]" /> {game.fileSize}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#6B7280] block font-medium">Downloads</span>
              <span className="font-semibold text-[#111827]">
                {game.downloadsCount}
              </span>
            </div>
          </div>

          {/* 2. Status / Progress: Clean minimal progress bar (crimson fill #D72323 over #E5E7EB track) */}
          {isPreparing && (
            <div className="space-y-1.5 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
              <div className="flex justify-between text-xs font-medium text-[#111827]">
                <span>Preparing direct CDN link...</span>
                <span className="font-mono font-bold text-[#D72323]">{progress}%</span>
              </div>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#D72323] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* 3. Action: Direct Flat CTA Button - No gradients, no glows */}
          <button
            id="btn-trigger-ogads-download"
            onClick={handleDownloadClick}
            disabled={isPreparing}
            className="w-full py-3 px-4 rounded-xl bg-[#D72323] active:bg-[#B91C1C] text-[#FFFFFF] font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-colors uppercase tracking-wide"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>
              {isPreparing 
                ? 'PREPARING APK...' 
                : `DOWNLOAD APK NOW (${game.fileSize})`}
            </span>
          </button>

          {/* Minimal Footnote: Clean, zero-bloat trust indicators */}
          <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
            <span>256-Bit SSL Encrypted</span>
            <span className="text-[#059669] font-medium">Android & iOS Compatible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
