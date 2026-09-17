/**
 * storage.js - LocalStorage State & Progress Manager
 * Tracks student stars, badges, completed exercises, and caregiver accessibility settings.
 */

const STORAGE_KEYS = {
    STARS: 'mindspark_stars',
    BADGES: 'mindspark_badges',
    SETTINGS: 'mindspark_settings',
    STATS: 'mindspark_stats'
};

const DEFAULT_SETTINGS = {
    theme: 'standard',       // 'standard', 'high-contrast', 'calm'
    fontSize: 'large',       // 'normal', 'large', 'xlarge'
    dyslexiaFont: false,     // true / false
    speechRate: 0.85,        // 0.6 to 1.2
    soundEnabled: true,      // Web Audio chimes
    speechEnabled: true,     // Web Speech narration
    calmAnimation: false     // Reduced motion
};

class ProgressStorage {
    constructor() {
        this.stars = this.loadStars();
        this.settings = this.loadSettings();
        this.stats = this.loadStats();
    }

    loadStars() {
        const val = localStorage.getItem(STORAGE_KEYS.STARS);
        return val ? parseInt(val, 10) || 0 : 0;
    }

    addStar(amount = 1) {
        this.stars += amount;
        localStorage.setItem(STORAGE_KEYS.STARS, this.stars);
        
        // Dispatch custom event for UI updates
        window.dispatchEvent(new CustomEvent('star-earned', { 
            detail: { total: this.stars, added: amount } 
        }));

        if (window.soundEffects) {
            window.soundEffects.playReward ? window.soundEffects.playReward() : window.soundEffects.playSuccess();
        }

        return this.stars;
    }

    getStars() {
        return this.stars;
    }

    loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
        } catch (e) {
            return { ...DEFAULT_SETTINGS };
        }
    }

    saveSetting(key, value) {
        this.settings[key] = value;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
        window.dispatchEvent(new CustomEvent('settings-changed', {
            detail: { key, value, settings: this.settings }
        }));
    }

    getSettings() {
        return this.settings;
    }

    loadStats() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.STATS);
            return raw ? JSON.parse(raw) : {
                aacPhrases: 0,
                emotionsCompleted: 0,
                routinesCompleted: 0,
                matchingCompleted: 0,
                countingCompleted: 0
            };
        } catch (e) {
            return {
                aacPhrases: 0,
                emotionsCompleted: 0,
                routinesCompleted: 0,
                matchingCompleted: 0,
                countingCompleted: 0
            };
        }
    }

    incrementStat(statKey) {
        if (!this.stats[statKey]) this.stats[statKey] = 0;
        this.stats[statKey] += 1;
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
    }

    resetProgress() {
        this.stars = 0;
        localStorage.setItem(STORAGE_KEYS.STARS, '0');
        this.stats = {
            aacPhrases: 0,
            emotionsCompleted: 0,
            routinesCompleted: 0,
            matchingCompleted: 0,
            countingCompleted: 0
        };
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
        window.dispatchEvent(new CustomEvent('star-earned', { detail: { total: 0, added: 0 } }));
    }
}

window.appStorage = new ProgressStorage();
