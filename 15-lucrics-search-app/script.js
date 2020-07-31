let form = document.getElementById('form');
let search = document.getElementById('search');
let result = document.getElementById('result');
let more = document.getElementById('more');
const apiURl = 'https://api.lyrics.ovh';

function showData(data) {
  result.innerHTML =
    `
    <ul class="songs">
      ${data.data.map(song =>
      `
        <li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get lyrics</button></li>
      `).join('')}
      
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML =
      `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
      
      `;
  } else {
    more.innerHTML = '';
  }


}

async function getMoreSongs(url){
  const res = await  fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}


async function searchSongs(term) {
  let res = await fetch(`${apiURl}/suggestion/${term}`);
  let data =await res.json();
  showData(data);
}


form.addEventListener('submit', evt => {

  e.preventDefault();
  let searchItem = search.value.trim();
  if (!searchItem) {
    alert('input a item');

  } else {
    searchSongs(searchItem);
  }
});


async function getLyrics(artist, songTitle) {
  let res = await fetch(`${apiURl}/v1/${artist}/${songTitle}`);
  let data = res.json();
  if (data.error) {
    result.innerHTML = data.error;
  } else {
    let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `
      <h2><strong>${artist}</strong> - ${songTitle}</h2>
      <span>${lyrics}</span>
    `;
  }

  more.innerHTML = '';
}

result.addEventListener('click', evt => {
  let clickedEl = e.target;
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }

});