import React, { useState, useEffect } from 'react';
import { PHOTO_MEMORIES, ExtendedPhotoMemory } from '../data/photosData';
import { sound } from '../services/soundEffects';
import { 
  Camera, 
  ChevronRight, 
  Lock, 
  X, 
  Maximize2,
  Upload,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  ZoomIn
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
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('anil_arc_custom_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Persist custom photos to localStorage
  const saveCustomPhoto = (id: string, dataUrl: string) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev, [id]: dataUrl };
      try {
        localStorage.setItem('anil_arc_custom_photos', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage error:', err);
      }
      return updated;
    });
    setImageErrors((prev) => ({ ...prev, [id]: false }));
    sound.playLevelUp();
  };

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

  const handleFileUpload = (id: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        saveCustomPhoto(id, uploadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setCustomPhotos((prev) => {
      const copy = { ...prev };
      delete copy[id];
      try {
        localStorage.setItem('anil_arc_custom_photos', JSON.stringify(copy));
      } catch (err) {
        console.warn(err);
      }
      return copy;
    });
    setImageErrors((prev) => ({ ...prev, [id]: false }));
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
            Click on any photo card in the gallery grid below to view high-resolution memories, read sister commentary, and upload custom photos!
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE GALLERY GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHOTO_MEMORIES.map((memory, index) => {
            const hasError = imageErrors[memory.id];
            const hasCustomPhoto = Boolean(customPhotos[memory.id]);
            const displayImage = customPhotos[memory.id] || memory.placeholderPath;

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

                {/* Photo Preview Thumbnail */}
                <div className="my-3 aspect-[4/3] bg-black border-2 border-zinc-700 relative overflow-hidden flex items-center justify-center group-hover:border-amber-400 transition-colors shadow-[3px_3px_0px_#000000]">
                  {!hasError && displayImage ? (
                    <img
                      src={displayImage}
                      alt={memory.imageAlt}
                      onError={() => handleImageError(memory.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-zinc-950">
                      <span className="text-3xl mb-1">
                        {memory.isClassified ? '🤪' : memory.photoId === 'banana-protocol' ? '🍌' : memory.photoId === 'foot-touching-ceremony' ? '👑' : memory.photoId === 'bike-protagonist' ? '🏍️' : '📸'}
                      </span>
                      <div className="font-pixel text-[10px] text-amber-300 truncate max-w-full">
                        {memory.contextTitle}
                      </div>
                    </div>
                  )}

                  {/* Hover Zoom Tag */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-amber-500 text-black font-pixel text-[10px] border border-yellow-200 shadow-[2px_2px_0px_#000000] flex items-center gap-1.5">
                      <ZoomIn size={12} /> OPEN FULLSCREEN
                    </span>
                  </div>

                  {/* Status Indicator */}
                  {hasCustomPhoto && (
                    <div className="absolute top-2 right-2 bg-emerald-950/90 border border-emerald-400 text-emerald-300 font-pixel text-[8px] px-1.5 py-0.5">
                      LOADED ✓
                    </div>
                  )}
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

                  {/* Sibling Commentary Snippet */}
                  <div className="bg-black/60 p-2 border-l-2 border-pink-500 font-mono text-[11px] text-pink-200 italic line-clamp-2 mt-2">
                    <strong className="text-pink-400 not-italic block font-pixel text-[9px]">🐷 SISTER:</strong>
                    &quot;{memory.sisterCommentary}&quot;
                  </div>
                </div>

                {/* Card Action Controls */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="mt-3 pt-3 border-t-2 border-zinc-800 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    {/* Hidden input for card upload */}
                    <input
                      id={`grid-upload-${memory.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(memory.id, file);
                      }}
                    />
                    <label
                      htmlFor={`grid-upload-${memory.id}`}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-[9px] cursor-pointer border border-yellow-300 shadow-[2px_2px_0px_#000000] flex items-center gap-1 transition select-none active:scale-95"
                    >
                      <Upload size={10} />
                      <span>{hasCustomPhoto ? 'REPLACE' : 'UPLOAD'}</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedPhoto(memory);
                      }}
                      className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-pixel text-[9px] border border-zinc-600 flex items-center gap-1 cursor-pointer select-none"
                    >
                      <Maximize2 size={10} />
                      <span>VIEW</span>
                    </button>
                  </div>

                  {hasCustomPhoto && (
                    <button
                      type="button"
                      onClick={(e) => handleResetPhoto(memory.id, e)}
                      className="text-[9px] font-pixel text-zinc-400 hover:text-rose-400 flex items-center gap-0.5 underline cursor-pointer p-1"
                      title="Reset to default"
                    >
                      <RotateCcw size={9} /> Reset
                    </button>
                  )}
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
                {/* Photo Viewer */}
                <div className="md:col-span-6 space-y-3">
                  <div className="aspect-[4/3] max-h-[50vh] bg-black border-4 border-zinc-700 shadow-[4px_4px_0px_#000000] overflow-hidden flex items-center justify-center relative">
                    {customPhotos[selectedPhoto.id] || selectedPhoto.placeholderPath ? (
                      <img
                        src={customPhotos[selectedPhoto.id] || selectedPhoto.placeholderPath}
                        alt={selectedPhoto.imageAlt}
                        onError={() => handleImageError(selectedPhoto.id)}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-6 text-zinc-400 font-mono text-xs">
                        No image uploaded yet for this episode.
                      </div>
                    )}
                  </div>

                  {/* In-Modal Upload Control */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <input
                        id={`modal-upload-${selectedPhoto.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(selectedPhoto.id, file);
                        }}
                      />
                      <label
                        htmlFor={`modal-upload-${selectedPhoto.id}`}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs border-2 border-yellow-300 shadow-[2px_2px_0px_#000000] cursor-pointer flex items-center gap-2 select-none active:scale-95"
                      >
                        <Upload size={13} />
                        <span>CHANGE / UPLOAD PHOTO</span>
                      </label>
                    </div>

                    {customPhotos[selectedPhoto.id] && (
                      <button
                        type="button"
                        onClick={(e) => handleResetPhoto(selectedPhoto.id, e)}
                        className="text-xs font-pixel text-zinc-400 hover:text-rose-400 flex items-center gap-1 underline cursor-pointer"
                      >
                        <RotateCcw size={11} /> Reset to default
                      </button>
                    )}
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
