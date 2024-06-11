const quizData = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        a: "<style>",
        b: "<script>",
        c: "<css>",
        d: "<stylesheet>",
        correct: "a",
        description: "The <style> tag is used to define internal style sheets in HTML."
    },
    {
        question: "What does the <a> tag in HTML stand for?",
        a: "Anchor",
        b: "Align",
        c: "Apply",
        d: "Assign",
        correct: "a",
        description: "The <a> tag stands for Anchor and is used to define hyperlinks."
    },
    {
        question: "How do you select an element with id 'main'?",
        a: "main",
        b: "#main",
        c: "*main",
        d: "main",
        correct: "b",
        description: "To select an element with id 'main', use #main in CSS."
    },
    {
        question: "Which of the following is a correct way to declare a variable in JavaScript?",
        a: "variable myVar;",
        b: "var myVar;",
        c: "v myVar;",
        d: "myVar var;",
        correct: "b",
        description: "The correct way to declare a variable in JavaScript is using the var keyword."
    }
];

const welcomeContainer = document.getElementById('welcome-container');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next');
const submitBtn = document.getElementById('submit');
const descriptionEl = document.getElementById('description');

let currentQuiz = 0;
let score = 0;
let selectedAnswer = null;

// Show welcome container on page load
welcomeContainer.style.display = 'flex';

function startQuiz() {
    welcomeContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuiz();
}

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    document.getElementById('a').innerText = currentQuizData.a;
    document.getElementById('b').innerText = currentQuizData.b;
    document.getElementById('c').innerText = currentQuizData.c;
    document.getElementById('d').innerText = currentQuizData.d;

    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    descriptionEl.style.display = 'none';
}

function deselectAnswers() {
    selectedAnswer = null;
    document.querySelectorAll('#answers li').forEach(li => {
        li.classList.remove('correct', 'incorrect');
    });
}

function selectAnswer(answer) {
    const correctAnswer = quizData[currentQuiz].correct;
    selectedAnswer = answer;

    document.querySelectorAll('#answers li').forEach(li => {
        if (li.id === correctAnswer) {
            li.classList.add('correct');
        } else if (li.id === answer) {
            li.classList.add('incorrect');
        }
    });

    if (selectedAnswer !== correctAnswer) {
        descriptionEl.innerText = quizData[currentQuiz].description;
        descriptionEl.style.display = 'block';
    }

    if (currentQuiz < quizData.length - 1) {
        nextBtn.style.display = 'inline-block';
    } else {
        submitBtn.style.display = 'inline-block';
    }
}

function nextQuestion() {
    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;
    loadQuiz();
}

function showResult() {
    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
    }

    quizContainer.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button class="btn" onclick="restartQuiz()">Restart</button>
    `;
}

function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    selectedAnswer = null;
    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h2 id="question">Question text</h2>
            <ul id="answers">
                <li id="a" onclick="selectAnswer('a')">Answer A</li>
                <li id="b" onclick="selectAnswer('b')">Answer B</li>
                <li id="c" onclick="selectAnswer('c')">Answer C</li>
                <li id="d" onclick="selectAnswer('d')">Answer D</li>
            </ul>
        </div>
        <button id="next" class="button" onclick="nextQuestion()">Next</button>
        <button id="submit" class="button" onclick="showResult()">Submit</button>
        <div id="description"></div>
    `;
    loadQuiz();
}
 