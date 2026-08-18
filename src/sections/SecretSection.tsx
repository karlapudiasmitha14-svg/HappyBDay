import React, { useState } from 'react';
import { sound } from '../services/soundEffects';
import { 
  FileText, 
  Terminal, 
  Sparkles, 
  Heart, 
  Download, 
  RotateCcw, 
  Check, 
  Award,
  BookOpen,
  LogOut,
  Power
} from 'lucide-react';

interface SecretSectionProps {
  onRestart: () => void;
  onGoToChapter?: (chapter: 'CHARACTER_SELECT' | 'ACHIEVEMENTS' | 'TITLE') => void;
}

export const SecretSection: React.FC<SecretSectionProps> = ({ onRestart, onGoToChapter }) => {
  const [downloaded, setDownloaded] = useState(false);

  const secretLetterContent = `=====================================================
CONFIDENTIAL SISTER TRANSMISSION // FILE: FOR_ANIL.txt
=====================================================

Hey Annaya,

If you found this secret file, it means you completed your 22nd Birthday Arc!

I know we spend 90% of our day arguing, but I notice everything you do for me:

• How whenever I try to do anything, you always look at me and say: "Pandhi, sarigha cheyi!" with that serious face.
• How you're always busy coding or riding your TVS Ronin, but whenever I need anything, you're the first one there.
• How we fight over the last piece of chicken or sweets, but you'll always make sure I'm well fed.
• How you protected me and took the blame whenever we caused chaos as kids.
• And even though you call me "Pandhi" 24/7, you've always been my greatest shield and real-life hero.

You're turning 22, and seeing how hard you work on your coding and how good a person you are makes me so proud to be your sister.

No matter how old we get or how much you yell "sarigha cheyi!", you will always be my favourite older brother.

Happy 22nd Birthday, Dhunnaya! ❤️

Now log off, go eat lots of biryani and sweets, and enjoy your birthday!

With lots of love,
Your Sister (aka "Pandhi" 🐷)
August 2026
=====================================================`;

  const handleDownloadFile = () => {
    sound.playLevelUp();
    const blob = new Blob([secretLetterContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FOR_ANIL_BIRTHDAY_2026.txt';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-black text-emerald-400 py-10 px-4 sm:px-6 font-mono relative flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-6 relative z-10 my-auto">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-3">
          <div className="flex items-center gap-2 font-pixel text-xs text-emerald-300">
            <Terminal size={16} className="text-emerald-400 animate-pulse" />
            <span>SECURE SYSTEM TERMINAL // FOR_ANIL.txt</span>
          </div>
          <div className="text-[10px] font-pixel text-yellow-400 bg-yellow-950/60 px-2 py-0.5 border border-yellow-500/60">
            CONFIDENTIAL ★ 100% UNLOCKED
          </div>
        </div>

        {/* Letter File View */}
        <div className="bg-zinc-950 border-4 border-emerald-500 p-6 sm:p-8 shadow-[8px_8px_0px_#064e3b] space-y-4">
          <div className="flex items-center gap-2 text-xs font-pixel text-amber-400 border-b border-zinc-800 pb-2">
            <FileText size={16} />
            <span>FILE: /assets/classified/FOR_ANIL.txt</span>
          </div>

          <pre className="whitespace-pre-wrap text-xs sm:text-sm font-mono text-emerald-200 leading-relaxed overflow-x-auto bg-black/70 p-4 border border-emerald-950">
            {secretLetterContent}
          </pre>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-pixel text-xs border-2 border-emerald-300 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95"
            >
              {downloaded ? <Check size={14} /> : <Download size={14} />}
              <span>{downloaded ? 'SAVED TO DEVICE!' : 'DOWNLOAD AS .TXT'}</span>
            </button>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onRestart();
                }}
                className="px-4 py-2.5 bg-rose-700 hover:bg-rose-600 active:bg-rose-800 text-white font-pixel text-xs border-2 border-rose-400 shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer transition active:scale-95"
              >
                <LogOut size={14} />
                <span>LOG OUT &amp; EXIT SYSTEM</span>
              </button>
              <button
                onClick={onRestart}
                className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-pixel text-[10px] border border-zinc-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={12} /> RESTART ARC
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
