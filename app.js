const choiceBtns = Array.from(document.querySelectorAll('.btn'));
const gameScore = document.getElementById('game-score');
const playerScoreText = document.getElementById('player-score-text');
const compScoreText = document.getElementById('comp-score-text');
const playAgainBtn = document.getElementById('play-again-btn');

let playerScore = 0;
let compScore = 0;

playerScoreText.textContent = `Player score: ${playerScore}`;
compScoreText.textContent = `Computer score: ${compScore}`;
gameScore.textContent = 'Pick up an option!';

playAgainBtn.style.display = 'none';

choiceBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (playerScore >= 5 || compScore >= 5) {
      return;
    }
    playGame(btn.id);
  });
});

function compPlay() {
  const options = {
    0: 'rock',
    1: 'paper',
    2: 'scissors',
  };

  let compChoice = Math.floor(Math.random() * 3);

  return options[compChoice];
}

const playRound = (playerSelection) => {
  const compSelection = compPlay();

  let currentScore = '';

  if (playerSelection === compSelection) {
    currentScore = `It's a tie! You picked ${playerSelection} and the computer picked ${compSelection}.`;
  } else if (
    (playerSelection == 'rock' && compSelection == 'scissors') ||
    (playerSelection == 'scissors' && compSelection == 'paper') ||
    (playerSelection == 'paper' && compSelection == 'rock')
  ) {
    playerScore++;
    currentScore = `You win! You picked ${playerSelection} which beats ${compSelection}.`;
  } else {
    compScore++;
    currentScore = `You lose! The computer picked ${compSelection} which beats ${playerSelection}.`;
  }

  return currentScore;
};

const playGame = (playerSelection) => {
  const result = playRound(playerSelection);

  playerScoreText.textContent = `Player score: ${playerScore}`;
  compScoreText.textContent = `Computer score: ${compScore}`;
  gameScore.textContent = result;

  if (playerScore >= 5) {
    gameScore.textContent = generateFinalScoreMsg('You won the game!');
    playAgainBtn.style.display = 'flex';
  } else if (compScore >= 5) {
    gameScore.textContent = generateFinalScoreMsg('You lost the game!');
    playAgainBtn.style.display = 'flex';
  } else if (playerScore === compScore && playerScore >= 5 && compScore >= 5) {
    gameScore.textContent = generateFinalScoreMsg("It's a tie!");
    playAgainBtn.style.display = 'flex';
  }
};

playAgainBtn.addEventListener('click', () => {
  playerScore = 0;
  compScore = 0;
  playerScoreText.textContent = `Player score: ${playerScore}`;
  compScoreText.textContent = `Computer score: ${compScore}`;
  gameScore.textContent = 'Pick up an option!';
  playAgainBtn.style.display = 'none';
});

const generateFinalScoreMsg = (outcome) =>
  `${outcome} Final score - You: ${playerScore}, Computer: ${compScore}`;
