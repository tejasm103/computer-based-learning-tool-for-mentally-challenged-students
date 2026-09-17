# MindSpark: Computer-Based Learning & Communication Tool
### An Accessible, Multi-Sensory Educational Software for Students with Intellectual Disabilities and Special Learning Needs

---

## 📖 1. Project Overview & Abstract

Individuals with intellectual and developmental disabilities (such as Down syndrome, Autism Spectrum Disorder, cerebral palsy, and developmental delays) often encounter severe barriers when interacting with conventional e-learning systems. Traditional software frequently relies on complex text instructions, time-pressured tasks, punitive feedback (e.g., harsh buzzers and red crosses), and small interactive targets.

**MindSpark** is a dedicated, multi-sensory computer-based assistive learning tool engineered under the **Universal Design for Learning (UDL)** framework and **WCAG 2.1 AAA** cognitive accessibility standards.

It combines:
1. **Auditory Reinforcement**: Synthesizing calm spoken voice prompts via the native **Web Speech API** and soothing harmonic chimes using the **Web Audio API**.
2. **Visual Clues**: High-contrast, scalable iconography, expressive vector avatars, and clear color-coded states.
3. **Tactile/Motor Accommodation**: Oversized buttons (minimum 54px–130px) and zero-time-limit environments.

---

## 🎯 2. Core Educational Modules

### 🗣️ Module 1: Augmentative & Alternative Communication (AAC)
- **Purpose**: Empowers non-verbal or speech-delayed students to independently express essential needs and emotional states.
- **Features**:
  - **Quick Needs**: Instant one-tap vocalization for *Water, Food, Restroom, Help, Hurt, Tired, Break, Hug*.
  - **Feelings & Actions**: *Happy, Sad, Angry, Excited, Want, More, Play, Stop*.
  - **Visual Sentence Builder**: Allows students to chain cards together (e.g., `[I Want]` + `[Water]` + `[Please]`) and tap **Speak Sentence** to synthesize the complete phrase.

### 😊 Module 2: Emotion Recognition & Social Situations
- **Purpose**: Cultivates emotional literacy, self-regulation, and situational empathy.
- **Features**:
  - **Emotion Explorer**: Interactive SVG facial illustrations depicting 6 core emotions (*Happy, Sad, Angry, Surprised, Calm, Scared*). Tapping each face describes physical cues and coping strategies.
  - **"How Do They Feel?" Quiz**: Relatable mini-stories (e.g., *Maya got an ice cream cone on a sunny day*) where learners identify the matching emotion without punitive feedback on retries.

### 🪥 Module 3: Daily Living Skills & Routine Sequencing
- **Purpose**: Promotes personal autonomy and hygiene through task analysis and chronological sequencing.
- **Routines Covered**:
  - *Brushing My Teeth* (Toothpaste → Brush circles → Rinse with water → Shiny smile)
  - *Washing My Hands* (Wet hands → Soap lather → Rinse bubbles → Dry with towel)
  - *Morning Routine* (Wake up & stretch → Breakfast → Clothes → Backpack)
  - *Bedtime Routine* (Pajamas → Brush teeth → Bedtime story → Sweet dreams)
- **Features**: Scrambled step tiles that learners reconstruct chronologically with auditory verification.

### 🔺 Module 4: Cognitive Association: Shapes & Colors
- **Purpose**: Fosters visual discrimination, categorisation, and object identification.
- **Features**:
  - Geometric shapes (*Circle, Square, Triangle, Star, Heart, Diamond*).
  - Everyday familiar objects (*Apple, Ball, Toy Car, Book, Sun, Flower*).
  - Interactive "Find the Match!" challenges with clear speech prompts.

### ⭐ Module 5: Tactile Multi-Sensory Counting (1 to 10)
- **Purpose**: Bridges concrete quantities, abstract number symbols, musical pitches, and spoken words.
- **Features**:
  - Touchable objects (Golden Stars, Red Apples, Balloons, Rubber Ducks) that bounce and pop when pressed.
  - Ascending pentatonic audio feedback: Tap 1 plays note C4, tap 2 plays D4, tap 3 plays E4, reinforcing numerical magnitude acoustically.
  - Target challenges ("Can you count 5 stars?") and Free Play counting modes.

### 📊 Module 6: Educator / Caregiver Dashboard & Settings
- **Progress Tracking**: Star reward counter and session stats logged in `localStorage`.
- **Accessibility Suite**:
  - **High Contrast Mode**: WCAG 2.1 AAA high-visibility yellow-on-black theme for low-vision learners.
  - **Calm Sensory Mode**: Muted pastel palette to reduce sensory overload in students on the autism spectrum.
  - **Text Scaling**: Normal (17px), Large (21px), and Extra Large (25px).
  - **Dyslexia-Friendly Typography**: Adjusted letter-tracking and weighted bottoms.
  - **Adjustable Speech Rate**: Configurable slider (0.5x to 1.2x) to accommodate varied cognitive processing speeds.

---

## 💻 3. System Architecture & Tech Stack

- **Frontend**: Clean HTML5 semantic layout, modern CSS3 (Flexbox, CSS Grid, Custom Properties), and vanilla ECMAScript 6.
- **Speech Synthesis**: Native `window.speechSynthesis` (Web Speech API) — works completely offline and requires zero paid API tokens.
- **Audio Synthesizer**: Native `window.AudioContext` (Web Audio API) — procedural tone generation without reliance on external `.mp3` files.
- **State Persistence**: Browser `localStorage` for progress logs, stars, and user preferences.
- **Zero External Dependencies**: Does not require `npm`, Node.js, or cloud databases.

---

## 🚀 4. How to Run the Application

### Method 1: Using the Python Launcher (Recommended)
Python 3 is already installed on your system.
1. Open a terminal in this project directory:
   ```powershell
   python run_app.py
   ```
2. The launcher will automatically spin up a local HTTP server and open your default web browser to `http://localhost:8000`.

### Method 2: Direct Browser Execution
- Simply double-click `index.html` to open it in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

---

## 🎓 5. Typical College Viva / Presentation Q&A

### Q1: Why is this tool beneficial for mentally challenged students?
**Answer**: Traditional educational interfaces suffer from cognitive overload, complex textual instructions, and punitive error feedback. MindSpark applies Universal Design for Learning (UDL) by providing multi-modal representation (visual cues, speech narration, musical tones) and error-free learning loops where mistakes receive gentle coaching rather than discouraging penalties.

### Q2: How does the procedural Web Audio API help here?
**Answer**: Rather than loading external static sound files that might fail to load offline, MindSpark synthesizes pure frequencies procedurally using oscillators. We use soft sine and triangle waveforms structured in ascending pentatonic chords (C5–E5–G5–C6), avoiding harsh frequencies that cause sensory agitation in children with sensory processing sensitivities.

### Q3: What is AAC and why is it included?
**Answer**: Augmentative and Alternative Communication (AAC) allows individuals with speech or language impairments to communicate using visual symbols. MindSpark includes a digital PECS (Picture Exchange Communication System) board with a sentence strip that allows learners to build sentences and vocalize their immediate physical and emotional needs.

---

## 📄 License
Created for academic demonstration and special education development. Free to modify and expand for educational purposes.
