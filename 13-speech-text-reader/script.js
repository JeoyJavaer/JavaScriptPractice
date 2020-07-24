let voiceSelect = document.getElementById('voices');

let main = document.querySelector('main');

let toggleBtn = document.getElementById('toggle');
let closeBtn = document.getElementById('close');
let textArea = document.getElementById('text');
let readBtn = document.getElementById('read');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);
const message = new SpeechSynthesisUtterance();

let voices = [];

function setTextMessage(text) {
  message.text = text;
}

function speechText(text) {
  speechSynthesis.speak(message);
}

function createBox(item) {
  let box = document.createElement('div');
  const {image, text} = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}"/><p class="info">${text}</p> 
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speechText(text);
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'));
  });

  main.appendChild(box);
}

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(value => {
    let option = document.createElement('option');
    option.value = value.name;
    option.innerText = `${value.name} ${value.lang}`;
    voiceSelect.appendChild(option);
  })
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click',()=>{
  document.getElementById('text-box').classList.toggle('show');
});

closeBtn.addEventListener('click',()=>{
  document.getElementById('text-box').classList.remove('show');
});

readBtn.addEventListener('click',()=>{
  setTextMessage(textArea.value);
  speechText();
});

function setVoice(e) {
  message.voice=voices.find(voice=>voice.name===e.target.value)
}

voiceSelect.addEventListener('change',setVoice);


getVoices();

