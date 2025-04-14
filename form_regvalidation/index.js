function validateRegister() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMsg = document.getElementById("errorMsg");
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
  if (!name || !email || !password || !confirmPassword) {
    errorMsg.textContent = "Semua field wajib diisi.";
    return false;
  }
  
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Format email tidak valid.";
    return false;
  }
  
  if (password.length < 6) {
    errorMsg.textContent = "Password minimal 6 karakter.";
    return false;
  }
  
  if (password !== confirmPassword) {
    errorMsg.textContent = "Konfirmasi password tidak cocok.";
    return false;
  }
  
  errorMsg.textContent = "";
  return true;
}