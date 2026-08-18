import { useState, useEffect, useCallback } from 'react';
import { GameChapter, AchievementItem, AppSettings, BossProgress } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/achievementsData';
import { sound } from '../services/soundEffects';

const STORAGE_KEY = 'THE_BIRTHDAY_ARC_ANIL_SAVE_V1';

export interface GameStateContextType {
  currentChapter: GameChapter;
  unlockedChapters: GameChapter[];
  achievements: AchievementItem[];
  recentAchievement: AchievementItem | null;
  settings: AppSettings;
  bossProgress: BossProgress;
  secretsFound: string[];
  isKonamiActive: boolean;
  goToChapter: (chapter: GameChapter) => void;
  unlockAchievement: (id: string) => void;
  unlockAllAchievements: () => void;
  updateBossProgress: (updates: Partial<BossProgress>) => void;
  recordSecretFound: (secretKey: string) => void;
  setKonamiActive: (val: boolean) => void;
  toggleCRT: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  setBGM: (bgm: AppSettings['currentBgm']) => void;
  resetAllProgress: () => void;
  dismissRecentAchievement: () => void;
}

const ALL_CHAPTERS: GameChapter[] = [
  'BOOT',
  'CHARACTER_SELECT',
  'ORIGIN',
  'BOSS_RUSH',
  'ACHIEVEMENTS',
  'FINAL_ARC',
  'ENDING',
  'CREDITS',
  'SECRET'
];

