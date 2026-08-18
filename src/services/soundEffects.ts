/**
 * Web Audio API Sound Synthesizer & BGM Engine
 * Generates authentic 8-bit retro arcade sounds, boss battle tones, and nostalgic emotional chords.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private currentBgmNode: { stop: () => void } | null = null;
  private currentBgmTrack: string | null = null;

  constructor() {
    // Initialized on first user interaction
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.currentBgmNode) {
      this.currentBgmNode.stop();
      this.currentBgmNode = null;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  // --- Sound Effects ---

  public playBoot() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }

  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.12 * this.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  public playType() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 + Math.random() * 300, ctx.currentTime);

    gain.gain.setValueAtTime(0.05 * this.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  public playHit() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.25 * this.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  public playAttack() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  public playEat() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [300, 450, 600, 750];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

      gain.gain.setValueAtTime(0.15 * this.volume, ctx.currentTime + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.05);
      osc.stop(ctx.currentTime + i * 0.05 + 0.06);
    });
  }

  public playAchievement() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);

      gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.09 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.09);
      osc.stop(ctx.currentTime + i * 0.09 + 0.18);
    });
  }

  public playLevelUp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const melody = [
      { f: 440, t: 0 },
      { f: 554.37, t: 0.1 },
      { f: 659.25, t: 0.2 },
      { f: 880, t: 0.3 },
      { f: 1108.73, t: 0.45 },
      { f: 1318.51, t: 0.6 }
    ];

    melody.forEach((item) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, ctx.currentTime + item.t);

      gain.gain.setValueAtTime(0.25 * this.volume, ctx.currentTime + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + item.t);
      osc.stop(ctx.currentTime + item.t + 0.35);
    });
  }

  public playGlitch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100 + Math.random() * 800, ctx.currentTime + i * 0.03);

      gain.gain.setValueAtTime(0.18 * this.volume, ctx.currentTime + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.03 + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.03);
      osc.stop(ctx.currentTime + i * 0.03 + 0.04);
    }
  }

  public playRage() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(320, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.3 * this.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }

  // --- Background Synthesizer Themes (Zero External Dependency Failures) ---

  public playBGM(track: 'retro' | 'battle' | 'emotional' | 'party' | 'off') {
    if (this.currentBgmTrack === track) return;
    this.currentBgmTrack = track;

    if (this.currentBgmNode) {
      this.currentBgmNode.stop();
      this.currentBgmNode = null;
    }

    if (track === 'off' || this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    let isPlaying = true;
    let timerId: number | null = null;

    if (track === 'retro') {
      // 8-bit cheerful RPG melody loop
      const melody = [
        261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 329.63, 293.66,
        261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 587.33, 523.25
      ];
      let step = 0;
      const playStep = () => {
        if (!isPlaying || this.isMuted) return;
        const note = melody[step % melody.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.04 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.18);

        step++;
        timerId = window.setTimeout(playStep, 200);
      };
      playStep();
    } else if (track === 'battle') {
      // Fast paced boss battle theme
      const bassLine = [110, 110, 130.81, 146.83, 110, 110, 164.81, 146.83];
      let step = 0;
      const playStep = () => {
        if (!isPlaying || this.isMuted) return;
        const note = bassLine[step % bassLine.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.06 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.14);

        step++;
        timerId = window.setTimeout(playStep, 150);
      };
      playStep();
    } else if (track === 'emotional') {
      // Soft heartfelt piano-like ambient progression
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00]  // G
      ];
      let chordIdx = 0;
      const playStep = () => {
        if (!isPlaying || this.isMuted) return;
        const chord = chords[chordIdx % chords.length];
        chord.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.1);

          gain.gain.setValueAtTime(0.04 * this.volume, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + 2.4);
        });

        chordIdx++;
        timerId = window.setTimeout(playStep, 2600);
      };
      playStep();
    } else if (track === 'party') {
      // Happy celebratory chime loop
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [783.99, 987.77, 1174.66]
      ];
      let idx = 0;
      const playStep = () => {
        if (!isPlaying || this.isMuted) return;
        const chord = chords[idx % chords.length];
        chord.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          gain.gain.setValueAtTime(0.05 * this.volume, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        });
        idx++;
        timerId = window.setTimeout(playStep, 320);
      };
      playStep();
    }

    this.currentBgmNode = {
      stop: () => {
        isPlaying = false;
        if (timerId !== null) clearTimeout(timerId);
      }
    };
  }

  public stopBGM() {
    this.currentBgmTrack = null;
    if (this.currentBgmNode) {
      this.currentBgmNode.stop();
      this.currentBgmNode = null;
    }
  }
}

export const sound = new SoundEngine();
