import React, { useState, useEffect } from 'react';
import { sound } from '../services/soundEffects';
import { Heart, Sparkles, ChevronRight, Moon, Star } from 'lucide-react';

interface FinalArcSectionProps {
  onProceedToEnding: () => void;
}

export const FinalArcSection: React.FC<FinalArcSectionProps> = ({ onProceedToEnding }) => {
  const [step, setStep] = useState(0);
  const [typedMessageIndex, setTypedMessageIndex] = useState(0);

  const introLines = [
    'Not every character enters your story for a reason.',
    'Some simply become part of it.',
    'And no matter how many levels we complete...',
    'some people remain our permanent teammates.'
  ];

  const letterLines = [
    'Annaya,',
    '',
    'We fight.',
    'We irritate each other.',
    'You call me Pandhi.',
    'I probably annoy you more than I should.',
    '',
    'But whenever I really need someone,',
    "you're there.",
    '',
    "You've supported me in more ways",
    'than I probably say out loud.',
    '',
    'So today, I just want you to know:',
    '',
    'You are one of the biggest reasons',
    'I know I can keep going.',
    '',
    'Happy Birthday, Annaya.',
    '',
    'Your biggest supporter has a message',
    'for her greatest supporter. ❤️'
  ];

  // Sequence transitions
  useEffect(() => {
    sound.playBGM('emotional');
    const timer = setTimeout(() => {
      setStep(1);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step >= 1 && step < 5) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 5 && typedMessageIndex < letterLines.length) {
      const timer = setTimeout(() => {
        sound.playType();
        setTypedMessageIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [step, typedMessageIndex, letterLines.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-zinc-950 to-indigo-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden font-tech select-none">
      {/* Floating starry night particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              opacity: (i % 5) * 0.2 + 0.3,
              animationDuration: `${(i % 4) + 2}s`
            }}
          />
        ))}
      </div>

      {/* Subtle warm lantern/firefly glow */}
      <div className="absolute w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10 space-y-8 my-auto">
        {/* Intro Atmosphere Quotes (Steps 1 - 4) */}
        {step < 5 && (
          <div className="text-center space-y-6 min-h-[220px] flex flex-col items-center justify-center animate-in fade-in duration-1000">
            <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-500/50 flex items-center justify-center text-indigo-300 mx-auto">
              <Moon size={18} />
            </div>

            <div className="text-xs font-pixel text-indigo-400/80 tracking-widest">
              SYSTEM ARCHIVE // CHAPTER 05
            </div>

            <div className="space-y-4">
              {introLines.slice(0, step).map((line, idx) => (
                <p
                  key={idx}
                  className={`text-lg sm:text-2xl font-mono text-zinc-300 transition-opacity duration-1000 ${
                    idx === step - 1 ? 'text-white font-semibold' : 'text-zinc-500'
                  }`}
                >
                  &quot;{line}&quot;
                </p>
              ))}
            </div>

            {step >= 1 && (
              <button
                onClick={() => setStep(5)}
                className="text-xs font-mono text-zinc-600 hover:text-zinc-400 underline pt-4"
              >
                [Skip Pause]
              </button>
            )}
          </div>
        )}

        {/* The Real Letter (Step 5+) */}
        {step >= 5 && (
          <div className="bg-zinc-950/80 border-2 border-indigo-500/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-md space-y-6 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-indigo-900/60 pb-4">
              <div className="flex items-center gap-2 font-pixel text-xs text-indigo-300">
                <Heart size={15} className="text-pink-400 fill-pink-400" />
                <span>FOR ANIL // FROM SISTER</span>
              </div>
              <div className="text-xs font-mono text-zinc-500">
                AUGUST 2026
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-3 font-mono text-sm sm:text-base leading-relaxed text-zinc-200">
              {letterLines.slice(0, typedMessageIndex).map((line, idx) => (
                <p
                  key={idx}
                  className={`min-h-[1.5rem] ${
                    line.startsWith('Happy Birthday')
                      ? 'text-lg sm:text-xl font-bold text-amber-300 font-pixel pt-4'
                      : line.includes('greatest supporter')
                      ? 'text-pink-300 font-bold'
                      : ''
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Next Chapter / Ending Button */}
            {typedMessageIndex >= letterLines.length && (
              <div className="pt-6 border-t border-indigo-900/60 flex justify-end animate-in fade-in duration-700">
                <button
                  onClick={() => {
                    sound.playLevelUp();
                    onProceedToEnding();
                  }}
                  className="px-6 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-pixel text-xs sm:text-sm border-2 border-pink-300 shadow-[4px_4px_0px_#4c0519] flex items-center gap-3 cursor-pointer transform hover:scale-105 active:scale-95 transition"
                >
                  <span>LEVEL 22 COMPLETE → CLAIM FINALE</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
