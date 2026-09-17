/**
 * routines.js - Daily Living Skills & Routine Sequencing
 * Helps students master daily personal care, hygiene, and self-help routines
 * by breaking tasks into clear, sequential steps with visual and auditory milestones.
 */

const ROUTINES_DATA = [
    {
        id: 'teeth',
        title: 'Brushing My Teeth',
        icon: '🪥',
        color: '#48dbfb',
        steps: [
            { order: 1, title: 'Toothpaste', desc: 'Squeeze a pea-sized drop of toothpaste onto the toothbrush.', icon: '🧴' },
            { order: 2, title: 'Brush Gently', desc: 'Brush the front, top, and back of your teeth in soft little circles.', icon: '🪥' },
            { order: 3, title: 'Rinse with Water', desc: 'Spit into the sink and rinse your mouth with clean water.', icon: '💧' },
            { order: 4, title: 'Sparkling Smile', desc: 'All done! Wipe your mouth and show your shiny, clean smile!', icon: '✨' }
        ]
    },
    {
        id: 'hands',
        title: 'Washing My Hands',
        icon: '🧼',
        color: '#1dd1a1',
        steps: [
            { order: 1, title: 'Wet Hands', desc: 'Turn on the faucet and wet your hands with clean water.', icon: '🚰' },
            { order: 2, title: 'Soap & Scrub', desc: 'Apply soap and scrub front, back, and between your fingers.', icon: '🧼' },
            { order: 3, title: 'Rinse Bubbles', desc: 'Wash all the soap bubbles completely down the sink.', icon: '🫧' },
            { order: 4, title: 'Dry with Towel', desc: 'Dry your hands gently using a clean, dry towel.', icon: '🧻' }
        ]
    },
    {
        id: 'morning',
        title: 'Morning Routine',
        icon: '☀️',
        color: '#feca57',
        steps: [
            { order: 1, title: 'Wake Up', desc: 'Open eyes, stretch arms up high, and smile at the bright morning!', icon: '⏰' },
            { order: 2, title: 'Eat Breakfast', desc: 'Enjoy a healthy, delicious morning breakfast for energy.', icon: '🥣' },
            { order: 3, title: 'Get Dressed', desc: 'Put on clean, comfortable clothes for the day.', icon: '👕' },
            { order: 4, title: 'Ready to Go', desc: 'Pack your backpack and put on your shoes. You are ready!', icon: '🎒' }
        ]
    },
    {
        id: 'bedtime',
        title: 'Bedtime Routine',
        icon: '🌙',
        color: '#a29bfe',
        steps: [
            { order: 1, title: 'Put on Pajamas', desc: 'Change into your soft, cozy night pajamas.', icon: '🧸' },
            { order: 2, title: 'Brush Teeth', desc: 'Brush your teeth so they stay clean and healthy while you sleep.', icon: '🪥' },
            { order: 3, title: 'Bedtime Story', desc: 'Read a quiet, calming story together.', icon: '📖' },
            { order: 4, title: 'Sweet Dreams', desc: 'Tuck under the warm blanket, close eyes, and rest peacefully.', icon: '🌙' }
        ]
    }
];

class RoutinesModule {
    constructor(container) {
        this.container = container;
        this.selectedRoutineIndex = 0;
        this.shuffledSteps = [];
        this.placedSteps = [];
    }

    initRoutine(idx = 0) {
        this.selectedRoutineIndex = idx;
        const routine = ROUTINES_DATA[this.selectedRoutineIndex];
        // Shuffle steps for sequencing challenge
        this.shuffledSteps = [...routine.steps].sort(() => Math.random() - 0.5);
        this.placedSteps = [];
    }

