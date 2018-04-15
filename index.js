const cells = document.getElementsByClassName('game-cell');
const result = document.getElementById('game-over');

let valueArr = new Array(9).fill(0);
let playedArr = new Array(9).fill(false);

let currentMove = 'X';
let turns = 0;
let gameOver = false;

const XColor = window.getComputedStyle(document.documentElement).getPropertyValue('--XColor');
const OColor = window.getComputedStyle(document.documentElement).getPropertyValue('--OColor');


for(let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', event => {
        movePlayed(cells[i]);
})};

const addRestartEvent = () => {
	const newGame = document.getElementById('smaller');	
	newGame.addEventListener('click', event => {
		initialize();
	});
}

const initialize = () => {

    valueArr = new Array(9).fill(0);
    playedArr = new Array(9).fill(false);

    currentMove = 'X';
    turns = 0;
    gameOver = false;

    const color = window.getComputedStyle(document.documentElement).getPropertyValue('--initial-cell-color');

    for(let i = 0; i < 9; i++) {
        cells[i].style.background = color;
    }

    result.style.visibility = 'hidden';
}

const movePlayed = cell => {
    let index = cell.id[0] - 1;

    if(gameOver) {
        initialize();
        return;
    }

    if(playedArr[index] == true)
        return;

    turns++;

    valueArr[index] = currentMove;
    playedArr[index] = true;

    if(currentMove == 'X')
        cell.style.background = XColor;
    else
        cell.style.background = OColor;

    if(doesXWin()) {
        gameOverFolks("WHITE WINS!");
    }

    if(doesOWin()) {
        gameOverFolks("BLACK WINS!");
    }

    if(turns == 9 && gameOver == false) {
        gameOverFolks("TIE GAME..");
    }

    currentMove = (currentMove == 'X') ?'O' :'X';
}

const doesXWin = () => {
    for(let i = 0; i < 3; i++) {
        if(valueArr[3 * i] == 'X' && valueArr[3 * i + 1] == 'X' && valueArr[3 * i + 2] == 'X')
            return true;
        if(valueArr[i] == 'X' && valueArr[i + 3] == 'X' && valueArr[i + 6] == 'X')
            return true;
    }
    if(valueArr[0] == 'X' && valueArr[4] == 'X' && valueArr[8] == 'X')
        return true;
    if(valueArr[2] == 'X' && valueArr[4] == 'X' && valueArr[6] == 'X')
        return true;

    return false;
}

const doesOWin = () => {
    for(let i = 0; i < 3; i++) {
        if(valueArr[3 * i] == 'O' && valueArr[3 * i + 1] == 'O' && valueArr[3 * i + 2] == 'O')
            return true;
        if(valueArr[i] == 'O' && valueArr[i + 3] == 'O' && valueArr[i + 6] == 'O')
            return true;
    }
    if(valueArr[0] == 'O' && valueArr[4] == 'O' && valueArr[8] == 'O')
        return true;
    if(valueArr[2] == 'O' && valueArr[4] == 'O' && valueArr[6] == 'O')
        return true;

    return false;
}

const gameOverFolks = msg => {
    result.innerHTML = msg + '<div id="smaller">start a new game? (click any cell)</div>';
	addRestartEvent();
    result.style.visibility = 'visible';
    gameOver = true;
}
