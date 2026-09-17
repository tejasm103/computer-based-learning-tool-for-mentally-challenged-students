/**
 * speech.js - Web Speech API Text-to-Speech Engine
 * Provides clear, customizable audio narration for cognitive accessibility.
 * Gives immediate auditory feedback on button clicks, instructions, and AAC phrases.
 */

class SpeechEngine {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.voice = null;
        this.rate = 0.85; // Slightly slower default for better cognitive clarity
        this.pitch = 1.05; // Warm, friendly tone
        this.enabled = true;
        this.currentUtterance = null;

        this.initVoices();
        if (this.synth && this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.initVoices();
        }
    }

    initVoices() {
        if (!this.synth) return;
        const voices = this.synth.getVoices();
        if (!voices || voices.length === 0) return;

        // Try to pick a natural, friendly English voice
        const preferred = voices.find(v => 
            (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Female')))
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        this.voice = preferred;
    }

    setEnabled(val) {
        this.enabled = !!val;
        if (!this.enabled && this.synth) {
            this.synth.cancel();
        }
    }

    setRate(rate) {
        this.rate = Math.max(0.5, Math.min(1.5, parseFloat(rate) || 0.85));
    }

    setPitch(pitch) {
        this.pitch = Math.max(0.7, Math.min(1.4, parseFloat(pitch) || 1.0));
    }

    /**
     * Speak given text with interrupt capability
     * @param {string} text - text to speak
     * @param {Object} options - { interrupt: true, onEnd: fn }
     */
    speak(text, options = {}) {
        if (!this.enabled || !this.synth || !text) return;

        const { interrupt = true, onEnd = null } = options;

        if (interrupt) {
            this.synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) {
            utterance.voice = this.voice;
        }
        utterance.rate = this.rate;
        utterance.pitch = this.pitch;
        utterance.lang = 'en-US';

        if (onEnd) {
            utterance.onend = onEnd;
            utterance.onerror = onEnd;
        }

        this.currentUtterance = utterance;

        // Visual feedback indicator hook
        document.body.classList.add('is-speaking');
        utterance.addEventListener('end', () => {
            document.body.classList.remove('is-speaking');
        });
        utterance.addEventListener('error', () => {
            document.body.classList.remove('is-speaking');
        });

        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
            document.body.classList.remove('is-speaking');
        }
    }
}

window.speechEngine = new SpeechEngine();
