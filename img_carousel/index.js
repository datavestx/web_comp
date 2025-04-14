const container = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;
let autoSlideInterval;

function updateCarousel() { container.style.transform = `translateX(-${index * 100}%)`; }
function nextSlide() {
  index = (index < items.length - 1) ? index + 1 : 0;
  updateCarousel();
}

function prevSlide() {
  index = (index > 0) ? index - 1 : items.length - 1;
  updateCarousel();
}

function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 3000); }

function stopAutoSlide() { clearInterval(autoSlideInterval); }

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

startAutoSlide();