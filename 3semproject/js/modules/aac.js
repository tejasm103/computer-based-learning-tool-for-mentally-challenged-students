/**
 * aac.js - Augmentative & Alternative Communication (AAC) Soundboard
 * Empowers non-verbal, minimally-verbal, or speech-delayed students to express
 * essential daily needs, feelings, and social requests.
 */

const AAC_CATEGORIES = [
    {
        id: 'needs',
        name: 'Daily Needs',
        icon: '🚰',
        color: '#4ecdc4',
        cards: [
            { id: 'water', label: 'Water', phrase: 'I need water, please.', icon: '💧', category: 'needs' },
            { id: 'food', label: 'Hungry / Food', phrase: 'I am hungry, I want food.', icon: '🥪', category: 'needs' },
            { id: 'toilet', label: 'Restroom', phrase: 'I need to use the restroom.', icon: '🚻', category: 'needs' },
            { id: 'help', label: 'Help Me', phrase: 'Can you please help me?', icon: '🙋', category: 'needs' },
            { id: 'tired', label: 'Tired / Rest', phrase: 'I feel tired and need to rest.', icon: '🛏️', category: 'needs' },
            { id: 'hurt', label: 'It Hurts', phrase: 'It hurts, I need care.', icon: '🩹', category: 'needs' },
            { id: 'hug', label: 'Comfort / Hug', phrase: 'I want a gentle hug, please.', icon: '🤗', category: 'needs' },
            { id: 'break', label: 'Take a Break', phrase: 'I need a short quiet break.', icon: '⏸️', category: 'needs' }
        ]
    },
    {
        id: 'actions',
        name: 'Action Words',
        icon: '🏃',
        color: '#ff6b6b',
        cards: [
            { id: 'iwant', label: 'I Want', phrase: 'I want', icon: '👉', category: 'actions' },
            { id: 'ifeel', label: 'I Feel', phrase: 'I feel', icon: '💭', category: 'actions' },
            { id: 'play', label: 'Play', phrase: 'I want to play.', icon: '🎨', category: 'actions' },
            { id: 'go', label: 'Go / Walk', phrase: 'Let us go.', icon: '🚶', category: 'actions' },
            { id: 'stop', label: 'Stop', phrase: 'Please stop now.', icon: '🛑', category: 'actions' },
            { id: 'more', label: 'More', phrase: 'I want more, please.', icon: '➕', category: 'actions' },
            { id: 'finished', label: 'All Done', phrase: 'I am all done!', icon: '✅', category: 'actions' },
            { id: 'listen', label: 'Listen to Music', phrase: 'I want to listen to music.', icon: '🎵', category: 'actions' }
        ]
    },
    {
        id: 'feelings',
        name: 'Emotions',
        icon: '😊',
        color: '#feca57',
        cards: [
            { id: 'happy', label: 'Happy', phrase: 'I feel happy!', icon: '😄', category: 'feelings' },
            { id: 'sad', label: 'Sad', phrase: 'I feel sad.', icon: '😢', category: 'feelings' },
            { id: 'angry', label: 'Mad / Frustrated', phrase: 'I feel frustrated and angry.', icon: '😠', category: 'feelings' },
            { id: 'excited', label: 'Excited', phrase: 'I feel very excited!', icon: '🤩', category: 'feelings' },
            { id: 'calm', label: 'Calm & Peaceful', phrase: 'I feel calm and peaceful.', icon: '😌', category: 'feelings' },
            { id: 'scared', label: 'Scared / Nervous', phrase: 'I feel nervous and scared.', icon: '😨', category: 'feelings' }
        ]
    },
    {
        id: 'social',
        name: 'Social & Manners',
        icon: '👋',
        color: '#48dbfb',
        cards: [
            { id: 'yes', label: 'Yes', phrase: 'Yes!', icon: '👍', category: 'social' },
            { id: 'no', label: 'No', phrase: 'No, thank you.', icon: '👎', category: 'social' },
            { id: 'hello', label: 'Hello / Hi', phrase: 'Hello! Good to see you.', icon: '👋', category: 'social' },
            { id: 'bye', label: 'Good Bye', phrase: 'Goodbye! See you later.', icon: '👋', category: 'social' },
            { id: 'please', label: 'Please', phrase: 'Please.', icon: '🙏', category: 'social' },
            { id: 'thankyou', label: 'Thank You', phrase: 'Thank you very much!', icon: '💖', category: 'social' }
        ]
    }
];

class AACModule {
    constructor(container) {
        this.container = container;
        this.sentence = [];
        this.activeCategory = 'needs';
    }

