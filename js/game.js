/**
 * Variables
 */

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-answer"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progression-bar");
const progressBarFull = document.getElementById("progress-bar-full");

let acceptingQuestion = false;
let score = 0;
let questionCounter = 0;
let currentQuestion = {};
let availableQuestion = [];

// Rules
const maxQuestion = 10;
const correctPoint = 10;

/**
 * Generate Questions
 */

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res=>{
        return res.json();
    })
    .then(loadedQuestions=>{
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestions =>{
            const formattedQuestion = {
                question : loadedQuestions.question
            };
            const answerChoices = [...loadedQuestions.incorrect_answers];

            formattedQuestion.answer = Math.floor(Math.random()* 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestions.correct_answer);

            answerChoices.forEach((choice, index)=>{
                formattedQuestion["choice" + (index+1)] = choice;
            })
            return formattedQuestion
        });
        startGame();

    })

    .catch(err =>{
        console.error(err);
    })

/**
 * Functions
 */

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [... questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestion === 0 || questionCounter >= maxQuestion){
        localStorage.setItem('recentScore', score);
        return window.location.assign("./result.html");
    }
    questionCounterText.innerText = `${questionCounter} / ${maxQuestion}`;
    progressBarFull.style.width = `${(questionCounter/ maxQuestion) * 100}%`;
    scoreText.innerText = score;
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });
    // console.log(availableQuestion[questionIndex]);
    // console.log('lunghezza array ', availableQuestion.length);
    availableQuestion.splice(questionIndex, 1);
    acceptingQuestion = true;
}

choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
        // console.log(e.target);
        if (!acceptingQuestion) return;
        acceptingQuestion = false;
        const selectedQuestion = e.target;
        const selectedAnswer =  parseInt(selectedQuestion.dataset['number']);
        // console.log(selectedAnswer, currentQuestion.answer);
        const checkAnswer = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';
        if (checkAnswer === 'correct'){
            checkScore(correctPoint);
        }
        console.log(checkAnswer);
        selectedQuestion.parentElement.classList.add(checkAnswer);
        setTimeout(() => {
            selectedQuestion.parentElement.classList.remove(checkAnswer);
            getNewQuestion();
        }, 1000);
    })
})

checkScore = (num) =>{
    score += num;
    scoreText.innerText = score;
};


