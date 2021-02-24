let minRand = 1;
let maxRand = 3;
let playerScore = 0;
let computerScore = 0;

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const infoText = document.getElementById("info-text");
const textPlayerScore = document.getElementById("player-score");
const textComputerScore = document.getElementById("computer-score");
const gameOverScreen = document.getElementById("gameOverScreen");
const wonOrLostText = document.getElementById("wonOrLostText");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonList = document.getElementsByClassName('button');

rockButton.addEventListener('click', rockClicked);
paperButton.addEventListener('click', paperClicked);
scissorsButton.addEventListener('click', scissorsClicked);

function removeTransition(e){
    e.target.classList.remove('buttonClicked');
  }



yesButton.addEventListener('click', restartGame);

gameOverScreen.style.visibility = 'hidden';


function rockClicked() {
    playRound("rock");
    rockButton.classList.add('buttonClicked');
}

function paperClicked() {
    playRound("paper");
    paperButton.classList.add('buttonClicked');
}

function scissorsClicked() {
    playRound("scissors");
    scissorsButton.classList.add('buttonClicked');
}
function computerPlay(){
    randNum = Math.floor(Math.random() * (maxRand - minRand + 1) + minRand);

    switch (randNum){
        case 1:
            return "Rock";
            break;
        case 2:
            return "Paper";
            break;
        case 3:
            return "Scissors";
            break;
    }
}

function playRound(playerSelection){
    let computerSelection = computerPlay();
    rockButton.removeEventListener('click', rockClicked);
    paperButton.removeEventListener('click', paperClicked);
    scissorsButton.removeEventListener('click', scissorsClicked);

    setTimeout(function() {
        for (let i = 0; i < buttonList.length; i++){
            buttonList[i].classList.remove('computerClicked');
            buttonList[i].classList.remove('buttonClicked');
        }
        rockButton.addEventListener('click', rockClicked);
        paperButton.addEventListener('click', paperClicked);
        scissorsButton.addEventListener('click', scissorsClicked);

    }, 3000);
    setTimeout(function() {
        
        

        let playerWon = false;
        let computerWon = false;
        
        if (computerSelection === "Rock") {
            rockButton.classList.add('computerClicked');
        }
        else if (computerSelection === "Paper"){
            paperButton.classList.add('computerClicked');
        }

        else if (computerSelection === "Scissors"){
            scissorsButton.classList.add("computerClicked");
        }

        if (playerSelection === "rock"){
            if (computerSelection === "Scissors"){
                infoText.innerHTML=win(computerSelection, playerSelection);
                playerWon = true;
            }
            else if (computerSelection === "Paper"){
                infoText.innerHTML=lose(computerSelection, playerSelection);
                computerWon = true;
            }
            else {infoText.innerHTML="Draw!"; }
        }

        else if (playerSelection === "scissors"){
            if (computerSelection === "Paper"){
                infoText.innerHTML=win(computerSelection, playerSelection);
                playerWon = true;
            }
            else if (computerSelection === "Rock"){
                infoText.innerHTML=lose(computerSelection, playerSelection);
                computerWon = true;
            }
            else {infoText.innerHTML="Draw!"; }
        }

        else if (playerSelection === "paper"){
            if (computerSelection === "Rock"){
                infoText.innerHTML=win(computerSelection, playerSelection);
                playerWon = true;
            }
            else if (computerSelection === "Scissors"){
                infoText.innerHTML=lose(computerSelection, playerSelection);
                computerWon = true;
            }
            else {infoText.innerHTML="Draw!"; }
        }
        else {
            console.log("Invalid Input");
        }

        if (playerWon) { playerScore++; }
        else if (computerWon) { computerScore++; }
        
        textPlayerScore.innerHTML = "Player: " + playerScore;
        textComputerScore.innerHTML = "Computer: " + computerScore;

        if (playerScore > 2 || computerScore > 2){
            gameOver();
        }

    }, 500);
}

function gameOver() {

    gameOverScreen.style.visibility = 'visible';
    if (playerScore > 2) {
        wonOrLostText.innerHTML = "You Won!";
    }
    else {
        wonOrLostText.innerHTML = "You Lost!";
    }
    

}

function win(computer, player){
    player = player.substr(0, 1).toUpperCase() + player.slice(1);
    return "You Win! " + player + " beats " + computer;
}

function lose (computer, player){
    player = player.substr(0, 1).toUpperCase() + player.slice(1);
    return "You Lose! " + computer + " beats " + player;
}

function restartGame(){
    playerScore = 0;
    computerScore = 0;
    textPlayerScore.innerHTML = "Player: " + playerScore;
    textComputerScore.innerHTML = "Computer: " + computerScore;
    infoText.innerHTML = "Please make your selection.";
    gameOverScreen.style.visibility = 'hidden';
}