
# Interactive Quiz

An engaging **web-based quiz game** that tests user's general knowledge through image-based questions.  
Each question comes with a **timer**, **hint option**, and **dynamic feedback** after completion.

## Live Demo

[Try the Interactive Quiz (Hosted on Vercel)](https://interactive-quiz-xi-five.vercel.app/)

> **Note:**  
> To open the quiz in a **new tab**, use:  
> - **Ctrl + Click** (Windows/Linux)  
> - **Cmd + Click** (Mac)  
> - Or **Middle-click** the link  

---

## Features

- **10 Image-Based Questions** (Shuffle every playthrough)
- **Timer for each question** (20 seconds default)
- **Hints** (Displayed on button click, styled for readability)
- **Randomized options** per question
- **Answer Review Screen**:
  - **Green gradient** for correct answers
  - **Soft red highlight** for incorrect selections
  - **Selected options highlighted** (even if wrong)
  - **Unanswered questions** tagged clearly
- **Restart Quiz** option
- **Smooth Animations** (Fade-in transitions)
- **Responsive Design** (Works on desktop, tablet, and mobile)
- **Custom Background** and **Poppins, sans-serif** font for a calm UI

---

## How to Use

1. Click **Start Quiz** to begin.
2. For each question:
   - Choose your answer before the timer runs out.
   - Click **Show Hint** if needed.
   - Submit your answer or let the timer auto-move to the next.
3. After all questions, review your answers.
4. Click **Restart Quiz** to try again.

---

## Technologies Used

- **HTML**
- **CSS** (Flexbox, Media Queries, Gradients)
- **JavaScript** (Vanilla JS, no frameworks)

---

## Project Structure

```
Interactive-Quiz/
│
├── index.html         # Main UI structure (Start screen, Quiz, Result, Footer)
├── script.js          # Core logic (Quiz flow, Timer, Hints, Review screen)
├── style/
│   └── style.css      # Styling (Theme, Animations, Responsiveness)
├── assets/
│   ├── *.png,         # All quiz images & background
└── README.md          # Project documentation (this file)
```

---

## Code Overview

### 1️⃣ **script.js**

- `setupQuiz()`: Initializes the quiz, resets state, shuffles questions.
- `displayQuestion()`: Handles rendering each question, options, image, and hint.
- `finishQuiz()`: Displays the results, shows feedback with proper highlights.
- **Helper Functions**:
  - `shuffleArray()` - Randomizes array elements.
  - `createElement()` - Simplifies DOM creation.
  - `updateTimerDisplay()` - Updates timer UI.

### 2️⃣ **style.css**

- Gradient background (`background1.png` used with overlay)
- Custom button styles: **Submit**, **Hint**, **Restart**
- Answer feedback colors: **correct**, **wrong**, **unanswered**
- Responsive design: Tablet & Mobile support via media queries

### 3️⃣ **index.html**

- **Start Screen** → Quiz Area → Result Section  
- Footer with **GitHub** and **LinkedIn** links (for Sahari Krithik)

---

## How to Run Locally

1. **Clone or download** this repository.
2. Open `index.html` in any modern browser.
3. Enjoy the quiz!

---

## Customization

- **Add your own questions** in `script.js` inside the `quizQuestions` array.
- **Replace images** in the `assets/` folder.
- Change timer settings by modifying `questionTimeLeft` (default: 20s).

---

## License

This project is open source and free to use for educational or personal purposes.


---
