const accordions = document.querySelectorAll(".accordion");
accordions.forEach(btn => {
  btn.addEventListener("click", function () {
    const panel = this.nextElementSibling;
    const isOpen = panel.classList.contains("open");
    
    if (isOpen) {
      panel.style.maxHeight = null;
      panel.classList.remove("open");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("open");
    }
  });
});