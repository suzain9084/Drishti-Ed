## Drishti-Ed – Neuro-Adaptive Learning Engine

Drishti-Ed is an **attention-aware education platform** that turns passive video learning into an adaptive, interactive experience.  
Instead of "one size fits all" lectures, Drishti-Ed uses the learner’s **webcam, gaze, and facial emotion signals** to adjust the teaching style in real time.

When the learner looks **confused**, the system pauses the video and asks an LLM to **re‑explain the last 30 seconds in much simpler language**.  
When the learner looks **bored or disengaged**, Drishti-Ed can **inject a quick quiz** to wake them up and reinforce the concept.

---

## Live Demo
🚀 Live application: https://drishti-ed.onrender.com/


## Core Idea & Problem Statement

- **Problem**: Most online education in India (Zoom / YouTube / recorded lectures) is **passive**.  
  - Students frequently **zone out**.  
  - Instructors have **no visibility** into attention or confusion.  
  - The same content is pushed to everyone, even though **90% of students need a different pace or explanation style**.

- **Vision**: Build an education platform that **watches the student back**.  
  Drishti-Ed is an **affective computing + adaptive learning system** that reacts to:
  - **Gaze** – Is the student looking at the screen or away?  
  - **Emotion** – Do they look confused, bored, or engaged?

These signals drive an **AI content engine** that dynamically:
- Re-explains concepts when the student struggles.
- Inserts short quizzes when the student is bored.
- Keeps the learning loop **closed and responsive**, not one-way.

---

## High-Level Architecture

Drishti-Ed is designed around four major roles / subsystems:

- **1. Frontend (React / Vite / TypeScript)**  
  - Custom `VideoPlayer` with overlays for:
    - AI-powered explanations (`AIExplanation`)
    - Quiz popups (`QuizOverlay`)
    - Transcript and context (`TranscriptPanel`)
  - Attention visualization:
    - `AttentionMonitor` – live status (focused / distracted / confused).  
    - `AttentionTimeline` – how attention changes over the session.
  - UI library based on **Tailwind CSS** and component primitives in `components/ui/*` (buttons, dialogs, tabs, cards, etc.).

- **2. On‑Device ML (Browser)** – *ML Person*  
  - Lightweight models for:
    - **Facial Emotion Recognition (FER)** – trained on **FER‑2013**.  
    - **Gaze Estimation / Head Pose** – detects if the learner is looking at the screen.
  - Optimized to run in the browser (e.g. **TensorFlow.js / WebGL**) so that:
    - No raw video is sent to the server.
    - Latency is low enough for real-time feedback.

- **3. Backend “Content Engine” – Generative AI / LLMs** – *Backend Person*  
  - Receives:
    - A **segment of transcript** (e.g. last 30 seconds of speech).  
    - A **state signal** (e.g. `confused`, `bored`, `engaged`).
  - For **confusion**:
    - Sends transcript to **Gemini Pro (Vertex AI)** with a prompt such as:  
      “Explain this again like I’m 5 years old, using analogies and very simple language. Keep it short.”
  - For **boredom**:
    - Asks the LLM to generate **2–4 conceptual MCQs** that test the most recent concept.

- **4. Cloud & Deployment – GCP / Cloud Run** – *Cloud Person*  
  - The generative AI microservice is deployed on **GCP Cloud Run**:
    - Stateless HTTP service around Gemini / Vertex AI.
    - Autoscaling and pay-per-use.
  - CORS and authentication configured so that the web app can securely call:
    - `/api/explain` – for simplified explanations.
    - `/api/quiz` – for dynamically generated quizzes.

---

## Tech Stack

- **Frontend**
  - React 18 + TypeScript
  - Vite 5 (dev server & build)
  - Tailwind CSS 3 (`global.css`, `tailwind.config.js`)
  - UI & icons:
    - `lucide-react`
    - Custom component primitives in `src/components/ui/*`

- **Tooling**
  - ESLint + TypeScript ESLint plugin
  - PostCSS + Autoprefixer

- **(Planned / Optional) ML & Backend**
  - TensorFlow.js for in-browser FER and gaze tracking
  - Vertex AI (Gemini Pro) for explanation & quiz generation
  - GCP Cloud Run for hosting the content engine

---

## Project Structure (Frontend)

Key files and directories:

- **`index.html`** – Vite HTML entry point.
- **`src/main.tsx`** – React root, attaches the app to the DOM.
- **`src/App.tsx`** – Top-level layout and routing for the Drishti-Ed experience.
- **`src/components/VideoPlayer.tsx`** – Custom video player with:
  - Overlay controls  
  - Hooks into attention/AI explanation logic
