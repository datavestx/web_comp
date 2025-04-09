  const itemsPerPage = 10;
  let currentPage = 1;

  const boxes = Array.from(document.querySelectorAll('.gradient-box'));
  const totalPages = Math.ceil(boxes.length / itemsPerPage);

  function showPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    boxes.forEach((box, i) => {
      box.style.display = (i >= start && i < end) ? 'flex' : 'none';
    });

    renderPageNumbers();
  }

  function changePage(page) {
    if (page >= 1 && page <= totalPages) {
      showPage(page);
    }
  }

  function renderPageNumbers() {
    const container = document.getElementById('pageNumbers');
    container.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.style.margin = '0 4px';
      btn.style.padding = '5px 10px';
      btn.style.borderRadius = '5px';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.background = (i === currentPage) ? '#333' : '#ddd';
      btn.style.color = (i === currentPage) ? '#fff' : '#000';
      
      btn.onclick = () => changePage(i);
      container.appendChild(btn);
    }
  }

  showPage(currentPage);

