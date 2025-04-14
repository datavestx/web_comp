window.onload = function () {
  const loadingBar = document.getElementById('loadingBar');
  const mainContent = document.getElementById('mainContent');
  // Setelah 2 detik, sembunyikan loading & tampilkan konten utama
  setTimeout(() => {
    loadingBar.classList.add('hide');
    mainContent.classList.add('show');
  }, 2000);
}
