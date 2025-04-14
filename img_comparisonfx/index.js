function initComparisons() {
  const overlay = document.querySelector(".img-comp-overlay");
  const container = document.querySelector(".img-comp-container");

  // Create slider
  const slider = document.createElement("div");
  slider.classList.add("img-comp-slider");
  container.appendChild(slider);

  // Initial position
  let clicked = false;
  let width = container.offsetWidth;
  overlay.style.width = width / 2 + "px";
  slider.style.left = width / 2 - 2.5 + "px";

  // Mouse events
  slider.addEventListener("mousedown", () => clicked = true);
  window.addEventListener("mouseup", () => clicked = false);
  window.addEventListener("mousemove", (e) => {
    if (clicked) moveSlider(e.pageX);
  });

  // Touch events
  slider.addEventListener("touchstart", () => clicked = true);
  window.addEventListener("touchend", () => clicked = false);
  window.addEventListener("touchmove", (e) => {
    if (clicked) moveSlider(e.touches[0].pageX);
  });

  function moveSlider(x) {
    const rect = container.getBoundingClientRect();
    let pos = x - rect.left;
    if (pos < 0) pos = 0;
    if (pos > width) pos = width;
    overlay.style.width = pos + "px";
    slider.style.left = pos - 2.5 + "px";
  }
}

window.addEventListener("load", initComparisons);