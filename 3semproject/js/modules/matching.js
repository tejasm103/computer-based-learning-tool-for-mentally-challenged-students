/**
 * matching.js - Cognitive Association: Shapes, Colors, and Everyday Objects
 * Fosters visual discrimination, categorisation, and sensory-motor coordination
 * through high-contrast, tactile matching games with speech reinforcement.
 */

const SHAPES_DATA = [
    {
        id: 'circle',
        name: 'Circle',
        color: '#ff4757',
        colorName: 'Red',
        svg: `<svg viewBox="0 0 100 100" class="match-shape-svg"><circle cx="50" cy="50" r="42" fill="#ff4757" stroke="#2f3542" stroke-width="4"/></svg>`
    },
    {
        id: 'square',
        name: 'Square',
        color: '#1e90ff',
        colorName: 'Blue',
        svg: `<svg viewBox="0 0 100 100" class="match-shape-svg"><rect x="12" y="12" width="76" height="76" rx="8" fill="#1e90ff" stroke="#2f3542" stroke-width="4"/></svg>`
    },
    {
        id: 'triangle',
        name: 'Triangle',
        color: '#2ed573',
        colorName: 'Green',
        svg: `<svg viewBox="0 0 100 100" class="match-shape-svg"><polygon points="50,10 90,88 10,88" fill="#2ed573" stroke="#2f3542" stroke-width="4"/></svg>`
    },
    {
        id: 'star',
        name: 'Star',
        color: '#ffa502',
        colorName: 'Yellow',
        svg: `<svg viewBox="0 0 100 100" class="match-shape-svg"><polygon points="50,5 64,36 98,36 70,57 81,90 50,70 19,90 30,57 2,36 36,36" fill="#ffa502" stroke="#2f3542" stroke-width="3"/></svg>`
    },
    {
        id: 'heart',
        name: 'Heart',
        color: '#ff6b81',
        colorName: 'Pink',
        svg: `<svg viewBox="0 0 100 100" class="match-shape-svg"><path d="M 50,30 C 50,15 30,10 20,25 C 8,40 25,65 50,90 C 75,65 92,40 80,25 C 70,10 50,15 50,30 Z" fill="#ff6b81" stroke="#2f3542" stroke-width="4"/></svg>`
    },
    {
        id: 'diamond',
        name: 'Diamond',
        color: '#9c88ff',
        colorName: 'Purple',
        svg: `<svg viewBox="0 0 100 100" class="match-shape-svg"><polygon points="50,10 90,50 50,90 10,50" fill="#9c88ff" stroke="#2f3542" stroke-width="4"/></svg>`
    }
];

const OBJECTS_DATA = [
    { id: 'apple', name: 'Red Apple', icon: '🍎', category: 'Food' },
    { id: 'ball', name: 'Bouncy Ball', icon: '⚽', category: 'Toy' },
    { id: 'car', name: 'Toy Car', icon: '🚗', category: 'Vehicle' },
    { id: 'book', name: 'Story Book', icon: '📚', category: 'School' },
    { id: 'sun', name: 'Warm Sun', icon: '☀️', category: 'Nature' },
    { id: 'flower', name: 'Pretty Flower', icon: '🌸', category: 'Nature' }
];

class MatchingModule {
    constructor(container) {
        this.container = container;
        this.currentType = 'shapes'; // 'shapes' or 'objects'
        this.targetItem = null;
        this.options = [];
        this.scoreInRound = 0;
    }

    startNewRound() {
        const pool = this.currentType === 'shapes' ? SHAPES_DATA : OBJECTS_DATA;
        // Pick random target
        const randomIndex = Math.floor(Math.random() * pool.length);
        this.targetItem = pool[randomIndex];

        // Pick 3 distractors
        const others = pool.filter(item => item.id !== this.targetItem.id);
        const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
        const selectedDistractors = shuffledOthers.slice(0, 3);

        // Pool of 4 choices shuffled
        this.options = [this.targetItem, ...selectedDistractors].sort(() => Math.random() - 0.5);
    }

