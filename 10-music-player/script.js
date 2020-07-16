let musicContainer = document.getElementById('music-container');
let audio = document.getElementById('audio');
let title = document.getElementById('title');

let progressContainer = document.getElementById('progress-container');
let progress = document.getElementById('progress');
let cover = document.getElementById('cover');

let playBtn = document.getElementById('play');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');

const songs = ['Hey', 'Summer', 'Ukulele'];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  console.log('loadSong '+song);
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}



function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();

}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 1000;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  let clientWidth = this.clientWidth;
  let clickX = e.offsetX;
  audio.currentTime = (clickX / clientWidth) * audio.duration
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  console.log("isPlaying:"+isPlaying);
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

