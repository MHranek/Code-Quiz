// declare variables referencing buttons
var highScoresButton = document.getElementById("high-scores-button");
var beginQuizButton = document.getElementById("start-button");
var answerButton1 = document.getElementById("answer-1");
var answerButton2 = document.getElementById("answer-2");
var answerButton3 = document.getElementById("answer-3");
var answerButton4 = document.getElementById("answer-4");
var answerButtons = document.getElementById("answers");
var submitButton = document.getElementById("submit");

// declare variables referencing other elements
var timer = document.getElementById("timer");
var mainPage = document.getElementById("main-page");
var quizPage = document.getElementById("quiz");
var scoresPage = document.getElementById("high-scores");
var question = document.getElementById("question");
var inputScores = document.getElementById("input-score");
var initials = document.getElementById("initials");

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

// Populate high scores from localstorage
var highScores = [];
var score;

// hide quiz and high scores on startup
showMainPage();

// change which section is being shown depending on which button is pressed
function showMainPage() {
    mainPage.setAttribute("style", "display:inline");
    quizPage.setAttribute("style", "display:none");
    scoresPage.setAttribute("style", "display:none");
    inputScores.setAttribute("style", "display:none");
    scoresPage.dataset.status = "hidden";
    // change the content of the high scores button after showing the main page to display high scores
    highScoresButton.innerHTML = "High Scores";
    timer.setAttribute("style", "display:none");
}
function showQuizPage() {
    mainPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:inline");
    scoresPage.setAttribute("style", "display:none");
    inputScores.setAttribute("style", "display:none");
    scoresPage.dataset.status = "hidden";
    // hides high scores button and shows timer in its place
    highScoresButton.setAttribute("style", "display:none");
    timer.setAttribute("style", "display:inline");
}
function showScoresPage() {
    mainPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:none");
    scoresPage.setAttribute("style", "display:inline");
    inputScores.setAttribute("style", "display:none");
    scoresPage.dataset.status = "visible";
    // change content of high scores button to show user they can go back to the main page
    highScoresButton.innerHTML = "Main Page";
    highScoresButton.setAttribute("style", "display:inline");

    // Parse localstorage data whenever on the highscores page
    var showScores = localStorage.getItem("highScores"); // this is the array of stringified objects from localstorage

    // TODO for each index in the array (each object) parse it and put it back into the array
    
    console.log(showScores);
    
}
function showInputScoresPage() {
    mainPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:none");
    scoresPage.setAttribute("style", "display:none");
    inputScores.setAttribute("style", "display:inline");
    scoresPage.dataset.status = "hidden";
    // change content of high scores button to show user they can go back to the main page
    timer.setAttribute("style", "display:none");
}

// when corresponding button is clicked change which section is visible
// make high scores visible
highScoresButton.addEventListener("click", function () {
    if (scoresPage.dataset.status === "visible") {
        showMainPage();
    } else {
        showScoresPage();
    }
})

// make quiz visible
beginQuizButton.addEventListener('click', function () {
    showQuizPage();
    runQuiz();
})

// Run quiz
function runQuiz() {
    // start timer for quiz
    var timeLeft = 90;
    timer.innerHTML = "Timer: " + timeLeft + "s";
    var index = 0;
    var message = document.getElementById("message");
    var messageTime = 1;

    // 1s clock function
    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.innerHTML = "Timer: " + timeLeft + "s";
        // console.log(timeLeft);
        if (timeLeft < 0) {
            // when timer hits 0 end quiz and go to score input screen
            score = timeLeft;
            showInputScoresPage();
            clearInterval(timeInterval);
        }
    }, 1000);

    // Initial display of question 1
    question.innerHTML = quiz[0].question;
    answerButton1.textContent = quiz[0].answer1;
    answerButton2.textContent = quiz[0].answer2;
    answerButton3.textContent = quiz[0].answer3;
    answerButton4.textContent = quiz[0].answer4;

    function cycleQuestion() {
        index++;
        if (index === quiz.length) {
            // final question has been answered, exit quiz and go to score page
            score = timeLeft;
            showInputScoresPage();
            inputScores.children[0].innerHTML = "Your score is " + timeLeft;
            clearInterval(timeInterval); // Breaks the countdown loop
            index = 0;
            return;
        }
        question.innerHTML = quiz[index].question;
        answerButton1.textContent = quiz[index].answer1;
        answerButton2.textContent = quiz[index].answer2;
        answerButton3.textContent = quiz[index].answer3;
        answerButton4.textContent = quiz[index].answer4;
    }

    // after question is answered move to next question
    answerButtons.addEventListener('click', function (event) {
        var element = event.target;
        // check if selected element is an answer button
        if (element.matches(".answer-button")) {
            if (element.innerHTML === quiz[index].correctAnswer) {
                // correct answer, display a 'correct' message
                message.innerHTML = "Correct!";
            } else {
                // incorrect answer, display an 'incorrect' message and deduct time from countdown
                timeLeft = timeLeft - 17;
                timer.innerHTML = "Timer: " + timeLeft + "s";
                message.innerHTML = "Incorrect";
            }
            // display message for 1s
            var timeInterval2 = setInterval(function () {
                messageTime--;
                if (messageTime === 0) {
                    message.innerHTML = "";
                    clearInterval(timeInterval2);
                    messageTime = 1;
                }
            }, 1000);
            cycleQuestion();
        }
    })
}

// Input Scores and goto high scores page
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    // add initials with score to array of objects on local storage
    if (initials.value != "") {
        var userInitials = initials.value;
        var userData = {
            name: userInitials,
            score: score,
        }
        // push userData onto the end of localstorage array
        highScores.push(JSON.stringify(userData));
        localStorage.setItem("highScores", highScores);
        showScoresPage();
        initials.value = '';
    } else {
        initials.setAttribute("style", "border-style:dashed; border-color:red");
    }  
})