    render() {
        this.container.innerHTML = `
            <div class="aac-layout">
                <!-- Top Sentence Builder Strip -->
                <div class="sentence-strip-container" role="region" aria-label="Sentence Builder">
                    <div class="sentence-strip-label">
                        <span>Sentence Builder:</span>
                        <small>Tap cards below to build your phrase or speak instantly</small>
                    </div>
                    <div class="sentence-strip" id="sentenceStrip">
                        <div class="sentence-placeholder" id="sentencePlaceholder">
                            Tap cards below to form your sentence...
                        </div>
                    </div>
                    <div class="sentence-controls">
                        <button class="btn btn-speak" id="btnSpeakSentence" aria-label="Speak Sentence">
                            <span class="btn-icon">🔊</span>
                            <span class="btn-text">Speak Sentence</span>
                        </button>
                        <button class="btn btn-secondary" id="btnDeleteLast" aria-label="Delete Last Word">
                            <span class="btn-icon">⌫</span>
                            <span class="btn-text">Erase Last</span>
                        </button>
                        <button class="btn btn-secondary" id="btnClearSentence" aria-label="Clear Entire Sentence">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Clear All</span>
                        </button>
                    </div>
                </div>

                <!-- Category Tabs -->
                <div class="aac-category-tabs" role="tablist" aria-label="Communication Categories">
                    ${AAC_CATEGORIES.map(cat => `
                        <button class="cat-tab ${cat.id === this.activeCategory ? 'active' : ''}" 
                                data-cat="${cat.id}"
                                role="tab"
                                aria-selected="${cat.id === this.activeCategory}"
                                style="--accent-color: ${cat.color}">
                            <span class="tab-icon">${cat.icon}</span>
                            <span class="tab-label">${cat.name}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- Cards Grid -->
                <div class="aac-cards-grid" id="aacCardsGrid" role="region" aria-label="AAC Cards">
                    ${this.renderCardsHtml()}
                </div>
            </div>
        `;

        this.bindEvents();
        this.updateSentenceStrip();
    }

    renderCardsHtml() {
        const cat = AAC_CATEGORIES.find(c => c.id === this.activeCategory) || AAC_CATEGORIES[0];
        return cat.cards.map(card => `
            <button class="aac-card" 
                    data-id="${card.id}" 
                    data-label="${card.label}" 
                    data-phrase="${card.phrase}" 
                    data-icon="${card.icon}"
                    aria-label="${card.label}: ${card.phrase}">
                <div class="aac-card-icon">${card.icon}</div>
                <div class="aac-card-label">${card.label}</div>
            </button>
        `).join('');
    }

    bindEvents() {
        // Tab switching
        const tabs = this.container.querySelectorAll('.cat-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (window.soundEffects) window.soundEffects.playClick();
                this.activeCategory = tab.dataset.cat;
                tabs.forEach(t => {
                    t.classList.toggle('active', t === tab);
                    t.setAttribute('aria-selected', t === tab);
                });
                const grid = this.container.querySelector('#aacCardsGrid');
                grid.innerHTML = this.renderCardsHtml();
                this.bindCardEvents();
            });
        });

        this.bindCardEvents();

        // Speak Sentence
        const speakBtn = this.container.querySelector('#btnSpeakSentence');
        speakBtn.addEventListener('click', () => {
            if (this.sentence.length === 0) {
                if (window.speechEngine) {
                    window.speechEngine.speak('Your sentence strip is empty. Tap any cards below to speak!');
                }
                return;
            }
            const fullText = this.sentence.map(item => item.word).join(' ');
            if (window.speechEngine) {
                window.speechEngine.speak(fullText);
            }
            if (window.soundEffects) {
                window.soundEffects.playSuccess();
            }
            if (window.appStorage) {
                window.appStorage.incrementStat('aacPhrases');
            }
        });

        // Delete Last
        const delBtn = this.container.querySelector('#btnDeleteLast');
        delBtn.addEventListener('click', () => {
            if (this.sentence.length > 0) {
                if (window.soundEffects) window.soundEffects.playClick();
                this.sentence.pop();
                this.updateSentenceStrip();
            }
        });

        // Clear All
        const clearBtn = this.container.querySelector('#btnClearSentence');
        clearBtn.addEventListener('click', () => {
            if (this.sentence.length > 0) {
                if (window.soundEffects) window.soundEffects.playClick();
                this.sentence = [];
                this.updateSentenceStrip();
            }
        });
    }

    bindCardEvents() {
        const cards = this.container.querySelectorAll('.aac-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const label = card.dataset.label;
                const phrase = card.dataset.phrase;
                const icon = card.dataset.icon;

                // Play soft click
                if (window.soundEffects) window.soundEffects.playClick();

                // Add to sentence strip
                this.sentence.push({ word: label, phrase: phrase, icon: icon });
                this.updateSentenceStrip();

                // Speak this card immediately so learner gets audio-visual feedback
                if (window.speechEngine) {
                    window.speechEngine.speak(label);
                }

                // Temporary pulse animation
                card.classList.add('card-pressed');
                setTimeout(() => card.classList.remove('card-pressed'), 300);
            });
        });
    }

    updateSentenceStrip() {
        const strip = this.container.querySelector('#sentenceStrip');
        if (!strip) return;

        if (this.sentence.length === 0) {
            strip.innerHTML = `
                <div class="sentence-placeholder" id="sentencePlaceholder">
                    Tap cards below to form your sentence...
                </div>
            `;
            return;
        }

        strip.innerHTML = this.sentence.map((item, idx) => `
            <div class="strip-item" data-idx="${idx}" title="${item.phrase}">
                <span class="strip-icon">${item.icon}</span>
                <span class="strip-word">${item.word}</span>
            </div>
        `).join('');
    }
}

window.AACModule = AACModule;
