const textarea = document.getElementById("myTextarea");
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", function () {
  const length = textarea.value.length;
  charCount.textContent = `${length} / 200 karakter`;
});