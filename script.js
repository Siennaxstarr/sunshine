document.addEventListener("DOMContentLoaded", function() {
    let timeLeft = document.getElementById("time-left");
    let quizContainer = document.getElementById("container");
    let nextBtn = document.getElementById("next-button");
    let countOfQuestion = document.getElementById("number-of-questions");
    let displayContainer = document.getElementById("display-container");
    let scoreContainer = document.querySelector(".score-container");
    let restart = document.getElementById("restart");
    let userScore = document.getElementById("user-score");
    let startScreen = document.querySelector(".start-quiz");
    let startButton = document.getElementById("start-button");
    let questionCount;
    let scoreCount = 0;
    let count = 11;
    let countdown;
});

const quizArray = [
    {
        id: "0",
        questions: "HTML stands for _______?",
        options: [
            "HighText Machine Language",
            "HyperText and links Markeup Language",
            "HyperText Markeup Language",
            "None of these",
    ],
    correct: "HyperText Markeup Language",
    },
    {
        id: "1",
        questions: "CSS stands for _______?",
        options: [
            "Casciding Sheets Style",
            "Casdaling Styles on Sheets",
            "Copying Sheets Style",
            "Cascading Style Sheets",
    ],
    correct: "Cascading Style Sheets",
    },
    {
        id: "2",
        questions: "Which of the following is not a valid domain name?",
        options: [
            "www.yahoo.com",
            "www.com.yahoo",
            "www.yahoo-com.com",
            "www.com.yahoo.ecom",
    ],
    correct: "www.yahoo.com",
    },
    {
        id: "3",
        questions: "Which is not an Internet protocol",
        options: ["HTTP", "FTP", "STP", "IP"],
    correct: "STP",
    },
    {
        id: "4",
        questions: "How can you catch a computer virus?",
        options: [
            "Sending email messages",
            "Using a laptop during the winter",
            "Opening e-mail attachments",
            "On-Line Shopping",
    ],
    correct: "Opening e-mail attachments",
    },
    {
        id: "5",
        questions: "What does code do?",
        options: [
            "Draw engines for computers",
            "Speak out loud for computers",
            "Create a set of instructions for computers to follow",
            "None of these",
    ],
    correct: "Create a set of instructions for computers to follow",
    },
]

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your score is " +
            scoreCount + " out of " + questionCount;
    } else {
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Questions";

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
}));


const timerDisplay = () => {
countdown = setInterval(() => {
count--;
timeLeft.innerHTML = `${count}s`;
if (count === 0) {
clearInterval(countdown);
displayNext();
}
    }, 1000);
};

const quizDisplay = (questionCount) =>{
    let quizCards = document.querySelectorAll(".container-mid");
    
    quizCards.forEach((card) =>{
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);

    for(let i of quizArray){
        i.options.sort(()=> Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = "1 of " + quizArray.length + " Questions";


        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.questions;
        div.appendChild(question_DIV);
        
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
         quizContainer.appendChild(div);
    }   
}


function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText === quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = " ";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

quizCreator();
startScreen.classList.add("hide");
displayContainer.classList.remove("hide");


window.onload = () => {
    startButton.addEventListener("click", () => {
        startScreen.classList.add("hide");
        displayContainer.classList.remove("hide");
        initial();
    });
};