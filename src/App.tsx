/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { useKonamiCode } from './hooks/useKonamiCode';
import { CRTOverlay } from './components/layout/CRTOverlay';
import { HeaderNav } from './components/layout/HeaderNav';
import { AudioController } from './components/layout/AudioController';
import { AchievementPopup } from './components/ui/AchievementPopup';
import { EasterEggModal, EasterEggType } from './components/ui/EasterEggModal';

// Section Chapters
import { BootSection } from './sections/BootSection';
import { CharacterSelectSection } from './sections/CharacterSelectSection';
import { OriginArcSection } from './sections/OriginArcSection';
import { BossRushSection } from './sections/BossRushSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { FinalArcSection } from './sections/FinalArcSection';
import { EndingSection } from './sections/EndingSection';
import { CreditsSection } from './sections/CreditsSection';
import { SecretSection } from './sections/SecretSection';

export default function App() {
  const {
    currentChapter,
    unlockedChapters,
    achievements,
    recentAchievement,
    settings,
    bossProgress,
    secretsFound,
    goToChapter,
    unlockAchievement,
    unlockAllAchievements,
    updateBossProgress,
    recordSecretFound,
    toggleCRT,
    toggleMute,
    setVolume,
    setBGM,
    resetAllProgress,
    dismissRecentAchievement
  } = useGameState();

  const [activeEasterEgg, setActiveEasterEgg] = useState<EasterEggType>(null);

  // Listen for Konami cheat sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonamiCode(() => {
    unlockAchievement('konami_warrior');
    recordSecretFound('KONAMI_CODE');
    setActiveEasterEgg('KONAMI');
  });

  return (
    <div className="min-h-screen bg-black text-slate-100 relative overflow-x-hidden font-tech selection:bg-amber-500 selection:text-black">
      {/* CRT Scanlines Overlay */}
      <CRTOverlay enabled={settings.crtEnabled} />

      {/* Global Header Navigation (Hidden on initial Boot for authentic BIOS immersion) */}
      {currentChapter !== 'BOOT' && currentChapter !== 'FINAL_ARC' && (
        <HeaderNav
          currentChapter={currentChapter}
          unlockedChapters={unlockedChapters}
          achievements={achievements}
          secretsFoundCount={secretsFound.length}
          crtEnabled={settings.crtEnabled}
          onToggleCRT={toggleCRT}
          onGoToChapter={goToChapter}
          onReset={resetAllProgress}
        />
      )}

      {/* Chapter Router */}
      <main className="relative z-10">
        {currentChapter === 'BOOT' && (
          <BootSection onStartGame={() => goToChapter('CHARACTER_SELECT')} />
        )}

        {currentChapter === 'CHARACTER_SELECT' && (
          <CharacterSelectSection
            onNextChapter={() => goToChapter('ORIGIN')}
            onUnlockAchievement={unlockAchievement}
            onSecretTriggered={(key) => recordSecretFound(key)}
          />
        )}

        {currentChapter === 'ORIGIN' && (
          <OriginArcSection
            onNextChapter={() => goToChapter('BOSS_RUSH')}
            onUnlockAchievement={unlockAchievement}
            onOpenSecretModal={(type) => {
              recordSecretFound('CLASSIFIED_INCIDENT');
              setActiveEasterEgg(type);
            }}
          />
        )}

        {currentChapter === 'BOSS_RUSH' && (
          <BossRushSection
            bossProgress={bossProgress}
            onUpdateBossProgress={updateBossProgress}
            onUnlockAchievement={unlockAchievement}
            onNextChapter={() => goToChapter('ACHIEVEMENTS')}
            onSecretTriggered={(key) => recordSecretFound(key)}
          />
        )}

        {currentChapter === 'ACHIEVEMENTS' && (
          <AchievementsSection
            achievements={achievements}
            onUnlockAchievement={unlockAchievement}
            onUnlockAllAchievements={unlockAllAchievements}
            onNextChapter={() => goToChapter('FINAL_ARC')}
            onOpenSecretModal={(type) => {
              recordSecretFound(type);
              setActiveEasterEgg(type);
            }}
          />
        )}

        {currentChapter === 'FINAL_ARC' && (
          <FinalArcSection onProceedToEnding={() => goToChapter('ENDING')} />
        )}

        {currentChapter === 'ENDING' && (
          <EndingSection
            onGoToCredits={() => goToChapter('CREDITS')}
            onRestart={resetAllProgress}
          />
        )}

        {currentChapter === 'CREDITS' && (
          <CreditsSection
            onUnlockSecretFile={() => {
              unlockAchievement('secret_file');
              goToChapter('SECRET');
            }}
            onRestart={resetAllProgress}
            onSecretTriggered={(key) => recordSecretFound(key)}
          />
        )}

        {currentChapter === 'SECRET' && (
          <SecretSection
            onRestart={resetAllProgress}
            onGoToChapter={(ch) => goToChapter(ch)}
          />
        )}
      </main>

      {/* Floating Audio Controller */}
      <AudioController
        isMuted={settings.isMuted}
        volume={settings.audioVolume}
        currentBgm={settings.currentBgm}
        onToggleMute={toggleMute}
        onVolumeChange={setVolume}
        onBgmChange={setBGM}
      />

      {/* Achievement Toast Popup */}
      <AchievementPopup
        achievement={recentAchievement}
        onDismiss={dismissRecentAchievement}
      />

      {/* Easter Egg Modal */}
      <EasterEggModal
        type={activeEasterEgg}
        onClose={() => setActiveEasterEgg(null)}
      />
    </div>
  );
}
