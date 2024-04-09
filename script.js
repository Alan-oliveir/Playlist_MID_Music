// Seleção de elementos DOM
const elements = {
  songName: document.getElementById("song-name"),
  bandName: document.getElementById("band-name"),
  song: document.getElementById("audio"),
  cover: document.getElementById("cover"),
  play: document.getElementById("play"),
  next: document.getElementById("next"),
  previous: document.getElementById("previous"),
  likeButton: document.getElementById("like"),
  currentProgress: document.getElementById("current-progress"),
  progressContainer: document.getElementById("progress-container"),
  shuffleButton: document.getElementById("shuffle"),
  repeatButton: document.getElementById("repeat"),
  songTime: document.getElementById("song-time"),
  totalTime: document.getElementById("total-time"),
};

// Dados da lista de reprodução
const playlistData = {
  asYouWere: {
    songName: "As You Were",
    artist: "Track Tribe",
    file: "as_you_were",
    liked: false,
  },
  boomBapFlick: {
    songName: "Boom Bap Flick",
    artist: "Quincas Moreira",
    file: "boom_bap_flick",
    liked: false,
  },
  cantHide: {
    songName: "Can't Hide",
    artist: "Otis McDonald",
    file: "cant_hide",
    liked: false,
  },
};

// Variáveis de estado
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
let playlist =
  JSON.parse(localStorage.getItem("playlist")) || Object.values(playlistData);
let index = 0;

// Funções de controle de reprodução
function playSong() {
  elements.play
    .querySelector(".bi")
    .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  elements.song.play();
  isPlaying = true;
}

function pauseSong() {
  elements.play
    .querySelector(".bi")
    .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
  elements.song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  isPlaying ? pauseSong() : playSong();
}

// Funções de controle de lista de reprodução
function initializeSong() {
  const currentSong = playlist[index];
  elements.cover.src = `images/${currentSong.file}.webp`;
  elements.song.src = `songs/${currentSong.file}.mp3`;
  elements.songName.innerText = currentSong.songName;
  elements.bandName.innerText = currentSong.artist;
  likeButtonRender();
}

function switchSong(delta) {
  index = (index + delta + playlist.length) % playlist.length;
  initializeSong();
  playSong();
}

function previousSong() {
  switchSong(-1);
}

function nextSong() {
  switchSong(1);
}

function updateProgress() {
  const barWidth = (elements.song.currentTime / elements.song.duration) * 100;
  elements.currentProgress.style.setProperty("--progress", `${barWidth}%`);
  elements.songTime.innerText = toHHMMSS(elements.song.currentTime);
}

// Outras funções auxiliares
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function toHHMMSS(seconds) {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function likeButtonRender() {
  const { liked } = playlist[index];
  const heartIcon = elements.likeButton.querySelector(".bi");
  liked
    ? heartIcon.classList.replace("bi-heart", "bi-heart-fill")
    : heartIcon.classList.replace("bi-heart-fill", "bi-heart");
  elements.likeButton.classList.toggle("button-active", liked);
}

function updateTotalTime() {
  elements.totalTime.innerText = toHHMMSS(elements.song.duration);
}

// Event listeners
elements.play.addEventListener("click", playPauseDecider);
elements.previous.addEventListener("click", previousSong);
elements.next.addEventListener("click", nextSong);
elements.song.addEventListener("timeupdate", updateProgress);
elements.song.addEventListener("ended", () =>
  repeatOn ? playSong() : nextSong()
);
elements.song.addEventListener("loadedmetadata", updateTotalTime);
elements.progressContainer.addEventListener("click", (event) => {
  const width = elements.progressContainer.clientWidth;
  const jumpToTime = (event.offsetX / width) * elements.song.duration;
  elements.song.currentTime = jumpToTime;
});
elements.shuffleButton.addEventListener("click", () => {
  isShuffled = !isShuffled;
  isShuffled
    ? (shuffleArray(playlist),
      elements.shuffleButton.classList.add("button-active"))
    : ((playlist = Object.values(playlistData)),
      elements.shuffleButton.classList.remove("button-active"));
});
elements.repeatButton.addEventListener("click", () => {
  repeatOn = !repeatOn;
  elements.repeatButton.classList.toggle("button-active", repeatOn);
});
elements.likeButton.addEventListener("click", () => {
  playlist[index].liked = !playlist[index].liked;
  likeButtonRender();
  localStorage.setItem("playlist", JSON.stringify(playlist));
});

initializeSong();
