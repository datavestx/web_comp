function validateDate() {
  const inputDate = document.getElementById("birthdate").value;
  const errorDate = document.getElementById("errorDate");
  
  if (!inputDate) {
    errorDate.textContent = "Tanggal tidak boleh kosong.";
    return false;
  }
  
  const selectedDate = new Date(inputDate);
  const today = new Date();
  
  if (selectedDate > today) {
    errorDate.textContent = "Tanggal tidak boleh di masa depan.";
    return false;
  }
  
  errorDate.textContent = "";
  return true;
}