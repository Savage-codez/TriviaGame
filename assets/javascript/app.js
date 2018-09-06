
var openScreen;
var gameHTML;
var counter = 30;
var questionArray = ["This pokemon was given to Ash, whos that pokemon?",
    "This pokemon taught itself how to speak, whos that pokemon?",
    "This pokemon was left behind becuase it's trainer thought it was weak, whos that pokemon?",
    "This pokemon attacked Ash and Pikachu in a pack, whos that pokemon?",
    "This pokemon was defeated to obtain the third badge, whos that pokemon?",
    "This pokemon was offten disobying Ash, whos that pokemon?",
    "This pokemon always has a headache, whos that pokemon?",
    "This pokemon was sighted flying over a rainbow in the first episode, whos that pokemon?"];


var answerArray = [
    ["Ninetails", "Eevee", "Charizard", "Pikachu"],
    ["Mewtwo", "Meowth", "Mew", "Mr.Mime"],
    ["Charmander", "Ratata", "Ekans", "Squirtle"],
    ["Spearow", "Pidgey", "Gastly", "Gengar"],
    ["Magneton", "Electabuzz", "Raichu", "Zapdos"],
    ["Charizard", "Squirtle", "Pikachu", "Butterfree"],
    ["Goldeen", "Abra", "Hunter", "Pysduck"],
    ["Lugia", "Moltres", "Ho-oh", "Articuno"],];

var imageArray = new Array();
imageArray[0] = "<img class='center-block' src='assets/images/pika.png'>";
imageArray[1] = "<img class='center-block' src='assets/images/meowth.png'>";
imageArray[2] = "<img class='center-block' src='assets/images/charmander.png'>";
imageArray[3] = "<img class='center-block' src='assets/images/spearow.png'>";
imageArray[4] = "<img class='center-block' src='assets/images/raichu.jpeg'>";
imageArray[5] = "<img class='center-block' src='assets/images/charizard.jpeg'>";
imageArray[6] = "<img class='center-block' src='assets/images/psyduck.jpeg'>";
imageArray[7] = "<img class='center-block' src='assets/images/ho-oh.jpeg'>";

var correctAnswers =
    ["D. Pikachu",
        "B. Meowth",
        "A. Charmander",
        "A. Spearow",
        "C. Raichu",
        "A. Charizard",
        "D. Pysduck",
        "C. Ho-oh"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/pikasound.mp3");

$(document).ready(function () {
    // Create a function that creates the start button and initial screen

    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }

    openingPage();

   

    $("#mainArea").on("click", ".start-button", function (event) {
        
        clickSound.play();
        $('.jumbotron').hide();

        generateQuestions();

        timerWrapper();

    });

    $("body").on("click", ".answer", function (event) {

        clickSound.play();
        selectedAnswer = $(this).text();
        
        selectedAnswer === correctAnswers[questionCounter] ? (
            
            clearInterval(theClock),
            generateWin()) :
           
            (
                clearInterval(theClock),
                generateLoss()
            )
    }); //

    $("body").on("click", ".reset-button", function (event) {
        clickSound.play();
        resetGame();
    });

}); 
//out of time
function timeoutLoss() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
        "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" +
        "<img class='center-block img-wrong' src='/assets/images/x.gif'>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000); 
}
//correct answer choice
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
        "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $("#mainArea").html(gameHTML);

    setTimeout(wait, 3000); 
}
//wrong answer chocie
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
        "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" +
        "<img class='center-block img-wrong' src='assets/images/giphy.gif'>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

//questions to cycle to user
function generateQuestions() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" +
        questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] +
        "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] +
        "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $("#mainArea").html(gameHTML);
};

function wait() {
    
    questionCounter < 7 ?
        (questionCounter++ ,
            generateQuestions(),
            counter = 30,
            timerWrapper()) :

        (finalScreen())
};

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            timeoutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
        "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " +
        correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" +
        "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $("#mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateQuestions();
    timerWrapper();
}

