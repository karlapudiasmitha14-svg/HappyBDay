import React from 'react';
import { sound } from '../../services/soundEffects';
import { 
  ShieldAlert, 
  X, 
  Sparkles, 
  Laugh, 
  Heart, 
  FileText, 
  Lock, 
  Key,
  Skull,
  Award
} from 'lucide-react';

export type EasterEggType = 'KONAMI' | 'TOP_SECRET' | 'DO_NOT_CLICK' | 'SISTER_ROAST' | null;

interface EasterEggModalProps {
  type: EasterEggType;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in select-none">
      <div className="max-w-lg w-full bg-zinc-950 border-4 border-amber-400 p-6 shadow-[10px_10px_0px_#000000] relative font-tech">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1 border border-zinc-700 bg-zinc-900 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Konami Code Cheat */}
        {type === 'KONAMI' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-amber-500/20 border-2 border-amber-400 text-amber-300 rounded-full flex items-center justify-center mx-auto text-2xl">
              🎮
            </div>
            <div className="font-pixel text-xs text-amber-400">
              SECRET CHEAT CODE ACTIVATED: ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
            <h2 className="text-2xl font-cyber font-black text-white">
              +30 SIBLING LIVES &amp; GOD MODE UNLOCKED!
            </h2>
            <p className="text-xs font-mono text-zinc-300">
              Anil has activated the legendary gamer cheat code. Sister will now only argue at 50% power for the rest of his 22nd birthday.
            </p>
            <div className="p-3 bg-amber-950/60 border border-amber-500 text-xs font-mono text-amber-200">
              🏆 ACHIEVEMENT GRANTED: <strong>KONAMI SIBLING WARRIOR</strong>
            </div>
          </div>
        )}

        {/* Top Secret Classified Vault */}
        {type === 'TOP_SECRET' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-500 font-pixel text-xs border-b border-rose-900 pb-2">
              <ShieldAlert size={16} />
              <span>SISTER CLASSIFIED BLACKMAIL VAULT // FILE #004-DERP</span>
            </div>
            <h2 className="text-xl font-cyber font-black text-rose-400">
              INCIDENT REPORT: UNBREAKABLE SPIRIT 3 AM DERP
            </h2>
            <div className="p-4 bg-black border-2 border-rose-600/80 font-mono text-xs text-rose-200 space-y-2">
              <div><strong>SUBJECT:</strong> ANIL (DHUNNAYA)</div>
              <div><strong>SECURITY LEVEL:</strong> PRIORITY 1 (BLACKMAIL READY)</div>
              <div><strong>DESCRIPTION:</strong> Subject was caught taking an ultra-wide stretched smile selfie wearing a shirt labeled &quot;CONQUER UNBREAKABLE SPIRIT&quot; after 6 straight hours of coding.</div>
              <div><strong>SISTER COMMENT:</strong> &quot;I have backed up this photo in 3 different clouds. Try me, Annaya.&quot;</div>
            </div>
            <div className="text-right">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-pixel text-xs border border-rose-300"
              >
                CLOSE VAULT
              </button>
            </div>
          </div>
        )}

        {/* Do Not Click Trap */}
        {type === 'DO_NOT_CLICK' && (
          <div className="space-y-4 text-center">
            <div className="text-5xl animate-bounce">⚠️🐷</div>
            <div className="font-pixel text-xs text-rose-400">
              CRITICAL SYSTEM WARNING
            </div>
            <h2 className="text-xl font-cyber font-black text-white">
              YOU WERE SPECIFICALLY TOLD NOT TO CLICK!
            </h2>
            <p className="text-xs font-mono text-zinc-300">
              As a penalty for your extreme curiosity, Anil must buy his sister hot chicken biryani, sweets, or a chocolate shake within 48 hours.
            </p>
            <div className="p-3 bg-rose-950/60 border border-rose-500 text-rose-200 font-pixel text-[10px]">
              CONTRACT SIGNED: &quot;PANDHI&quot; WINS THIS ROUND.
            </div>
          </div>
        )}

        {/* Sister Roast */}
        {type === 'SISTER_ROAST' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-pink-400 font-pixel text-xs border-b border-pink-900 pb-2">
              <Heart size={16} className="text-pink-400 fill-pink-400" />
              <span>SISTER CONFIDENTIAL TRANSMISSION</span>
            </div>
            <h2 className="text-xl font-cyber font-black text-white">
              DEAR DHUNNAYA,
            </h2>
            <p className="text-xs font-mono text-zinc-200 leading-relaxed">
              Even though you call me Pandhi 90% of the time, argue about every small thing, and never admit when you&apos;re wrong — you are honestly the best older brother anyone could ever ask for.
            </p>
            <p className="text-xs font-mono text-pink-300">
              Happy 22nd Birthday, Annaya! Don&apos;t ever change. ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
