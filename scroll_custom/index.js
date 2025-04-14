const container = document.querySelector('.scroll-container');
const content = container.querySelector('.scroll-content');
const scrollbar = container.querySelector('.custom-scrollbar');
const thumb = scrollbar.querySelector('.custom-thumb');

function updateThumb() {
  const ratio = container.offsetHeight / content.scrollHeight;
  thumb.style.height = `${container.offsetHeight * ratio}px`;
  thumb.style.top = `${content.scrollTop * ratio}px`;
}

content.addEventListener('scroll', updateThumb);
window.addEventListener('resize', updateThumb);

// drag behavior
let isDragging = false;
let startY;
let startScrollTop;

thumb.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
  startScrollTop = content.scrollTop;
  document.body.style.userSelect = 'none'; // biar gak ngeblok teks
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  const ratio = content.scrollHeight / container.offsetHeight;
  content.scrollTop = startScrollTop + deltaY * ratio;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.userSelect = 'auto';
});

updateThumb(); // pertama kali
function toggleScrollbar() {
  if (content.scrollHeight > container.offsetHeight) {
    scrollbar.style.display = 'block';
    updateThumb();
  } else {
    scrollbar.style.display = 'none';
  }
}

content.addEventListener('scroll', updateThumb);
window.addEventListener('resize', toggleScrollbar);

toggleScrollbar(); // jalankan pertama kali

let hideTimeout;

function showScrollbar() {
  scrollbar.classList.add('visible');
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    scrollbar.classList.remove('visible');
  }, 1500); // sembunyikan setelah 1.5 detik idle
}

// Trigger show ketika scroll atau mouse masuk area
content.addEventListener('scroll', () => {
  updateThumb();
  showScrollbar();
});

container.addEventListener('mouseenter', showScrollbar);
container.addEventListener('mousemove', showScrollbar);
container.addEventListener('mouseleave', () => {
  scrollbar.classList.remove('visible');
});

window.addEventListener('resize', () => {
  toggleScrollbar();
  showScrollbar();
});

toggleScrollbar(); 
showScrollbar(); // tampil sebentar di awal