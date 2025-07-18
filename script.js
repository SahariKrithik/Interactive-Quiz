let quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
        image: "assets/paris.png",
        hint: "It's known as the City of Light and famous for the Eiffel Tower."
    },

    {
        question: "Which planet is called the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        image: "assets/mars.png",
        hint: "Think of space rovers and red dust"
    },

    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci",
        image: "assets/mona_lisa.jpg",
        hint: "He was also an inventor"
    },

    {
        question: "Which animal is the fastest on land?",
        options: ["Greyhound", "Horse", "Lion", "Cheetah"],
        answer: "Cheetah",
        image: "assets/cheetah.png",
        hint: "It’s a spotted big cat"
    },

    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Southern Ocean"],
        answer: "Pacific Ocean",
        image: "assets/pacific_ocean.png",
        hint: "	It covers more than 30% of the Earth’s surface"
    },

    {
        question: "Which is the tallest mountain in the world?",
        options: ["Mount Kilimanjaro", "Mount Elbrus", "Mount Everest", "K2"],
        answer: "Mount Everest",
        image: "assets/mount_everest.png",
        hint: "It's located in the Himalayas and is over 8,800 meters tall."
    },

    {
        question: "Who is known as the 'Father of Computers?'",
        options: ["Charles Babbage", "Alan Turing", "Isaac Newton", "Bill Gates"],
        answer: "Charles Babbage",
        image: "assets/charles_babbge.png",
        hint: "He designed the first mechanical computer called the Analytical Engine."
    },

    {
        question: "What is the chemical symbol for Gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        answer: "Au",
        image: "assets/gold.png",
        hint: "It comes from the Latin word 'Aurum.'"
    },

    {
        question: "Which famous monument was built as a tomb by Mughal Emperor Shah Jahan?",
        options: ["Qutub Minar", "Charminar", "Red Fort", "Taj Mahal"],
        answer: "Taj Mahal",
        image: "assets/taj_mahal.png",
        hint: "This white marble structure is in Agra and symbolizes eternal love."
    },

    {
        question: "What is the smallest planet in our Solar System?",
        options: ["Mars", "Earth", "Mercury", "Pluto (Note: It's classified as a dwarf planet)"],
        answer: "Mercury",
        image: "assets/mercury.png",
        hint: "It's closest to the Sun and completes one orbit in just 88 days."
    }, 
]

document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    quizWrapper.style.display = "block";

    setupQuiz();
});

quizQuestions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let totalTime = 0;
let quizTimer;
let questionTimer;
let questionTimeLeft = 20;

const quizWrapper = document.getElementById("quiz-wrapper");
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");



function setupQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    totalTime = 0;
    questionTimeLeft = 20;

    // Shuffle questions
    quizQuestions.sort(() => Math.random() - 0.5);

    // Create progress and timer
    const progressDisplay = document.createElement("div");
    progressDisplay.id = "progress";
    quizContainer.before(progressDisplay);

    const timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    quizContainer.before(timerDisplay);

    quizTimer = setInterval(() => { totalTime++; }, 1000);
    displayQuestion(progressDisplay, timerDisplay);
}