export function useGameState() {
  const [currentChapter, setCurrentChapter] = useState<GameChapter>('BOOT');
  const [unlockedChapters, setUnlockedChapters] = useState<GameChapter[]>(['BOOT']);
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [recentAchievement, setRecentAchievement] = useState<AchievementItem | null>(null);
  const [secretsFound, setSecretsFound] = useState<string[]>([]);
  const [isKonamiActive, setIsKonamiActive] = useState<boolean>(false);

  const [settings, setSettings] = useState<AppSettings>({
    crtEnabled: true,
    audioVolume: 0.6,
    isMuted: false,
    currentBgm: 'retro',
    fastText: false
  });

  const [bossProgress, setBossProgress] = useState<BossProgress>({
    foodEatenCount: 0,
    foodDefeated: false,
    deadlineAttempts: 0,
    deadlineDefeated: false,
    freeFireScore: 0,
    freeFireWon: false,
    pandhiInteracted: false,
    pandhiDefeated: false
  });

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentChapter) setCurrentChapter(parsed.currentChapter);
        if (parsed.unlockedChapters) setUnlockedChapters(parsed.unlockedChapters);
        if (parsed.achievements) {
          // Merge with initial to avoid missing any newly defined
          const merged = INITIAL_ACHIEVEMENTS.map((init) => {
            const found = parsed.achievements.find((a: AchievementItem) => a.id === init.id);
            return found ? { ...init, unlocked: found.unlocked, unlockedAt: found.unlockedAt } : init;
          });
          setAchievements(merged);
        }
        if (parsed.settings) {
          setSettings((prev) => ({ ...prev, ...parsed.settings }));
          sound.setMute(parsed.settings.isMuted ?? false);
          sound.setVolume(parsed.settings.audioVolume ?? 0.6);
        }
        if (parsed.bossProgress) setBossProgress(parsed.bossProgress);
        if (parsed.secretsFound) setSecretsFound(parsed.secretsFound);
      }
    } catch (e) {
      console.warn('Could not load save state:', e);
    }
  }, []);

  // Save to local storage
  const saveState = useCallback(() => {
    try {
      const payload = {
        currentChapter,
        unlockedChapters,
        achievements,
        settings,
        bossProgress,
        secretsFound
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not write save state:', e);
    }
  }, [currentChapter, unlockedChapters, achievements, settings, bossProgress, secretsFound]);

  useEffect(() => {
    saveState();
  }, [saveState]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target && !target.unlocked) {
        const updated = prev.map((a) =>
          a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : a
        );
        const newlyUnlocked = updated.find((a) => a.id === id) || null;
        setRecentAchievement(newlyUnlocked);
        sound.playAchievement();
        return updated;
      }
      return prev;
    });
  }, []);

  const unlockAllAchievements = useCallback(() => {
    setAchievements((prev) => {
      const time = new Date().toLocaleTimeString();
      return prev.map((a) => ({ ...a, unlocked: true, unlockedAt: a.unlockedAt || time }));
    });
    sound.playLevelUp();
  }, []);

  const goToChapter = useCallback(
    (chapter: GameChapter) => {
      sound.playClick();
      setCurrentChapter(chapter);
      setUnlockedChapters((prev) => (prev.includes(chapter) ? prev : [...prev, chapter]));

      // Select appropriate BGM for atmosphere
      if (chapter === 'BOOT') {
        sound.stopBGM();
      } else if (chapter === 'CHARACTER_SELECT' || chapter === 'ORIGIN' || chapter === 'ACHIEVEMENTS') {
        sound.playBGM('retro');
      } else if (chapter === 'BOSS_RUSH') {
        sound.playBGM('battle');
      } else if (chapter === 'FINAL_ARC') {
        sound.playBGM('emotional');
      } else if (chapter === 'ENDING') {
        sound.playBGM('party');
      } else if (chapter === 'CREDITS') {
        sound.playBGM('emotional');
      } else if (chapter === 'SECRET') {
        sound.playBGM('retro');
      }
    },
    []
  );

  const updateBossProgress = useCallback((updates: Partial<BossProgress>) => {
    setBossProgress((prev) => ({ ...prev, ...updates }));
  }, []);

  const recordSecretFound = useCallback(
    (secretKey: string) => {
      setSecretsFound((prev) => {
        if (!prev.includes(secretKey)) {
          sound.playLevelUp();
          return [...prev, secretKey];
        }
        return prev;
      });
    },
    []
  );

  const toggleCRT = useCallback(() => {
    sound.playClick();
    setSettings((prev) => ({ ...prev, crtEnabled: !prev.crtEnabled }));
  }, []);

  const toggleMute = useCallback(() => {
    setSettings((prev) => {
      const newMuted = !prev.isMuted;
      sound.setMute(newMuted);
      return { ...prev, isMuted: newMuted };
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    sound.setVolume(vol);
    setSettings((prev) => ({ ...prev, audioVolume: vol }));
  }, []);

  const setBGM = useCallback((bgm: AppSettings['currentBgm']) => {
    sound.playBGM(bgm);
    setSettings((prev) => ({ ...prev, currentBgm: bgm }));
  }, []);

  const dismissRecentAchievement = useCallback(() => {
    setRecentAchievement(null);
  }, []);

  const resetAllProgress = useCallback(() => {
    sound.playHit();
    localStorage.removeItem(STORAGE_KEY);
    setCurrentChapter('BOOT');
    setUnlockedChapters(['BOOT']);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setSecretsFound([]);
    setIsKonamiActive(false);
    setBossProgress({
      foodEatenCount: 0,
      foodDefeated: false,
      deadlineAttempts: 0,
      deadlineDefeated: false,
      freeFireScore: 0,
      freeFireWon: false,
      pandhiInteracted: false,
      pandhiDefeated: false
    });
    sound.stopBGM();
  }, []);

  return {
    currentChapter,
    unlockedChapters,
    achievements,
    recentAchievement,
    settings,
    bossProgress,
    secretsFound,
    isKonamiActive,
    goToChapter,
    unlockAchievement,
    unlockAllAchievements,
    updateBossProgress,
    recordSecretFound,
    setKonamiActive: setIsKonamiActive,
    toggleCRT,
    toggleMute,
    setVolume,
    setBGM,
    resetAllProgress,
    dismissRecentAchievement
  };
}
