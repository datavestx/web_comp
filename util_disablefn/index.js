let isEnabled = true;

document.getElementById("toggleBtn").addEventListener("click", function() {
    isEnabled = !isEnabled;
    if (isEnabled) {
        document.getElementById("status").innerText = "JavaScript Aktif";
        this.innerText = "Nonaktifkan JavaScript";
    } else {
        document.getElementById("status").innerText = "JavaScript Nonaktif";
        this.innerText = "Aktifkan JavaScript";
    }
});