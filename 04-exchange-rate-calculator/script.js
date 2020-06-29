let currencyOne = document.getElementById('currency-one');
let amountOne = document.getElementById('amount-one');
let currencyTwo = document.getElementById('currency-two');
let amountTwo = document.getElementById('amount-two');

let rate = document.getElementById('rate');
let swap = document.getElementById('swap');

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      let rate1 = data.rates[currency_two];
      rate.innerHTML = `1${currency_one} = ${rate1} ${currency_two}`;
      amountTwo.value = (amountOne.value * rate1).toFixed(2)

    })
}

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    let temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
  }
);


