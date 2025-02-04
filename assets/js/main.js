document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById("play-pause");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const audioTitle = document.getElementById("audio-title");
  const audioAuthor = document.getElementById("audio-author");
  const currentTimeElement = document.getElementById("current-time");
  const totalTimeElement = document.getElementById("total-time");
  let currentWaveSurfer = null;
  let currentPlaying = null;
  let currentIndex = -1;
  let audioData = [];

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function loadAudio(index) {
    const audio = audioData[index];
    if (!audio) return;

    const audioSrc = audio.src;
    const title = audio.title;
    const author = audio.author;

    if (currentWaveSurfer) {
      currentWaveSurfer.destroy();
    }

    currentWaveSurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#4A90E2",
      progressColor: "#0d569b",
      backend: "MediaElement",
      barWidth: 2,
      barHeight: 1,
      barGap: 2,
      cursorWidth: 2,
      cursorColor: "#0d569b",
      height: 80,
      responsive: true,
    });

    currentWaveSurfer.load(audioSrc);

    currentWaveSurfer.on("ready", function () {
      const totalTime = currentWaveSurfer.getDuration();
      totalTimeElement.textContent = formatTime(totalTime);
    });

    currentWaveSurfer.on("audioprocess", function () {
      const currentTime = currentWaveSurfer.getCurrentTime();
      currentTimeElement.textContent = formatTime(currentTime);
    });

    audioTitle.textContent = title;
    audioAuthor.textContent = author;
    audioPlayer.classList.remove("hidden");

    // Remove styles from all elements
    document.querySelectorAll(".audio-item").forEach((item) => {
      item.classList.remove("bg-[#dfdfdf]", "shadow-sm");
      item.querySelector(".audio-number").innerHTML =
        item.getAttribute("data-audio-number");
      item.querySelector("i.fa-volume-high").classList.add("opacity-0");
    });

    // Apply styles to the selected element
    const item = document.querySelector(`[data-audio-src="${audioSrc}"]`);
    item.classList.add("bg-[#dfdfdf]", "shadow-sm");
    item.querySelector(".audio-number").innerHTML =
      '<i class="fa-solid fa-play primaryColor"></i>';
    item.querySelector("i.fa-volume-high").classList.remove("opacity-0");
    currentPlaying = item;

    // Update play/pause button icon
    playPauseButton.querySelector("i").classList.remove("fa-pause");
    playPauseButton.querySelector("i").classList.add("fa-play");
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest(".audio-item")) {
      const item = event.target.closest(".audio-item");
      currentIndex = Array.from(
        document.querySelectorAll(".audio-item")
      ).indexOf(item);
      loadAudio(currentIndex);
    }
  });

  playPauseButton.addEventListener("click", function () {
    if (currentWaveSurfer) {
      currentWaveSurfer.playPause();
      const icon = playPauseButton.querySelector("i");
      if (currentWaveSurfer.isPlaying()) {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
      } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
      }
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      loadAudio(currentIndex);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentIndex < audioData.length - 1) {
      currentIndex++;
      loadAudio(currentIndex);
    }
  });

  fetch("./assets/js/data.json")
    .then((response) => response.json())
    .then((data) => {
      audioData = data;
    })
    .catch((error) => console.error("Error loading audio data:", error));
});
