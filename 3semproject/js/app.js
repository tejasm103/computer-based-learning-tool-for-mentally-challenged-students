/**
 * app.js - Central Application Orchestrator & Educator Dashboard
 * Coordinates module switching, accessibility themes, star rewards, and settings modal.
 */

class MindSparkApp {
    constructor() {
        this.currentView = 'home';
        this.activeModuleInstance = null;
        this.init();
    }

    init() {
        this.applySavedSettings();
        this.bindGlobalEvents();
        this.renderView('home');
        this.updateStarDisplay();
    }

    applySavedSettings() {
        if (!window.appStorage) return;
        const settings = window.appStorage.getSettings();

        // Theme
        document.body.classList.remove('theme-high-contrast', 'theme-calm');
        if (settings.theme === 'high-contrast') {
            document.body.classList.add('theme-high-contrast');
        } else if (settings.theme === 'calm') {
            document.body.classList.add('theme-calm');
        }

        // Font size
        document.body.classList.remove('font-normal', 'font-large', 'font-xlarge');
        document.body.classList.add(`font-${settings.fontSize || 'large'}`);

        // Dyslexia font
        document.body.classList.toggle('font-dyslexic', !!settings.dyslexiaFont);

        // Sound / Speech engine settings
        if (window.soundEffects) {
            window.soundEffects.setEnabled(settings.soundEnabled);
        }
        if (window.speechEngine) {
            window.speechEngine.setEnabled(settings.speechEnabled);
            window.speechEngine.setRate(settings.speechRate || 0.85);
        }
    }

