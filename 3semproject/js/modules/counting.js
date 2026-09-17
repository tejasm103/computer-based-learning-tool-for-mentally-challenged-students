/**
 * counting.js - Multi-Sensory Tactile Counting Module (Numbers 1 to 10)
 * Connects visual quantities, numerical symbols, musical pitch scales,
 * and spoken numbers through interactive, tactile object popping.
 */

const COUNT_THEMES = [
    { id: 'stars', name: 'Golden Stars', icon: '⭐', color: '#f1c40f' },
    { id: 'apples', name: 'Red Apples', icon: '🍎', color: '#e74c3c' },
    { id: 'balloons', name: 'Balloons', icon: '🎈', color: '#e056fd' },
    { id: 'ducks', name: 'Rubber Ducks', icon: '🐥', color: '#ffbe76' }
];

class CountingModule {
    constructor(container) {
        this.container = container;
        this.currentCount = 0;
        this.targetCount = 5;
        this.activeTheme = COUNT_THEMES[0];
        this.mode = 'target'; // 'target' (Count to N) or 'free' (Free tap & count)
    }

    startRound(target = null) {
        this.currentCount = 0;
        if (target) {
            this.targetCount = target;
        } else {
            this.targetCount = Math.floor(Math.random() * 6) + 3; // 3 to 8
        }
    }

    render() {
        const theme = this.activeTheme;
        const isComplete = this.currentCount >= this.targetCount;

        this.container.innerHTML = `
            <div class="counting-layout">
                <!-- Theme and Mode Bar -->
                <div class="counting-controls-bar">
                    <div class="theme-picker" role="group" aria-label="Select Counting Theme">
                        ${COUNT_THEMES.map(t => `
                            <button class="theme-icon-btn ${t.id === theme.id ? 'active' : ''}" 
                                    data-id="${t.id}"
                                    aria-label="${t.name}">
                                <span>${t.icon}</span>
                            </button>
                        `).join('')}
                    </div>

                    <div class="count-mode-switch">
                        <button class="btn ${this.mode === 'target' ? 'btn-primary' : 'btn-secondary'}" id="btnCountModeTarget">
                            <span>🎯</span> Challenge: Count to ${this.targetCount}
                        </button>
                        <button class="btn ${this.mode === 'free' ? 'btn-primary' : 'btn-secondary'}" id="btnCountModeFree">
                            <span>✨</span> Free Play
                        </button>
                    </div>
                </div>

                <!-- Numerical Representation Banner -->
                <div class="counting-banner">
                    <div class="count-display-box">
                        <span class="count-number-big">${this.currentCount}</span>
                        <span class="count-label-text">
                            ${this.mode === 'target' ? `of ${this.targetCount} ${theme.name}` : `${theme.name} counted`}
                        </span>
                    </div>

                    <!-- Visual Number Progression Track (1 to 10) -->
                    <div class="number-track" role="region" aria-label="Number Track 1 to 10">
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => `
                            <div class="track-step ${num <= this.currentCount ? 'step-filled' : ''} ${num === this.targetCount && this.mode === 'target' ? 'step-target' : ''}">
                                <span>${num}</span>
                            </div>
                        `).join('')}
                    </div>

                    <button class="speak-btn-mini" id="btnSpeakCountGoal" aria-label="Listen to Count Instructions">
                        🔊 Read Goal
                    </button>
                </div>

                <!-- Main Counting Interaction Field -->
                <div class="counting-playfield" id="countingPlayfield" role="region" aria-label="Interactive Counting Objects">
                    ${this.renderObjectsHtml()}
                </div>

                <!-- Reward Banner if target achieved -->
                ${isComplete && this.mode === 'target' ? `
                    <div class="count-congrats-card animate-pop">
                        <span class="congrats-stars">⭐⭐⭐</span>
                        <h3>Hooray! You counted all ${this.targetCount} ${theme.name}!</h3>
                        <div class="congrats-actions">
                            <button class="btn btn-primary" id="btnNewCountRound">
                                <span>🔄</span> Next Count Challenge
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this.bindEvents();
    }

    renderObjectsHtml() {
        const totalToRender = this.mode === 'target' ? this.targetCount : 10;
        const items = [];

        for (let i = 1; i <= totalToRender; i++) {
            const isPopped = i <= this.currentCount;
            items.push(`
                <button class="counting-item-btn ${isPopped ? 'item-popped' : ''}" 
                        data-index="${i}"
                        aria-label="${this.activeTheme.name} ${i}">
                    <span class="item-visual">${this.activeTheme.icon}</span>
                    <span class="item-number-badge">${i}</span>
                </button>
            `);
        }

        return items.join('');
    }

    bindEvents() {
        const theme = this.activeTheme;

        // Theme switching
        const themeBtns = this.container.querySelectorAll('.theme-icon-btn');
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                this.activeTheme = COUNT_THEMES.find(t => t.id === id) || COUNT_THEMES[0];
                if (window.soundEffects) window.soundEffects.playClick();
                this.render();
            });
        });

        // Mode buttons
        const btnTarget = this.container.querySelector('#btnCountModeTarget');
        const btnFree = this.container.querySelector('#btnCountModeFree');

        btnTarget.addEventListener('click', () => {
            if (this.mode !== 'target') {
                this.mode = 'target';
                this.startRound();
                if (window.soundEffects) window.soundEffects.playClick();
                this.render();
            }
        });

        btnFree.addEventListener('click', () => {
            if (this.mode !== 'free') {
                this.mode = 'free';
                this.currentCount = 0;
                if (window.soundEffects) window.soundEffects.playClick();
                this.render();
            }
        });

        // Read Goal button
        const speakGoalBtn = this.container.querySelector('#btnSpeakCountGoal');
        if (speakGoalBtn) {
            speakGoalBtn.addEventListener('click', () => {
                const prompt = this.mode === 'target'
                    ? `Can you count ${this.targetCount} ${theme.name}? Touch each one to count together!`
                    : `Tap each ${theme.name} to count as high as you can!`;
                if (window.speechEngine) window.speechEngine.speak(prompt);
            });
        }

        // New round button
        const newRoundBtn = this.container.querySelector('#btnNewCountRound');
        if (newRoundBtn) {
            newRoundBtn.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                this.startRound();
                this.render();
            });
        }

        // Touch / click objects
        const objectBtns = this.container.querySelectorAll('.counting-item-btn:not(.item-popped)');
        objectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCount += 1;
                btn.classList.add('item-popped', 'pop-burst');

                // Musical ascending pitch
                if (window.soundEffects) {
                    window.soundEffects.playCount(this.currentCount);
                }

                // Voice count-along
                if (window.speechEngine) {
                    window.speechEngine.speak(String(this.currentCount));
                }

                // If target reached
                if (this.mode === 'target' && this.currentCount >= this.targetCount) {
                    if (window.appStorage) {
                        window.appStorage.addStar(2);
                        window.appStorage.incrementStat('countingCompleted');
                    }
                    setTimeout(() => {
                        if (window.soundEffects) window.soundEffects.playFanfare();
                        if (window.speechEngine) {
                            window.speechEngine.speak(`Wonderful! You counted all ${this.targetCount} ${theme.name}!`);
                        }
                    }, 500);
                }

                // Update UI state
                setTimeout(() => this.render(), 300);
            });
        });
    }
}

window.CountingModule = CountingModule;
