window.addEventListener("load", () => {
  const slice = document.getElementById("slice");
  const hero = document.getElementById("hero");
  hero.classList.remove("opacity-0");
  hero.classList.add("opacity-100");
  slice.classList.remove("opacity-0");
  slice.classList.add("opacity-100");
});
