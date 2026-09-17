/**
 * emotions.js - Social & Emotional Literacy Module
 * Teaches students to recognize facial expressions, identify emotional cues,
 * and understand situational social contexts with positive reinforcement.
 */

const EMOTIONS_DATA = [
    {
        id: 'happy',
        name: 'Happy',
        icon: '😊',
        color: '#ffbe76',
        description: 'You smile, laugh, and feel warm inside!',
        audioText: 'Happy! When you feel happy, you smile, laugh, and feel good inside. A smile spreads joy!',
        cues: 'Upturned smiling mouth, bright open eyes, relaxed cheeks.',
        svg: `<svg viewBox="0 0 100 100" class="emotion-svg">
            <circle cx="50" cy="50" r="45" fill="#feca57" stroke="#ff9f43" stroke-width="4"/>
            <circle cx="35" cy="40" r="6" fill="#2d3436"/>
            <circle cx="65" cy="40" r="6" fill="#2d3436"/>
            <ellipse cx="25" cy="52" rx="6" ry="4" fill="#ff7675" opacity="0.6"/>
            <ellipse cx="75" cy="52" rx="6" ry="4" fill="#ff7675" opacity="0.6"/>
            <path d="M 32 60 Q 50 82 68 60" stroke="#2d3436" stroke-width="5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'sad',
        name: 'Sad',
        icon: '😢',
        color: '#70a1ff',
        description: 'You may frown or cry when something hurts or feels lost.',
        audioText: 'Sad. When you feel sad, you might cry or want a hug. It is okay to feel sad, and talking to someone helps!',
        cues: 'Downturned lips, droopy eyelids, gentle tear.',
        svg: `<svg viewBox="0 0 100 100" class="emotion-svg">
            <circle cx="50" cy="50" r="45" fill="#70a1ff" stroke="#1e90ff" stroke-width="4"/>
            <circle cx="35" cy="42" r="5" fill="#2d3436"/>
            <circle cx="65" cy="42" r="5" fill="#2d3436"/>
            <path d="M 32 72 Q 50 56 68 72" stroke="#2d3436" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M 66 52 C 64 56 62 62 65 65 C 68 68 71 65 71 61 C 71 58 68 54 66 52 Z" fill="#38ada9"/>
        </svg>`
    },
    {
        id: 'angry',
        name: 'Angry / Mad',
        icon: '😠',
        color: '#ff6b6b',
        description: 'You feel tight inside when something feels unfair.',
        audioText: 'Angry. When you feel mad, take three deep slow breaths to help your body feel calm and safe.',
        cues: 'Slanted eyebrows pointing down, pressed mouth, flushed face.',
        svg: `<svg viewBox="0 0 100 100" class="emotion-svg">
            <circle cx="50" cy="50" r="45" fill="#ff7675" stroke="#d63031" stroke-width="4"/>
            <!-- Eyebrows -->
            <line x1="28" y1="33" x2="42" y2="40" stroke="#2d3436" stroke-width="5" stroke-linecap="round"/>
            <line x1="72" y1="33" x2="58" y2="40" stroke="#2d3436" stroke-width="5" stroke-linecap="round"/>
            <circle cx="36" cy="46" r="5" fill="#2d3436"/>
            <circle cx="64" cy="46" r="5" fill="#2d3436"/>
            <path d="M 34 68 Q 50 60 66 68" stroke="#2d3436" stroke-width="5" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'surprised',
        name: 'Surprised',
        icon: '😲',
        color: '#ff9ff3',
        description: 'Eyes wide and mouth open when something unexpected happens!',
        audioText: 'Surprised! Something sudden or unexpected happened, like a fun party surprise or magic trick!',
        cues: 'High raised eyebrows, wide open circular mouth and eyes.',
        svg: `<svg viewBox="0 0 100 100" class="emotion-svg">
            <circle cx="50" cy="50" r="45" fill="#fd79a8" stroke="#e84393" stroke-width="4"/>
            <!-- Eyebrows high -->
            <path d="M 28 30 Q 36 24 44 30" stroke="#2d3436" stroke-width="4" fill="none"/>
            <path d="M 56 30 Q 64 24 72 30" stroke="#2d3436" stroke-width="4" fill="none"/>
            <circle cx="36" cy="42" r="7" fill="#2d3436"/>
            <circle cx="64" cy="42" r="7" fill="#2d3436"/>
            <circle cx="50" cy="68" r="11" fill="#2d3436"/>
        </svg>`
    },
    {
        id: 'calm',
        name: 'Calm & Peaceful',
        icon: '😌',
        color: '#55efc4',
        description: 'Relaxed shoulders, peaceful face, taking slow breaths.',
        audioText: 'Calm. Your body is peaceful, comfortable, and rested. Everything is okay.',
        cues: 'Gently closed peaceful curved eyes, soft gentle resting smile.',
        svg: `<svg viewBox="0 0 100 100" class="emotion-svg">
            <circle cx="50" cy="50" r="45" fill="#55efc4" stroke="#00b894" stroke-width="4"/>
            <!-- Closed eyes -->
            <path d="M 28 42 Q 36 49 44 42" stroke="#2d3436" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 56 42 Q 64 49 72 42" stroke="#2d3436" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 36 62 Q 50 72 64 62" stroke="#2d3436" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 'scared',
        name: 'Scared / Nervous',
        icon: '😨',
        color: '#a29bfe',
        description: 'Tense and nervous when something feels loud or unfamiliar.',
        audioText: 'Scared. When you feel scared, find a trusted adult, hold a soft toy, or ask for a safe hug.',
        cues: 'Wide worried eyes, trembling mouth line.',
        svg: `<svg viewBox="0 0 100 100" class="emotion-svg">
            <circle cx="50" cy="50" r="45" fill="#a29bfe" stroke="#6c5ce7" stroke-width="4"/>
            <!-- Worried brows -->
            <line x1="28" y1="36" x2="42" y2="32" stroke="#2d3436" stroke-width="4" stroke-linecap="round"/>
            <line x1="72" y1="36" x2="58" y2="32" stroke="#2d3436" stroke-width="4" stroke-linecap="round"/>
            <circle cx="36" cy="46" r="6" fill="#2d3436"/>
            <circle cx="64" cy="46" r="6" fill="#2d3436"/>
            <!-- Wavy nervous mouth -->
            <path d="M 32 68 Q 40 62 48 68 T 68 68" stroke="#2d3436" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>`
    }
];

const EMOTION_SCENARIOS = [
    {
        scenario: "Maya got a delicious scoop of ice cream on a sunny day!",
        question: "How does Maya feel?",
        correctId: 'happy',
        options: ['happy', 'angry', 'scared'],
        feedback: "Yes! Maya feels happy eating her delicious ice cream!"
    },
    {
        scenario: "Lucas's favorite toy truck broke while playing outside.",
        question: "How does Lucas feel?",
        correctId: 'sad',
        options: ['sad', 'happy', 'calm'],
        feedback: "That's right. Lucas feels sad because his toy broke. A friend can help him fix it!"
    },
    {
        scenario: "Sam heard a very loud thunderclap during a stormy night.",
        question: "How does Sam feel?",
        correctId: 'scared',
        options: ['scared', 'happy', 'calm'],
        feedback: "Great job! Sam feels scared of the loud thunder. A warm blanket can make him feel safe."
    },
    {
        scenario: "Aria is resting in a hammock, listening to soft birds singing.",
        question: "How does Aria feel?",
        correctId: 'calm',
        options: ['calm', 'angry', 'surprised'],
        feedback: "Wonderful! Aria feels calm and peaceful listening to nature."
    },
    {
        scenario: "Ethan opened a gift box and an adorable puppy popped out!",
        question: "How does Ethan feel?",
        correctId: 'surprised',
        options: ['surprised', 'sad', 'angry'],
        feedback: "Yes! Ethan was surprised by the cute puppy in the box!"
    }
];

class EmotionsModule {
    constructor(container) {
        this.container = container;
        this.currentMode = 'explore'; // 'explore' or 'game'
        this.currentScenarioIndex = 0;
    }

    render() {
        this.container.innerHTML = `
            <div class="emotions-layout">
                <!-- Mode Switcher -->
                <div class="module-mode-bar">
                    <button class="btn ${this.currentMode === 'explore' ? 'btn-primary' : 'btn-secondary'}" id="btnModeExplore">
                        <span>🔍</span> Emotion Cards
                    </button>
                    <button class="btn ${this.currentMode === 'game' ? 'btn-primary' : 'btn-secondary'}" id="btnModeGame">
                        <span>🎯</span> "How Do They Feel?" Quiz
                    </button>
                </div>

                <!-- Main Content Area -->
                <div id="emotionsContent" class="emotions-content-area">
                    ${this.currentMode === 'explore' ? this.renderExploreHtml() : this.renderGameHtml()}
                </div>
            </div>
        `;

        this.bindEvents();
    }

    renderExploreHtml() {
        return `
            <div class="instructions-banner">
                <span class="banner-icon">💡</span>
                <span class="banner-text">Tap any feeling card to see the facial cues and listen to how it feels!</span>
                <button class="speak-btn-mini" id="btnSpeakInstructions" aria-label="Read Instructions Aloud">🔊 Listen</button>
            </div>
            <div class="emotions-cards-grid">
                ${EMOTIONS_DATA.map(item => `
                    <button class="emotion-explore-card" data-id="${item.id}" aria-label="${item.name}: ${item.description}">
                        <div class="emotion-svg-wrapper">
                            ${item.svg}
                        </div>
                        <h3 class="emotion-title">${item.name}</h3>
                        <p class="emotion-desc">${item.description}</p>
                        <span class="tap-hint">Tap to listen 🔊</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderGameHtml() {
        const scenario = EMOTION_SCENARIOS[this.currentScenarioIndex];
        return `
            <div class="scenario-card" role="region" aria-label="Social Situation Challenge">
                <div class="scenario-header">
                    <span class="scenario-badge">Question ${this.currentScenarioIndex + 1} of ${EMOTION_SCENARIOS.length}</span>
                    <button class="speak-btn-mini" id="btnReadScenario" aria-label="Read Situation Aloud">🔊 Read Aloud</button>
                </div>
                <div class="scenario-story" id="scenarioStory">
                    <div class="story-illustration">📖</div>
                    <p class="story-text">${scenario.scenario}</p>
                </div>
                <h3 class="scenario-question">${scenario.question}</h3>
                <div class="scenario-options-grid">
                    ${scenario.options.map(optId => {
                        const emo = EMOTIONS_DATA.find(e => e.id === optId);
                        return `
                            <button class="scenario-opt-btn" data-id="${optId}" aria-label="${emo.name}">
                                <div class="opt-svg">${emo.svg}</div>
                                <span class="opt-name">${emo.name}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
                <div class="scenario-feedback" id="scenarioFeedback" style="display: none;"></div>
            </div>
        `;
    }

    bindEvents() {
        // Mode switcher
        const btnExplore = this.container.querySelector('#btnModeExplore');
        const btnGame = this.container.querySelector('#btnModeGame');

        btnExplore.addEventListener('click', () => {
            if (window.soundEffects) window.soundEffects.playClick();
            this.currentMode = 'explore';
            this.render();
        });

        btnGame.addEventListener('click', () => {
            if (window.soundEffects) window.soundEffects.playClick();
            this.currentMode = 'game';
            this.render();
        });

        if (this.currentMode === 'explore') {
            this.bindExploreEvents();
        } else {
            this.bindGameEvents();
        }
    }

    bindExploreEvents() {
        const speakInstr = this.container.querySelector('#btnSpeakInstructions');
        if (speakInstr) {
            speakInstr.addEventListener('click', () => {
                if (window.speechEngine) {
                    window.speechEngine.speak("Tap any feeling card to see facial cues and listen to how it feels!");
                }
            });
        }

        const cards = this.container.querySelectorAll('.emotion-explore-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const emo = EMOTIONS_DATA.find(e => e.id === id);
                if (!emo) return;

                if (window.soundEffects) window.soundEffects.playClick();

                card.classList.add('pulse-highlight');
                setTimeout(() => card.classList.remove('pulse-highlight'), 500);

                if (window.speechEngine) {
                    window.speechEngine.speak(emo.audioText);
                }
            });
        });
    }

    bindGameEvents() {
        const scenario = EMOTION_SCENARIOS[this.currentScenarioIndex];

        // Auto read scenario
        const readBtn = this.container.querySelector('#btnReadScenario');
        const fullPrompt = `${scenario.scenario} ${scenario.question}`;

        if (readBtn) {
            readBtn.addEventListener('click', () => {
                if (window.speechEngine) window.speechEngine.speak(fullPrompt);
            });
        }

        // Voice speak on load
        if (window.speechEngine) {
            window.speechEngine.speak(fullPrompt);
        }

        const optButtons = this.container.querySelectorAll('.scenario-opt-btn');
        const feedbackDiv = this.container.querySelector('#scenarioFeedback');

        optButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedId = btn.dataset.id;
                if (selectedId === scenario.correctId) {
                    // Correct!
                    btn.classList.add('correct-choice');
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.className = 'scenario-feedback feedback-success';
                    feedbackDiv.innerHTML = `
                        <span class="feedback-star">⭐</span>
                        <div class="feedback-msg">
                            <strong>Great Job!</strong>
                            <p>${scenario.feedback}</p>
                        </div>
                        <button class="btn btn-primary" id="btnNextScenario">Next Question ➜</button>
                    `;

                    if (window.soundEffects) window.soundEffects.playSuccess();
                    if (window.speechEngine) window.speechEngine.speak(`Great job! ${scenario.feedback}`);
                    if (window.appStorage) {
                        window.appStorage.addStar(1);
                        window.appStorage.incrementStat('emotionsCompleted');
                    }

                    // Next question handler
                    const nextBtn = feedbackDiv.querySelector('#btnNextScenario');
                    nextBtn.addEventListener('click', () => {
                        this.currentScenarioIndex = (this.currentScenarioIndex + 1) % EMOTION_SCENARIOS.length;
                        this.render();
                    });

                } else {
                    // Friendly retry (non-punitive!)
                    btn.classList.add('retry-choice');
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.className = 'scenario-feedback feedback-retry';
                    feedbackDiv.innerHTML = `
                        <span>💭</span>
                        <p>Let's think again together! Look closely at what happened in the story.</p>
                    `;

                    if (window.soundEffects) window.soundEffects.playEncourage();
                    if (window.speechEngine) {
                        window.speechEngine.speak("Let's think again together! You can try another one.");
                    }

                    setTimeout(() => btn.classList.remove('retry-choice'), 1000);
                }
            });
        });
    }
}

window.EmotionsModule = EmotionsModule;
