// ui
const startButton = document.querySelector('.start-game');
const handsigns = document.querySelectorAll('.handsign');
const output = document.querySelector('.output');

const PLAYER_WON = 'Congratulations, you win!';
const COMPUTER_WON = 'Tough luck, you lose!';
const DRAW = 'It\'s a draw';

const START_THE_GAME = 'Start the game';
const GAME_IN_PROGRESS = 'Game in progress';

// logic
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

startButton.addEventListener('click', startGame);

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
    toggleStartButtonState(false, GAME_IN_PROGRESS);

    await playGame();

    toggleStartButtonState(true, START_THE_GAME);
}

function toggleStartButtonState(toggleEventListener, message) {
    startButton.innerText = message;
    actuateStyles();

    if (toggleEventListener)
        startButton.addEventListener('click', startGame);
    else
        startButton.removeEventListener('click', startGame);
}

async function playGame() {
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
}

function actuateStyles() {
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