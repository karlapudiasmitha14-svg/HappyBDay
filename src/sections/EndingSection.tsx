import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEffects';
import { 
  Gift, 
  Sparkles, 
  Flame, 
  Heart, 
  ChevronRight, 
  Award, 
  RotateCcw,
  Trophy
} from 'lucide-react';

interface EndingSectionProps {
  onGoToCredits: () => void;
  onRestart: () => void;
}

export const EndingSection: React.FC<EndingSectionProps> = ({ onGoToCredits, onRestart }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    sound.playBGM('party');
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      sound.playLevelUp();

      // Launch multi-stage celebratory fireworks
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#f59e0b', '#fbbf24', '#f43f5e']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#06b6d4', '#10b981', '#ffffff']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#ec4899', '#8b5cf6', '#eab308']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      });
    }
  }, []);

  const handleBlowCandles = () => {
    sound.playLevelUp();
    setCandlesBlown(true);
    setWishMade(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-10 px-4 sm:px-6 font-tech flex flex-col items-center justify-center relative overflow-hidden">
      {/* Anime victory speedlines */}
      <div className="absolute inset-0 manga-speedlines opacity-25 pointer-events-none" />

      <div className="max-w-4xl w-full space-y-8 relative z-10 my-auto text-center">
        {/* Celebration Title Card */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border-2 border-amber-400 font-pixel text-xs text-amber-300 shadow-[4px_4px_0px_#000000]">
            <Sparkles size={16} className="text-yellow-300 animate-spin" />
            <span>SAVE FILE: LEVEL 22 COMPLETED</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-cyber font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-yellow-300">
            HAPPY BIRTHDAY ANIL! ❤️
          </h1>

          <p className="font-mono text-sm sm:text-base text-zinc-300">
            THE BIRTHDAY ARC // LEVEL 22 HAS BEEN SUCCESSFULLY CONQUERED!
          </p>
        </div>

        {/* Level Up System Card */}
        <div className="bg-zinc-900 border-4 border-amber-400 p-6 sm:p-8 shadow-[8px_8px_0px_#000000] text-left space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-2 border-zinc-800 pb-6 text-center">
            <div className="p-3 bg-black/60 border border-zinc-800">
              <span className="text-[10px] font-pixel text-zinc-500 block">PREVIOUS LEVEL</span>
              <span className="text-2xl font-cyber font-bold text-zinc-400">LVL 22</span>
            </div>
            <div className="p-3 bg-amber-950/60 border-2 border-amber-400">
              <span className="text-[10px] font-pixel text-amber-300 block">NEXT UPGRADED LEVEL</span>
              <span className="text-3xl font-cyber font-black text-yellow-300 animate-pulse">LVL 23</span>
            </div>
            <div className="p-3 bg-black/60 border border-zinc-800">
              <span className="text-[10px] font-pixel text-zinc-500 block">PLAYER TITLE</span>
              <span className="text-xl font-cyber font-bold text-pink-400">LEGENDARY BROTHER</span>
            </div>
          </div>

          {/* Interactive Birthday Cake */}
          <div className="bg-black/80 border-2 border-pink-500/80 p-6 flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl sm:text-7xl">
              {candlesBlown ? '🎂✨' : '🎂🕯️🕯️'}
            </div>

            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-pixel text-xs sm:text-sm border-2 border-yellow-300 shadow-[4px_4px_0px_#000000] cursor-pointer animate-bounce"
              >
                🌬️ BLOW OUT CANDLES &amp; MAKE A WISH!
              </button>
            ) : (
              <div className="p-3 bg-pink-950/60 border border-pink-400 text-pink-200 font-pixel text-xs text-center space-y-1 animate-in zoom-in-95">
                <div>✨ WISH RECORDED IN SYSTEM CLOUD ✨</div>
                <div className="font-mono text-zinc-300 text-xs">
                  May your code compile on the first try, your Free Fire matches always hit Booyah, and may you always know you are loved!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation / Credits Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onGoToCredits();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-pixel text-xs sm:text-sm border-4 border-purple-300 shadow-[6px_6px_0px_#2e1065] cursor-pointer transform hover:scale-105 active:scale-95 transition flex items-center justify-center gap-3"
          >
            <span>ROLL ANIME ENDING CREDITS</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
