async function checkLocationPermission() {
    if (!("geolocation" in navigator)) {
        alert("Browser Anda tidak mendukung Geolocation API.");
        return;
    }
    try {
        const permission = await navigator.permissions.query({ name: "geolocation" });
        if (permission.state === "granted") {
            document.getElementById("status").innerText = "Status: Izin lokasi sudah diberikan ✅";
            alert("Izin lokasi sudah aktif!");
        } else if (permission.state === "prompt") {
            document.getElementById("status").innerText = "Status: Meminta izin lokasi...";
            navigator.geolocation.getCurrentPosition(
                () => document.getElementById("status").innerText = "Status: Izin diberikan ✅",
                () => askUserToEnableLocation()
            );
        } else {askUserToEnableLocation();}
    } catch (error) {alert("Gagal memeriksa izin lokasi.");}
}

function askUserToEnableLocation() {
    document.getElementById("status").innerText = "Status: Izin ditolak ❌";
    let message = "Izin lokasi diperlukan untuk fitur ini. Aktifkan secara manual di pengaturan.\n\n";
    if (/Android/i.test(navigator.userAgent)) {
        message += "📌 Cara di Android:\n1. Buka 'Pengaturan' → 'Aplikasi'\n2. Pilih browser Anda (Chrome, Firefox, dll.)\n3. Pilih 'Izin' → Aktifkan 'Lokasi'";
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        message += "📌 Cara di iPhone:\n1. Buka 'Pengaturan' → 'Privasi & Keamanan'\n2. Pilih 'Layanan Lokasi'\n3. Pilih browser Anda (Safari, Chrome, dll.) → Pilih 'Saat Digunakan Aplikasi'";
    } else {
        message += "Silakan aktifkan izin lokasi di pengaturan browser Anda.";
    }
    alert(message);
}

