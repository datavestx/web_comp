const articles = [
  { title: "Artikel 1", content: "Ini adalah isi dari artikel pertama." },
  { title: "Artikel 2", content: "Ini adalah isi dari artikel kedua." },
  { title: "Artikel 3", content: "Ini adalah isi dari artikel ketiga." },
  { title: "Artikel 4", content: "Ini adalah isi dari artikel keempat." },
  { title: "Artikel 5", content: "Ini adalah isi dari artikel kelima." },
  { title: "Artikel 6", content: "Ini adalah isi dari artikel keenam." },
  { title: "Artikel 7", content: "Ini adalah isi dari artikel ketujuh." },
  { title: "Artikel 8", content: "Ini adalah isi dari artikel kedelapan." },
  { title: "Artikel 9", content: "Ini adalah isi dari artikel kesembilan." },
  { title: "Artikel 10", content: "Ini adalah isi dari artikel kesepuluh." }
];

const totalPages = articles.length;
let currentPage = 1;

function renderPagination() {
  const container = document.getElementById('page-numbers');
  container.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement('span');
    page.className = 'page-number';
    if (i === currentPage) page.classList.add('active');
    page.textContent = i;
    page.onclick = () => goToPage(i);
    container.appendChild(page);
  }
}

function renderArticle() {
  const article = articles[currentPage - 1];
  const container = document.getElementById('article-container');
  container.innerHTML = `
    <h2>${article.title}</h2>
    <p>${article.content}</p>
  `;
}

function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderPagination();
  renderArticle();
}

function changePage(direction) {
  goToPage(currentPage + direction);
}

// Initial render
renderPagination();
renderArticle();