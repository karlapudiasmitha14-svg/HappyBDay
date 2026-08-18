import React, { useState } from 'react';
import { GameChapter, AchievementItem } from '../../types';
import { 
  Tv, 
  Trophy, 
  Menu, 
  X, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Gamepad2, 
  HeartHandshake, 
  User, 
  BookOpen, 
  Flame, 
  Award, 
  Gift, 
  Film, 
  Key 
} from 'lucide-react';
import { sound } from '../../services/soundEffects';

interface HeaderNavProps {
  currentChapter: GameChapter;
  unlockedChapters: GameChapter[];
  achievements: AchievementItem[];
  secretsFoundCount: number;
  crtEnabled: boolean;
  onToggleCRT: () => void;
  onGoToChapter: (chapter: GameChapter) => void;
  onReset: () => void;
  onOpenAchievementsModal?: () => void;
}

const CHAPTER_CONFIG: { id: GameChapter; label: string; icon: React.ReactNode; num: string }[] = [
  { id: 'BOOT', label: 'SYSTEM BOOT', icon: <Gamepad2 size={14} />, num: '00' },
  { id: 'CHARACTER_SELECT', label: 'CHARACTER SELECT', icon: <User size={14} />, num: '01' },
  { id: 'ORIGIN', label: 'ORIGIN ARC', icon: <BookOpen size={14} />, num: '02' },
  { id: 'BOSS_RUSH', label: 'BOSS RUSH', icon: <Flame size={14} />, num: '03' },
  { id: 'ACHIEVEMENTS', label: 'ACHIEVEMENTS', icon: <Award size={14} />, num: '04' },
  { id: 'FINAL_ARC', label: 'THE REAL STORY', icon: <HeartHandshake size={14} />, num: '05' },
  { id: 'ENDING', label: 'LEVEL 22 CELEBRATION', icon: <Gift size={14} />, num: '06' },
  { id: 'CREDITS', label: 'ANIME CREDITS', icon: <Film size={14} />, num: '07' },
  { id: 'SECRET', label: 'SECRET ARCHIVE', icon: <Key size={14} />, num: '??' }
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentChapter,
  unlockedChapters,
  achievements,
  secretsFoundCount,
  crtEnabled,
  onToggleCRT,
  onGoToChapter,
  onReset
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const unlockedAchievementsCount = achievements.filter((a) => a.unlocked).length;
  const currentChapterObj = CHAPTER_CONFIG.find((c) => c.id === currentChapter) || CHAPTER_CONFIG[0];

  return (
    <header className="sticky top-0 z-30 w-full bg-zinc-950/90 border-b-2 border-amber-500/80 backdrop-blur-md px-3 py-2 font-tech">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Player Identity HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-1.5 bg-amber-500/20 border border-amber-400 text-amber-300 hover:bg-amber-500/30 transition active:scale-95"
            aria-label="Toggle Chapter Navigation"
          >
            {drawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-pixel text-[10px] sm:text-xs text-amber-400">
              <span className="text-rose-500 font-bold animate-pulse">● P1</span>
              <span>ANIL</span>
              <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded text-[9px] border border-amber-400/50">
                LVL 22
              </span>
            </div>
            {/* Sibling HP / Mood gauge */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-zinc-400 font-pixel">HP</span>
              <div className="w-16 sm:w-24 h-2 bg-zinc-800 border border-zinc-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 w-full animate-pulse" />
              </div>
              <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">100/100</span>
            </div>
          </div>
        </div>

        {/* Middle: Current Chapter title */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1">
          <span className="text-xs font-pixel text-amber-400/80">CH.{currentChapterObj.num}</span>
          <span className="text-xs font-pixel text-white">{currentChapterObj.label}</span>
        </div>

        {/* Right: Quick tools & Achievement Counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Secrets counter */}
          <div
            title={`Secrets Discovered: ${secretsFoundCount}`}
            className="flex items-center gap-1 text-xs bg-purple-950/40 border border-purple-500/40 px-2 py-1 text-purple-300"
          >
            <Eye size={13} className="text-purple-400" />
            <span className="font-pixel text-[10px]">{secretsFoundCount}</span>
          </div>

          {/* Achievements count */}
          <button
            onClick={() => onGoToChapter('ACHIEVEMENTS')}
            title="View Achievements Room"
            className="flex items-center gap-1.5 text-xs bg-amber-950/40 border border-amber-500/60 px-2 py-1 text-amber-300 hover:bg-amber-500/20 transition"
          >
            <Trophy size={13} className="text-yellow-400" />
            <span className="font-pixel text-[10px]">
              {unlockedAchievementsCount}/{achievements.length}
            </span>
          </button>

          {/* CRT scanlines toggle */}
          <button
            onClick={onToggleCRT}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-1.5 border text-xs flex items-center gap-1 ${
              crtEnabled
                ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                : 'bg-zinc-900 border-zinc-700 text-zinc-500'
            }`}
          >
            <Tv size={14} />
            <span className="hidden sm:inline font-pixel text-[9px]">{crtEnabled ? 'CRT: ON' : 'CRT: OFF'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all birthday progress and start from System Boot?')) {
                onReset();
              }
            }}
            title="Reset Game Progress"
            className="p-1.5 border border-zinc-800 bg-zinc-900 hover:bg-rose-950/40 hover:border-rose-500 hover:text-rose-400 text-zinc-400 transition"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Chapter Drawer */}
      {drawerOpen && (
        <div className="fixed inset-x-0 top-[52px] bottom-0 bg-black/95 border-b-2 border-amber-500 p-4 z-40 overflow-y-auto max-w-2xl mx-auto backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="font-pixel text-sm text-amber-400 flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-400" /> THE BIRTHDAY ARC — CHAPTER SELECT
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            {CHAPTER_CONFIG.map((chap) => {
              const isUnlocked = unlockedChapters.includes(chap.id);
              const isCurrent = currentChapter === chap.id;

              return (
                <button
                  key={chap.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    sound.playClick();
                    onGoToChapter(chap.id);
                    setDrawerOpen(false);
                  }}
                  className={`p-3 text-left border flex items-center gap-3 transition-all ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-[3px_3px_0px_#f59e0b]'
                      : isUnlocked
                      ? 'bg-zinc-900/80 border-zinc-700 text-zinc-200 hover:border-amber-400 hover:bg-zinc-800'
                      : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div
                    className={`p-2 border text-xs ${
                      isCurrent
                        ? 'border-amber-400 bg-amber-400/30 text-yellow-300'
                        : isUnlocked
                        ? 'border-zinc-700 bg-zinc-800 text-zinc-400'
                        : 'border-zinc-900 bg-zinc-950 text-zinc-800'
                    }`}
                  >
                    {chap.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-pixel text-zinc-400">CH.{chap.num}</div>
                    <div className="font-pixel text-xs mt-0.5">
                      {isUnlocked ? chap.label : '???????? (LOCKED)'}
                    </div>
                  </div>
                  {isCurrent && <span className="font-pixel text-[10px] text-amber-400 animate-pulse">PLAYING</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-3 bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 font-mono flex items-center justify-between">
            <span>SAVED TO LOCAL STORAGE</span>
            <span className="text-amber-400 font-pixel text-[10px]">ANIL_BIRTHDAY_ARC_V1.0</span>
          </div>
        </div>
      )}
    </header>
  );
};
