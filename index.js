const cells = document.getElementsByClassName('game-cell');
const result = document.getElementById('game-over');

let valueArr = new Array(9).fill(0);
let playedArr = new Array(9).fill(false);

let currentMove = 'A';
let turnsPlayed = 0;
let gameOver = false;

const colorA = window.getComputedStyle(document.documentElement).getPropertyValue('--player-a-color');
const colorB = window.getComputedStyle(document.documentElement).getPropertyValue('--player-b-color');


for(let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', event => {
        movePlayed(cells[i]);
})};

const addRestartEvent = () => {
	const newGame = document.getElementById('start-btn');
	newGame.addEventListener('click', event => {
		initialize();
	});
}

const initialize = () => {
    valueArr = new Array(9).fill(0);
    playedArr = new Array(9).fill(false);

    currentMove = 'A';
    turnsPlayed = 0;
    gameOver = false;

    const color = window.getComputedStyle(document.documentElement).getPropertyValue('--initial-cell-color');

    for(let i = 0; i < 9; i++) {
        cells[i].style.background = color;
    }

    result.style.visibility = 'hidden';
}

const movePlayed = cell => {
    let index = cell.getAttribute('data-index');

    if(gameOver || playedArr[index])
        return;

    turnsPlayed++;

    valueArr[index] = currentMove;
    playedArr[index] = true;

    if(currentMove == 'A')
        cell.style.background = colorA;
    else
        cell.style.background = colorB;

    if(hasWon('A')) {
        gameOverFolks("Player One Wins!");
    }

    if(hasWon('B')) {
        gameOverFolks("Player Two Wins!");
    }

    if(turnsPlayed == 9 && gameOver == false) {
        gameOverFolks("Draw game.");
    }

    currentMove = (currentMove == 'A') ?'B' :'A';
}

const hasWon = (player) => {
    for(let i = 0; i < 3; i++) {
        if(valueArr[3 * i] == player && valueArr[3 * i + 1] == player && valueArr[3 * i + 2] == player)
            return true;
        if(valueArr[i] == player && valueArr[i + 3] == player && valueArr[i + 6] == player)
            return true;
    }

    if(valueArr[0] == player && valueArr[4] == player && valueArr[8] == player)
        return true;
    if(valueArr[2] == player && valueArr[4] == player && valueArr[6] == player)
        return true;

    return false;
}

const gameOverFolks = msg => {
    result.innerHTML = msg + '<div id="smaller">Start a new game?  <a href="#" id="start-btn"> Yes </a> </div>';
	addRestartEvent();
    result.style.visibility = 'visible';
    gameOver = true;
}
