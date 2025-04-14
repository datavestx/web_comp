const dragItem = document.getElementById("dragItem");
let offsetX, offsetY, isDragging = false;function startDrag(e) {
    isDragging = true;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    offsetX = clientX - dragItem.offsetLeft;
    offsetY = clientY - dragItem.offsetTop;
    dragItem.style.cursor = "grabbing";
}

function onDrag(e) {
    if (isDragging) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        dragItem.style.left = clientX - offsetX + "px";
        dragItem.style.top = clientY - offsetY + "px";
    }
}

function stopDrag() {
    isDragging = false;
    dragItem.style.cursor = "grab";
}

dragItem.addEventListener("mousedown", startDrag);
dragItem.addEventListener("touchstart", startDrag);
    
document.addEventListener("mousemove", onDrag);
document.addEventListener("touchmove", onDrag);
    
document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);