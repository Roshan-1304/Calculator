const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const checkbox = document.getElementById("agreeCheckbox");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const checkboxError = document.getElementById("checkboxError");

const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

// ======================= Validation Functions =======================
function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 5) {
    nameError.textContent = "Name must be at least 5 characters";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  if (!email.includes("@")) {
    emailError.textContent = "Enter a valid email";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (phone === "1234567890" || !phoneRegex.test(phone)) {
    phoneError.textContent = "Enter a valid 10-digit phone number";
    return false;
  }
  phoneError.textContent = "";
  return true;
}

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;
  return score;
}

function updateStrengthBar(password) {
  const score = calculateStrength(password);
  const colors = ["bg-danger", "bg-warning", "bg-warning", "bg-info", "bg-success"];
  const labels = ["Very Weak", "Weak", "Moderate", "Good", "Strong"];

  strengthBar.style.width = `${score * 20}%`;
  strengthBar.className = `progress-bar ${colors[score - 1] || "bg-danger"}`;
  strengthLabel.textContent = labels[score - 1] || "";
}

function validatePassword() {
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim().toLowerCase();

  const strength = calculateStrength(password); // Get score (1–5)
  updateStrengthBar(password); // Update strength bar visually

  if (
    password.length < 8 ||
    password.toLowerCase() === "password" ||
    password.toLowerCase() === name
  ) {
    passwordError.textContent = "Password is not strong";
    return false;
  }

  if (strength < 5) {
    passwordError.textContent = "Password must be strong (use upper, lower, digit, symbol)";
    return false;
  }

  passwordError.textContent = "";
  return true;
}


function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirm = confirmPasswordInput.value;

  if (password !== confirm) {
    confirmPasswordError.textContent = "Passwords do not match";
    return false;
  }
  confirmPasswordError.textContent = "";
  return true;
}

function validateCheckbox() {
  if (!checkbox.checked) {
    checkboxError.textContent = "Please confirm the details before submitting.";
    return false;
  }
  checkboxError.textContent = "";
  return true;
}

// ===================== Eye Toggle Handlers ===========================
function setupEyeToggle(eyeId, inputField) {
  const eye = document.getElementById(eyeId);

  eye.addEventListener("mousedown", () => {
    inputField.type = "text";
  });

  eye.addEventListener("mouseup", () => {
    inputField.type = "password";
  });

  eye.addEventListener("mouseleave", () => {
    inputField.type = "password";
  });
}

setupEyeToggle("eyePassword", passwordInput);
setupEyeToggle("eyeConfirmPassword", confirmPasswordInput);

// ======================= Form Events =======================
passwordInput.addEventListener("input", () => updateStrengthBar(passwordInput.value));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const validName = validateName();
  const validEmail = validateEmail();
  const validPhone = validatePhone();
  const validPass = validatePassword();
  const validConfirm = validateConfirmPassword();
  const validCheck = validateCheckbox();

  if (validName && validEmail && validPhone && validPass && validConfirm && validCheck) {
    alert("Form submitted successfully!");
    form.reset();
    strengthBar.style.width = "0%";
    strengthLabel.textContent = "";
  } else {
    alert("Please correct the errors.");
  }
});
