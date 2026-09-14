// Web Audio API Sound Synthesizer - Zero external dependencies, pure native audio!
class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicPlaying = false;
    this.musicTimeout = null;
    this.musicNoteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMusic();
    }
    return this.isMuted;
  }

  // Play a cute bubbly pop
  playPop(pitch = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(420 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(860 * pitch, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Countdown tick
  playTick(pitch = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(600 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(300 * pitch, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Blowing candle puff sound (Filtered white noise whoosh)
  playBlow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    const now = this.ctx.currentTime;
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.45);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.46);
  }

  // Celebration fanfare arpeggio
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      }, idx * 75);
    });
  }

  // Slicing cake sound
  playSlice() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Swoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);

    // Cute sweet sparkle bell
    setTimeout(() => {
      this.playChime(1174.66); // D6
      setTimeout(() => this.playChime(1567.98), 80); // G6
    }, 120);
  }

  // Magic shooting star twinkle
  playTwinkle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [739.99, 880.00, 1108.73, 1318.51, 1661.22, 1975.53, 2349.32];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.38);
      }, idx * 60);
    });
  }

  // Single chime bell
  playChime(freq = 880) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Hacker computer decrypt click / glitch
  playDecryptClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    const now = this.ctx.currentTime;
    const freq = 400 + Math.random() * 800;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Goofy Error 404 buzzer (cartoon wah-wah)
  playErrorBuzzer() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { freq: 280, dur: 0.16 },
      { freq: 240, dur: 0.28 }
    ];

    let delay = 0;
    notes.forEach((note) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(note.freq, now);
        osc.frequency.exponentialRampToValueAtTime(note.freq * 0.85, now + note.dur);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + note.dur + 0.02);
      }, delay);
      delay += note.dur * 1000 + 40;
    });
  }

  // Sweet music box Happy Birthday melody
  startMusicBox() {
    if (this.isMusicPlaying || this.isMuted) return;
    this.init();
    this.isMusicPlaying = true;

    // Happy Birthday notes (frequency, duration in ms)
    // G4 G4 A4 G4 C5 B4 | G4 G4 A4 G4 D5 C5 | G4 G4 G5 E5 C5 B4 A4 | F5 F5 E5 C5 D5 C5
    const melody = [
      { f: 392.00, d: 300 }, // Hap-
      { f: 392.00, d: 300 }, // py
      { f: 440.00, d: 600 }, // birth-
      { f: 392.00, d: 600 }, // day
      { f: 523.25, d: 600 }, // to
      { f: 493.88, d: 1000 }, // you
      { f: 0, d: 250 },      // rest

      { f: 392.00, d: 300 }, // Hap-
      { f: 392.00, d: 300 }, // py
      { f: 440.00, d: 600 }, // birth-
      { f: 392.00, d: 600 }, // day
      { f: 587.33, d: 600 }, // to
      { f: 523.25, d: 1000 }, // you
      { f: 0, d: 250 },      // rest

      { f: 392.00, d: 300 }, // Hap-
      { f: 392.00, d: 300 }, // py
      { f: 783.99, d: 600 }, // birth-
      { f: 659.25, d: 600 }, // day
      { f: 523.25, d: 600 }, // dear
      { f: 493.88, d: 600 }, // birth-
      { f: 440.00, d: 800 }, // day-girl
      { f: 0, d: 250 },      // rest

      { f: 698.46, d: 300 }, // Hap-
      { f: 698.46, d: 300 }, // py
      { f: 659.25, d: 600 }, // birth-
      { f: 523.25, d: 600 }, // day
      { f: 587.33, d: 600 }, // to
      { f: 523.25, d: 1200 }, // you!
      { f: 0, d: 1200 }      // loop pause
    ];

    const playNext = (idx) => {
      if (!this.isMusicPlaying || this.isMuted) return;
      const note = melody[idx];

      if (note.f > 0 && this.ctx) {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, now);

        // Music box bell envelope: instant attack, long gentle decay
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + Math.min(1.2, note.d / 1000 + 0.3));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      }

      const nextIdx = (idx + 1) % melody.length;
      this.musicTimeout = setTimeout(() => {
        playNext(nextIdx);
      }, note.d);
    };

    playNext(0);
  }

  stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusicBox();
      return true;
    }
  }
}

window.soundFX = new SoundFX();

