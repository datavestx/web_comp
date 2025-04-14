const boxes = document.querySelectorAll('.box');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // ini agar bisa animasi ulang saat scroll ke atas
    }
  });},{ threshold: 0.1 });

boxes.forEach(box => observer.observe(box));