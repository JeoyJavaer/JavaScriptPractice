let balance = document.getElementById('balance');
let money_plus = document.getElementById('money-plus');
let money_minus = document.getElementById('money-minus');
let list = document.getElementById('list');
let form = document.getElementById('form');
let text = document.getElementById('text');
let amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') != null ? localStorageTransactions : [];

//add item
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)

  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc = +item), 0) * -1).toFixed(2);

  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expense}`;

}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
       <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `
  list.appendChild(item);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);

}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener('submit', addTransaction);