    bindGlobalEvents() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-btn[data-view]');
        navLinks.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetView = btn.dataset.view;
                if (window.soundEffects) window.soundEffects.playClick();
                this.renderView(targetView);
            });
        });

        // Settings modal trigger
        const btnOpenSettings = document.getElementById('btnOpenSettings');
        const modal = document.getElementById('settingsModal');
        const btnCloseModal = document.getElementById('btnCloseSettings');

        if (btnOpenSettings && modal) {
            btnOpenSettings.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                this.populateSettingsForm();
                modal.classList.add('modal-visible');
            });
        }

        if (btnCloseModal && modal) {
            btnCloseModal.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                modal.classList.remove('modal-visible');
            });
        }

        // Close on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('modal-visible');
                }
            });
        }

        // Quick speech mute toggle
        const btnQuickVoice = document.getElementById('btnQuickVoice');
        if (btnQuickVoice) {
            btnQuickVoice.addEventListener('click', () => {
                const settings = window.appStorage.getSettings();
                const newVal = !settings.speechEnabled;
                window.appStorage.saveSetting('speechEnabled', newVal);
                btnQuickVoice.classList.toggle('active', newVal);
                btnQuickVoice.setAttribute('title', newVal ? 'Voice Speech: ON' : 'Voice Speech: OFF');
                if (window.speechEngine) {
                    window.speechEngine.setEnabled(newVal);
                    if (newVal) window.speechEngine.speak("Voice guidance enabled!");
                }
            });
        }

        // Listen for star updates
        window.addEventListener('star-earned', () => {
            this.updateStarDisplay();
            this.triggerStarPop();
        });

        // Listen for settings changed
        window.addEventListener('settings-changed', () => {
            this.applySavedSettings();
        });
    }

    updateStarDisplay() {
        const starEl = document.getElementById('globalStarCount');
        if (starEl && window.appStorage) {
            starEl.textContent = window.appStorage.getStars();
        }
    }

    triggerStarPop() {
        const badge = document.querySelector('.star-counter-badge');
        if (badge) {
            badge.classList.add('star-burst-anim');
            setTimeout(() => badge.classList.remove('star-burst-anim'), 600);
        }
    }

    renderView(viewName) {
        this.currentView = viewName;
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.view === viewName);
            b.setAttribute('aria-selected', b.dataset.view === viewName);
        });

        // Cancel ongoing speech
        if (window.speechEngine) window.speechEngine.stop();

        switch (viewName) {
            case 'home':
                this.renderHomeView(mainContent);
                break;
            case 'aac':
                this.activeModuleInstance = new window.AACModule(mainContent);
                this.activeModuleInstance.render();
                if (window.speechEngine) window.speechEngine.speak("Welcome to the Communication Board. Tap any picture to speak!");
                break;
            case 'emotions':
                this.activeModuleInstance = new window.EmotionsModule(mainContent);
                this.activeModuleInstance.render();
                break;
            case 'routines':
                this.activeModuleInstance = new window.RoutinesModule(mainContent);
                this.activeModuleInstance.render();
                break;
            case 'matching':
                this.activeModuleInstance = new window.MatchingModule(mainContent);
                this.activeModuleInstance.render();
                break;
            case 'counting':
                this.activeModuleInstance = new window.CountingModule(mainContent);
                this.activeModuleInstance.startRound();
                this.activeModuleInstance.render();
                break;
            case 'dashboard':
                this.renderDashboardView(mainContent);
                break;
            default:
                this.renderHomeView(mainContent);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderHomeView(container) {
        container.innerHTML = `
            <div class="home-hub animate-fadein">
                <!-- Welcome Banner -->
                <div class="welcome-banner">
                    <div class="welcome-text">
                        <h1>Welcome to MindSpark! 🌟</h1>
                        <p>Your friendly learning companion for talking, feelings, daily routines, and playful games.</p>
                        <button class="btn btn-primary btn-speak-welcome" id="btnSpeakWelcome">
                            <span>🔊</span> Listen to Welcome
                        </button>
                    </div>
                    <div class="welcome-character">
                        <div class="mascot-sun">☀️</div>
                    </div>
                </div>

                <!-- Learning Modules Hub Grid -->
                <div class="hub-grid" role="region" aria-label="Learning Modules">
                    <!-- AAC Card -->
                    <button class="hub-card aac-theme" data-view="aac">
                        <div class="hub-card-icon">🗣️</div>
                        <div class="hub-card-content">
                            <h3>Talk & Say (AAC)</h3>
                            <p>Visual picture soundboard to express daily needs, feelings, and requests.</p>
                            <span class="hub-card-action">Start Talking ➜</span>
                        </div>
                    </button>

                    <!-- Emotions Card -->
                    <button class="hub-card emotions-theme" data-view="emotions">
                        <div class="hub-card-icon">😊</div>
                        <div class="hub-card-content">
                            <h3>Feelings & Emotions</h3>
                            <p>Learn facial expressions and explore social situations with friends.</p>
                            <span class="hub-card-action">Explore Feelings ➜</span>
                        </div>
                    </button>

                    <!-- Daily Routines Card -->
                    <button class="hub-card routines-theme" data-view="routines">
                        <div class="hub-card-icon">🪥</div>
                        <div class="hub-card-content">
                            <h3>Daily Life Skills</h3>
                            <p>Step-by-step sequencing for brushing teeth, washing hands, and bedtime.</p>
                            <span class="hub-card-action">Practice Routines ➜</span>
                        </div>
                    </button>

                    <!-- Matching Card -->
                    <button class="hub-card matching-theme" data-view="matching">
                        <div class="hub-card-icon">🔺</div>
                        <div class="hub-card-content">
                            <h3>Shapes & Colors</h3>
                            <p>Fun visual matching for geometric shapes, vibrant colors, and objects.</p>
                            <span class="hub-card-action">Play Matching ➜</span>
                        </div>
                    </button>

                    <!-- Counting Card -->
                    <button class="hub-card counting-theme" data-view="counting">
                        <div class="hub-card-icon">⭐</div>
                        <div class="hub-card-content">
                            <h3>Tactile Counting</h3>
                            <p>Touch, pop, and count objects with musical chimes and spoken numbers.</p>
                            <span class="hub-card-action">Start Counting ➜</span>
                        </div>
                    </button>

                    <!-- Progress Dashboard Card -->
                    <button class="hub-card dashboard-theme" data-view="dashboard">
                        <div class="hub-card-icon">📊</div>
                        <div class="hub-card-content">
                            <h3>Educator & Progress</h3>
                            <p>Caregiver insights, star tally, activity records, and learning tips.</p>
                            <span class="hub-card-action">View Progress ➜</span>
                        </div>
                    </button>
                </div>
            </div>
        `;

        // Bind welcome button
        const btnWelcome = container.querySelector('#btnSpeakWelcome');
        if (btnWelcome) {
            btnWelcome.addEventListener('click', () => {
                if (window.speechEngine) {
                    window.speechEngine.speak("Welcome to MindSpark! Choose any colorful box below to begin learning and having fun!");
                }
            });
        }

        // Bind hub cards
        const hubCards = container.querySelectorAll('.hub-card');
        hubCards.forEach(card => {
            card.addEventListener('click', () => {
                const view = card.dataset.view;
                if (window.soundEffects) window.soundEffects.playClick();
                this.renderView(view);
            });
        });
    }

    renderDashboardView(container) {
        const stats = window.appStorage ? window.appStorage.loadStats() : {};
        const stars = window.appStorage ? window.appStorage.getStars() : 0;

        container.innerHTML = `
            <div class="dashboard-layout animate-fadein">
                <div class="dashboard-header">
                    <div>
                        <h2>Caregiver & Educator Dashboard</h2>
                        <p>Track learner engagement, communication frequency, and milestones.</p>
                    </div>
                    <div class="dashboard-stars-summary">
                        <span class="star-icon">⭐</span>
                        <span class="star-count">${stars}</span>
                        <span class="star-label">Total Stars Earned</span>
                    </div>
                </div>

                <!-- Stats Metric Cards -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <span class="metric-icon">🗣️</span>
                        <div class="metric-info">
                            <span class="metric-value">${stats.aacPhrases || 0}</span>
                            <span class="metric-title">AAC Phrases Built</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <span class="metric-icon">😊</span>
                        <div class="metric-info">
                            <span class="metric-value">${stats.emotionsCompleted || 0}</span>
                            <span class="metric-title">Emotion Challenges Solved</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <span class="metric-icon">🪥</span>
                        <div class="metric-info">
                            <span class="metric-value">${stats.routinesCompleted || 0}</span>
                            <span class="metric-title">Routines Mastered</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <span class="metric-icon">🔺</span>
                        <div class="metric-info">
                            <span class="metric-value">${stats.matchingCompleted || 0}</span>
                            <span class="metric-title">Shapes & Colors Matched</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <span class="metric-icon">⭐</span>
                        <div class="metric-info">
                            <span class="metric-value">${stats.countingCompleted || 0}</span>
                            <span class="metric-title">Counting Targets Met</span>
                        </div>
                    </div>
                </div>

                <!-- Pedagogical Recommendations -->
                <div class="pedagogical-tips-card">
                    <h3>💡 Special Education Guidance & Tips</h3>
                    <ul class="tips-list">
                        <li><strong>Patience & Non-Urgency:</strong> Give the learner sufficient wait time (5–10 seconds) before prompting. MindSpark has no countdown clocks or time-pressure penalties.</li>
                        <li><strong>Multi-Sensory Modeling:</strong> Sit beside the student and demonstrate touching the AAC picture cards, vocalizing the phrase together with the synthesized speech.</li>
                        <li><strong>Positive Reinforcement:</strong> Celebrate small wins with the star system. Reassure the student during retries that mistakes are natural steps in learning.</li>
                        <li><strong>Sensory Accommodations:</strong> If the student experiences sensory fatigue or eye strain, switch to <em>Calm Mode</em> or <em>High Contrast</em> in Settings.</li>
                    </ul>
                </div>

                <!-- Actions -->
                <div class="dashboard-actions">
                    <button class="btn btn-secondary" id="btnResetAllProgress">
                        <span>🔄</span> Reset Learner Stars & Stats
                    </button>
                    <button class="btn btn-primary" id="btnBackToLearning">
                        <span>🏠</span> Return to Learning Hub
                    </button>
                </div>
            </div>
        `;

        // Reset progress handler
        const resetBtn = container.querySelector('#btnResetAllProgress');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all stars and activity counters?')) {
                    if (window.appStorage) {
                        window.appStorage.resetProgress();
                        this.renderDashboardView(container);
                    }
                }
            });
        }

        const backBtn = container.querySelector('#btnBackToLearning');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                this.renderView('home');
            });
        }
    }

    populateSettingsForm() {
        const settings = window.appStorage.getSettings();

        // Theme
        const themeSelect = document.getElementById('settingTheme');
        if (themeSelect) themeSelect.value = settings.theme;

        // Font size
        const fontSelect = document.getElementById('settingFontSize');
        if (fontSelect) fontSelect.value = settings.fontSize;

        // Dyslexia font
        const dyslexiaCheck = document.getElementById('settingDyslexia');
        if (dyslexiaCheck) dyslexiaCheck.checked = !!settings.dyslexiaFont;

        // Speech rate
        const rateSlider = document.getElementById('settingSpeechRate');
        const rateValue = document.getElementById('speechRateDisplay');
        if (rateSlider) {
            rateSlider.value = settings.speechRate || 0.85;
            if (rateValue) rateValue.textContent = `${settings.speechRate}x`;
        }

        // Sound & Speech toggles
        const soundCheck = document.getElementById('settingSound');
        if (soundCheck) soundCheck.checked = !!settings.soundEnabled;

        const speechCheck = document.getElementById('settingSpeech');
        if (speechCheck) speechCheck.checked = !!settings.speechEnabled;

        // Bind form change events
        this.bindSettingsFormEvents();
    }

    bindSettingsFormEvents() {
        const themeSelect = document.getElementById('settingTheme');
        if (themeSelect) {
            themeSelect.onchange = () => {
                window.appStorage.saveSetting('theme', themeSelect.value);
            };
        }

        const fontSelect = document.getElementById('settingFontSize');
        if (fontSelect) {
            fontSelect.onchange = () => {
                window.appStorage.saveSetting('fontSize', fontSelect.value);
            };
        }

        const dyslexiaCheck = document.getElementById('settingDyslexia');
        if (dyslexiaCheck) {
            dyslexiaCheck.onchange = () => {
                window.appStorage.saveSetting('dyslexiaFont', dyslexiaCheck.checked);
            };
        }

        const rateSlider = document.getElementById('settingSpeechRate');
        const rateValue = document.getElementById('speechRateDisplay');
        if (rateSlider) {
            rateSlider.oninput = () => {
                const val = parseFloat(rateSlider.value);
                if (rateValue) rateValue.textContent = `${val.toFixed(2)}x`;
                window.appStorage.saveSetting('speechRate', val);
            };
        }

        const soundCheck = document.getElementById('settingSound');
        if (soundCheck) {
            soundCheck.onchange = () => {
                window.appStorage.saveSetting('soundEnabled', soundCheck.checked);
            };
        }

        const speechCheck = document.getElementById('settingSpeech');
        if (speechCheck) {
            speechCheck.onchange = () => {
                window.appStorage.saveSetting('speechEnabled', speechCheck.checked);
            };
        }

        const testVoiceBtn = document.getElementById('btnTestVoice');
        if (testVoiceBtn) {
            testVoiceBtn.onclick = () => {
                if (window.speechEngine) {
                    window.speechEngine.speak("This is a test of the speech voice rate and volume.");
                }
            };
        }
    }
}

// Bootstrap once DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MindSparkApp();
});
