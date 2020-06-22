let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');//所有可以选择的座位
let count = document.getElementById('count');// 选择的座位的数量
let total = document.getElementById('total');// 总金额
let movieSelect = document.getElementById('movie');//要看的电影 其中包括票价


populateUI();

let ticketPrice = +movieSelect.value;


function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  let seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {

  let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat,index)=>{
      if (selectedSeats.indexOf(index)>-1){
        seat.classList.add('selected')
      }
    })

  }


  let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex!==null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }


});

updateSelectedCount();