const selector = {
	shot: '[data-option]',
	input: '[data-input]',
	button: '[data-button]',
	money: '[data-money]',
	result: '.result',
	games: '.games',
	wins: '.wins',
	losses: '.losses',
	gameOver: '.game-over',
	newGame: '.new-game',
}

let wallet = 100;
let gameResult = null;
let gamesPlayed = 0;
let gamesWon = 0;
let gamesLost = 0;

const shots = [...document.querySelectorAll(selector.shot)];
const input = document.querySelector(selector.input);
const btn = document.querySelector(selector.button);
const money = document.querySelector(selector.money);
const result = document.querySelector(selector.result);
const games = document.querySelector(selector.games);
const wins = document.querySelector(selector.wins);
const losses = document.querySelector(selector.losses);
const gameOver = document.querySelector(selector.gameOver);
const newGame = document.querySelector(selector.newGame);

const colors = ['red', 'green', 'blue'];
const resultCheck = [];

const playGame = () => {
	resultCheck.length = 0;
	gameResult = null;
	if (!input.value || input.value === '0') {
		input.value = '';
		return alert('Podaj stawkę');
	}
	if (input.value > wallet) {
		input.value = '';
		return alert("Nie możesz zagrać za więcej niż masz");
	}
	const bid = Math.floor(input.value);
	setColors();
	checkResult();
	updateWallet(gameResult, bid);

	gamesPlayed++

	render();
}

const updateWallet = (gr, bid) => {
	if (gr === 'win') {
		wallet -= bid;
		wallet += bid * 3;
		gamesWon++;
		result.textContent = `Wygrałeś ${bid * 3}$. `
	} else {
		wallet -= bid;
		gamesLost++;
		result.textContent = `Przegrałeś ${bid}$. `
	}
}

const checkResult = () => {
	if (resultCheck[0] === resultCheck[1] && resultCheck[1] === resultCheck[2] ||
		resultCheck[0] !== resultCheck[1] && resultCheck[1] !== resultCheck[2] && resultCheck[0] !== resultCheck[2]) {
		gameResult = 'win';
	} else {
		gameResult = 'loose';
	}
}

function setColors() {
	shots.forEach(shot => {
		shot.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}`;
		const color = shot.style.backgroundColor;
		resultCheck.push(color);
	});
}

const render = () => {
	input.value = '';
	money.textContent = wallet;
	games.textContent = gamesPlayed;
	wins.textContent = gamesWon;
	losses.textContent = gamesLost;
	if (wallet == '0') {
		gameOver.style.top = '0';
	}
}

render();

const startNewGame = () => {
	location.reload();
}

newGame.addEventListener('click', startNewGame)
btn.addEventListener('click', playGame)