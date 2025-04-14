function copyText() {
    let text = document.getElementById("textToCopy");
    
    text.select();
    document.execCommand("copy");
    alert("Teks telah disalin: " + text.value);
}

async function pasteText() {
    try {
        const permission = await navigator.permissions.query({ name: "clipboard-read" });
        if (permission.state === "denied") {
            alert("Izin clipboard ditolak. Coba izinkan akses clipboard di pengaturan browser.");
            return;
        }
        let text = await navigator.clipboard.readText();
        document.getElementById("pasteArea").value = text;
    } catch (err) {
        alert("Gagal menempelkan teks!");
    }
}

