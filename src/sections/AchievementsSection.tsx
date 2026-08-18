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
  Check
} from 'lucide-react';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
  onUnlockAchievement: (id: string) => void;
  onUnlockAllAchievements?: () => void;
  onNextChapter: () => void;
  onOpenSecretModal: (type: 'DO_NOT_CLICK' | 'SISTER_ROAST') => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onUnlockAchievement,
  onUnlockAllAchievements,
  onNextChapter,
  onOpenSecretModal
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

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
                onClick={handleUnlockAll}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-pixel text-xs border-2 border-yellow-200 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95"
              >
                <Zap size={14} className="fill-black" />
                <span>⚡ UNLOCK ALL (100% S-RANK)</span>
              </button>

              {percentComplete >= 100 ? (
                <div className="px-3 py-1.5 bg-emerald-950 border-2 border-emerald-400 text-emerald-300 font-pixel text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]">
                  <Award size={14} /> 100% S-RANK BROTHER
                </div>
              ) : (
                <div className="px-3 py-1.5 bg-amber-950 border border-amber-400 text-amber-300 font-pixel text-xs">
                  A-RANK IN PROGRESS
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-black border-2 border-zinc-700 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="text-[11px] font-mono text-zinc-400">
            💡 <em>Tip: Click on any trophy card to instantly claim and unlock that achievement!</em>
          </div>
        </div>

        {/* Achievement Grid with 1-Click Interactive Unlock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item) => {
            const isUnlocked = item.unlocked;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isUnlocked) {
                    handleClaimAchievement(item.id);
                  } else {
                    sound.playClick();
                    setSelectedAchievement(item);
                  }
                }}
                className={`p-4 border-2 transition-all cursor-pointer relative group ${
                  isUnlocked
                    ? 'bg-zinc-900/90 border-amber-400 shadow-[4px_4px_0px_#78350f] hover:border-amber-300'
                    : 'bg-zinc-950/80 border-zinc-700 hover:border-amber-500 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-2xl border-2 shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-950/80 border-amber-400 shadow-[2px_2px_0px_#000000]'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-400 group-hover:border-amber-400'
                    }`}
                  >
                    {isUnlocked ? item.icon : item.icon}
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

                    {isUnlocked && item.unlockedAt ? (
                      <div className="text-[9px] font-mono text-zinc-500 mt-1">
                        Unlocked at: {item.unlockedAt}
                      </div>
                    ) : (
                      <div className="text-[9px] font-mono text-amber-400/80 mt-1">
                        👉 Click card to unlock
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
              Do not touch unless you are prepared for sibling consequences.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onOpenSecretModal('DO_NOT_CLICK')}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-pixel text-[10px] border-2 border-rose-300 shadow-[3px_3px_0px_#000000] active:scale-95 cursor-pointer"
            >
              ⚠️ DO NOT CLICK
            </button>

            <button
              onClick={() => handleClaimAchievement('master_actor')}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-pixel text-[10px] border-2 border-purple-300 shadow-[3px_3px_0px_#000000] active:scale-95 cursor-pointer"
            >
              🎭 CLAIM MASTER ACTOR
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