    render() {
        const routine = ROUTINES_DATA[this.selectedRoutineIndex];
        if (this.placedSteps.length === 0 && this.shuffledSteps.length === 0) {
            this.initRoutine(this.selectedRoutineIndex);
        }

        const isCompleted = this.placedSteps.length === routine.steps.length;

        this.container.innerHTML = `
            <div class="routines-layout">
                <!-- Routine Selection Header -->
                <div class="routine-selector-bar" role="tablist" aria-label="Select Routine">
                    ${ROUTINES_DATA.map((r, idx) => `
                        <button class="routine-pill-btn ${idx === this.selectedRoutineIndex ? 'active' : ''}" 
                                data-idx="${idx}"
                                role="tab"
                                aria-selected="${idx === this.selectedRoutineIndex}">
                            <span class="routine-pill-icon">${r.icon}</span>
                            <span class="routine-pill-text">${r.title}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- Active Routine Header -->
                <div class="routine-banner">
                    <div class="banner-left">
                        <span class="banner-routine-icon">${routine.icon}</span>
                        <div>
                            <h2>${routine.title}</h2>
                            <p>What comes next? Tap the correct step to complete the sequence!</p>
                        </div>
                    </div>
                    <button class="speak-btn-mini" id="btnSpeakRoutineInstr" aria-label="Read Routine Instructions">🔊 Read Aloud</button>
                </div>

                <!-- Sequence Timeline (Where placed steps appear) -->
                <div class="timeline-container" role="region" aria-label="Routine Steps Timeline">
                    <div class="timeline-track">
                        ${routine.steps.map((_, i) => {
                            const placed = this.placedSteps[i];
                            return `
                                <div class="timeline-slot ${placed ? 'slot-filled' : 'slot-empty'}" data-slot="${i + 1}">
                                    <div class="slot-number">${i + 1}</div>
                                    ${placed ? `
                                        <div class="placed-card animate-pop">
                                            <span class="placed-icon">${placed.icon}</span>
                                            <strong class="placed-title">${placed.title}</strong>
                                            <span class="placed-desc">${placed.desc}</span>
                                        </div>
                                    ` : `
                                        <div class="empty-placeholder">
                                            <span>Step ${i + 1}</span>
                                            <small>Tap card below</small>
                                        </div>
                                    `}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Completed Celebration or Options pool -->
                ${isCompleted ? `
                    <div class="routine-success-card animate-pop">
                        <div class="success-icon">🌟🎉🌟</div>
                        <h3>Fantastic Job! You Completed "${routine.title}"!</h3>
                        <p>You followed all the steps in perfect order!</p>
                        <div class="success-actions">
                            <button class="btn btn-primary" id="btnReplayRoutine">
                                <span>🔄</span> Play Again
                            </button>
                            <button class="btn btn-secondary" id="btnNextRoutine">
                                <span>➜</span> Next Routine
                            </button>
                        </div>
                    </div>
                ` : `
                    <!-- Cards Pool to Pick Next Step From -->
                    <div class="available-steps-pool" role="region" aria-label="Available Steps to Choose">
                        <h4 class="pool-title">Choose Step ${this.placedSteps.length + 1}:</h4>
                        <div class="pool-grid">
                            ${this.shuffledSteps.map(step => `
                                <button class="step-choice-card" data-order="${step.order}" aria-label="Step: ${step.title}">
                                    <span class="step-choice-icon">${step.icon}</span>
                                    <span class="step-choice-title">${step.title}</span>
                                    <span class="step-choice-desc">${step.desc}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `}
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const routine = ROUTINES_DATA[this.selectedRoutineIndex];

        // Routine switcher tabs
        const pillBtns = this.container.querySelectorAll('.routine-pill-btn');
        pillBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx, 10);
                if (idx !== this.selectedRoutineIndex) {
                    if (window.soundEffects) window.soundEffects.playClick();
                    this.initRoutine(idx);
                    this.render();
                }
            });
        });

        // Instructions Read Aloud
        const speakBtn = this.container.querySelector('#btnSpeakRoutineInstr');
        if (speakBtn) {
            speakBtn.addEventListener('click', () => {
                if (window.speechEngine) {
                    window.speechEngine.speak(`Let's organize ${routine.title}. What comes next? Tap the right step!`);
                }
            });
        }

        // Replay button
        const replayBtn = this.container.querySelector('#btnReplayRoutine');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                this.initRoutine(this.selectedRoutineIndex);
                this.render();
            });
        }

        // Next Routine button
        const nextBtn = this.container.querySelector('#btnNextRoutine');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                const nextIdx = (this.selectedRoutineIndex + 1) % ROUTINES_DATA.length;
                this.initRoutine(nextIdx);
                this.render();
            });
        }

        // Step choice cards
        const choiceCards = this.container.querySelectorAll('.step-choice-card');
        choiceCards.forEach(card => {
            card.addEventListener('click', () => {
                const order = parseInt(card.dataset.order, 10);
                const expectedOrder = this.placedSteps.length + 1;

                if (order === expectedOrder) {
                    // Correct step!
                    const stepObj = routine.steps.find(s => s.order === order);
                    this.placedSteps.push(stepObj);
                    this.shuffledSteps = this.shuffledSteps.filter(s => s.order !== order);

                    if (window.soundEffects) window.soundEffects.playSuccess();
                    if (window.speechEngine) {
                        window.speechEngine.speak(`Step ${order}: ${stepObj.title}! ${stepObj.desc}`);
                    }

                    if (this.placedSteps.length === routine.steps.length) {
                        // Completed whole sequence!
                        if (window.appStorage) {
                            window.appStorage.addStar(2);
                            window.appStorage.incrementStat('routinesCompleted');
                        }
                        setTimeout(() => {
                            if (window.soundEffects) window.soundEffects.playFanfare();
                            if (window.speechEngine) {
                                window.speechEngine.speak(`Hooray! You completed all steps for ${routine.title}!`);
                            }
                        }, 600);
                    }

                    this.render();

                } else {
                    // Gentle retry
                    card.classList.add('retry-wobble');
                    setTimeout(() => card.classList.remove('retry-wobble'), 600);

                    if (window.soundEffects) window.soundEffects.playEncourage();
                    if (window.speechEngine) {
                        window.speechEngine.speak(`Almost! What do we need to do first for Step ${expectedOrder}?`);
                    }
                }
            });
        });
    }
}

window.RoutinesModule = RoutinesModule;
