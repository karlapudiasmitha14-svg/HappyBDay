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
  Heart,
  Shield,
  Award
} from 'lucide-react';

interface OriginArcSectionProps {
  onNextChapter: () => void;
  onUnlockAchievement: (id: string) => void;
  onOpenSecretModal: (type: 'TOP_SECRET') => void;
}

export const OriginArcSection: React.FC<OriginArcSectionProps> = ({
  onNextChapter,
  onUnlockAchievement,
  onOpenSecretModal
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ExtendedPhotoMemory | null>(null);

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
            Click on any photo card in the gallery grid below to view high-resolution memories in full screen, inspect comic tags, and read confidential sister commentary!
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE GALLERY GRID (Direct Display of All 6 Photos) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHOTO_MEMORIES.map((memory, index) => {
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

                {/* Photo Thumbnail */}
                <div className="my-3 aspect-[4/3] bg-black border-2 border-zinc-700 relative overflow-hidden flex items-center justify-center group-hover:border-amber-400 transition-colors shadow-[3px_3px_0px_#000000]">
                  <img
                    src={memory.placeholderPath}
                    alt={memory.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Hover Fullscreen Prompt */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-amber-500 text-black font-pixel text-[10px] border border-yellow-200 shadow-[2px_2px_0px_#000000] flex items-center gap-1.5">
                      <ZoomIn size={12} /> OPEN FULLSCREEN
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
                    CLICK TO VIEW
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
                  <div className="aspect-[4/3] max-h-[52vh] bg-black border-4 border-zinc-700 shadow-[4px_4px_0px_#000000] overflow-hidden flex items-center justify-center relative">
                    <img
                      src={selectedPhoto.placeholderPath}
                      alt={selectedPhoto.imageAlt}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
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
