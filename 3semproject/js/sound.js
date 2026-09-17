/**
 * sound.js - Procedural Web Audio API Sound Synthesizer
 * Generates soothing, non-punitive auditory cues without external sound files.
 * Designed specifically for students with sensory sensitivities.
 */

class SoundEffects {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setEnabled(val) {
        this.enabled = !!val;
    }

    /**
     * Soft, friendly click sound
     */
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    }

    /**
     * Gentle ascending pentatonic chime for success (C5, E5, G5, C6)
     */
    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const startTime = now + idx * 0.11;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle'; // softer than square/sawtooth
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.36);
        });
    }

    /**
     * Gentle warm sound for retry (non-punitive, encouraging)
     */
    playEncourage() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [440, 493.88]; // A4, B4 (warm question-tone)

        notes.forEach((freq, idx) => {
            const startTime = now + idx * 0.12;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    /**
     * Harmonic ascending note for counting (1 to 10 scale)
     */
    playCount(step = 1) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const baseNotes = [
            261.63, // 1: C4
            293.66, // 2: D4
            329.63, // 3: E4
            349.23, // 4: F4
            392.00, // 5: G4
            440.00, // 6: A4
            493.88, // 7: B4
            523.25, // 8: C5
            587.33, // 9: D5
            659.25  // 10: E5
        ];

        const idx = Math.min(Math.max(step - 1, 0), baseNotes.length - 1);
        const freq = baseNotes[idx];
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.36);
    }

    /**
     * Celebratory sparkling harp sound for task completion
     */
    playFanfare() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        const now = this.ctx.currentTime;

        arpeggio.forEach((freq, i) => {
            const time = now + i * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.15, time + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + 0.46);
        });
    }
}

window.soundEffects = new SoundEffects();
