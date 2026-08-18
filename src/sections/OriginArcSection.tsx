import React, { useState, useEffect } from 'react';
import { PHOTO_MEMORIES, ExtendedPhotoMemory } from '../data/photosData';
import { sound } from '../services/soundEffects';
import { 
  Camera, 
  ChevronRight, 
  Lock, 
  X, 
  Maximize2,
  ZoomIn,
  Sparkles,
  Flame,
  Award,
  Shield,
  Heart
} from 'lucide-react';

interface OriginArcSectionProps {
  onNextChapter: () => void;
  onUnlockAchievement: (id: string) => void;
  onOpenSecretModal: (type: 'TOP_SECRET') => void;
}

// Stylized Retro Manga Scene Artwork for Each Episode
const EpisodeSceneArt: React.FC<{ memory: ExtendedPhotoMemory }> = ({ memory }) => {
  const { photoId } = memory;

  if (photoId === 'banana-protocol') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-950 via-zinc-900 to-yellow-950/80 p-4 flex flex-col justify-between relative overflow-hidden">
        {/* Background Comic Dots */}
        <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none" />
        <div className="flex justify-between items-center z-10">
          <span className="px-2 py-0.5 bg-yellow-400 text-black font-pixel text-[9px] font-bold border border-yellow-200">
            🍌 BANANA PROTOCOL
          </span>
          <span className="font-pixel text-[9px] text-yellow-300">ERA: TODDLER</span>
        </div>

        <div className="my-auto text-center z-10 space-y-2">
          <div className="text-5xl filter drop-shadow-[0_4px_8px_rgba(234,179,8,0.5)] animate-bounce">
            🍌 👶
          </div>
          <div className="bg-black/80 p-2 border border-amber-400/80 text-amber-200 font-pixel text-[10px]">
            &quot;SALE LSS NAVY CREW 470&quot;
          </div>
          <p className="text-[11px] font-mono text-zinc-300">
            Yellow shirt toddler Anil meets baby sister holding the sacred banana artifact
          </p>
        </div>

        <div className="flex justify-between text-[9px] font-mono text-amber-400/90 z-10">
          <span>CONFUSION: 100%</span>
          <span>WEAPON: BANANA</span>
        </div>
      </div>
    );
  }

  if (photoId === 'sweet-feeding') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-950 via-zinc-900 to-purple-950/80 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none" />
        <div className="flex justify-between items-center z-10">
          <span className="px-2 py-0.5 bg-pink-500 text-white font-pixel text-[9px] font-bold border border-pink-300">
            🍬 SWEET TRUCE
          </span>
          <span className="font-pixel text-[9px] text-pink-300">FOOD: +100</span>
        </div>

        <div className="my-auto text-center z-10 space-y-2">
          <div className="text-5xl filter drop-shadow-[0_4px_8px_rgba(236,72,153,0.5)]">
            🍬 😋 👧
          </div>
          <div className="bg-black/80 p-2 border border-pink-400/80 text-pink-200 font-pixel text-[10px]">
            RARE SIBLING PEACETIME
          </div>
          <p className="text-[11px] font-mono text-zinc-300">
            Sister feeding sweet directly into young Anil&apos;s mouth
          </p>
        </div>

        <div className="flex justify-between text-[9px] font-mono text-pink-300 z-10">
          <span>FOOD RADAR: ACTIVE</span>
          <span>PEACE DURATION: 10s</span>
        </div>
      </div>
    );
  }

  if (photoId === 'foot-touching-ceremony') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-950 via-zinc-900 to-amber-950/90 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none" />
        <div className="flex justify-between items-center z-10">
          <span className="px-2 py-0.5 bg-red-600 text-white font-pixel text-[9px] font-bold border border-red-300">
            👑 ROYALTY SMIRK
          </span>
          <span className="font-pixel text-[9px] text-yellow-400">AURA: +999999</span>
        </div>

        <div className="my-auto text-center z-10 space-y-2">
          <div className="text-5xl filter drop-shadow-[0_4px_8px_rgba(239,68,68,0.5)]">
            👑 🙇‍♀️ 🟨
          </div>
          <div className="bg-black/80 p-2 border border-yellow-400/80 text-yellow-300 font-pixel text-[10px]">
            FESTIVAL HIERARCHY
          </div>
          <p className="text-[11px] font-mono text-zinc-300">
            Royal red shirt Anil with yellow tray accepting sister&apos;s foot-touching blessings
          </p>
        </div>

        <div className="flex justify-between text-[9px] font-mono text-yellow-400 z-10">
          <span>DISCOUNT: 50%</span>
          <span>STATUS: EMPEROR</span>
        </div>
      </div>
    );
  }

  if (photoId === 'derp-unbreakable') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-950 via-zinc-900 to-rose-950/90 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 manga-dots opacity-25 pointer-events-none" />
        <div className="flex justify-between items-center z-10">
          <span className="px-2 py-0.5 bg-rose-600 text-white font-pixel text-[9px] font-bold border border-rose-300 animate-pulse">
            🚨 TOP SECRET VAULT
          </span>
          <span className="font-pixel text-[9px] text-rose-300">DERP: 100/100</span>
        </div>

        <div className="my-auto text-center z-10 space-y-2">
          <div className="text-5xl filter drop-shadow-[0_4px_8px_rgba(244,63,94,0.5)]">
            🤪 📸 💥
          </div>
          <div className="bg-black/80 p-2 border border-rose-400/80 text-rose-300 font-pixel text-[10px]">
            &quot;CONQUER UNBREAKABLE SPIRIT&quot;
          </div>
          <p className="text-[11px] font-mono text-zinc-300">
            3 AM distorted ultra-wide smile selfie with unbreakable energy
          </p>
        </div>

        <div className="flex justify-between text-[9px] font-mono text-rose-400 z-10">
          <span>BLACKMAIL: MAX</span>
          <span>ENERGY: OVER 9000</span>
        </div>
      </div>
    );
  }

  if (photoId === 'bed-coder-selfie') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-950 via-zinc-900 to-indigo-950/80 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none" />
        <div className="flex justify-between items-center z-10">
          <span className="px-2 py-0.5 bg-cyan-600 text-white font-pixel text-[9px] font-bold border border-cyan-300">
            🛏️ SLOTH PROTOCOL
          </span>
          <span className="font-pixel text-[9px] text-cyan-300">CHILL: 100%</span>
        </div>

        <div className="my-auto text-center z-10 space-y-2">
          <div className="text-5xl filter drop-shadow-[0_4px_8px_rgba(6,182,212,0.5)]">
            😴 🛌 💻
          </div>
          <div className="bg-black/80 p-2 border border-cyan-400/80 text-cyan-200 font-pixel text-[10px]">
            &quot;I WILL CODE LATER&quot;
          </div>
          <p className="text-[11px] font-mono text-zinc-300">
            Tactical horizontal recharge mode: zero guilt, maximum comfort
          </p>
        </div>

        <div className="flex justify-between text-[9px] font-mono text-cyan-300 z-10">
          <span>PRODUCTIVITY: 0%</span>
          <span>RECHARGE: MAX</span>
        </div>
      </div>
    );
  }

  // bike-protagonist
  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-zinc-900 to-teal-950/80 p-4 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none" />
      <div className="flex justify-between items-center z-10">
        <span className="px-2 py-0.5 bg-emerald-500 text-black font-pixel text-[9px] font-bold border border-emerald-300">
          🏍️ RONIN RIDER
        </span>
        <span className="font-pixel text-[9px] text-emerald-300">LVL 22 ACHIEVED</span>
      </div>

      <div className="my-auto text-center z-10 space-y-2">
        <div className="text-5xl filter drop-shadow-[0_4px_8px_rgba(16,185,129,0.5)]">
          🏍️ 🧥 🌙
        </div>
        <div className="bg-black/80 p-2 border border-emerald-400/80 text-emerald-300 font-pixel text-[10px]">
          MAIN CHARACTER AURA
        </div>
        <p className="text-[11px] font-mono text-zinc-300">
          Anil sitting on the TVS Ronin in black jacket under city lights
        </p>
      </div>

      <div className="flex justify-between text-[9px] font-mono text-emerald-300 z-10">
        <span>ROLE: #1 BROTHER</span>
        <span>AURA: MASTER RANK</span>
      </div>
    </div>
  );
};

