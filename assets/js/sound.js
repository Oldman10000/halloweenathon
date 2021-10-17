let song = document.querySelector("#creepy_sound");
let icon = document.querySelector("#icon");
let text = document.querySelector("#sound-text");

icon.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    icon.src = "assets/img/pause-circle-regular.svg";
  } else {
    song.pause();
    icon.src = "assets/img/play-circle-regular.svg";
  }
});
