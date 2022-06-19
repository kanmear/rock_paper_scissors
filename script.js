// ui
const startButton = document.querySelector('.start-game');
const handsigns = document.querySelectorAll('.handsign');
const output = document.querySelector('.output');

startButton.addEventListener('click', startGame);

// logic
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const PLAYER_WON = 'Congratulations, you win!';
const COMPUTER_WON = 'Tough luck, you lose!';
const DRAW = 'It\'s a draw';

function computerPlay() {
    let play = Math.floor(Math.random() * 3);
    return play == 0
        ? ROCK
        : play == 1
            ? PAPER
            : SCISSORS;
}

function waitForPlayerSelect() {
    return new Promise((resolve) => {
        handsigns.forEach(handsign => {
            const listener = () => {
                handsign.parentNode.removeEventListener('click', listener);
                resolve(handsign.parentNode.id);
            }
            handsign.parentNode.addEventListener('click', listener);
        })
    })
}

function playRound(playerSelection, computerSelection) {
    if (computerSelection == ROCK) {
        if (playerSelection == PAPER)
            return PLAYER_WON;
        else if (playerSelection == SCISSORS)
            return COMPUTER_WON;
    } else if (computerSelection == PAPER) {
        if (playerSelection == SCISSORS)
            return PLAYER_WON;
        else if (playerSelection == ROCK)
            return COMPUTER_WON;
    } else {
        if (playerSelection == ROCK)
            return PLAYER_WON;
        else if (playerSelection == PAPER)
            return COMPUTER_WON;
    }
    return DRAW;
}

async function startGame() {
    startButton.removeEventListener('click', startGame);
    actuateTextColor();

    startButton.innerText = 'Game in progress';

    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = await waitForPlayerSelect();
        let computerSelection = computerPlay();
        let result = playRound(playerSelection, computerSelection);
        if (result == PLAYER_WON)
            playerScore++;
        else if (result == COMPUTER_WON)
            computerScore++;
        output.innerHTML = `You chose: ${playerSelection};<br>computer chose: ${computerSelection}<br>Result: ${result}`;
    }

    output.innerHTML = (`Final score:<br>You - ${playerScore}<br>Random number generator - ${computerScore}`);
    startButton.innerText = 'Start the game';
    actuateTextColor();

    startButton.addEventListener('click', startGame);
}

function actuateTextColor() {
    startButton.classList.toggle('text-gray');
    startButton.classList.toggle('text-blue');
    startButton.parentElement.classList.toggle('interactive-border');
    startButton.parentElement.classList.toggle('non-interactive-border');

    handsigns.forEach(choice => choice.classList.toggle('text-gray'));
    handsigns.forEach(choice => choice.classList.toggle('text-blue'));
    handsigns.forEach(choice => choice.parentElement.classList.toggle('interactive-border'));
    handsigns.forEach(choice => choice.parentElement.classList.toggle('non-interactive-border'));

    output.classList.toggle('text-gray');
    output.classList.toggle('text-blue');
}