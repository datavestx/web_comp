var toggleMenu = document.querySelector('.toggle-btn');
var navLinks = document.querySelector('.nav-links');

toggleMenu.addEventListener('click', (e) => {
  toggleMenu.classList.toggle('toggle-btn-active');
  navLinks.classList.toggle('nav-active');
});
