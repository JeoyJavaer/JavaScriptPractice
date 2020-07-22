let settingsBtn = document.getElementById('setting-btn');
let settings = document.getElementById('settings');

let settingsForm = document.getElementById('settings-form');
let difficultySelect = document.getElementById('difficulty');

let word = document.getElementById('word');
let text = document.getElementById('text');

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

let endgameEl = document.getElementById('end-game-container');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

let randWord;

let score = 0;

let time = 10;

let difficult = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = difficult;

text.focus();

function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();

  }

}

function addWordToDOM() {
  randWord = getRandomWord();
  word.innerHTML = randWord;
}

text.addEventListener('input', evt => {
  let insertedText = evt.target.value;
  if (insertedText === randWord) {
    addWordToDOM();
    updateScore();
    evt.target.value = '';
    if (difficult === 'hard') {
      time = +2;
    } else if (difficult === 'medium') {
      time = +3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', evt => {
  let difficulty = evt.target.value;
  console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
});

addWordToDOM();