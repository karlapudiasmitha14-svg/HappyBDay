import React, { useState, useEffect, useCallback } from 'react';
import { SYSTEM_SCANS } from '../data/characterData';
import { sound } from '../services/soundEffects';
import { Terminal, ShieldAlert, Cpu, ChevronRight } from 'lucide-react';

interface BootSectionProps {
  onStartGame: () => void;
}

export const BootSection: React.FC<BootSectionProps> = ({ onStartGame }) => {
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [scanIndex, setScanIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Boot sequence simulation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setBootStep(1);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (bootStep === 1) {
      sound.playBoot();
      const stepTimer = setTimeout(() => {
        setBootStep(2);
      }, 700);
      return () => clearTimeout(stepTimer);
    }
  }, [bootStep]);

  useEffect(() => {
    if (bootStep === 2) {
      if (scanIndex < SYSTEM_SCANS.length) {
        const scanTimer = setTimeout(() => {
          sound.playType();
          setScanIndex((prev) => prev + 1);
        }, 180);
        return () => clearTimeout(scanTimer);
      } else {
        const readyTimer = setTimeout(() => {
          setIsReady(true);
        }, 500);
        return () => clearTimeout(readyTimer);
      }
    }
  }, [bootStep, scanIndex]);

  // Handle enter key to start
  const handleBegin = useCallback(() => {
    sound.playClick();
    onStartGame();
  }, [onStartGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        handleBegin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBegin]);

  return (
    <div 
      className="min-h-screen bg-black text-emerald-400 font-mono flex flex-col items-center justify-center p-4 sm:p-6 relative select-none"
      onClick={() => {
        if (isReady) handleBegin();
      }}
    >
      {/* Background terminal matrix grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#059669_1px,transparent_1px),linear-gradient(to_bottom,#059669_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-2xl w-full bg-zinc-950/90 border-2 border-emerald-500/80 p-6 sm:p-8 shadow-[8px_8px_0px_#064e3b] relative z-10">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-900 mb-6">
          <div className="flex items-center gap-2 font-pixel text-xs text-emerald-300">
            <Terminal size={16} className="animate-pulse text-emerald-400" />
            <span>AI-STUDIO // BIOS v22.0.8</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-pixel">
            <Cpu size={14} />
            <span>CORE: 22.0 GHZ</span>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between font-pixel text-xs text-emerald-300">
            <span>LOADING WORLD...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-4 bg-zinc-900 border border-emerald-800 p-0.5 overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-75 shadow-[0_0_10px_#10b981]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* System Diagnostics */}
        {bootStep >= 1 && (
          <div className="space-y-4 text-xs sm:text-sm animate-in fade-in">
            <div className="p-3 bg-zinc-900/80 border border-emerald-900 space-y-1 font-tech text-emerald-300 text-sm sm:text-base">
              <div className="text-zinc-400 font-pixel text-xs">SYSTEM BOOTING...</div>
              <div>&gt; WORLD: <span className="text-yellow-400 font-bold">BIRTHDAY ARC (2026 EDITION)</span></div>
              <div>&gt; TARGET PLAYER FOUND: <span className="text-white font-bold text-lg font-pixel">ANIL</span></div>
              <div className="flex flex-wrap gap-4 text-xs text-zinc-400 pt-1 font-mono">
                <span>AGE: <strong className="text-emerald-300">22</strong></span>
                <span>CLASS: <strong className="text-cyan-300">OLDER BROTHER</strong></span>
                <span>RANK: <strong className="text-amber-300 font-bold">LEGENDARY</strong></span>
              </div>
            </div>

            {/* Scanning traits */}
            {bootStep >= 2 && (
              <div className="space-y-2 border border-emerald-950 p-3 bg-black/60">
                <div className="text-[11px] font-pixel text-zinc-400 pb-1 border-b border-zinc-900 flex items-center justify-between">
                  <span>BIO-METRIC SCAN PROGRESS</span>
                  <span>[{scanIndex}/{SYSTEM_SCANS.length}]</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono">
                  {SYSTEM_SCANS.slice(0, scanIndex).map((scan, i) => (
                    <div key={i} className="flex items-center justify-between p-1 bg-zinc-950/60 border border-zinc-900">
                      <span className="text-zinc-300 truncate mr-2">&gt; {scan.label}</span>
                      <span className={`${scan.color} font-bold text-[11px] whitespace-nowrap`}>
                        {scan.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Threat Level */}
            {scanIndex >= SYSTEM_SCANS.length && (
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between font-pixel text-[11px] text-rose-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-rose-500 animate-bounce" /> THREAT LEVEL TO SISTER:
                    </span>
                    <span className="font-bold">99% [EXTREME]</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-900 border border-rose-900 p-0.5">
                    <div className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 w-[99%] animate-pulse" />
                  </div>
                </div>

                <div className="p-2.5 bg-rose-950/30 border border-rose-800 text-rose-300 text-xs font-mono">
                  <span className="text-yellow-400 font-bold">SYSTEM WARNING:</span> PLAYER IS EXTREMELY DIFFICULT TO CONTROL. FREQUENT ROASTING DETECTED.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Start Action Button */}
        <div className="mt-8 flex flex-col items-center justify-center">
          {isReady ? (
            <button
              onClick={handleBegin}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-pixel text-sm sm:text-base border-4 border-emerald-300 shadow-[6px_6px_0px_#064e3b] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
              <span>[ PRESS ENTER TO BEGIN ]</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition rotate-180" />
            </button>
          ) : (
            <div className="font-pixel text-xs text-zinc-600 animate-pulse">
              INITIALIZING BIRTHDAY ARC MATRIX...
            </div>
          )}
          <span className="text-[10px] text-zinc-500 mt-3 font-mono">
            TOUCH SCREEN OR PRESS ENTER KEY TO START
          </span>
        </div>
      </div>
    </div>
  );
};