    render() {
        if (!this.targetItem) {
            this.startNewRound();
        }

        const promptText = this.currentType === 'shapes' 
            ? `Can you find the ${this.targetItem.colorName} ${this.targetItem.name}?`
            : `Can you find the ${this.targetItem.name}?`;

        this.container.innerHTML = `
            <div class="matching-layout">
                <!-- Header Category Switcher -->
                <div class="module-mode-bar">
                    <button class="btn ${this.currentType === 'shapes' ? 'btn-primary' : 'btn-secondary'}" id="btnTypeShapes">
                        <span>🔺</span> Shapes & Colors
                    </button>
                    <button class="btn ${this.currentType === 'objects' ? 'btn-primary' : 'btn-secondary'}" id="btnTypeObjects">
                        <span>🍎</span> Everyday Objects
                    </button>
                </div>

                <!-- Target Prompt Card -->
                <div class="matching-prompt-card" role="region" aria-label="Target Challenge">
                    <div class="prompt-header">
                        <span class="prompt-badge">Find the Match!</span>
                        <button class="speak-btn-mini" id="btnSpeakPrompt" aria-label="Listen to Target Prompt">🔊 Listen</button>
                    </div>

                    <h2 class="prompt-title">${promptText}</h2>

                    <div class="prompt-target-preview">
                        ${this.currentType === 'shapes' ? this.targetItem.svg : `<span class="target-emoji">${this.targetItem.icon}</span>`}
                    </div>
                </div>

                <!-- 4 Options Grid -->
                <div class="matching-options-grid" role="region" aria-label="Choice Options">
                    ${this.options.map(opt => `
                        <button class="match-choice-btn" data-id="${opt.id}" aria-label="${opt.name}">
                            <div class="choice-visual">
                                ${this.currentType === 'shapes' ? opt.svg : `<span class="opt-emoji">${opt.icon}</span>`}
                            </div>
                            <span class="choice-label">${opt.name}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- Feedback Banner -->
                <div class="matching-feedback" id="matchingFeedback" style="display: none;"></div>
            </div>
        `;

        this.bindEvents(promptText);
    }

    bindEvents(promptText) {
        // Mode buttons
        const btnShapes = this.container.querySelector('#btnTypeShapes');
        const btnObjects = this.container.querySelector('#btnTypeObjects');

        btnShapes.addEventListener('click', () => {
            if (window.soundEffects) window.soundEffects.playClick();
            this.currentType = 'shapes';
            this.startNewRound();
            this.render();
        });

        btnObjects.addEventListener('click', () => {
            if (window.soundEffects) window.soundEffects.playClick();
            this.currentType = 'objects';
            this.startNewRound();
            this.render();
        });

        // Speak target
        const speakBtn = this.container.querySelector('#btnSpeakPrompt');
        if (speakBtn) {
            speakBtn.addEventListener('click', () => {
                if (window.speechEngine) window.speechEngine.speak(promptText);
            });
        }

        // Auto speak target on initial load
        if (window.speechEngine) {
            window.speechEngine.speak(promptText);
        }

        // Choice buttons
        const choiceBtns = this.container.querySelectorAll('.match-choice-btn');
        const feedback = this.container.querySelector('#matchingFeedback');

        choiceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const choiceId = btn.dataset.id;

                if (choiceId === this.targetItem.id) {
                    // Correct!
                    btn.classList.add('choice-correct');
                    feedback.style.display = 'flex';
                    feedback.className = 'matching-feedback feedback-success animate-pop';
                    feedback.innerHTML = `
                        <span class="feedback-star">⭐</span>
                        <div>
                            <strong>Excellent!</strong>
                            <p>You found the ${this.targetItem.name}!</p>
                        </div>
                        <button class="btn btn-primary" id="btnNextMatch">Play Next ➜</button>
                    `;

                    if (window.soundEffects) window.soundEffects.playSuccess();
                    if (window.speechEngine) {
                        window.speechEngine.speak(`Yes! Excellent! That is the ${this.targetItem.name}!`);
                    }

                    if (window.appStorage) {
                        window.appStorage.addStar(1);
                        window.appStorage.incrementStat('matchingCompleted');
                    }

                    const nextBtn = feedback.querySelector('#btnNextMatch');
                    nextBtn.addEventListener('click', () => {
                        this.startNewRound();
                        this.render();
                    });

                } else {
                    // Gentle encouragement
                    btn.classList.add('choice-retry');
                    setTimeout(() => btn.classList.remove('choice-retry'), 600);

                    if (window.soundEffects) window.soundEffects.playEncourage();
                    if (window.speechEngine) {
                        window.speechEngine.speak(`Nice try! Look closely for the ${this.targetItem.name}.`);
                    }
                }
            });
        });
    }
}

window.MatchingModule = MatchingModule;
