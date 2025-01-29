document.querySelectorAll("#main-menu > li").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.querySelector(".megamenú").classList.remove("hidden");
  });
  item.addEventListener("mouseleave", () => {
    item.querySelector(".megamenú").classList.add("hidden");
  });
});
