// declare variables referencing buttons
var highScoresButton = document.getElementById("high-scores-button");
var beginQuizButton = document.getElementById("start-button");
var answerButton1 = document.getElementById("answer1");
var answerButton2 = document.getElementById("answer2");
var answerButton3 = document.getElementById("answer3");
var answerButton4 = document.getElementById("answer4");

// declare variables referencing other elements
var timer = document.getElementById("timer");
var mainPage = document.getElementById("main-page");
var quizPage = document.getElementById("quiz");
var scoresPage = document.getElementById("high-scores");

// Populate quiz array with question objects
var quiz = [
    {
        question: "Question 1",
        answer1: "Answer 1.1",
        answer2: "Answer 1.2",
        answer3: "Answer 1.3",
        answer4: "Answer 1.4",
        correctAnswer: "Correct Answer",
    },
    {
        question: "Question 2",
        answer1: "Answer 2.1",
        answer2: "Answer 2.2",
        answer3: "Answer 2.3",
        answer4: "Answer 2.4",
        correctAnswer: "Correct Answer",
    },
    {
        question: "Question 3",
        answer1: "Answer 3.1",
        answer2: "Answer 3.2",
        answer3: "Answer 3.3",
        answer4: "Answer 3.4",
        correctAnswer: "Correct Answer",
    },
    {
        question: "Question 4",
        answer1: "Answer 4.1",
        answer2: "Answer 4.2",
        answer3: "Answer 4.3",
        answer4: "Answer 4.4",
        correctAnswer: "Correct Answer",
    },
    {
        question: "Question 5",
        answer1: "Answer 5.1",
        answer2: "Answer 5.2",
        answer3: "Answer 5.3",
        answer4: "Answer 5.4",
        correctAnswer: "Correct Answer",
    },
]

console.log(quiz[0]);
console.log(quiz[1]);
console.log(quiz[2]);
console.log(quiz[3]);
console.log(quiz[4]);

// hide quiz and high scores on startup
showMainPage();

// change which section is being shown depending on which button is pressed
function showMainPage() {
    mainPage.setAttribute("style", "display:inline");
    quizPage.setAttribute("style", "display:none");
    scoresPage.setAttribute("style", "display:none");
    mainPage.dataset.status = "visible";
    quizPage.dataset.status = "hidden";
    scoresPage.dataset.status = "hidden";
    // change the content of the high scores button after showing the main page to display high scores
    highScoresButton.innerHTML = "High Scores";
    timer.setAttribute("style", "display:none");
}
function showQuizPage() {
    mainPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:inline");
    scoresPage.setAttribute("style", "display:none");
    mainPage.dataset.status = "hidden";
    quizPage.dataset.status = "visible";
    scoresPage.dataset.status = "hidden";
    // hides high scores button and shows timer in its place
    highScoresButton.setAttribute("style", "display:none");
    timer.setAttribute("style", "display:inline");
}
function showScoresPage() {
    mainPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:none");
    scoresPage.setAttribute("style", "display:inline");
    mainPage.dataset.status = "hidden";
    quizPage.dataset.status = "hidden";
    scoresPage.dataset.status = "visible";
    // change content of high scores button to show user they can go back to the main page
    highScoresButton.innerHTML = "Main Page";
    highScoresButton.setAttribute("style", "display:inline");
    timer.setAttribute("style", "display:none");
}

// TODO when corresponding button is clicked change which section is visible
// make high scores visible
highScoresButton.addEventListener("click", function() {
    if (scoresPage.dataset.status === "visible"){
        showMainPage();
    } else {
        showScoresPage();
    }
    
})

// make quiz visible
beginQuizButton.addEventListener('click', function() {
    showQuizPage();
    // TODO start timer for quiz

})