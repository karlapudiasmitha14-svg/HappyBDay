import React, { useState } from 'react';
import { AchievementItem } from '../types';
import { sound } from '../services/soundEffects';
import { 
  Trophy, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  Flame, 
  HelpCircle, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  Zap, 
  Gamepad2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  X
} from 'lucide-react';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
  onUnlockAchievement: (id: string) => void;
  onUnlockAllAchievements?: () => void;
  onNextChapter: () => void;
  onOpenSecretModal: (type: 'DO_NOT_CLICK' | 'SISTER_ROAST' | 'KONAMI') => void;
}

const KONAMI_KEYS = ['UP', 'UP', 'DOWN', 'DOWN', 'LEFT', 'RIGHT', 'LEFT', 'RIGHT', 'B', 'A'];

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onUnlockAchievement,
  onUnlockAllAchievements,
  onNextChapter,
  onOpenSecretModal
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);
  const [showCheatPad, setShowCheatPad] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const percentComplete = Math.round((unlockedCount / totalCount) * 100);

  const handleUnlockAll = () => {
    sound.playLevelUp();
    if (onUnlockAllAchievements) {
      onUnlockAllAchievements();
    } else {
      achievements.forEach((a) => onUnlockAchievement(a.id));
    }
  };

  const handleClaimAchievement = (id: string) => {
    sound.playAchievement();
    onUnlockAchievement(id);
    if (id === 'konami_warrior') {
      onOpenSecretModal('KONAMI');
    }
  };

  const handleKeypadPress = (key: string) => {
    sound.playClick();
    const expected = KONAMI_KEYS[sequenceIndex];
    if (key === expected) {
      const next = sequenceIndex + 1;
      if (next === KONAMI_KEYS.length) {
        sound.playLevelUp();
        onUnlockAchievement('konami_warrior');
        setSequenceIndex(0);
        setShowCheatPad(false);
        onOpenSecretModal('KONAMI');
      } else {
        setSequenceIndex(next);
      }
    } else {
      sound.playHit();
      setSequenceIndex(0);
    }
  };

  const handleInstantCheatUnlock = () => {
    sound.playLevelUp();
    onUnlockAchievement('konami_warrior');
    setShowCheatPad(false);
    onOpenSecretModal('KONAMI');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 font-tech relative">
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Chapter Header */}
        <div className="text-center space-y-2 border-b-2 border-amber-500/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400 font-pixel text-xs text-amber-400">
            <Trophy size={14} className="text-yellow-400 animate-pulse" />
            <span>CHAPTER 04 // TROPHY ROOM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
            ACHIEVEMENT ENGINE
          </h1>
          <p className="font-mono text-xs sm:text-sm text-zinc-400">
            RECORD OF ANIL&apos;S 22 YEARS OF HEROIC, GAMING &amp; SIBLING FEATS
          </p>
        </div>

        {/* Progress Bar & Summary Card + Unlock All Button */}
        <div className="bg-zinc-900 border-4 border-amber-400 p-6 shadow-[8px_8px_0px_#000000] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-pixel text-xs text-zinc-400">ARC COMPLETION PROGRESS:</span>
              <div className="text-2xl sm:text-3xl font-cyber font-black text-white">
                {unlockedCount} / {totalCount} UNLOCKED ({percentComplete}%)
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowCheatPad(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-pixel text-xs border-2 border-purple-300 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95 animate-pulse"
              >
                <Gamepad2 size={15} />
                <span>👾 30 LIVES RETRO CHEAT PAD</span>
              </button>

              <button
                onClick={handleUnlockAll}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-pixel text-xs border-2 border-yellow-200 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95"
              >
                <Zap size={14} className="fill-black" />
                <span>⚡ UNLOCK ALL (100% S-RANK)</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-black border-2 border-zinc-700 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="text-[11px] font-mono text-zinc-400 flex flex-wrap items-center justify-between gap-2">
            <span>💡 <em>Tip: Click any achievement card or use the Cheat Pad to instantly unlock!</em></span>
            <span className="text-amber-400 font-pixel text-[10px]">
              CHEAT SEQUENCE: ↑ ↑ ↓ ↓ ← → ← → B A
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE RETRO CHEAT KEYPAD MODAL */}
        {/* ========================================================================= */}
        {showCheatPad && (
          <div 
            onClick={() => setShowCheatPad(false)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full bg-zinc-950 border-4 border-amber-400 p-6 shadow-[10px_10px_0px_#000000] relative space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b-2 border-amber-500 pb-3">
                <div className="font-pixel text-xs text-amber-400 flex items-center gap-2">
                  <Gamepad2 size={16} />
                  <span>30 LIVES RETRO CHEAT TERMINAL</span>
                </div>
                <button
                  onClick={() => setShowCheatPad(false)}
                  className="px-2.5 py-1 bg-rose-600 text-white font-pixel text-xs border border-rose-300 shadow-[2px_2px_0px_#000000] cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-cyber font-bold text-lg text-white">
                  ENTER THE KONAMI CODE
                </h3>
                <p className="font-mono text-xs text-zinc-400">
                  Tap buttons in sequence: <strong className="text-amber-300">↑ ↑ ↓ ↓ ← → ← → B A</strong> or click Instant Activate!
                </p>
              </div>

              {/* Sequence Progress Display */}
              <div className="bg-black p-3 border-2 border-zinc-700 flex flex-wrap items-center justify-center gap-1.5 min-h-[48px]">
                {KONAMI_KEYS.map((key, i) => {
                  const isDone = i < sequenceIndex;
                  const isCurrent = i === sequenceIndex;
                  return (
                    <span
                      key={i}
                      className={`font-pixel text-[10px] px-2 py-1 border transition-all ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-300 text-white font-bold'
                          : isCurrent
                          ? 'bg-amber-500 text-black border-yellow-200 animate-pulse font-bold scale-110'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                      }`}
                    >
                      {key}
                    </span>
                  );
                })}
              </div>

              {/* On-Screen Gamepad / Arcade D-Pad */}
              <div className="bg-zinc-900 p-4 border-2 border-zinc-800 space-y-4">
                <div className="grid grid-cols-2 gap-4 items-center">
                  {/* D-PAD */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleKeypadPress('UP')}
                      className="w-11 h-11 bg-zinc-800 hover:bg-amber-500 hover:text-black active:bg-amber-400 text-zinc-200 font-pixel text-xs border-2 border-zinc-600 shadow-[2px_2px_0px_#000000] flex items-center justify-center cursor-pointer transition active:scale-90"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleKeypadPress('LEFT')}
                        className="w-11 h-11 bg-zinc-800 hover:bg-amber-500 hover:text-black active:bg-amber-400 text-zinc-200 font-pixel text-xs border-2 border-zinc-600 shadow-[2px_2px_0px_#000000] flex items-center justify-center cursor-pointer transition active:scale-90"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        onClick={() => handleKeypadPress('DOWN')}
                        className="w-11 h-11 bg-zinc-800 hover:bg-amber-500 hover:text-black active:bg-amber-400 text-zinc-200 font-pixel text-xs border-2 border-zinc-600 shadow-[2px_2px_0px_#000000] flex items-center justify-center cursor-pointer transition active:scale-90"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        onClick={() => handleKeypadPress('RIGHT')}
                        className="w-11 h-11 bg-zinc-800 hover:bg-amber-500 hover:text-black active:bg-amber-400 text-zinc-200 font-pixel text-xs border-2 border-zinc-600 shadow-[2px_2px_0px_#000000] flex items-center justify-center cursor-pointer transition active:scale-90"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* ACTION BUTTONS B & A */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleKeypadPress('B')}
                      className="w-13 h-13 rounded-full bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-pixel text-sm font-bold border-2 border-rose-300 shadow-[3px_3px_0px_#000000] flex items-center justify-center cursor-pointer transition active:scale-90"
                    >
                      B
                    </button>
                    <button
                      onClick={() => handleKeypadPress('A')}
                      className="w-13 h-13 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-pixel text-sm font-bold border-2 border-red-300 shadow-[3px_3px_0px_#000000] flex items-center justify-center cursor-pointer transition active:scale-90"
                    >
                      A
                    </button>
                  </div>
                </div>
              </div>

              {/* Instant 1-Click Activate Button */}
              <button
                onClick={handleInstantCheatUnlock}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-pixel text-xs border-2 border-yellow-200 shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Zap size={14} className="fill-black" />
                <span>⚡ 1-CLICK INSTANT UNLOCK (30 LIVES GOD MODE)</span>
              </button>
            </div>
          </div>
        )}

        {/* Achievement Grid with 1-Click Interactive Unlock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item) => {
            const isUnlocked = item.unlocked;
            const isKonami = item.id === 'konami_warrior';

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isKonami && !isUnlocked) {
                    setShowCheatPad(true);
                  } else if (!isUnlocked) {
                    handleClaimAchievement(item.id);
                  } else {
                    sound.playClick();
                    if (isKonami) {
                      onOpenSecretModal('KONAMI');
                    } else {
                      setSelectedAchievement(item);
                    }
                  }
                }}
                className={`p-4 border-2 transition-all cursor-pointer relative group ${
                  isUnlocked
                    ? 'bg-zinc-900/90 border-amber-400 shadow-[4px_4px_0px_#78350f] hover:border-amber-300'
                    : isKonami
                    ? 'bg-purple-950/40 border-purple-400 shadow-[4px_4px_0px_#581c87] hover:border-pink-400 animate-pulse'
                    : 'bg-zinc-950/80 border-zinc-700 hover:border-amber-500 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-2xl border-2 shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-950/80 border-amber-400 shadow-[2px_2px_0px_#000000]'
                        : isKonami
                        ? 'bg-purple-900 border-purple-400 text-pink-300'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-400 group-hover:border-amber-400'
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-pixel text-xs text-white truncate">
                        {item.title}
                      </h3>
                      {isUnlocked ? (
                        <span className="text-[9px] font-pixel text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={11} /> UNLOCKED
                        </span>
                      ) : isKonami ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCheatPad(true);
                          }}
                          className="text-[9px] font-pixel px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-pink-300 flex items-center gap-1 cursor-pointer animate-bounce"
                        >
                          <Gamepad2 size={10} /> ENTER CHEAT
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClaimAchievement(item.id);
                          }}
                          className="text-[9px] font-pixel px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-black border border-yellow-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Zap size={9} /> CLAIM
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-zinc-300 font-mono mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    {isUnlocked ? (
                      <div className="text-[9px] font-mono text-emerald-400 mt-1">
                        {isKonami ? '🎮 +30 Sibling Lives Active (Click to inspect)' : '✓ Unlocked'}
                      </div>
                    ) : (
                      <div className="text-[9px] font-mono text-amber-400/80 mt-1">
                        {isKonami ? '👉 Click to open Retro Cheat Pad' : '👉 Click card to unlock'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Exploration / Easter Egg Controls */}
        <div className="bg-zinc-900 border-4 border-rose-500 p-4 sm:p-6 shadow-[8px_8px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-pixel text-xs text-rose-400 flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldAlert size={14} /> EASTER EGG EXPERIMENTAL PROTOCOL
            </span>
            <p className="text-xs text-zinc-400 font-mono">
              Hidden secrets, roasts, and 30-Lives gamer cheats.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowCheatPad(true)}
              className="px-4 py-2.5 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-[10px] border-2 border-purple-300 shadow-[3px_3px_0px_#000000] active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Gamepad2 size={12} />
              <span>👾 30 LIVES CHEAT</span>
            </button>

            <button
              onClick={() => onOpenSecretModal('DO_NOT_CLICK')}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-pixel text-[10px] border-2 border-rose-300 shadow-[3px_3px_0px_#000000] active:scale-95 cursor-pointer"
            >
              ⚠️ DO NOT CLICK
            </button>

            <button
              onClick={() => handleClaimAchievement('master_actor')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-pixel text-[10px] border-2 border-indigo-300 shadow-[3px_3px_0px_#000000] active:scale-95 cursor-pointer"
            >
              🎭 MASTER ACTOR
            </button>

            <button
              onClick={() => onOpenSecretModal('SISTER_ROAST')}
              className="px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-pixel text-[10px] border-2 border-pink-300 shadow-[3px_3px_0px_#000000] active:scale-95 cursor-pointer"
            >
              🐷 SISTER SECRET
            </button>
          </div>
        </div>

        {/* Transition to Final Emotional Arc */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onNextChapter();
            }}
            className="px-6 py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-pixel text-xs sm:text-sm border-4 border-amber-300 shadow-[6px_6px_0px_#78350f] transition transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
          >
            <span>ENTER FINAL ARC: THE REAL STORY</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
