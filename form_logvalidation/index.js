function validateLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorLogin = document.getElementById("errorLogin");
  
  if (!username || !password) {
    errorLogin.textContent = "Username dan password wajib diisi.";
    return false;
  }
  
  if (password.length < 6) {
    errorLogin.textContent = "Password minimal 6 karakter.";
    return false;
  }

    // Tambahkan validasi tambahan jika diperlukan, misal cocok dengan data dummy
    // Contoh (opsional):
    /*
    if (username !== "admin" || password !== "admin123") {
      errorLogin.textContent = "Username atau password salah.";
      return false;
    }
    */
  
  errorLogin.textContent = "";
  return true;
}