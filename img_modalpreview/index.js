const modal = document.getElementById("imageModal");
const previewImage = document.getElementById("previewImage");
const popupImage = document.getElementById("popupImage");

previewImage.onclick = () => {
    popupImage.src = previewImage.src;
    modal.style.display = "flex";
};

function closeModal() {
    modal.style.display = "none";
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) { closeModal(); }
});