export const OriginArcSection: React.FC<OriginArcSectionProps> = ({
  onNextChapter,
  onUnlockAchievement,
  onOpenSecretModal
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ExtendedPhotoMemory | null>(null);
  const [customPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('anil_arc_custom_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleInspectClassified = (memory: ExtendedPhotoMemory) => {
    sound.playLevelUp();
    onUnlockAchievement('classified_archive');
    onOpenSecretModal('TOP_SECRET');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-10 px-4 sm:px-6 font-tech relative">
      {/* Halftone Manga Pattern */}
      <div className="pointer-events-none absolute inset-0 manga-dots opacity-15" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Chapter Header with Retro Pixel-Border */}
        <div className="text-center space-y-3 border-b-4 border-amber-500 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border-2 border-amber-400 font-pixel text-xs text-amber-400 shadow-[3px_3px_0px_#000000]">
            <Camera size={14} className="text-yellow-300" />
            <span>CHAPTER 02 // MANGA CHRONICLES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-manga tracking-wider text-amber-400 drop-shadow-[2px_2px_0px_#000000]">
            EPISODE 001: THE ORIGIN ARC
          </h1>
          <p className="font-mono text-xs sm:text-sm text-zinc-400">
            &quot;THE LEGENDARY SIBLING PHOTO ARCHIVE: FROM BANANA THEFT TO RONIN RIDER&quot;
          </p>
        </div>

        {/* Narrative Intro Box with Pixel Borders */}
        <div className="bg-zinc-900 border-4 border-amber-400 p-5 sm:p-6 shadow-[8px_8px_0px_#000000] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-manga text-lg sm:text-2xl text-yellow-300">
              PROLOGUE: 22 YEARS OF SIBLING COMBAT &amp; MEMORIES
            </span>
            <span className="text-[10px] font-pixel bg-rose-600 text-white px-2.5 py-1 border border-rose-300 shadow-[2px_2px_0px_#000000]">
              CONFIDENTIAL ARCHIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
            Click on any photo episode card in the gallery grid below to view full-screen chronicles, read sister commentary, and inspect confidential sibling archives!
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE GALLERY GRID (Clean & Focused) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHOTO_MEMORIES.map((memory, index) => {
            const hasError = imageErrors[memory.id];
            const hasCustom = customPhotos[memory.id];
            const hasValidImage = !hasError && Boolean(hasCustom);

            return (
              <div
                key={memory.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPhoto(memory);
                }}
                className={`bg-zinc-900 border-4 ${
                  memory.isClassified
                    ? 'border-rose-500 hover:border-rose-400'
                    : 'border-amber-400 hover:border-yellow-300'
                } p-4 shadow-[6px_6px_0px_#000000] hover:shadow-[8px_8px_0px_#f59e0b] transition-all flex flex-col justify-between cursor-pointer group relative`}
              >
                {/* Card Top Badges */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-zinc-800">
                  <span className="font-pixel text-[10px] text-amber-400">
                    EPISODE 0{index + 1}
                  </span>
                  <span className="text-[9px] font-pixel px-2 py-0.5 bg-purple-950 border border-purple-400 text-purple-300">
                    BLACKMAIL: {memory.blackmailLevel}/100
                  </span>
                </div>

                {/* Photo / Artwork Canvas Container */}
                <div className="my-3 aspect-[4/3] bg-black border-2 border-zinc-700 relative overflow-hidden flex items-center justify-center group-hover:border-amber-400 transition-colors shadow-[3px_3px_0px_#000000]">
                  {hasValidImage ? (
                    <img
                      src={hasCustom}
                      alt={memory.imageAlt}
                      onError={() => handleImageError(memory.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <EpisodeSceneArt memory={memory} />
                  )}

                  {/* Hover Fullscreen Overlay Prompt */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-amber-500 text-black font-pixel text-[10px] border border-yellow-200 shadow-[2px_2px_0px_#000000] flex items-center gap-1.5">
                      <ZoomIn size={12} /> CLICK TO OPEN FULLSCREEN
                    </span>
                  </div>
                </div>

                {/* Card Text & Commentary */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cyber font-bold text-sm text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {memory.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-300 mt-1 line-clamp-2 leading-snug">
                      {memory.caption}
                    </p>
                  </div>

                  {/* Sibling Commentary Box */}
                  <div className="bg-black/70 p-2.5 border-l-2 border-pink-500 font-mono text-[11px] text-pink-200 italic line-clamp-2 mt-2">
                    <strong className="text-pink-400 not-italic block font-pixel text-[9px] mb-0.5">
                      🐷 SISTER:
                    </strong>
                    &quot;{memory.sisterCommentary}&quot;
                  </div>
                </div>

                {/* Card Action View Footer */}
                <div className="mt-3 pt-3 border-t-2 border-zinc-800 flex items-center justify-between">
                  <span className="font-pixel text-[9px] text-zinc-500">
                    CLICK TO EXPAND
                  </span>
                  <div className="px-2.5 py-1 bg-zinc-800 group-hover:bg-amber-500 group-hover:text-black text-zinc-200 font-pixel text-[9px] border border-zinc-600 group-hover:border-yellow-200 shadow-[2px_2px_0px_#000000] flex items-center gap-1 transition">
                    <Maximize2 size={10} />
                    <span>VIEW MEMORY</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* FULL-SCREEN MODAL WITH PROMINENT CLOSE BUTTON */}
        {/* ========================================================================= */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-zinc-950 border-4 border-amber-400 p-5 sm:p-7 shadow-[10px_10px_0px_#000000] relative cursor-default space-y-5 my-auto"
            >
              {/* Modal Header with Prominent 'X' Close Button */}
              <div className="flex items-center justify-between border-b-2 border-amber-500/60 pb-3 gap-3">
                <div className="font-pixel text-xs sm:text-sm text-amber-400 flex items-center gap-2 truncate">
                  <Camera size={16} />
                  <span>MANGA ARCHIVE // {selectedPhoto.photoId.toUpperCase()}</span>
                </div>
                
                {/* PROMINENT CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-pixel text-xs sm:text-sm border-2 border-rose-300 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition transform active:scale-95 shrink-0"
                >
                  <X size={18} />
                  <span>CLOSE [ESC]</span>
                </button>
              </div>

              {/* Modal Grid: Photo Preview & Narrative Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Visual Frame */}
                <div className="md:col-span-6 space-y-3">
                  <div className="aspect-[4/3] max-h-[50vh] bg-black border-4 border-zinc-700 shadow-[4px_4px_0px_#000000] overflow-hidden flex items-center justify-center relative">
                    {!imageErrors[selectedPhoto.id] && customPhotos[selectedPhoto.id] ? (
                      <img
                        src={customPhotos[selectedPhoto.id]}
                        alt={selectedPhoto.imageAlt}
                        onError={() => handleImageError(selectedPhoto.id)}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <EpisodeSceneArt memory={selectedPhoto} />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedPhoto.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-pixel px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Narrative & Dialogue Content */}
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-pixel px-2 py-0.5 bg-purple-950 border border-purple-400 text-purple-300 inline-block mb-1">
                      BLACKMAIL RATING: {selectedPhoto.blackmailLevel} / 100
                    </span>
                    <h3 className="font-cyber font-bold text-xl text-white">
                      {selectedPhoto.title}
                    </h3>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900 p-3 border-l-4 border-amber-400">
                    {selectedPhoto.caption}
                  </p>

                  <div className="p-3 bg-zinc-900 border-l-4 border-pink-500 font-mono text-xs sm:text-sm text-pink-200 italic space-y-1">
                    <strong className="text-pink-400 block not-italic font-pixel text-[10px]">
                      🐷 SISTER&apos;S COMMENTARY:
                    </strong>
                    <p>&quot;{selectedPhoto.sisterCommentary}&quot;</p>
                  </div>

                  <div className="p-3 bg-zinc-900/60 border-l-4 border-amber-400/60 font-mono text-xs sm:text-sm text-amber-200 italic space-y-1">
                    <strong className="text-amber-400 block not-italic font-pixel text-[10px]">
                      🛡️ ANIL&apos;S DEFENSE:
                    </strong>
                    <p>{selectedPhoto.anilsDefense}</p>
                  </div>

                  {selectedPhoto.isClassified && (
                    <button
                      onClick={() => handleInspectClassified(selectedPhoto)}
                      className="w-full p-3 bg-rose-600 hover:bg-rose-500 text-white font-pixel text-xs border-2 border-rose-300 shadow-[3px_3px_0px_#4c0519] flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <Lock size={14} />
                      <span>OPEN SISTER BLACKMAIL VAULT (PRIORITY 1)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Bottom Bar with Close Button */}
              <div className="pt-3 border-t-2 border-zinc-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-pixel text-xs border-2 border-zinc-500 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95"
                >
                  <X size={16} />
                  <span>✕ CLOSE ARCHIVE [ESC]</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Proceed to Chapter 03 */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onNextChapter();
            }}
            className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs sm:text-sm border-4 border-amber-300 shadow-[6px_6px_0px_#78350f] transition transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
          >
            <span>ENTER CHAPTER 03: BOSS RUSH</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
