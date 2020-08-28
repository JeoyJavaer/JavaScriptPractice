let cardsContainer = document.getElementById('cards-container');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let currentEl = document.getElementById('current');
let showBtn = document.getElementById('show');
let hideBtn = document.getElementById('hide');
let questionEL = document.getElementById('question');
let answerEl = document.getElementById('answer');
let addCardBtn = document.getElementById('add-card');
let clearBtn = document.getElementById('clear');
let addContainer = document.getElementById('add-container');

let currentActiveCard = 0;
const cardsEl = [];

function setCardsData(cards) {
  localStorage.setItem('cards',JSON.stringify(cards));
  window.location.reload();
}

function getCardsData() {
  let cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;

}

const cardsData = getCardsData();


function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${currentEl.length}`;
}

function createCard(data, index) {
  let card = document.createElement('div');
  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
      <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

prevBtn.addEventListener('click',()=>{

  cardsEl[currentActiveCard].className ='card right';
  currentActiveCard =currentActiveCard -1;
  if (currentActiveCard<0){
    currentActiveCard=0;
  }

  cardsEl[currentActiveCard].className ='card active';
  updateCurrentText();
});

nextBtn.addEventListener('click',()=>{
  cardsEl[currentActiveCard].className ='card left';
  currentActiveCard =currentActiveCard +1;
  if (currentActiveCard>cardsEl.length-1){
    currentActiveCard=cardsEl.length-1;
  }

  cardsEl[currentActiveCard].className ='card active';
  updateCurrentText();

});

showBtn.addEventListener('click',()=>addContainer.classList.add('show'));
hideBtn.addEventListener('click',()=>addContainer.classList.remove('show'));

addCardBtn.addEventListener('click',()=>{
  let question = questionEL.value;
  let answer = answerEl.value;
  if (question.trim()&&answer.trim() ){
    const  newCard={ question,answer};

    createCard(newCard);
    questionEL.value='';
    answerEl.value='';
    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  }

});


clearBtn.addEventListener('click',()=>{
  localStorage.clear();
  cardsContainer.innerHTML='';
  window.location.reload();
});



createCards();

window.addEventListener()