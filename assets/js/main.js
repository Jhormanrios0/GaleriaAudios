document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById("play-pause");
  const audioTitle = document.getElementById("audio-title");
  const audioAuthor = document.getElementById("audio-author");
  let currentWaveSurfer = null;

  document.addEventListener("click", function (event) {
    if (event.target.closest(".audio-item")) {
      const item = event.target.closest(".audio-item");
      const audioSrc = item.getAttribute("data-audio-src");
      const title = item.querySelector(".audio-title").textContent;
      const author = item.querySelector(".audio-author").textContent;

      if (currentWaveSurfer) {
        currentWaveSurfer.destroy();
      }

      currentWaveSurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#4A90E2", // Color de las ondas
        progressColor: "#0d569b", // Color de la barra de progreso
        backend: "MediaElement",
        barWidth: 2, // Ancho de las barras
        barHeight: 1, // Altura de las barras
        barGap: 2, // Espacio entre las barras
        cursorWidth: 2, // Ancho del cursor
        cursorColor: "#0d569b", // Color del cursor
        height: 80, // Altura del contenedor de las ondas
        responsive: true, // Hacer que las ondas sean responsivas
      });

      currentWaveSurfer.load(audioSrc);

      audioTitle.textContent = title;
      audioAuthor.textContent = author;
      audioPlayer.classList.remove("hidden");
    }
  });

  playPauseButton.addEventListener("click", function () {
    if (currentWaveSurfer) {
      currentWaveSurfer.playPause();
    }
  });
});
