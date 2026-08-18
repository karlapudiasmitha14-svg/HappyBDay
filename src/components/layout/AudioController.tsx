import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc, Sparkles } from 'lucide-react';
import { sound } from '../../services/soundEffects';

interface AudioControllerProps {
  isMuted: boolean;
  volume: number;
  currentBgm: 'retro' | 'battle' | 'emotional' | 'party' | 'off';
  onToggleMute: () => void;
  onVolumeChange: (vol: number) => void;
  onBgmChange: (track: 'retro' | 'battle' | 'emotional' | 'party' | 'off') => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isMuted,
  volume,
  currentBgm,
  onToggleMute,
  onVolumeChange,
  onBgmChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tracks = [
    { id: 'retro', name: '8-Bit Shonen Adventure' },
    { id: 'battle', name: 'Boss Rush Battle' },
    { id: 'emotional', name: 'Heartfelt Sister Theme' },
    { id: 'party', name: 'Level 22 Celebration' },
    { id: 'off', name: 'Mute Music' }
  ] as const;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Expanded Control Box */}
      {isOpen && (
        <div className="mb-2 w-64 bg-zinc-950/95 border-2 border-emerald-500/80 p-3 shadow-[4px_4px_0px_#000000] text-emerald-400 font-tech text-sm backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-900">
            <span className="font-pixel text-xs text-emerald-300 flex items-center gap-1.5">
              <Disc size={13} className="animate-spin text-emerald-400" /> BGM CASSETTE
            </span>
            <span className="text-[10px] text-zinc-400 font-pixel">CHIP-SYNTH</span>
          </div>

          {/* Equalizer visualizer */}
          <div className="flex items-end justify-center gap-1 h-6 my-2 bg-black/60 p-1 border border-emerald-900/50">
            {[40, 75, 100, 60, 85, 30, 95, 50].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-emerald-400 transition-all duration-150"
                style={{
                  height: isMuted || currentBgm === 'off' ? '15%' : `${(h * (volume + 0.2)) % 100}%`,
                  opacity: isMuted || currentBgm === 'off' ? 0.2 : 0.9
                }}
              />
            ))}
          </div>

          {/* Track selector */}
          <div className="space-y-1 my-2">
            <div className="text-[11px] font-pixel text-zinc-400">TRACK SELECT:</div>
            {tracks.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playClick();
                  onBgmChange(t.id);
                }}
                className={`w-full text-left px-2 py-1 text-xs transition-colors flex items-center justify-between border ${
                  currentBgm === t.id && !isMuted
                    ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                    : 'bg-zinc-900/50 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                <span>{t.name}</span>
                {currentBgm === t.id && !isMuted && <Sparkles size={10} className="text-emerald-400" />}
              </button>
            ))}
          </div>

          {/* Volume slider */}
          <div className="pt-2 border-t border-emerald-900 flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="text-emerald-400 hover:text-emerald-300 p-1"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onVolumeChange(val);
                if (isMuted && val > 0) onToggleMute();
              }}
              className="w-full h-1.5 bg-zinc-800 accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-2 px-3 py-2 border-2 ${
          isMuted || currentBgm === 'off'
            ? 'bg-zinc-950 border-zinc-700 text-zinc-400'
            : 'bg-zinc-950 border-emerald-400 text-emerald-400 shadow-[3px_3px_0px_#059669]'
        } hover:scale-105 transition-transform active:scale-95 font-pixel text-xs`}
      >
        <Music size={14} className={isMuted || currentBgm === 'off' ? '' : 'animate-bounce text-emerald-300'} />
        <span className="hidden sm:inline">BGM</span>
        <span className="text-[10px] text-zinc-400">[{isMuted ? 'MUTED' : currentBgm.toUpperCase()}]</span>
      </button>
    </div>
  );
};
