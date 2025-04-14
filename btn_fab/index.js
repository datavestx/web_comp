function encodeMessage() {
    const input = document.getElementById('inputText').value;
    const encoded = encodeURIComponent(input);
    document.getElementById('encodedOutput').value = encoded;
}

function toggleFAB() {
    const options = document.getElementById('fabOptions');
    options.classList.toggle('show');
}