- **`src/components/AIExplanation.tsx`** – UI for showing simplified LLM-generated explanations.
- **`src/components/QuizOverlay.tsx`** – Quiz UI that appears over the video when the system detects boredom or for periodic assessment.
- **`src/components/AttentionMonitor.tsx`** – Live attention state indicator (focused / distracted / confused).
- **`src/components/AttentionTimeline.tsx`** – Timeline/graph of attention throughout the video.
- **`src/components/TranscriptPanel.tsx`** – Displays the transcript and highlights the active segment.
- **`src/components/Navigation.tsx`** – Top navigation / layout controls.
- **`src/components/common/ImageWithFallback.tsx`** – Utility image component with graceful fallback handling.
- **`src/components/ui/*`** – Reusable UI primitives (buttons, dialogs, cards, tabs, etc.).
- **`src/styles/global.css`** – Global styles and Tailwind base/components/utilities imports.

---

## Getting Started (Local Development)

### Prerequisites

- **Node.js**: v18+ recommended  
- **npm**: v9+ (or use `pnpm`/`yarn` with equivalent commands)

### Install Dependencies

```bash
cd /Users/karan/Desktop/Drishti_Ed_version_1
npm install
```

### Run the Dev Server

```bash
npm run dev
```

Then open the URL printed in the terminal (by default `http://localhost:5173`) in your browser.

### Build for Production

```bash
npm run build
```

The production build will be generated in the `dist` folder.

### Preview the Production Build

```bash
npm run preview
```

---

## How the Attention Loop Works (Conceptual Flow)

1. **Video Playback**
   - The learner watches a lecture or concept video inside the custom `VideoPlayer`.

2. **Signal Capture**
   - In-browser ML models monitor:
     - Gaze direction (screen vs. away).
     - Facial emotion (confused, bored, neutral, etc.).
   - These are converted into an **attention state stream**.

3. **Trigger Conditions**
   - **Confused** for N continuous frames:
     - Pause or slow the video.
     - Capture the **last 30 seconds** of transcript.
     - Send it to the backend `/api/explain`.
   - **Bored / disengaged**:
     - Call `/api/quiz` with the recent transcript.
     - Overlay a short quiz using `QuizOverlay`.

4. **Adaptive Response**
   - `AIExplanation` panel shows a **simplified explanation** (“Explain like I’m 5”).
   - `QuizOverlay` injects **interactive questions** to re-engage the learner.
   - `AttentionTimeline` visualizes how well the learner is staying engaged.

---

## Roles & CV Highlights

Drishti-Ed is intentionally structured so each contributor gets a **strong, senior-level CV story**:

- **ML Engineer**
  - Built **real-time FER & gaze tracking** models.  
  - Optimized for **browser inference** (TensorFlow.js / WebGL).  
  - Worked with **FER‑2013** and custom preprocessing pipelines.

- **Backend Engineer**
  - Designed the **Content Engine** microservice.  
  - Integrated with **Gemini Pro (Vertex AI)** for:
    - Simplified re-explanations.
    - Quiz generation.  
  - Exposed clean REST APIs with clear contracts (`/explain`, `/quiz`).

- **Frontend Engineer**
  - Built a **custom adaptive video player** in React.  
  - Implemented **attention-aware UI**: overlays, timelines, AI panels, and quizzes.  
  - Crafted a modern UI using **Tailwind CSS** and custom component primitives.

- **Cloud / DevOps Engineer**
  - Containerized the Content Engine and deployed it on **GCP Cloud Run**.  
  - Set up:
    - Autoscaling, logging, and monitoring.  
    - Secure integration with Vertex AI.  
    - CORS / API gateway configuration for the frontend.

---

## Future Enhancements

- **Richer emotion categories**: frustration, excitement, curiosity.  
- **Personalized pacing**: automatically speed up / slow down based on attention.  
- **Student profiles**: store anonymized learning patterns to adapt future lessons.  
- **Multimodal inputs**: combine webcam, keystroke patterns, and quiz performance.  
- **Teacher dashboard**: real-time and post-class analytics on class engagement.

---

## Notes

- This repository currently focuses on the **frontend implementation** using React, Vite, and Tailwind.  
- ML models and backend services (Gemini / Cloud Run) can be integrated via HTTP APIs once they are implemented and deployed.


