function openTab(evt, tabId) {
    // Sembunyikan semua tab
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(c => c.classList.remove("active"));

    // Hapus class active dari semua tombol
    const links = document.querySelectorAll(".tab-link");
    links.forEach(l => l.classList.remove("active"));

    // Tampilkan tab yang diklik
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

