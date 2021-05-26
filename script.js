const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "JR Niloy",
  },

  {
    name: "jacinto-2",
    displayName: "Seven Nation Army(Remix)",
    artist: "JR Niloy",
  },

  {
    name: "jacinto-3",
    displayName: "Good Night, Disco Queen",
    artist: "JR Niloy",
  },

  {
    name: "metric-1",
    displayName: "Front Row(Remix)",
    artist: "JR Niloy",
  },
];

//  Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play / Pause event lisnter
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

/// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  songIndex < 0 && (songIndex = songs.length - 1);
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  songIndex > songs.length - 1 && (songIndex = 0);
  loadSong(songs[songIndex]);
  playSong();
}

//  On load select first song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    //  Update progress bar width
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    durationSeconds < 10 && (durationSeconds = `0${durationSeconds}`);

    if (durationSeconds)
      //  Delay Switching Duration to avoid NaN
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    currentSeconds < 10 && (currentSeconds = `0${currentSeconds}`);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar Width
function setProgressBarWidth(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  // console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

/// Event Listners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBarWidth);

// ///////////////////////////////////////////////////