function displayQuestion(progressDisplay, timerDisplay) {
    quizContainer.innerHTML = "";
    quizContainer.classList.remove("fade-in");
    setTimeout(() => quizContainer.classList.add("fade-in"), 10);

    if (currentQuestionIndex >= quizQuestions.length) {
        finishQuiz();
        return;
    }

    const q = quizQuestions[currentQuestionIndex];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);


    progressDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    questionTimeLeft = 20;
    if (timerDisplay) {
        timerDisplay.textContent = `Time Left: ${questionTimeLeft}s`;
    }

    questionTimer = setInterval(() => {
        questionTimeLeft--;
        if(timerDisplay){
            timerDisplay.textContent = `Time Left: ${questionTimeLeft}s`;
        }
        

        if (questionTimeLeft === 0) {
            clearInterval(questionTimer);
            userAnswers.push({
                selected: null,
                correct: q.answer,
                options: q.options,
                question: q.question
            });
            currentQuestionIndex++;
            displayQuestion(progressDisplay, timerDisplay);
        }
    }, 1000);

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = q.question;
    questionDiv.appendChild(questionTitle);

    const img = document.createElement("img");
    img.src = q.image;
    img.alt = `Image for question ${currentQuestionIndex + 1}`;
    img.classList.add("quiz-image");
    questionDiv.appendChild(img);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    shuffledOptions.forEach((option, i) => {
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "question";
        optionInput.value = option;
        optionInput.id = `option${currentQuestionIndex}_${i}`;

        const optionLabel = document.createElement("label");
        optionLabel.setAttribute("for", optionInput.id);
        optionLabel.classList.add("option-label");
        optionLabel.textContent = option;

        optionInput.addEventListener("change", () => {
            document.querySelectorAll(`input[name="question"]`).forEach(input => {
                document.querySelector(`label[for="${input.id}"]`).classList.remove("selected");
            });
            optionLabel.classList.add("selected");
        });

        optionsContainer.appendChild(optionInput);
        optionsContainer.appendChild(optionLabel);
    });

    questionDiv.appendChild(optionsContainer);

    const hint = document.createElement("p");
    hint.textContent = q.hint;
    hint.style.display = "none";
    hint.classList.add("hint-text");

    const hintButton = document.createElement("button");
    hintButton.textContent = "Show Hint";
    hintButton.classList.add("quiz-button", "hint-button");

    hintButton.addEventListener("click", () => {
        hint.style.display = "block";
        hintButton.style.display = "none";
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Submit Answer";
    nextButton.classList.add("quiz-button", "submit-button");

    nextButton.addEventListener("click", () => {
        clearInterval(questionTimer);

        const selected = document.querySelector('input[name="question"]:checked');
        const answer = selected ? selected.value : null;

        if (answer === q.answer) {
            score++;
        }

        userAnswers.push({
            selected: answer,
            correct: q.answer,
            options: shuffledOptions,
            question: q.question
        });

        currentQuestionIndex++;
        displayQuestion(progressDisplay, timerDisplay);
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.appendChild(hintButton);
    buttonGroup.appendChild(nextButton);

    questionDiv.appendChild(hint);
    questionDiv.appendChild(buttonGroup);

    quizContainer.appendChild(questionDiv);
}

function finishQuiz() {
    clearInterval(quizTimer);
    clearInterval(questionTimer);

    document.getElementById("quiz").style.display = "none";
    document.getElementById("progress").remove();
    document.getElementById("timer").remove();

    quizContainer.classList.remove("fade-in");
    setTimeout(() => quizContainer.classList.add("fade-in"), 10);

    resultContainer.innerHTML = `
        <div id="result-summary" class="fade-in">
            <strong>You answered ${score}/${quizQuestions.length} questions correctly.</strong>
            <div id="time-summary">Total Time Taken: ${totalTime}s</div>
        </div>
    `;

    userAnswers.forEach((ans, idx) => {
        const reviewDiv = document.createElement("div");
        reviewDiv.style.marginBottom = "15px";
        reviewDiv.style.padding = "10px";
        reviewDiv.style.border = "1px solid #ccc";
        reviewDiv.style.borderRadius = "8px";
        reviewDiv.style.background = "#fff";

        const qNum = idx + 1;
        reviewDiv.innerHTML += `<strong>Q${qNum}: ${ans.question}</strong>`;

        const isUnanswered = ans.selected === null;

        if (isUnanswered) {
            reviewDiv.innerHTML += `<span class="unanswered-tag">Unanswered</span>`;
        }

        reviewDiv.innerHTML += `<br>`;

        ans.options.forEach(option => {
            let classes = "";
            const isCorrect = option === ans.correct;
            const isSelected = ans.selected === option;

            if (isCorrect) {
                classes += " correct-answer";
            }

            if (isSelected) {
                classes += " user-selected";
            }

            if (isSelected && !isCorrect) {
                classes += " wrong-selected";
            }

            if (isUnanswered) {
                classes += " unanswered-option";
            }

            reviewDiv.innerHTML += `<span class="${classes}" style="margin:5px; display:inline-block;">${option}</span>`;
        });

        resultContainer.appendChild(reviewDiv);
    });


    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("quiz-button", "restart-button");

restartButton.addEventListener("click", () => {
    resultContainer.innerHTML = "";
    quizContainer.innerHTML = "";
    quizContainer.style.display = "block";

    // Go back to start screen properly
    document.getElementById("start-screen").style.display = "flex";
    document.getElementById("quiz-wrapper").style.display = "none";
});

    resultContainer.appendChild(restartButton);
}

