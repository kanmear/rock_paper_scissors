const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'

const PLAYER_WON = 'Congratulations, you win!'
const COMPUTER_WON = 'Tough luck, you lose!'
const DRAW = 'It\'s a draw'

function computerPlay() {
    let play = Math.floor(Math.random() * 3)
    return play == 0
        ? ROCK
        : play == 1
            ? PAPER
            : SCISSORS
}

function playRound(playerSelection, computerSelection) {
    if (computerSelection == ROCK) {
        if (playerSelection == PAPER)
            return PLAYER_WON
        else if (playerSelection == SCISSORS)
            return COMPUTER_WON
    } else if (computerSelection == PAPER) {
        if (playerSelection == SCISSORS)
            return PLAYER_WON
        else if (playerSelection == ROCK)
            return COMPUTER_WON
    } else {
        if (playerSelection == ROCK)
            return PLAYER_WON
        else if (playerSelection == PAPER)
            return COMPUTER_WON
    }
    return DRAW
}

function game() {
    let score = 0
    for (let i = 1; i <= 5; i++) {
        let playerSelection = prompt('Round #' + i, ' type your choice').toLowerCase()
        while (playerSelection != ROCK
            && playerSelection != PAPER
            && playerSelection != SCISSORS)
            playerSelection = prompt('Choose either rock, paper or scissors.').toLowerCase()
        let result = playRound(playerSelection, computerPlay())
        if (result == PLAYER_WON)
            score++
        console.log(result)
    }
    console.log(`Final score:\nYou - ${score}\nRandom number generator - ${5 - score}`)
}