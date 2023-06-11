//-------------------------Game variables
var amountOfPairs = 16;
var inputName;

const gameinfoBar = document.querySelector('.gameInfoDisplay');
const gameBoard = document.querySelector(".gameBoard");
const tilesContainer = document.querySelector(".tiles");
const emojis = [
	'🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
	'🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
	'🦅', '🦉', '🐢', '🐍', '🐙', '🐠', '🐬', '🐳', '🐋', '🐊'
];
//-------------------------


//-------------------------game timer
// Timer variables
var timerElement = document.getElementById("timer");
var startTime, elapsedTime, timerInterval;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimer() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  var minutes = Math.floor(elapsedTime / 60);
  var seconds = elapsedTime % 60;

  // Format data
  var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
  var formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;

  // Update timer display
  timerElement.textContent = formattedMinutes + ":" + formattedSeconds;
}
//-------------------------

////-------------------------start form
var form = document.querySelector('.gameStartForm');

form.addEventListener('input', function(){
	amountOfPairs = document.getElementById('tileAmountRange').value;
	badge = document.getElementById('badge');
	badge.textContent = amountOfPairs;
	//console.log(amountOfPairs);
});


form.addEventListener('submit', function(event) {
	event.preventDefault();
	inputName = document.getElementById('inputName').value;
	amountOfPairs = document.getElementById('tileAmountRange').value;
	
	playerName = document.getElementById('name');
	playerName.textContent = inputName;
	form.style.display = 'none';
	gameinfoBar.style.display = "block";
	startTimer(); //start the timer
	startGame();

});
////-------------------------


////-------------------------end game - restart game

function endGame(){
	stopTimer();

	//restart button
	var restartBtn = document.querySelector('.restartBtn');
	restartBtn.style.display = 'block';
	restartBtn.addEventListener('click', function(){
		location.reload();
	});
}
////-------------------------


////-------------------------start game
function startGame(){
	console.log(amountOfPairs);
	const emojiPickList = [...emojis.slice(0,amountOfPairs),...emojis.slice(0,amountOfPairs)];
	const  tileCount = emojiPickList.length;

	let revealedCount  = 0;
	let activeTile = null;
	let awaitingEndOfMove = false;

	//build tiles

	function buildTile(emoji){
		const element = document.createElement("div");

		element.classList.add("tile","col-xs-6","col-sm-5","col-md-4","col-lg-3","col-xl-2");
		element.setAttribute("data-emoji", emoji);
		element.setAttribute("data-revealed", "false");

		element.addEventListener("click",()=> {
			const revealed = element.getAttribute("data-revealed");

			if(awaitingEndOfMove || revealed === "true" || element === activeTile){
				return;
			}

			element.textContent = emoji;

			if(!activeTile){
				activeTile = element;
				return;
			}

			const emojiToMatch = activeTile.getAttribute("data-emoji");
			if(emojiToMatch === emoji){

				activeTile.setAttribute("data-revealed", "true");
				element.setAttribute("data-revealed", "true");

				awaitingEndOfMove = false;
				activeTile = null;
				revealedCount += 2;

				if(revealedCount === tileCount){
					//handle end of game!!!!!!!!!!!!
					endGame();
				}
				return;
			}

			awaitingEndOfMove = true;

			setTimeout(()=>{
				element.textContent = "";
				activeTile.textContent = "";

				awaitingEndOfMove = false;
				activeTile = null;
			},750);
		});
		
		return element;
	}

	for (let i = 0; i < tileCount; i++){
		const randomIndex  = Math.floor(Math.random() * emojiPickList.length);
		const emoji = emojiPickList[randomIndex];

		const tile = buildTile(emoji);

		emojiPickList.splice(randomIndex,1);
		tilesContainer.appendChild(tile);

	}
}
////-------------------------