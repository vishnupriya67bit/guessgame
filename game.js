
let secretNumber = Math.floor(Math.random() * 100) + 1;
let timeLeft = 30;
let timerInterval;

const input = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

guessBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);

startTimer();

function checkGuess() {
  const guess = Number(input.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Enter a number between 1 and 100.";
    wrongSound.play();
    return;
  }

  if (guess === secretNumber) {
    message.textContent = `_CORREECCTTT !! THE NUMBER WAS ${secretNumber}._`;
    correctSound.play();
    endGame();
  } else if (guess < secretNumber) {
    message.textContent = "Too LOW! Try a Higher Number";
    wrongSound.play();
  } else {
    message.textContent = "Too HIGH! Try a Lower Number";
    wrongSound.play();
  }

  input.value = "";
  input.focus();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      message.textContent = `Time's up! The number was ${secretNumber}.`;
      wrongSound.play();
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  input.disabled = true;
  guessBtn.disabled = true;
  restartBtn.style.display = "inline-block";
}

function restartGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
  message.textContent = "";
  input.disabled = false;
  guessBtn.disabled = false;
  input.value = "";
  input.focus();
  restartBtn.style.display = "none";
  startTimer();
}