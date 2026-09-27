'use client';

import React, { useState, useMemo } from 'react';
import { GAMES_DATA, GameItem } from '@/lib/games-data';
import { SITE_CONFIG } from '@/lib/config';
import { GameCard } from '@/components/GameCard';
import { DownloadModal } from '@/components/DownloadModal';
import { RecentDownloadsTicker } from '@/components/RecentDownloadsTicker';
import { WebsiteLogo } from '@/components/WebsiteLogo';
import { LiveOnlineBadge } from '@/components/LiveOnlineBadge';
import {
  Search,
  ShieldCheck,
  Zap,
  Lock,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameForModal, setSelectedGameForModal] = useState<GameItem | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Filter games based purely on title search
  const filteredGames = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return GAMES_DATA;

    return GAMES_DATA.filter((game) => {
      const titleLower = game.title.toLowerCase();
      const queryWords = cleanQuery.split(/\s+/).filter(Boolean);
      return (
        titleLower.includes(cleanQuery) ||
        queryWords.every((word) => titleLower.includes(word))
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#ECEEF2] text-[#111827] flex flex-col selection:bg-[#D72323]/20 selection:text-[#111827]">
      {/* Live notification ticker */}
      <RecentDownloadsTicker />

      {/* Main Header with Logo and Minimal Live Online Badge */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="flex items-center">
            <WebsiteLogo size="md" />
          </Link>
          <div className="flex items-center shrink-0">
            <LiveOnlineBadge />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-8 sm:py-10 px-4 bg-[#FFFFFF] border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Trust Tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#4B5563]">
              <ShieldCheck className="w-4 h-4 text-[#059669]" /> Virus Scanned
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#4B5563]">
              <span className="w-2 h-2 rounded-full bg-[#059669]" /> 100% Free APKs
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#4B5563]">
              <Lock className="w-4 h-4 text-[#D72323]" /> 256-Bit Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#4B5563]">
              <Zap className="w-4 h-4 text-[#D72323]" /> No Root / Jailbreak
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight">
            Download Free <span className="text-[#D72323]">Modded Games</span> & APKs
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Get unlimited dice, gems, coins, and unlocked features for your favorite mobile games. 
            Compatible with Android & iOS with zero root or jailbreak required.
          </p>

          {/* Clean Search Input (No tags underneath, seamless transition) */}
          <div className="max-w-xl mx-auto relative pt-1">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#9CA3AF] absolute left-4 pointer-events-none" />
              <input
                id="search-games-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games by title, e.g. Monopoly GO, Roblox, Brawl Stars..."
                className="w-full pl-11 pr-20 py-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#D72323] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2.5 py-1 text-xs rounded-lg bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Multi-Games Grid Section (Category Filter Bar completely removed) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-10">
        <div>
          {/* Header row with count (Category filter bar completely removed) */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] flex items-center gap-2.5">
                <span>{searchQuery.trim() ? `Search Results for "${searchQuery.trim()}"` : 'Featured Modded Games'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] font-medium">
                  {filteredGames.length} Available
                </span>
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {searchQuery.trim() 
                  ? `Showing games with title matching "${searchQuery.trim()}"`
                  : 'Click any game card to open the direct package overview'}
              </p>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#D72323] font-semibold cursor-pointer"
              >
                Reset Search
              </button>
            )}
          </div>

          {/* Games Grid Container */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelectGame={(g) => setSelectedGameForModal(g)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-3">
              <div className="text-3xl">🔍</div>
              <h3 className="text-base font-bold text-[#111827]">
                No modded games found with title matching &quot;{searchQuery}&quot;
              </h3>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                Check your spelling or browse all available games.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-lg bg-[#D72323] text-xs text-[#FFFFFF] font-semibold cursor-pointer transition-colors"
              >
                View All Games
              </button>
            </div>
          )}
        </div>

        {/* High Conversion Trust & Security Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-[#D1FAE5] text-[#059669] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111827]">100% Virus & Malware Checked</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Every APK is checked by automated sandboxes with 0/64 signature detections before release.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] text-[#D72323] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111827]">Anti-Ban Protection Protocol</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Our client mods use request spoofing to mirror standard in-app purchases so your connected accounts remain safe.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] text-[#D72323] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111827]">No Root or Jailbreak Needed</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Enjoy plug-and-play installation on any standard stock Android or iOS mobile phone with 1-tap installation.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-[#111827]">
              How to Download & Install Modded Mobile Games
            </h2>
            <p className="text-xs text-[#6B7280]">
              Follow these 3 quick steps to unlock unlimited gems and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#D72323] text-[#FFFFFF] font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-sm font-bold text-[#111827]">Pick Your Game</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Click any game card above or search for your favorite title to open the package overview.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#D72323] text-[#FFFFFF] font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-sm font-bold text-[#111827]">Verify Your Device</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Complete one quick sponsored security check to unlock the direct cloud mirror.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#D72323] text-[#FFFFFF] font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-sm font-bold text-[#111827]">Install & Enjoy</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Open the downloaded APK or iOS package and enjoy your unlocked gems and features!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-[#111827]">Frequently Asked Questions</h2>
            <p className="text-xs text-[#6B7280]">Everything you need to know about our modded games</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5">
            {[
              {
                q: 'Are these modded games free to download?',
                a: 'Yes, 100% free. You will never be asked for credit card details. To keep our high-speed CDN servers online, downloads are protected by quick sponsored app verification.'
              },
              {
                q: 'Do I need to root my Android phone or jailbreak my iPhone?',
                a: 'No! All mods provided on mobilegames4u.space are pre-signed and packaged to run on stock, non-rooted Android devices (via standard APK) and unmodified iOS devices.'
              },
              {
                q: 'Why do I need to complete verification?',
                a: 'To prevent automated scraping bots and DDoS leechers from exhausting our high-speed cloud mirrors, we use a quick verification gateway. Completing one brief sponsored action instantly unlocks your clean file download.'
              },
              {
                q: 'Will I get banned from online multiplayer games?',
                a: 'Our modifications include custom packet masking and anti-ban proxies that simulate standard client requests. However, for games with leaderboard rankings, we always suggest using an alt account to be 100% safe.'
              },
              {
                q: 'How do I update when a new game version comes out?',
                a: 'Simply bookmark mobilegames4u.space and return here. We update all game packages within 24 hours of official game releases.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-[#111827] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B7280] transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-[#D72323]' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#4B5563] leading-relaxed border-t border-[#E5E7EB]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Centered Clean Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] py-8 px-4 text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <Link href="/" className="flex items-center">
              <WebsiteLogo size="sm" />
            </Link>
            <p className="text-xs text-[#6B7280]">
              Official domain: <span className="text-[#D72323] font-mono font-semibold">{SITE_CONFIG.domain}</span>
            </p>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] text-[11px] text-[#9CA3AF] space-y-2 leading-relaxed max-w-3xl mx-auto">
            <p>
              <strong>Disclaimer:</strong> {SITE_CONFIG.name} is a curation platform for community game utilities, modifications, and tutorials for educational and testing purposes. All registered trademarks, game titles, and logos belong to their respective developers and publishers. We do not host copyrighted files on our origin servers. All download links redirect to third-party verification lockers.
            </p>
            <p>
              © {new Date().getFullYear()} mobilegames4u.space • All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Download Modal Popup */}
      <DownloadModal
        game={selectedGameForModal}
        onClose={() => setSelectedGameForModal(null)}
      />
    </div>
  );
}
