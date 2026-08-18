import React, { useState } from 'react';
import { CHARACTER_DATA, ANIL_QUOTES } from '../data/characterData';
import { sound } from '../services/soundEffects';
import { 
  Shield, 
  Sword, 
  Flame, 
  Zap, 
  Tv, 
  Utensils, 
  Volume2, 
  Sparkles, 
  ChevronRight, 
  Smile, 
  Code, 
  Smartphone,
  Keyboard,
  Info,
  Bike,
  Crown,
  Moon,
  Footprints,
  Laugh
} from 'lucide-react';

interface CharacterSelectSectionProps {
  onNextChapter: () => void;
  onUnlockAchievement: (id: string) => void;
  onSecretTriggered: (key: string) => void;
}

interface FighterSkin {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  icon: string;
  auraColor: string;
  statBoost: string;
  quote: string;
}

const FIGHTER_SKINS: FighterSkin[] = [
  {
    id: 'ronin-rider',
    name: 'RONIN RIDER (LVL 22)',
    badge: 'STREET BIKER',
    tagline: 'Modern Street Protagonist in Black Jacket & TVS Ronin',
    icon: '🏍️',
    auraColor: 'from-cyan-500/30 to-blue-900/40',
    statBoost: 'SPEED: +200% | MAIN CHARACTER AURA: MAX',
    quote: '"The road is long, but my TVS Ronin is ready. Let\'s roll."'
  },
  {
    id: 'royal-emperor',
    name: 'ROYAL RED EMPEROR',
    badge: 'FESTIVAL TRADITION',
    tagline: 'Smug Brother receiving Sister\'s Foot-Touching Blessings',
    icon: '👑',
    auraColor: 'from-amber-500/30 to-rose-900/40',
    statBoost: 'OLDER BROTHER AUTHORITY: +999% | SMUGNESS: 100%',
    quote: '"Bow before your older brother, Pandhi! Blessings distributed with 50% discount."'
  },
  {
    id: 'unbreakable-derp',
    name: 'UNBREAKABLE DERP LORD',
    badge: '3 AM GOBLIN',
    tagline: 'The Legendary Wide-Smile Filter Selfie Form',
    icon: '🤪',
    auraColor: 'from-rose-500/30 to-purple-900/40',
    statBoost: 'CHAOS FACTOR: +9999% | SISTER BLACKMAIL: 100/100',
    quote: '"T-shirt says Unbreakable Spirit, face says I haven\'t slept since Tuesday."'
  },
  {
    id: 'horizontal-sloth',
    name: 'TACTICAL BED SLOTH',
    badge: 'ZERO CHORES',
    tagline: 'Horizontal Coder lying down avoiding household duties',
    icon: '😴',
    auraColor: 'from-indigo-500/30 to-slate-900/40',
    statBoost: 'COZINESS: 100% | HOMEWORK/CHORES DODGED: 95%',
    quote: '"I am not sleeping. I am mentally refactoring my Free Fire strategies."'
  },
  {
    id: 'yellow-toddler',
    name: 'YELLOW SHIRT TODDLER',
    badge: 'NAVY CREW 470',
    tagline: 'Toddler Anil eyeing baby sister\'s sacred banana',
    icon: '👶',
    auraColor: 'from-yellow-500/30 to-amber-900/40',
    statBoost: 'CONFUSION: 100% | BANANA STEALING SENSORS: ACTIVE',
    quote: '"What is that banana? Why is she holding it? Can I eat it?"'
  }
];

