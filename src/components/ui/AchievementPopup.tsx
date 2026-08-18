import React, { useEffect } from 'react';
import { AchievementItem } from '../../types';
import { Trophy, X } from 'lucide-react';

interface AchievementPopupProps {
  achievement: AchievementItem | null;
  onDismiss: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onDismiss }) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-bounce sm:max-w-md">
      <div className="bg-zinc-950 border-4 border-amber-400 p-4 shadow-[6px_6px_0px_#000000] text-amber-300 relative">
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-zinc-500 hover:text-amber-400 p-1"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-3xl p-2 bg-amber-400/20 border-2 border-amber-400 rounded">
            {achievement.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs font-pixel text-amber-400 tracking-wider">
              <Trophy size={14} className="animate-spin text-yellow-300" />
              ACHIEVEMENT UNLOCKED!
            </div>
            <div className="font-pixel text-sm text-white mt-1">
              {achievement.title}
            </div>
            <div className="text-xs text-zinc-300 font-tech mt-1">
              {achievement.description}
            </div>
          </div>
        </div>

        <div className="mt-2 h-1 w-full bg-zinc-800 overflow-hidden">
          <div className="h-full bg-amber-400 animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
};
