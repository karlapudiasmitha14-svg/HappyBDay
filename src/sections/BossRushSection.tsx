import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../services/soundEffects';
import { BossProgress } from '../types';
import { 
  Flame, 
  Utensils, 
  Clock, 
  Crosshair, 
  Heart, 
  Sparkles, 
  ShieldAlert, 
  RefreshCw, 
  ChevronRight, 
  Swords,
  Award,
  AlertCircle,
  Bug,
  Code,
  Coffee,
  Zap,
  Smile,
  ShieldCheck
} from 'lucide-react';

interface BossRushSectionProps {
  bossProgress: BossProgress;
  onUpdateBossProgress: (updates: Partial<BossProgress>) => void;
  onUnlockAchievement: (id: string) => void;
  onNextChapter: () => void;
  onSecretTriggered: (key: string) => void;
}

type ActiveBossTab = 'FOOD' | 'DEADLINE' | 'FREE_FIRE' | 'PANDHI';

interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  points: number;
  x: number;
  y: number;
}

interface BugItem {
  id: number;
  text: string;
  fixed: boolean;
}

export const BossRushSection: React.FC<BossRushSectionProps> = ({
  bossProgress,
  onUpdateBossProgress,
  onUnlockAchievement,
  onNextChapter,
  onSecretTriggered
}) => {
  const [activeBoss, setActiveBoss] = useState<ActiveBossTab>('FOOD');

  // ==========================================
  // BOSS 01: FOOD (Interactive Devour Game)
  // ==========================================
  const [snacksDevoured, setSnacksDevoured] = useState(0);
  const [foodCombo, setFoodCombo] = useState(1);
  const [fallingFoods, setFallingFoods] = useState<FoodItem[]>([]);
  const [foodGameRunning, setFoodGameRunning] = useState(false);
  const [foodStatusMsg, setFoodStatusMsg] = useState<string | null>(null);

  const startFoodGame = () => {
    sound.playClick();
    setFoodGameRunning(true);
    setSnacksDevoured(0);
    setFoodCombo(1);
    setFoodStatusMsg('GO! CLICK AND GOBBLE ALL MIDNIGHT SNACKS!');
    spawnSnackWave();
  };

  const spawnSnackWave = () => {
    const snackList = [
      { emoji: '🍛', name: 'Hyderabadi Biryani', points: 50 },
      { emoji: '🍗', name: 'Crispy Chicken 65', points: 45 },
      { emoji: '🍬', name: 'Episode 02 Sweet', points: 40 },
      { emoji: '🍌', name: 'Sacred Banana', points: 60 },
      { emoji: '🥟', name: 'Hot Samosa', points: 35 },
      { emoji: '☕', name: 'Coder Chai', points: 25 },
      { emoji: '🍨', name: 'Ice Cream Cup', points: 30 }
    ];

    const items: FoodItem[] = Array.from({ length: 4 }).map((_, i) => {
      const randomSnack = snackList[Math.floor(Math.random() * snackList.length)];
      return {
        id: Date.now() + i,
        emoji: randomSnack.emoji,
        name: randomSnack.name,
        points: randomSnack.points,
        x: Math.floor(Math.random() * 75) + 10,
        y: Math.floor(Math.random() * 65) + 15
      };
    });

    setFallingFoods(items);
  };

  const handleEatSnack = (item: FoodItem) => {
    sound.playEat();
    const newDevoured = snacksDevoured + 1;
    const newCombo = foodCombo + 1;
    setSnacksDevoured(newDevoured);
    setFoodCombo(newCombo);
    setFallingFoods((prev) => prev.filter((f) => f.id !== item.id));

    if (newDevoured >= 10) {
      sound.playLevelUp();
      setFoodStatusMsg(`🏆 SSS-RANK FOOD RADAR! Anil devoured 10 snacks! Still hungry though!`);
      onUnlockAchievement('food_detected');
      onUpdateBossProgress({ foodDefeated: true });
      setFallingFoods([]);
      setFoodGameRunning(false);
    } else if (fallingFoods.length <= 1) {
      spawnSnackWave();
    }
  };

  // ==========================================
  // BOSS 02: DEADLINE & BUG SQUASH SIMULATOR
  // ==========================================
  const [bugList, setBugList] = useState<BugItem[]>([
    { id: 1, text: 'TypeError: cannot read properties of undefined (reading "sleep")', fixed: false },
    { id: 2, text: 'Bug: Brother promised to clean room before deadline', fixed: false },
    { id: 3, text: 'Memory Leak: 40 Crunchyroll tabs open in background', fixed: false },
    { id: 4, text: 'Unhandled Rejection: Sister disconnected the Wi-Fi router', fixed: false }
  ]);
  const [deadlineSeconds, setDeadlineSeconds] = useState(15);
  const [deadlineRunning, setDeadlineRunning] = useState(false);
  const [deadlineResult, setDeadlineResult] = useState<'WON' | 'PANIC' | null>(null);

  const startDeadlineChallenge = () => {
    sound.playClick();
    setDeadlineRunning(true);
    setDeadlineSeconds(15);
    setDeadlineResult(null);
    setBugList((prev) => prev.map((b) => ({ ...b, fixed: false })));
  };

  const handleFixBug = (bugId: number) => {
    sound.playHit();
    const updated = bugList.map((b) => (b.id === bugId ? { ...b, fixed: true } : b));
    setBugList(updated);

    if (updated.every((b) => b.fixed)) {
      sound.playLevelUp();
      setDeadlineRunning(false);
      setDeadlineResult('WON');
      onUnlockAchievement('code_survivor');
      onUpdateBossProgress({ deadlineDefeated: true });
    }
  };

  useEffect(() => {
    let timer: number;
    if (deadlineRunning && deadlineSeconds > 0) {
      timer = window.setInterval(() => {
        setDeadlineSeconds((prev) => {
          if (prev <= 1) {
            setDeadlineRunning(false);
            setDeadlineResult('PANIC');
            sound.playRage();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [deadlineRunning, deadlineSeconds]);

  // ==========================================
  // BOSS 03: FREE FIRE MINI-GAME (CLUTCH)
  // ==========================================
  const [ffGameActive, setFfGameActive] = useState(false);
  const [ffScore, setFfScore] = useState(0);
  const [ffTimeLeft, setFfTimeLeft] = useState(8);
  const [ffTargetPos, setFfTargetPos] = useState({ x: 50, y: 50 });
  const [ffOutcome, setFfOutcome] = useState<'WON' | 'LOST' | null>(null);
  const [ffHeadshotStreak, setFfHeadshotStreak] = useState(0);

  const startFreeFireGame = () => {
    sound.playClick();
    setFfGameActive(true);
    setFfScore(0);
    setFfTimeLeft(8);
    setFfOutcome(null);
    setFfHeadshotStreak(0);
    spawnFfTarget();
  };

  const spawnFfTarget = () => {
    const x = Math.floor(Math.random() * 70) + 15;
    const y = Math.floor(Math.random() * 60) + 20;
    setFfTargetPos({ x, y });
  };

  const handleShootTarget = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ffGameActive) return;
    sound.playAttack();
    const newScore = ffScore + 1;
    const newStreak = ffHeadshotStreak + 1;
    setFfScore(newScore);
    setFfHeadshotStreak(newStreak);

    if (newScore >= 6) {
      setFfGameActive(false);
      setFfOutcome('WON');
      sound.playLevelUp();
      onUnlockAchievement('rank_pusher');
      onUpdateBossProgress({ freeFireWon: true, freeFireScore: newScore });
    } else {
      spawnFfTarget();
    }
  };

  useEffect(() => {
    let timer: number;
    if (ffGameActive && ffTimeLeft > 0) {
      timer = window.setInterval(() => {
        setFfTimeLeft((prev) => {
          if (prev <= 1) {
            setFfGameActive(false);
            setFfOutcome('LOST');
            sound.playRage();
            onUnlockAchievement('rage_mode');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [ffGameActive, ffTimeLeft, onUnlockAchievement]);

  // ==========================================
  // FINAL BOSS: BOSS PANDHI 🐷 (TURN-BASED RPG)
  // ==========================================
  const [pandhiHp, setPandhiHp] = useState(9999);
  const [anilHp, setAnilHp] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([
    'FINAL BOSS PANDHI 🐷 appeared!',
    'Pandhi: "Rey Dhunnaya, prepare to lose our 500th argument!"'
  ]);
  const [pandhiDefeated, setPandhiDefeated] = useState(false);

  const addBattleLog = (msg: string) => {
    setBattleLog((prev) => [msg, ...prev.slice(0, 4)]);
  };

  const executeMove = (moveType: 'BANANA' | 'DERP_PHOTO' | 'ROYAL_AUTHORITY' | 'SARIGHA_CHEYI' | 'HUG') => {
    if (moveType === 'BANANA') {
      sound.playAttack();
      addBattleLog('🍌 Anil threw the Episode 001 Sacred Banana! Pandhi: "I was a toddler, that doesn\'t work!"');
    } else if (moveType === 'DERP_PHOTO') {
      sound.playGlitch();
      addBattleLog('🤪 Anil deployed the 3 AM Unbreakable Spirit Derp Photo! Pandhi counter-attacked with laughter!');
    } else if (moveType === 'ROYAL_AUTHORITY') {
      sound.playHit();
      addBattleLog('👑 Anil invoked the Festival Foot-Touching Authority! Pandhi: "That was only valid for 10 seconds!"');
    } else if (moveType === 'SARIGHA_CHEYI') {
      sound.playAttack();
      addBattleLog('🗣️ Anil yelled: "Pandhi, sarigha cheyi!" Pandhi: "Rey Dhunnaya, you do it properly first!" 😂');
      onUnlockAchievement('sarigha_cheyi');
    } else if (moveType === 'HUG') {
      sound.playLevelUp();
      setPandhiDefeated(true);
      addBattleLog('❤️ Anil activated Brother Love & Protection! Pandhi cannot fight love. SIBLING VICTORY!');
      onUnlockAchievement('legendary_brother');
      onUpdateBossProgress({ pandhiDefeated: true });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 font-tech relative">
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Chapter Header */}
        <div className="text-center space-y-2 border-b-2 border-rose-500/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-400 font-pixel text-xs text-rose-400">
            <Flame size={14} className="text-rose-500 animate-bounce" />
            <span>CHAPTER 03 // PLAYABLE SIBLING GAUNTLET</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-wider text-rose-500">
            BOSS RUSH ARC
          </h1>
          <p className="font-mono text-xs sm:text-sm text-zinc-400">
            PLAY REAL INTERACTIVE MINI-GAMES TO CONQUER ANIL&apos;S GREATEST CHALLENGES
          </p>
        </div>

        {/* Boss Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'FOOD', label: 'BOSS 01: FOOD', icon: <Utensils size={14} /> },
            { id: 'DEADLINE', label: 'BOSS 02: DEADLINE', icon: <Clock size={14} /> },
            { id: 'FREE_FIRE', label: 'BOSS 03: FREE FIRE', icon: <Crosshair size={14} /> },
            { id: 'PANDHI', label: 'FINAL BOSS: PANDHI', icon: <Heart size={14} className="text-pink-400" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveBoss(tab.id as ActiveBossTab);
              }}
              className={`p-3 border-2 font-pixel text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                activeBoss === tab.id
                  ? 'bg-rose-600 border-rose-300 text-white shadow-[4px_4px_0px_#4c0519]'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================== */}
        {/* BOSS 01: FOOD MINI-GAME */}
        {/* ========================================== */}
        {activeBoss === 'FOOD' && (
          <div className="bg-zinc-900 border-4 border-amber-400 p-6 shadow-[8px_8px_0px_#000000] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-800 pb-3">
              <div>
                <span className="font-pixel text-xs text-amber-400">BOSS 01 // INTERACTIVE MINI-GAME</span>
                <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white">THE MIDNIGHT FOOD CRAVINGS</h2>
              </div>
              <div className="text-right">
                <span className="font-pixel text-xs text-amber-400">SNACKS GOBBLED: {snacksDevoured}/10</span>
                <div className="text-xs text-zinc-400 font-mono">COMBO: x{foodCombo} NOM STREAK</div>
              </div>
            </div>

            {/* Interactive Food Snatching Arena */}
            <div className="relative h-72 bg-black border-4 border-amber-500/80 overflow-hidden select-none flex items-center justify-center">
              {!foodGameRunning && snacksDevoured < 10 && (
                <div className="text-center space-y-4 p-4 z-20">
                  <div className="text-5xl animate-bounce">🍕🍛🍌</div>
                  <div className="font-pixel text-xs sm:text-sm text-yellow-300">
                    CLICK &amp; GOBBLE 10 SNACKS BEFORE ANIL COLLAPSES OF HUNGER!
                  </div>
                  <button
                    onClick={startFoodGame}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs border-2 border-yellow-300 shadow-[4px_4px_0px_#000000] cursor-pointer active:scale-95"
                  >
                    ▶ START SNACK ATTACK
                  </button>
                </div>
              )}

              {foodGameRunning && (
                <>
                  <div className="absolute top-2 left-2 z-20 font-pixel text-xs text-amber-400 bg-black/80 px-2 py-1 border border-amber-500">
                    FOOD RADAR: ACTIVE (DEVOUR {10 - snacksDevoured} MORE)
                  </div>

                  {fallingFoods.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleEatSnack(item)}
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 p-2 bg-zinc-900/90 border-2 border-amber-400 rounded-full shadow-[0_0_15px_#f59e0b] transform hover:scale-125 active:scale-90 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-[9px] font-pixel text-amber-300 pr-1">{item.name}</span>
                    </button>
                  ))}
                </>
              )}

              {snacksDevoured >= 10 && (
                <div className="text-center space-y-3 z-20 p-4">
                  <span className="text-6xl">🏆🍗</span>
                  <div className="font-pixel text-sm text-emerald-400">
                    MAXIMUM FOOD CAPACITY ACHIEVED!
                  </div>
                  <p className="font-mono text-xs text-zinc-300">
                    Anil ate everything in the house. Sister reports the fridge is officially empty.
                  </p>
                  <button
                    onClick={startFoodGame}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black font-pixel text-xs border border-amber-300 cursor-pointer"
                  >
                    DEVOUR AGAIN
                  </button>
                </div>
              )}
            </div>

            {foodStatusMsg && (
              <div className="p-3 bg-amber-950/40 border border-amber-500 text-amber-200 font-mono text-xs">
                {foodStatusMsg}
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* BOSS 02: DEADLINE & BUG SQUASH */}
        {/* ========================================== */}
        {activeBoss === 'DEADLINE' && (
          <div className="bg-zinc-900 border-4 border-cyan-400 p-6 shadow-[8px_8px_0px_#000000] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-800 pb-3">
              <div>
                <span className="font-pixel text-xs text-cyan-400">BOSS 02 // CODING CHALLENGE</span>
                <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white">THE 3 AM SUBMISSION DEADLINE</h2>
              </div>
              <div className="text-right">
                <span className="font-pixel text-xs text-rose-400">DEADLINE IN: {deadlineSeconds}s</span>
                <div className="text-xs text-zinc-400 font-mono">STATUS: HIGH PANIC</div>
              </div>
            </div>

            <div className="space-y-4">
              {!deadlineRunning && !deadlineResult && (
                <div className="bg-black p-6 border-2 border-cyan-500 text-center space-y-4">
                  <div className="text-5xl">💻⏰</div>
                  <p className="text-xs font-mono text-zinc-300">
                    It&apos;s 2:59 AM. 4 critical bugs are blocking your project submission! Click each bug to squash it before time runs out!
                  </p>
                  <button
                    onClick={startDeadlineChallenge}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-pixel text-xs border-2 border-cyan-300 shadow-[4px_4px_0px_#000000] cursor-pointer"
                  >
                    ▶ START BUG SQUASH SPRINT
                  </button>
                </div>
              )}

              {deadlineRunning && (
                <div className="space-y-2">
                  <div className="font-pixel text-xs text-cyan-300 flex items-center justify-between">
                    <span>CLICK BUGS TO DEBUG:</span>
                    <span>TIME LEFT: {deadlineSeconds}s</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bugList.map((bug) => (
                      <button
                        key={bug.id}
                        disabled={bug.fixed}
                        onClick={() => handleFixBug(bug.id)}
                        className={`p-3 text-left border-2 font-mono text-xs transition active:scale-95 flex items-start gap-2 ${
                          bug.fixed
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 opacity-60'
                            : 'bg-black border-rose-500 text-rose-300 hover:bg-rose-950/40 cursor-pointer animate-pulse'
                        }`}
                      >
                        <Bug size={16} className={bug.fixed ? 'text-emerald-400' : 'text-rose-500 shrink-0 mt-0.5'} />
                        <span className="truncate">{bug.text}</span>
                        {bug.fixed && <span className="text-[9px] font-pixel text-emerald-400 ml-auto">FIXED</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {deadlineResult === 'WON' && (
                <div className="p-4 bg-emerald-950/80 border-2 border-emerald-400 text-center space-y-2">
                  <div className="font-pixel text-sm text-emerald-300">✅ DEADLINE CONQUERED!</div>
                  <p className="font-mono text-xs text-zinc-300">
                    &quot;Code compiled on first try. Anil submits at 2:59:59 AM with pure pro coder swagger.&quot;
                  </p>
                  <button
                    onClick={startDeadlineChallenge}
                    className="px-4 py-1.5 bg-emerald-600 text-white font-pixel text-[10px] border border-emerald-300"
                  >
                    RETRY CHALLENGE
                  </button>
                </div>
              )}

              {deadlineResult === 'PANIC' && (
                <div className="p-4 bg-rose-950/80 border-2 border-rose-500 text-center space-y-2">
                  <div className="font-pixel text-sm text-rose-400">⏰ TIME RAN OUT: SUBMISSION PANIC!</div>
                  <p className="font-mono text-xs text-zinc-300">
                    &quot;Anil: &apos;I will fix this tomorrow morning.&apos; (Narrator: He slept until 1 PM.)&quot;
                  </p>
                  <button
                    onClick={startDeadlineChallenge}
                    className="px-4 py-1.5 bg-rose-600 text-white font-pixel text-[10px] border border-rose-300"
                  >
                    RETRY
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* BOSS 03: FREE FIRE CLUTCH */}
        {/* ========================================== */}
        {activeBoss === 'FREE_FIRE' && (
          <div className="bg-zinc-900 border-4 border-rose-500 p-6 shadow-[8px_8px_0px_#000000] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-800 pb-3">
              <div>
                <span className="font-pixel text-xs text-rose-400">BOSS 03 // BATTLE ROYALE</span>
                <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white">FREE FIRE GRANDMASTER LOBBY</h2>
              </div>
              <div className="p-2 bg-rose-950 border border-rose-700 text-rose-300 font-pixel text-[10px]">
                HEADSHOT STREAK: {ffHeadshotStreak}
              </div>
            </div>

            {/* Target Shooting Arena */}
            <div className="relative h-72 bg-black border-4 border-zinc-700 overflow-hidden select-none">
              {!ffGameActive && !ffOutcome && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-4 bg-black/85">
                  <div className="text-5xl">🎯🔥</div>
                  <div className="font-pixel text-xs sm:text-sm text-yellow-300">
                    CLICK 6 MOVING TARGETS IN 8 SECONDS TO SECURE THE BOOYAH!
                  </div>
                  <button
                    onClick={startFreeFireGame}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-pixel text-xs border-2 border-rose-300 shadow-[4px_4px_0px_#000000] cursor-pointer"
                  >
                    ▶ START FREE FIRE CLUTCH
                  </button>
                </div>
              )}

              {ffGameActive && (
                <>
                  <div className="absolute top-2 left-2 z-20 font-pixel text-xs text-emerald-400 bg-black/80 px-2 py-1 border border-emerald-500">
                    TARGETS ELIMINATED: {ffScore} / 6
                  </div>
                  <div className="absolute top-2 right-2 z-20 font-pixel text-xs text-rose-400 bg-black/80 px-2 py-1 border border-rose-500">
                    TIME: {ffTimeLeft}s
                  </div>

                  <button
                    onClick={handleShootTarget}
                    style={{ left: `${ffTargetPos.x}%`, top: `${ffTargetPos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-3 bg-rose-600 border-2 border-yellow-400 text-white rounded-full shadow-[0_0_20px_#f43f5e] cursor-crosshair transform hover:scale-125 active:scale-90 transition animate-pulse"
                  >
                    <Crosshair size={28} className="text-yellow-300" />
                  </button>
                </>
              )}

              {ffOutcome === 'WON' && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <span className="text-6xl">🏆</span>
                  <div className="font-pixel text-sm text-emerald-400">BOOYAH! RANK: S-TIER GRANDMASTER!</div>
                  <p className="text-xs font-mono text-zinc-300">
                    &quot;Nobody clutches a 1v4 like Anil with his Cherry MX mechanical keyboard.&quot;
                  </p>
                  <button
                    onClick={startFreeFireGame}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[10px] border border-emerald-300 cursor-pointer"
                  >
                    PLAY AGAIN
                  </button>
                </div>
              )}

              {ffOutcome === 'LOST' && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <span className="text-6xl">🤬</span>
                  <div className="font-pixel text-sm text-rose-500">RAGE MODE ACTIVATED!</div>
                  <p className="text-xs font-mono text-zinc-300">
                    &quot;Rey Pandhi, you walked into my room and caused a ping spike!&quot;
                  </p>
                  <button
                    onClick={startFreeFireGame}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-pixel text-[10px] border border-rose-300 cursor-pointer"
                  >
                    RETRY MATCH
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* FINAL BOSS: BOSS PANDHI 🐷 (TURN-BASED RPG) */}
        {/* ========================================== */}
        {activeBoss === 'PANDHI' && (
          <div className="bg-zinc-900 border-4 border-pink-500 p-6 shadow-[8px_8px_0px_#000000] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-800 pb-3">
              <div>
                <span className="font-pixel text-xs text-pink-400">FINAL BOSS // TURN-BASED RPG BATTLE</span>
                <h2 className="text-2xl sm:text-3xl font-cyber font-black text-pink-400">BOSS: PANDHI 🐷</h2>
              </div>
              <div className="text-right">
                <span className="font-pixel text-xs text-rose-400">SIBLING HARMONY: {pandhiDefeated ? '100% (MAX)' : '45%'}</span>
                <div className="text-xs text-zinc-400 font-mono">STATUS: {pandhiDefeated ? 'PERMANENT ALLY ❤️' : 'UNBEATABLE'}</div>
              </div>
            </div>

            {/* Combat Arena Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Boss Visual & HP */}
              <div className="md:col-span-5 bg-black/80 border-2 border-pink-500/80 p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="text-7xl animate-bounce">
                  {pandhiDefeated ? '🥰' : '🐷👑'}
                </div>
                <div className="font-pixel text-xs text-pink-300">
                  {pandhiDefeated ? 'SISTER (GREATEST SUPPORTER)' : 'PANDHI (ARGUMENT MASTER)'}
                </div>
                <div className="w-full bg-zinc-800 h-3 border border-pink-500 overflow-hidden">
                  <div
                    className={`h-full ${pandhiDefeated ? 'bg-pink-500 w-full' : 'bg-rose-500 w-full animate-pulse'}`}
                  />
                </div>
              </div>

              {/* Combat Log & Sibling Action Deck */}
              <div className="md:col-span-7 space-y-4">
                {/* Battle Logs */}
                <div className="bg-black/90 border border-zinc-700 p-3 h-32 overflow-y-auto font-mono text-xs space-y-1 text-zinc-300">
                  {battleLog.map((log, i) => (
                    <div key={i} className={i === 0 ? 'text-yellow-300 font-bold' : 'text-zinc-400'}>
                      &gt; {log}
                    </div>
                  ))}
                </div>

                {/* Sibling Action Buttons */}
                {!pandhiDefeated ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => executeMove('BANANA')}
                      className="p-2.5 bg-yellow-950/60 hover:bg-yellow-900 border border-yellow-400 text-yellow-200 font-pixel text-[10px] cursor-pointer transition active:scale-95"
                    >
                      🍌 THROW SACRED BANANA
                    </button>
                    <button
                      onClick={() => executeMove('DERP_PHOTO')}
                      className="p-2.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-400 text-rose-200 font-pixel text-[10px] cursor-pointer transition active:scale-95"
                    >
                      🤪 3 AM DERP PHOTO ATTACK
                    </button>
                    <button
                      onClick={() => executeMove('ROYAL_AUTHORITY')}
                      className="p-2.5 bg-amber-950/60 hover:bg-amber-900 border border-amber-400 text-amber-200 font-pixel text-[10px] cursor-pointer transition active:scale-95"
                    >
                      👑 FOOT-TOUCHING AUTHORITY
                    </button>
                    <button
                      onClick={() => executeMove('SARIGHA_CHEYI')}
                      className="p-2.5 bg-purple-950/60 hover:bg-purple-900 border border-purple-400 text-purple-200 font-pixel text-[10px] cursor-pointer transition active:scale-95"
                    >
                      🗣️ &quot;PANDHI, SARIGHA CHEYI!&quot;
                    </button>
                    <button
                      onClick={() => executeMove('HUG')}
                      className="sm:col-span-2 p-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-pixel text-xs border-2 border-pink-300 shadow-[4px_4px_0px_#4c0519] cursor-pointer animate-pulse"
                    >
                      ❤️ [ ACTIVATE SIBLING LOVE &amp; HUG SISTER ]
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-pink-950/80 border-4 border-pink-400 text-white font-tech space-y-2 animate-in zoom-in-95">
                    <div className="flex items-center gap-2 font-pixel text-xs text-yellow-300">
                      <Award size={16} /> ACHIEVEMENT UNLOCKED: ❤️ BEST BROTHER
                    </div>
                    <p className="text-sm font-mono text-pink-200">
                      &quot;Some battles aren&apos;t meant to be won. Some people are meant to stay.&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Proceed to Chapter 04 / Final Arc */}
        <div className="flex justify-between items-center pt-4">
          <div className="text-xs text-zinc-500 font-mono">
            COMPLETED: {bossProgress.foodDefeated ? '✓ FOOD ' : ''}
            {bossProgress.deadlineDefeated ? '✓ DEADLINE ' : ''}
            {bossProgress.freeFireWon ? '✓ FREE FIRE ' : ''}
            {bossProgress.pandhiDefeated ? '✓ PANDHI' : ''}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNextChapter();
            }}
            className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs sm:text-sm border-4 border-amber-300 shadow-[6px_6px_0px_#78350f] transition transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
          >
            <span>PROCEED TO CHAPTER 04: ACHIEVEMENTS</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