export const CharacterSelectSection: React.FC<CharacterSelectSectionProps> = ({
  onNextChapter,
  onUnlockAchievement,
  onSecretTriggered
}) => {
  const [selectedSkin, setSelectedSkin] = useState<FighterSkin>(FIGHTER_SKINS[0]);
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [damageEffect, setDamageEffect] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [extraPowerLevel, setExtraPowerLevel] = useState(22);

  const handleSelectSkin = (skin: FighterSkin) => {
    sound.playClick();
    setSelectedSkin(skin);
    if (skin.id === 'unbreakable-derp') {
      sound.playRage();
      onUnlockAchievement('rage_mode');
    } else if (skin.id === 'royal-emperor') {
      sound.playLevelUp();
      onUnlockAchievement('master_actor');
    }
  };

  const handleTestPandhiAbility = () => {
    sound.playRage();
    setSelectedAbility('PANDHI');
    setDamageEffect(true);
    onUnlockAchievement('sarigha_cheyi');
    onUnlockAchievement('sister_tolerance');
    setTimeout(() => setDamageEffect(false), 800);
  };

  const handleTestSarighaCheyi = () => {
    sound.playHit();
    setSelectedAbility('SARIGHA_CHEYI');
    setDamageEffect(true);
    onUnlockAchievement('sarigha_cheyi');
    setTimeout(() => setDamageEffect(false), 800);
  };

  const handleTestFoodRadar = () => {
    sound.playEat();
    setSelectedAbility('FOOD');
    onUnlockAchievement('food_detected');
  };

  const handleOverchargePower = () => {
    sound.playLevelUp();
    setExtraPowerLevel((prev) => prev + 100);
    if (extraPowerLevel >= 500) {
      onUnlockAchievement('rank_pusher');
    }
  };

  const nextQuote = () => {
    sound.playClick();
    setQuoteIndex((prev) => (prev + 1) % ANIL_QUOTES.length);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 relative overflow-hidden font-tech">
      {/* Anime speedline background */}
      <div className="absolute inset-0 manga-speedlines opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Chapter Title Banner */}
        <div className="text-center space-y-2 border-b-2 border-amber-500/60 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400 font-pixel text-xs text-amber-400">
            <Sparkles size={14} className="text-yellow-300" />
            <span>CHAPTER 01 // ROSTER LOADED</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-200">
            CHARACTER SELECT &amp; SKINS
          </h1>
          <p className="font-mono text-xs sm:text-sm text-zinc-400">
            SELECT FIGHTER: ANIL (DHUNNAYA / REY / LEVEL {extraPowerLevel})
          </p>
        </div>

        {/* Skin Selector Carousel */}
        <div className="space-y-3">
          <div className="text-xs font-pixel text-amber-400 flex items-center justify-between">
            <span>CHOOSE ANIL&apos;S FIGHTER FORM / SKIN:</span>
            <span className="text-[10px] text-zinc-400">[CLICK TO EQUIP]</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {FIGHTER_SKINS.map((skin) => {
              const isSelected = selectedSkin.id === skin.id;
              return (
                <button
                  key={skin.id}
                  onClick={() => handleSelectSkin(skin)}
                  className={`p-3 border-2 text-left transition-all active:scale-95 cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-[4px_4px_0px_#f59e0b] scale-102'
                      : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{skin.icon}</span>
                    <span className="text-[8px] font-pixel bg-black px-1.5 py-0.5 border border-zinc-800 text-zinc-400 truncate">
                      {skin.badge}
                    </span>
                  </div>
                  <div className="font-pixel text-[10px] text-white mt-2 truncate">
                    {skin.name}
                  </div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Card & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Fighter Portrait & Loadout */}
          <div className="lg:col-span-5 space-y-4">
            {/* Retro Fighter Box */}
            <div className="bg-zinc-900 border-4 border-amber-500 p-5 shadow-[8px_8px_0px_#000000] relative">
              <div className="absolute top-2 right-2 bg-rose-600 text-white font-pixel text-[10px] px-2 py-0.5">
                LVL {extraPowerLevel}
              </div>

              <div className="text-center mb-4">
                <span className="font-pixel text-xs text-amber-400">EQUIPPED FORM:</span>
                <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white">{selectedSkin.name}</h2>
                <div className="text-xs font-mono text-cyan-300 mt-1">
                  {selectedSkin.tagline}
                </div>
              </div>

              {/* Dynamic Fighter Display Box */}
              <div className={`relative h-64 sm:h-72 bg-gradient-to-b ${selectedSkin.auraColor} border-2 border-zinc-700 flex flex-col items-center justify-center p-4 overflow-hidden group`}>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-amber-400 bg-black/80 flex items-center justify-center text-6xl shadow-[4px_4px_0px_#000000] transform group-hover:scale-110 transition">
                    {selectedSkin.icon}
                  </div>
                  <div className="mt-3 font-pixel text-xs text-amber-300 bg-black/90 px-3 py-1 border border-amber-500/80">
                    {selectedSkin.badge}
                  </div>
                  <div className="text-[11px] text-emerald-300 font-mono mt-2 bg-black/80 px-2 py-0.5 border border-zinc-800">
                    {selectedSkin.statBoost}
                  </div>
                </div>

                {/* Secret click target */}
                <button
                  onClick={() => {
                    onSecretTriggered('AVATAR_CLICK');
                    nextQuote();
                  }}
                  className="absolute bottom-2 right-2 text-[9px] font-pixel text-zinc-400 hover:text-amber-400 flex items-center gap-1 p-1 bg-black/80 border border-zinc-700"
                  title="Click for dialogue quote"
                >
                  <Smile size={10} /> QUOTE
                </button>
              </div>

              {/* Equipment Loadout */}
              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="p-2 bg-black/60 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Keyboard size={14} className="text-cyan-400" /> PRIMARY WEAPON:
                  </span>
                  <span className="text-cyan-300 font-bold truncate max-w-[180px]">{CHARACTER_DATA.signatureWeapon}</span>
                </div>
                <div className="p-2 bg-black/60 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Smartphone size={14} className="text-emerald-400" /> SECONDARY:
                  </span>
                  <span className="text-emerald-300 font-bold truncate max-w-[180px]">{CHARACTER_DATA.secondaryWeapon}</span>
                </div>
                <div className="p-2 bg-black/60 border border-rose-900/60 flex items-center justify-between">
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <Flame size={14} className="text-rose-500" /> ULTIMATE:
                  </span>
                  <span className="text-rose-300 font-bold truncate max-w-[180px]">{CHARACTER_DATA.ultimateMove}</span>
                </div>
              </div>

              {/* Dynamic Quote Box */}
              <div className="mt-3 p-3 bg-amber-950/30 border border-amber-700/60 text-xs italic text-amber-200 flex items-start gap-2">
                <Volume2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>&quot;{ANIL_QUOTES[quoteIndex]}&quot;</span>
                  <button
                    onClick={nextQuote}
                    className="block text-[10px] font-pixel text-amber-400 hover:text-amber-300 mt-1 underline"
                  >
                    [NEXT QUOTE &gt;&gt;]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Statistics & Abilities */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stat Bars */}
            <div className="bg-zinc-900 border-4 border-cyan-500 p-5 shadow-[8px_8px_0px_#000000]">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-900/80 mb-4">
                <span className="font-pixel text-xs text-cyan-300 flex items-center gap-2">
                  <Zap size={14} className="text-cyan-400" /> COMBAT ATTRIBUTES &amp; POWER SCALING
                </span>
                <button
                  onClick={handleOverchargePower}
                  className="px-2 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 font-pixel text-[9px] active:scale-95 cursor-pointer"
                >
                  ⚡ OVERCHARGE STATS
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { label: 'HP (SIBLING RESILIENCE)', val: CHARACTER_DATA.hp, max: 100, color: 'bg-emerald-500', note: 'MAXED' },
                  { label: 'CODING & BUG FIXING', val: CHARACTER_DATA.coding, max: 100, color: 'bg-blue-500', note: '90%' },
                  { label: 'FREE FIRE COMPETITIVENESS', val: CHARACTER_DATA.gaming, max: 100, color: 'bg-indigo-500', note: '100%' },
                  { label: 'ANIME OBSESSION (ONE PIECE/NARUTO)', val: CHARACTER_DATA.animeKnowledge, max: 999, color: 'bg-purple-500', note: '999 (OVER 9000)' },
                  { label: 'CALMNESS (MOST OF THE TIME)', val: CHARACTER_DATA.calmness, max: 100, color: 'bg-teal-500', note: '70%' },
                  { label: 'EASILY IRRITATED BY PANDHI', val: CHARACTER_DATA.anger, max: 100, color: 'bg-rose-500', note: '90%' },
                  { label: 'FOOD RADAR SENSITIVITY', val: CHARACTER_DATA.foodRadar, max: 100, color: 'bg-amber-500', note: '100%' }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-300">
                      <span>{stat.label}</span>
                      <span className="font-pixel text-[10px] text-cyan-300">{stat.note}</span>
                    </div>
                    <div className="w-full h-3.5 bg-black border border-zinc-700 p-0.5">
                      <div
                        className={`h-full ${stat.color} transition-all duration-700`}
                        style={{ width: `${Math.min(100, (stat.val / stat.max) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}

                {/* The Sister Listening Joke Stat */}
                <div className="mt-4 pt-3 border-t-2 border-zinc-800 space-y-1">
                  <div className="flex justify-between text-xs text-yellow-300 font-bold">
                    <span>LISTENING TO SISTER</span>
                    <span className="font-pixel text-[10px] text-rose-400">20% (VERY LOW)</span>
                  </div>
                  <div className="w-full h-4 bg-black border-2 border-rose-500/80 p-0.5">
                    <div className="h-full bg-rose-500 w-[20%]" />
                  </div>
                  <div className="text-[11px] font-pixel text-zinc-400 italic pt-1">
                    SYSTEM COMMENT: <span className="text-amber-400">&quot;Expected. Will continue to argue.&quot;</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Move / Interactive Ability Triggers */}
            <div className="bg-zinc-900 border-4 border-rose-500 p-5 shadow-[8px_8px_0px_#000000]">
              <div className="font-pixel text-xs text-rose-400 flex items-center gap-2 mb-3">
                <Flame size={16} />
                <span>UNLOCKED ABILITY: SIBLING BATTLE PROTOCOL</span>
              </div>

              <div className="p-3 bg-black/80 border border-rose-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-xs text-white">ABILITY: CALLS SISTER &quot;PANDHI&quot; 🐷</span>
                  <span className="text-xs bg-rose-950 text-rose-300 px-2 py-0.5 border border-rose-700">DAMAGE: 99999</span>
                </div>

                <p className="text-xs text-zinc-300 font-tech">
                  Deals emotional critical damage instantly. Usually shouted across the living room followed by immediate argument.
                </p>

                {damageEffect && (
                  <div className="p-2 bg-rose-600 text-white font-pixel text-xs text-center animate-bounce">
                    💥 CRITICAL HIT! &quot;REY PANDHI!&quot; DEPLOYED! 💥
                  </div>
                )}

                {/* Interactive Ability Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <button
                    onClick={handleTestPandhiAbility}
                    className="p-2.5 bg-rose-900/60 hover:bg-rose-800 border border-rose-400 text-white font-pixel text-[10px] transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Flame size={12} /> YELL &quot;PANDHI!&quot;
                  </button>
                  <button
                    onClick={handleTestFoodRadar}
                    className="p-2.5 bg-amber-900/60 hover:bg-amber-800 border border-amber-400 text-amber-200 font-pixel text-[10px] transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Utensils size={12} /> FOOD RADAR
                  </button>
                  <button
                    onClick={handleTestSarighaCheyi}
                    className="p-2.5 bg-purple-900/60 hover:bg-purple-800 border border-purple-400 text-purple-200 font-pixel text-[10px] transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Tv size={12} /> &quot;SARIGHA CHEYI!&quot;
                  </button>
                </div>
              </div>
            </div>

            {/* Next Chapter Navigation */}
            <div className="flex justify-end pt-2">
              <button
                onClick={onNextChapter}
                className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs sm:text-sm border-4 border-amber-300 shadow-[6px_6px_0px_#78350f] transition transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
              >
                <span>PROCEED TO CHAPTER 02: ORIGIN ARC</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
