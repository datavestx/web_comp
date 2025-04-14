const statusNotification = document.getElementById('statusNotification');
const statusMessage = document.getElementById('statusMessage');

function showStatusMessage(isOnline, isReconnected = false) {
    if (isReconnected) {
        statusNotification.classList.remove('offline', 'online');
        statusNotification.classList.add('reconnected');
        statusMessage.textContent = "Koneksi internet telah terhubung kembali.";
    } else if (isOnline) {
        statusNotification.classList.remove('offline', 'reconnected');
        statusNotification.classList.add('online');
        statusMessage.textContent = "Koneksi internet tersedia.";
    } else {
        statusNotification.classList.remove('online', 'reconnected');
        statusNotification.classList.add('offline');
        statusMessage.textContent = "Tidak ada koneksi internet.";
    }
    statusNotification.style.display = 'block';  // Menampilkan pemberitahuan
}

showStatusMessage(navigator.onLine);

window.addEventListener('online', () => {
    showStatusMessage(true, true);  // Menampilkan pesan koneksi terhubung kembali
    setTimeout(() => {
        statusNotification.style.display = 'none';  // Menghilangkan pemberitahuan setelah beberapa detik
    }, 3000); // Menghilangkan pemberitahuan dalam 3 detik
});

window.addEventListener('offline', () => {
    showStatusMessage(false);
});
