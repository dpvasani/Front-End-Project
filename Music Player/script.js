const audioPlayer = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause-button");
const volumeSlider = document.getElementById("volume-slider");

let isPlaying = false;

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.textContent = "Play";
    isPlaying = false;
  } else {
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
    isPlaying = true;
  }
});

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value / 100;
});
