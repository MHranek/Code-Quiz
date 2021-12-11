// declare variables referencing buttons
var highScoresButton = document.getElementById("high-scores-button");
var beginQuizButton = document.getElementById("start-button");
var answerButton1 = document.getElementById("answer-1");
var answerButton2 = document.getElementById("answer-2");
var answerButton3 = document.getElementById("answer-3");
var answerButton4 = document.getElementById("answer-4");
var answerButtons = document.getElementById("answers");
var submitButton = document.getElementById("submit");
var clearButton = document.getElementById("clear");

// declare variables referencing other elements
var timer = document.getElementById("timer");
var mainPage = document.getElementById("main-page");
var quizPage = document.getElementById("quiz");
var scoresPage = document.getElementById("high-scores");
var question = document.getElementById("question");
var inputScores = document.getElementById("input-score");
var initials = document.getElementById("initials");
var highScoresList = document.getElementById("high-scores-list");

// Populate quiz array with question objects
var quiz = [
    {
        question: "Commonly used data types DO NOT include:",
        answer1: "strings",
        answer2: "booleans",
        answer3: "alerts",
        answer4: "numbers",
        correctAnswer: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed within ___.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parentheses",
        answer4: "square brackets",
        correctAnswer: "parentheses",
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above",
        correctAnswer: "all of the above",
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answer1: "commas",
        answer2: "curly brackets",
        answer3: "quotes",
        answer4: "parentheses",
        correctAnswer: "quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "JavaScript",
        answer2: "terminal/bash",
        answer3: "for loops",
        answer4: "console.log",
        correctAnswer: "console.log",
    },
]

// Populate high scores from localstorage
var highScores = [];
var score;

// hide quiz and high scores on startup
showMainPage();
parseLocalData()
displayHighScores()

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
    parseLocalData()
    displayHighScores();
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
function displayHighScores() {
    // for each index in the array (each object) parse it and put it back into the array
    highScoresList.innerHTML = "";
    if (highScores != null) {
        for (var i = 0; i < highScores.length; i++) {
            // parse object
            var parsedObject = JSON.parse(highScores[i]);
            // push parsed object onto array
            highScores[i] = parsedObject;
            // createListItem(parsedObject, i);
        }
        // sort high scores by score
        // sort compares score value of each object, if the difference between b and a is <= -1 then a comes before b, and if the difference is >= 1 then b comes before a
        highScores.sort((a, b) => b.score-a.score);
        for (var i = 0; i <highScores.length; i++) {
            createListItem(highScores[i], i);
        }
    } else {
        highScores = [];
    }
}

function parseLocalData() {
    // Parse localstorage data whenever on the highscores page
    highScores = JSON.parse(localStorage.getItem("highScores"));
}

function createListItem(object, index) {
    // add li for the object in "high-scores-list"
    var li = document.createElement("li");
    li.innerHTML = object.name + " - " + object.score;
    li.setAttribute("data-index", index);
    // append li to high-scores-list
    highScoresList.appendChild(li);
}

// when clear button is clicked, clear high score data
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
})

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
        var userInitials = initials.value.trim();
        userInitials = userInitials.toUpperCase();
        var userData = {
            name: userInitials,
            score: score,
        }
        // push userData onto the end of localstorage array
        for (var i = 0; i < highScores.length; i++) {
            highScores[i] = JSON.stringify(highScores[i]);
        }
        highScores.push(JSON.stringify(userData));
        localStorage.setItem("highScores", JSON.stringify(highScores));
        showScoresPage();
        initials.value = '';
    } else {
        initials.setAttribute("style", "border-style:dashed; border-color:red");
    }  
})
