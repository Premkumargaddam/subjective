const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score'); // Add a new element for displaying the score
let currentQuestionIndex = 0;
let score = 0;
const questions = [
    {
        question: 'What is Java Virtual Machine?',
        answers: [
            { text: 'A hardware machine', correct: false },
            { text: 'A software application', correct: true },
            { text: 'An operating system', correct: false },
            { text: 'A programming language', correct: false }
        ]
    },
    {
        question: 'Which keyword is used to define a constant in Java?',
        answers: [
            { text: 'static', correct: false },
            { text: 'final', correct: true },
            { text: 'constant', correct: false },
            { text: 'immutable', correct: false }
        ]
    },
    {
        question: 'What is the parent class of all classes in Java?',
        answers: [
            { text: 'Object', correct: true },
            { text: 'Super', correct: false },
            { text: 'Base', correct: false },
            { text: 'Parent', correct: false }
        ]
    },
    {
        question: 'What is the output of the code: System.out.println(2 + 3 + "Java");?',
        answers: [
            { text: '5Java', correct: true },
            { text: '23Java', correct: false },
            { text: '2+3Java', correct: false },
            { text: '5 Java', correct: false }
        ]
    },
    {
        question: 'Which data type is used to represent a single 16-bit Unicode character?',
        answers: [
            { text: 'char', correct: true },
            { text: 'string', correct: false },
            { text: 'unicode', correct: false },
            { text: 'wchar', correct: false }
        ]
    },
    {
        question: 'In Java, which access modifier restricts access the most?',
        answers: [
            { text: 'public', correct: false },
            { text: 'protected', correct: false },
            { text: 'default', correct: false },
            { text: 'private', correct: true }
        ]
    },
    {
        question: 'What does JVM stand for?',
        answers: [
            { text: 'Java Virtual Model', correct: false },
            { text: 'Java Virtual Machine', correct: true },
            { text: 'Java Verified Machine', correct: false },
            { text: 'Java Verified Model', correct: false }
        ]
    },
    {
        question: 'What is the purpose of the "static" keyword in Java?',
        answers: [
            { text: 'To make a method non-static', correct: false },
            { text: 'To allow direct access to a class without instantiation', correct: true },
            { text: 'To make a variable mutable', correct: false },
            { text: 'To define a constant', correct: false }
        ]
    },
    {
        question: 'Which of the following is NOT a primitive data type in Java?',
        answers: [
            { text: 'int', correct: false },
            { text: 'boolean', correct: false },
            { text: 'String', correct: true },
            { text: 'char', correct: false }
        ]
    },
    {
        question: 'What is the Java keyword used to create an instance of a class?',
        answers: [
            { text: 'instance', correct: false },
            { text: 'new', correct: true },
            { text: 'create', correct: false },
            { text: 'instantiate', correct: false }
        ]
    }
    // Add more questions here
];


    

function startQuiz() {
    quizContainer.style.display = 'block';
    scoreElement.style.display = 'none'; // Hide score at the start
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(correct) {
    if (correct) {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text);
    });
    nextButton.style.display = 'block';
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        quizContainer.style.display = 'none';
        scoreElement.innerText = `Your score: ${score} out of ${questions.length}`;
        scoreElement.style.display = 'block'; // Display the score at the end
    }
}
// ... (existing code) ...

function selectAnswer(correct) {
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        const selectedAnswer = questions[currentQuestionIndex].answers.find(a => a.text === button.innerText);
        setStatusClass(button, selectedAnswer.correct === true);
    });
    if (correct) {
        score++;
    }
    nextButton.style.display = 'block';
}

// ... (rest of the code) ...

startQuiz();