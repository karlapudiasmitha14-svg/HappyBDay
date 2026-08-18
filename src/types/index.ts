export type GameChapter =
  | 'BOOT'
  | 'CHARACTER_SELECT'
  | 'ORIGIN'
  | 'BOSS_RUSH'
  | 'ACHIEVEMENTS'
  | 'FINAL_ARC'
  | 'ENDING'
  | 'CREDITS'
  | 'SECRET';

export interface CharacterStats {
  name: string;
  age: number;
  level: number;
  classType: string;
  titles: string[];
  sisterNicknames: string[];
  hp: number;
  coding: number;
  gaming: number;
  animeKnowledge: number;
  calmness: number;
  anger: number;
  foodRadar: number;
  listeningToSister: number;
  signatureWeapon: string;
  secondaryWeapon: string;
  ultimateMove: string;
  threatLevel: number;
}

export interface PhotoMemory {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  placeholderPath: string;
  tags: string[];
  mangaQuote: string;
  isClassified?: boolean;
  classificationStatus?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  isSecret?: boolean;
  hint?: string;
}

export interface BossProgress {
  foodEatenCount: number;
  foodDefeated: boolean;
  deadlineAttempts: number;
  deadlineDefeated: boolean;
  freeFireScore: number;
  freeFireWon: boolean;
  pandhiInteracted: boolean;
  pandhiDefeated: boolean;
}

export interface AppSettings {
  crtEnabled: boolean;
  audioVolume: number;
  isMuted: boolean;
  currentBgm: 'retro' | 'battle' | 'emotional' | 'party' | 'off';
  fastText: boolean;
}
