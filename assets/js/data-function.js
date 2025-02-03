document.addEventListener("DOMContentLoaded", loadAudios);

function loadAudios() {
  fetch("./assets/js/data.json")
    .then((response) => response.json())
    .then((audioData) => {
      const gallery = document.getElementById("audio-gallery");
      audioData.forEach((audio) => {
        const article = document.createElement("article");
        article.className =
          "audio-item h-20 w-full p-2 bg-[#eaeaea] rounded-t-md shadow";
        article.setAttribute("data-audio-src", audio.src);

        article.innerHTML = `
          <section class="flex justify-between items-center h-full">
            <!-- Número del audio e Icono (Seccion 1) -->
            <section class="flex items-center gap-[3vw] w-[20%]">
              <span class="text-2xl font-bold">${audio.number}</span>
              <i class="${audio.icon} text-3xl"></i>
            </section>
            <!-- Título y Autor (Seccion 2) -->
            <section class="flex flex-col w-[50%]">
              <span class="audio-title text-lg font-bold truncate">${audio.title}</span>
              <span class="audio-author text-sm text-gray-500">${audio.author}</span>
            </section>
            <!-- Idioma, Tiempo y Botón (Seccion 3) -->
            <section class="flex items-center justify-between gap-2 w-[30%]">
              <section class="flex items-center space-x-2 border pl-[4vw] rounded px-2 py-1">
                <span class="text-sm text-black">${audio.language}</span>
                <span class="text-lg font-bold text-black">•</span>
                <span class="text-sm text-black">${audio.duration}</span>
              </section>
              <button class="text-primaryColor"><i class="fi fi-rr-circle-ellipsis text-2xl"></i></button>
            </section>
          </section>
        `;

        gallery.appendChild(article);
      });
    })
    .catch((error) => console.error("Error loading audio data:", error));
}
