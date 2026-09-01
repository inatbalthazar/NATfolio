# Portfolio Project Guidelines & Agent Instructions

This workspace contains the interactive personal portfolio website for **Watcharine Duangsri** (based on the Smith Robinson design system).

## 🛠️ Tech Stack & Architecture

- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Libraries**:
  - **GSAP** (GreenSock Animation Platform) + `ScrollTrigger` + `ScrollToPlugin` for scroll-driven animations and UI transitions.
  - **Leaflet.js** for interactive map embedding (`#vintage-map`).
- **Styling**: Pure CSS with CSS Custom Properties, modern typography (`Chakra Petch`, `Inter`), responsive layout, and backdrop blur headers/footers.

---

## 🎨 Design Systems & Conventions

1. **Color Palette & Design Tokens**:
   - `--light-green`: `#afeedf`
   - `--charcoal`: `#0d0b10`
   - `--honeydew`: `#f1ffe7`
2. **Pixel-Art Aesthetic**:
   - Interactive elements in `.adventure-footer` use pixel-art rendering rules:
     ```css
     image-rendering: -moz-crisp-edges;
     image-rendering: -webkit-crisp-edges;
     image-rendering: pixelated;
     image-rendering: crisp-edges;
     ```
3. **Sticky Blurring**:
   - Top navigation bar and bottom adventure footer feature glassmorphism with sticky positioning and backdrop blur.

---

## 🎮 Interactive Adventure Footer (`.adventure-footer`)

1. **Character Mechanics (`Andy`)**:
   - Element ID: `#adventure-char-andy`
   - Assets: `images/andy_still.png` (idle) and `images/andy_walk.gif` (flying/moving).
   - **Movement System**: Follows the mouse cursor inside `.adventure-footer` smoothly via `requestAnimationFrame` lerp (`lerpSpeed = 0.08`).
   - Automatically flips facing direction (`scaleX(-1)` vs `scaleX(1)`) based on horizontal velocity vector.
   - Mouseleave returns Andy smoothly to ground idle position (`bottom: 1%`).
2. **Hotspots & Interactions**:
   - Hotspot elements (`.hotspot-object`, `#adventure-treasure`) are interactive objects inside `.adventure-scene`.
   - Hover displays `.adventure-tooltip` with action text (`LOOK`, `PICK UP`).
   - Clicking a hotspot triggers `.adventure-speech` bubble with character dialogue.
3. **Script Execution Rules**:
   - Always wrap adventure footer script logic inside `document.addEventListener('DOMContentLoaded', ...)` to ensure all DOM elements are mounted before attachment.
   - Use numerical in-memory state tracking for percentages (`currentX`, `currentY`) rather than parsing computed inline CSS strings (`parseFloat(elem.style.left)`), avoiding GSAP unit conversion bugs.

---

## 📋 General Development Rules

- **Asset Paths**: All images and JS/CSS assets reside in `images/`, `css/`, and `js/` directories. Always verify local path references exist before completing changes.
- **No Swallowing Errors**: Base diagnoses on exact empirical browser console or script logs.
- **Verification**: Run `verify.js` or standard node verification scripts after making structural changes to HTML/CSS/JS.
