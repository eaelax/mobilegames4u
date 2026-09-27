'use client';

import React from 'react';
import { GameItem } from '@/lib/games-data';
import { Download, ShieldCheck, Star, HardDrive, Check } from 'lucide-react';

interface GameCardProps {
  game: GameItem;
  onSelectGame: (game: GameItem) => void;
}

export function GameCard({ game, onSelectGame }: GameCardProps) {
  // Normalize version string
  const displayVersion = game.version.startsWith('v') ? game.version : `v${game.version}`;

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onSelectGame(game)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectGame(game);
        }
      }}
      role="button"
      tabIndex={0}
      className="h-full flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 sm:p-5 cursor-pointer select-none text-left"
    >
      {/* Top Content Area */}
      <div className="flex flex-col">
        {/* Top tags: clean, flat light-theme tags */}
        <div className="h-6 flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {game.isHot && (
              <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide rounded bg-[#FEF2F2] border border-[#FEE2E2] text-[#D72323] shrink-0">
                HOT
              </span>
            )}
            <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide rounded bg-[#ECFDF5] border border-[#D1FAE5] text-[#059669] shrink-0">
              FREE
            </span>
            <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide rounded bg-[#FFFBEB] border border-[#FEF3C7] text-[#D97706] truncate shrink-0">
              {game.category}
            </span>
          </div>
          <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide rounded bg-[#ECFDF5] border border-[#D1FAE5] text-[#059669] flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" /> Clean
          </span>
        </div>

        {/* Game Thumbnail + Title & Version (No shadow on image, Developer name permanently removed) */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="shrink-0 relative">
            <img
              src={game.iconUrl}
              alt={`${game.title} Mod APK icon`}
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl object-cover border border-[#E5E7EB] bg-[#F3F4F6]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&h=200&q=80';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            {/* Title: Bold crisp #111827 */}
            <div className="h-[44px] flex items-center mb-1">
              <h3 className="text-base sm:text-lg font-bold text-[#111827] leading-snug line-clamp-2">
                {game.title}
              </h3>
            </div>

            {/* Version: Directly below title as a small, clean light-gray pill */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]">
                Version: {displayVersion}
              </span>
            </div>
          </div>
        </div>

        {/* Mod Features: Compact box with #F9FAFB background and 1px #E5E7EB border */}
        <div className="h-[80px] mb-3.5 p-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs flex flex-col justify-between">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D72323]" />
            <span>Mod Features Included:</span>
          </div>
          <ul className="space-y-1 text-[#374151] text-xs">
            {game.modFeatures.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 stroke-[2.5]" />
                <span className="truncate font-medium">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Section: Repositioned Metadata block directly ABOVE "GET MOD APK" button */}
      <div className="pt-2.5 border-t border-[#E5E7EB] space-y-2.5">
        {/* 3-column micro-bar: bg-[#F9FAFB], border #E5E7EB */}
        <div className="grid grid-cols-3 gap-1 py-1.5 px-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827]">
          {/* Rating */}
          <div className="flex items-center justify-center gap-1 font-bold">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
            <span>{game.rating}</span>
          </div>
          {/* File Size */}
          <div className="flex items-center justify-center gap-1 font-mono font-medium border-x border-[#E5E7EB] px-1 text-[#4B5563]">
            <HardDrive className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
            <span className="truncate text-[#111827]">{game.fileSize}</span>
          </div>
          {/* Downloads */}
          <div className="flex items-center justify-center gap-1 font-medium truncate text-[#4B5563]">
            <Download className="w-3.5 h-3.5 text-[#D72323] shrink-0" />
            <span className="truncate text-[#111827] font-semibold">{game.downloadsCount}</span>
          </div>
        </div>

        {/* CTA Button ("GET MOD APK"): Flat, solid #D72323 background with bold white text. No gradients, no glows, no hover zoom */}
        <div
          id={`btn-download-${game.id}`}
          className="h-11 w-full rounded-lg bg-[#D72323] active:bg-[#B91C1C] text-[#FFFFFF] font-bold text-sm flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>GET MOD APK</span>
        </div>
      </div>
    </div>
  );
}
