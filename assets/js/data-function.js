document.addEventListener("DOMContentLoaded", loadAudios);

function loadAudios() {
  fetch("./assets/js/data.json")
    .then((response) => response.json())
    .then((audioData) => {
      const gallery = document.getElementById("audio-gallery");
      let currentSelected = null;
      const fixedIconClass = "fa-solid fa-volume-high";

      audioData.forEach((audio) => {
        const article = document.createElement("article");
        article.className =
          "audio-item h-20 w-full p-2 bg-white rounded-lg hover:shadow-sm hover:bg-[#dfdfdf] cursor-pointer transition-all duration-300 ease-in-out";
        article.setAttribute("data-audio-src", audio.src);
        article.setAttribute("data-audio-number", audio.number);

        article.innerHTML = `
          <section class="flex justify-between items-center h-full">
            <!-- Número del audio e Icono (Seccion 1) -->
            <section class="flex items-center gap-[3vw] w-[20%]">
              <span class="audio-number text-2xl font-bold">${audio.number}</span>
              <i class="${fixedIconClass} text-3xl opacity-0 transition-opacity duration-300"></i>
            </section>
            <!-- Título y Autor (Seccion 2) -->
            <section class="flex flex-col w-[50%]">
              <span class="audio-title text-lg font-bold truncate">${audio.title}</span>
              <span class="audio-author text-sm text-gray-500">${audio.author}</span>
            </section>
            <!-- Idioma, Tiempo y Botón (Seccion 3) -->
            <section class="flex items-center justify-between gap-2 w-[30%]">
              <section class="flex items-center space-x-2 pl-[4vw] rounded px-2 py-1">
                <span class="text-sm text-black">${audio.language}</span>
                <span class="text-lg font-bold text-black">•</span>
                <span class="text-sm text-black">${audio.duration}</span>
              </section>
              <button class="text-primaryColor"><i class="fi fi-rr-circle-ellipsis text-2xl"></i></button>
            </section>
          </section>
        `;

        article.addEventListener("click", function () {
          if (currentSelected) {
            currentSelected.classList.remove("bg-[#dfdfdf]", "shadow-sm");
            currentSelected
              .querySelector("i.fa-volume-high")
              .classList.add("opacity-0");
          }
          article.classList.add("bg-[#dfdfdf]", "shadow-sm");
          article
            .querySelector("i.fa-volume-high")
            .classList.remove("opacity-0");
          currentSelected = article;
        });

        gallery.appendChild(article);
      });
    })
    .catch((error) => console.error("Error loading audio data:", error));
}
