let isPopupEnabled = false;
document.getElementById("toggleBtn").addEventListener("click", function() {
    isPopupEnabled = !isPopupEnabled;
    document.getElementById("status").innerText = isPopupEnabled ? "Pop-up Diaktifkan" : "Pop-up Dinonaktifkan";
        this.innerText = isPopupEnabled ? "Nonaktifkan Pop-up" : "Aktifkan Pop-up";
        document.getElementById("showPopup").disabled = !isPopupEnabled;
});

document.getElementById("showPopup").addEventListener("click", function() {
    if (isPopupEnabled) {
        window.open("https://www.example.com", "_blank", "width=600,height=400");
    } else {
        alert("Pop-up masih dinonaktifkan!");
    }
});

