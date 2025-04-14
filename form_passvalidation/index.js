const passwordInput = document.getElementById("password");

const requirements = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  symbol: document.getElementById("symbol")
};

passwordInput.addEventListener("input", function () {
  const pwd = passwordInput.value;
  requirements.length.classList.toggle("valid", pwd.length >= 8);
  requirements.uppercase.classList.toggle("valid", /[A-Z]/.test(pwd));
  requirements.lowercase.classList.toggle("valid", /[a-z]/.test(pwd));
  requirements.number.classList.toggle("valid", /[0-9]/.test(pwd));
  requirements.symbol.classList.toggle("valid", /[!@#$%^&*(),.?":{}|<>]/.test(pwd));
});

