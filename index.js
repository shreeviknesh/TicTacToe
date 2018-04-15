const cells = document.getElementsByClassName('game-cell');
const result = document.getElementById('game-over');

let valueArr = new Array(9).fill(0);
let playedArr = new Array(9).fill(false);

let currentMove = 'A';
let turns = 0;
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
    turns = 0;
    gameOver = false;

    const color = window.getComputedStyle(document.documentElement).getPropertyValue('--initial-cell-color');

    for(let i = 0; i < 9; i++) {
        cells[i].style.background = color;
    }

    result.style.visibility = 'hidden';
}

const movePlayed = cell => {
    let index = cell.getAttribute('data-index');

    if(gameOver)
        return;

    if(playedArr[index] == true)
        return;

    turns++;

    valueArr[index] = currentMove;
    playedArr[index] = true;

    if(currentMove == 'A')
        cell.style.background = colorA;
    else
        cell.style.background = colorB;

    if(doesAWin()) {
        gameOverFolks("Player One Wins!");
    }

    if(doesBWin()) {
        gameOverFolks("Player Two Wins!");
    }

    if(turns == 9 && gameOver == false) {
        gameOverFolks("Draw game.");
    }

    currentMove = (currentMove == 'A') ?'B' :'A';
}

const doesAWin = () => {
    for(let i = 0; i < 3; i++) {
        if(valueArr[3 * i] == 'A' && valueArr[3 * i + 1] == 'A' && valueArr[3 * i + 2] == 'A')
            return true;
        if(valueArr[i] == 'A' && valueArr[i + 3] == 'A' && valueArr[i + 6] == 'A')
            return true;
    }
    if(valueArr[0] == 'A' && valueArr[4] == 'A' && valueArr[8] == 'A')
        return true;
    if(valueArr[2] == 'A' && valueArr[4] == 'A' && valueArr[6] == 'A')
        return true;

    return false;
}

const doesBWin = () => {
    for(let i = 0; i < 3; i++) {
        if(valueArr[3 * i] == 'B' && valueArr[3 * i + 1] == 'B' && valueArr[3 * i + 2] == 'B')
            return true;
        if(valueArr[i] == 'B' && valueArr[i + 3] == 'B' && valueArr[i + 6] == 'B')
            return true;
    }
    if(valueArr[0] == 'B' && valueArr[4] == 'B' && valueArr[8] == 'B')
        return true;
    if(valueArr[2] == 'B' && valueArr[4] == 'B' && valueArr[6] == 'B')
        return true;

    return false;
}

const gameOverFolks = msg => {
    result.innerHTML = msg + '<div id="smaller">Start a new game?  <a href="#" id="start-btn"> Yes </a> </div>';
	addRestartEvent();
    result.style.visibility = 'visible';
    gameOver = true;
}
