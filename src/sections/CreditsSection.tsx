import React, { useState, useEffect } from 'react';
import { sound } from '../services/soundEffects';
import { 
  Film, 
  Sparkles, 
  Heart, 
  Key, 
  RotateCcw, 
  Smile, 
  Gamepad2, 
  Code, 
  Tv, 
  Utensils,
  LogOut
} from 'lucide-react';

interface CreditsSectionProps {
  onUnlockSecretFile: () => void;
  onRestart: () => void;
  onSecretTriggered: (key: string) => void;
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({
  onUnlockSecretFile,
  onRestart,
  onSecretTriggered
}) => {
  const [showSecretPrompt, setShowSecretPrompt] = useState(false);

  useEffect(() => {
    sound.playBGM('emotional');
    const timer = setTimeout(() => {
      setShowSecretPrompt(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const creditItems = [
    { role: 'MAIN PROTAGONIST & LEVEL 22 HERO', name: 'ANIL (DHUNNAYA / REY)' },
    { role: 'SPECIAL GUEST & SIBLING ANTAGONIST', name: 'PANDHI (YOUR SISTER) 🐷' },
    { role: 'ORIGINAL STORY & MEMORIES', name: 'BASED ON 22 YEARS OF TRUE SIBLING COMBAT' },
    { role: 'DIRECTED & CODED WITH LOVE BY', name: 'YOUR ANNOYING SISTER ❤️' },
    { role: 'OFFICIAL WEAPONS OF CHOICE', name: 'MECHANICAL KEYBOARD, SMARTPHONE & ANIME' },
    { role: 'FAVORITE BATTLES', name: 'WHO GETS THE FOOD & FREE FIRE CLUTCHES' },
    { role: 'STATUS IN SISTER’S HEART', name: 'GREATEST SUPPORTER (FOREVER UNBEATABLE)' }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 font-tech flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* 90s Anime CRT Vignette Background */}
      <div className="absolute inset-0 bg-radial from-purple-950/20 via-black to-black pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10 my-auto">
        {/* Title */}
        <div className="space-y-2 border-b-2 border-zinc-800 pb-6">
          <div className="font-pixel text-xs text-purple-400 flex items-center justify-center gap-2">
            <Film size={14} className="text-purple-400" />
            <span>ANIME ENDING CREDITS // THE BIRTHDAY ARC</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-widest text-white">
            THE BIRTHDAY ARC
          </h1>
          <div className="text-xs font-mono text-zinc-500">
            SEASON 22 // FINALE EPISODE
          </div>
        </div>

        {/* Rolling Cast & Roles */}
        <div className="space-y-6">
          {creditItems.map((item, idx) => (
            <div key={idx} className="space-y-1 animate-in fade-in duration-700">
              <div className="font-pixel text-[10px] sm:text-xs text-amber-400/90 tracking-wider">
                {item.role}
              </div>
              <div className="text-lg sm:text-xl font-cyber font-bold text-white">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright & Production */}
        <div className="pt-6 border-t-2 border-zinc-800 text-xs font-mono text-zinc-500 space-y-1">
          <div>© 2026 THE BIRTHDAY ARC PRODUCTIONS</div>
          <div>ALL RIGHTS RESERVED TO SIBLING MEMORIES</div>
        </div>

        {/* Secret Post-Credits Teaser */}
        {showSecretPrompt && (
          <div className="pt-4 p-4 bg-zinc-950 border-2 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.2)] text-center space-y-3 animate-in zoom-in-95">
            <div className="font-pixel text-xs text-purple-300 flex items-center justify-center gap-2">
              <Key size={14} className="animate-bounce" />
              <span>POST-CREDITS SECRET DISCOVERED!</span>
            </div>
            <p className="text-xs font-mono text-zinc-300">
              There is an encrypted confidential document left behind on the system...
            </p>
            <button
              onClick={() => {
                sound.playLevelUp();
                onSecretTriggered('POST_CREDITS_FILE');
                onUnlockSecretFile();
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-pixel text-xs border-2 border-purple-300 shadow-[4px_4px_0px_#2e1065] cursor-pointer active:scale-95 transition"
            >
              🔓 OPEN SECRET FILE: &quot;FOR_ANIL.txt&quot;
            </button>
          </div>
        )}

        {/* End Actions: Logout / Restart */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 active:bg-rose-800 text-white font-pixel text-xs border-2 border-rose-400 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95"
          >
            <LogOut size={14} />
            <span>LOG OUT &amp; EXIT</span>
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-pixel text-xs border border-zinc-700 flex items-center gap-2 cursor-pointer transition"
          >
            <RotateCcw size={14} /> REPLAY FROM START
          </button>
        </div>
      </div>
    </div>
  );
};
