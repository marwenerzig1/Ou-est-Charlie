const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const timeTag = document.querySelector(".time b") ; 

// Initializing game variables
let maxTime = 45;
let timeLeft = maxTime;
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;
let isPlaying = false;
let timer;

function initTimer() {
    if (timeLeft <= 0) {
        return clearInterval(timer);
    }

    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    // You can use a function to format the time as MM:SS
    function formatTime(num) {
        return num < 10 ? "0" + num : num;
    }

    timeTag.innerText = formatTime(minutes) + ":" + formatTime(seconds);
    timeLeft--;
    if(timeLeft == 0) {
        gameOver(false);
    }
}

const resetGame = () => {
    // Ressetting game variables and UI elements
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.png";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    var myDiv = document.getElementById("myDiv");
    if (isVictory) {
        const modalText = isVictory ? `Vous avez trouvé le mot:` : '' ;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.querySelector("a").href = 'index-maze.html' ;
        myDiv.style.display = "block";
        document.body.style.background = "url('images/yyy.png') no-repeat center center fixed";
        myDiv.hidden = false;
        clearInterval(timer);
      } else {
        myDiv.style.display = "none";
        myDiv.hidden = true;
      }
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerHTML = isVictory ? 'Félicitations ! <br> Deux autres niveaux débloqués !' : 'Echec !';
    gameModal.querySelector("button").innerHTML = isVictory ? 'Niveau Suivant' : 'Joueur A Nouveau ';
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(timeLeft == 0) {
        gameOver(false);
    }
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.png`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});