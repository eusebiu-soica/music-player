const dropdownMenu = document.querySelector("#menu");

//song list ul
const songList = document.querySelector("#songList");
const songName = document.querySelector("#songName");
const artistName = document.querySelector("#artistName");
let playpause = document.querySelector("#playPause");
let audio = document.querySelector("#audio");
let source = document.querySelector("source");
let time = document.querySelector("#duration");
let bar = document.querySelector(".range");
let startTime = document.querySelector("#startTime");
let reloadAllList = document.querySelector("#reloadAllList");
let searchInput = document.querySelector("#search");

//dropdown
function dropdownFunction() {
  if (!dropdownMenu.classList.contains("open")) {
    dropdownMenu.classList.toggle("open");
    document.querySelector(".dropdown").style.display = "flex";
  } else {
    dropdownMenu.classList.toggle("open");
    document.querySelector(".dropdown").style.display = "none";
  }
}

let isPlay = false;
let songIndex = 0;

let playNow = {
  nume: songs[0].name,
  artist: songs[0].artist,
  mp3: songs[0].song,
  index: songs[0].index,
  duration: songs[0].duration,
  loop: false,
  loopAll: false,
};

// incarcarea melodiilor
function loadMusic() {
  songName.innerText = playNow.nume;
  artistName.innerText = playNow.artist;
  duration.innerText = playNow.duration;
  isPlay = false;
  audio.load();
  source.src = "songs/" + playNow.mp3;
  for (let i in songs) {
    songList.innerHTML += `<li id="a${songs[i].index}" 
    
      onclick="playThis('${songs[i].name}','${songs[i].artist}','${songs[i].song}','${songs[i].index}','${songs[i].duration}')">
      <div class="row">
       <i class="fa fa-music" aria-hidden="true"></i>
       <span>${songs[i].name}</span>
     </div>
     <span class="min">${songs[i].duration}</span>
     <input type="hidden" id="input" value="${songs[i].index}"/>
   </li>`;
  }
}

//functia de play la melodie din folder

function playThis(name, cantaret, song, index, timp) {
  songIndex = index;
  playNow.nume = name;
  playNow.artist = cantaret;
  playNow.mp3 = song;
  playNow.index = index;
  playNow.duration = timp;
  songName.innerText = playNow.nume;
  artistName.innerText = playNow.artist;
  time.innerText = playNow.duration;
  audio.load();
  isPlay = true;
  playpause.classList.remove("fa-play");
  playpause.classList.add("fa-pause");
  // handleThis(index);
  playSongList();
}

// function handleThis(ind){
//   for(x in songs){

//   }
// }

function playSongList() {
  document.title = playNow.nume;
  source.src = "songs/" + playNow.mp3;
  audio.play();
}

// butonul de play/pause
function playPause() {
  document.title = playNow.nume;
  if (isPlay === true) {
    playpause.classList.remove("fa-pause");
    playpause.classList.add("fa-play");
    isPlay = false;
    audio.pause();
  } else {
    playpause.classList.remove("fa-play");
    playpause.classList.add("fa-pause");
    audio.play();
    isPlay = true;
  }
}

//progress bar
function progress() {
  bar.max = audio.duration;
  bar.value = audio.currentTime;
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime - minutes * 60);
  if (seconds < 10) {
    startTime.innerText = `${minutes}:0${seconds}`;
  } else {
    startTime.innerText = `${minutes}:${seconds}`;
  }

  if (audio.currentTime == audio.duration) {
    playpause.classList.remove("fa-pause");
    playpause.classList.add("fa-play");
    bar.value = 0;
    audio.load();
    if (playNow.loop === true) {
      audio.play();
      audio.currentTime = 0;
      playpause.classList.remove("fa-play");
      playpause.classList.add("fa-pause");
    }
    if (playNow.loopAll === true) {
      if (songIndex == songs.length - 1) {
        nextReversePlay();
      } else {
        songIndex++;
        nextReversePlay();
      }
    }
  }
}

setInterval(progress, 1000);

//derulare slidebar
function change() {
  audio.currentTime = bar.value;
}

//loop song
function loopSong() {
  if (playNow.loop == false) {
    playNow.loop = true;
    document.querySelector("#reload").classList.toggle("loop");
  } else {
    playNow.loop = false;
    document.querySelector("#reload").classList.toggle("loop");
  }
}

// functia de regare melodie dupa butonul > sau <
function nextReversePlay() {
  playNow.index = songIndex;
  playNow.nume = songs[songIndex].name;
  playNow.artist = songs[songIndex].artist;
  playNow.mp3 = songs[songIndex].song;
  playNow.duration = songs[songIndex].duration;
  songName.innerText = playNow.nume;
  artistName.innerText = playNow.artist;
  time.innerText = playNow.duration;
  audio.currentTime = 0;
  source.src = "songs/" + playNow.mp3;
  audio.load();
  if (isPlay === true || isPlay === false) {
    document.title = playNow.nume;
    playpause.classList.remove("fa-play");
    playpause.classList.add("fa-pause");
    audio.play();
    isPlay = true;
  }
}

// sunctia next song
function nextSong() {
  if (songIndex == songs.length - 1) {
    nextReversePlay();
  } else {
    songIndex++;
    nextReversePlay();
  }
}

//functia preview song
function previewSong() {
  if (songIndex == 0) {
    nextReversePlay();
  } else {
    songIndex--;
    nextReversePlay();
  }
}

//functia de loop all
function loopAll() {
  if (playNow.loopAll == false) {
    playNow.loopAll = true;
    reloadAllList.classList.toggle("loop");
  } else {
    playNow.loopAll = false;
    reloadAllList.classList.toggle("loop");
  }
}

// functia de cautare melodie
function search() {
  songList.innerHTML = "";
  for (i in songs) {
    if (songs[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      songList.innerHTML += `<li class="li" id="a${songs[i].index}"
      onclick="playThis('${songs[i].name}','${songs[i].artist}','${songs[i].song}','${songs[i].index}','${songs[i].duration}')">
     <div class="row">
       <i class="fa fa-music" aria-hidden="true"></i>
       <span>${songs[i].name}</span>
     </div>
     <span class="min">${songs[i].duration}</span>
     <input type="hidden" id="input" value="${songs[i].index}"/>
   </li>`;
    }
  }
}
