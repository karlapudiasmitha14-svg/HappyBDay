import { AchievementItem } from '../types';

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'food_detected',
    title: 'FOOD RADAR MAX',
    icon: '🍗',
    description: 'Triggered the food radar and fought the midnight hunger cravings for hot biryani and snacks.',
    unlocked: false,
    hint: 'Face Boss 01 in Boss Rush or click to unlock.'
  },
  {
    id: 'rank_pusher',
    title: 'FREE FIRE CLUTCH',
    icon: '🎮',
    description: 'Demonstrated elite Free Fire reaction speed and earned the Booyah badge.',
    unlocked: false,
    hint: 'Win or play the Free Fire target game.'
  },
  {
    id: 'code_survivor',
    title: 'CODE SURVIVOR',
    icon: '💻',
    description: 'Procrastinated a deadline to 3 AM and squashed runtime bugs with extreme focus.',
    unlocked: false,
    hint: 'Survive Boss 02 (Deadline Sprint).'
  },
  {
    id: 'sarigha_cheyi',
    title: 'PANDHI SARIGHA CHEYI',
    icon: '🐷',
    description: 'Dropped the legendary line: "Pandhi, sarigha cheyi!" whenever sister attempts to do any chore or task.',
    unlocked: false,
    hint: 'Click to unlock or test the special move.'
  },
  {
    id: 'sister_tolerance',
    title: 'SIBLING COMBATANT',
    icon: '😂',
    description: 'Endured another day of being called Dhunnaya while defending your older brother status.',
    unlocked: false,
    hint: 'Engage with Boss Pandhi in the Boss Rush.'
  },
  {
    id: 'rage_mode',
    title: 'CALM YET IRRITATED',
    icon: '😡',
    description: 'Went from 0% to 100% irritation when sister interrupted your focus during gaming or coding.',
    unlocked: false,
    hint: 'Hit the rage trigger or click to unlock.'
  },
  {
    id: 'master_actor',
    title: 'OSCAR-RANK ACTOR',
    icon: '🎭',
    description: 'Executed Oscar-worthy dramatic sibling reactions in every argument and debate.',
    unlocked: false,
    hint: 'Click "Claim Master Actor" or inspect the drama index.'
  },
  {
    id: 'legendary_brother',
    title: 'LEGENDARY BROTHER',
    icon: '❤️',
    description: 'Accepted defeat against Boss Pandhi and stood by her as the #1 protector and supporter.',
    unlocked: false,
    hint: 'Face the Final Boss or finish Chapter 03.'
  },
  {
    id: 'classified_archive',
    title: 'TOP SECRET ARCHIVE',
    icon: '🕵️',
    description: 'Unlocked the classified record of the 3 AM Unbreakable Spirit derp photo.',
    unlocked: false,
    isSecret: true,
    hint: 'Inspect the classified archive in Episode 004.'
  },
  {
    id: 'konami_warrior',
    title: '30 LIVES RETRO CHEAT',
    icon: '👾',
    description: 'Entered the legendary Konami sequence (↑ ↑ ↓ ↓ ← → ← → B A).',
    unlocked: false,
    isSecret: true,
    hint: 'Use old-school gamer cheat code on keyboard or click to unlock.'
  },
  {
    id: 'secret_file',
    title: 'SECRET FILE FOR_ANIL.TXT',
    icon: '📜',
    description: 'Discovered the hidden heartfelt transmission letter from your sister.',
    unlocked: false,
    isSecret: true,
    hint: 'Complete the arc or view Chapter 08.'
  }
];
