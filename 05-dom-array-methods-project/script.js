let main = document.getElementById('main');
let addUserBtn = document.getElementById('add-user');
let doubleBtn = document.getElementById('double');
let showMillionBtn = document.getElementById('show-millionaires');
let sortBtn = document.getElementById('sort');
let calculateBtn = document.getElementById('calculate-wealth');

let data = [];


getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  let res = await fetch(`https://randomuser.me/api`);
  let data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000)
  };

  addData(newUser);

}

function addData(user) {
  data.push(user);
  updateDOM();
}

function doubleMoney() {

  data = data.map(user => {
    return {...user, money: user.money * 2}
  });
  updateDOM();
}


function calculateWealth() {
  let reduce = data.reduce((acc, user) => (acc += user.money), 0);
  let wealthEl = document.createElement('div');
  wealthEl.innerHTML=`<h3>Total Wealth:<strong>${formatMoney(reduce)}</strong></h3>`;
  main.appendChild(wealthEl);
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaires() {
  data = data.filter(user => user.money > 10000000);
  updateDOM();
}


function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> wealth</h2>';
  providedData.forEach(item => {
    let element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
    main.appendChild(element);
  })

}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateWealth);

