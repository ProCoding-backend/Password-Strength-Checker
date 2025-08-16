const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('toggleBtn');
const message = document.getElementById('message');
const strengthIndicator = document.querySelector('.strength-indicator');
const generateBtn = document.getElementById('generateBtn');

// --- Password Strength Checker ---
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const passwordLength = password.length;

  // Reset if empty
  if (passwordLength === 0) {
    strengthIndicator.className = 'strength-indicator'; // reset classes
    message.textContent = '';
    return;
  }

  // Simplified strength check
  let strength = 0;
  if (passwordLength >= 5) strength++;
  if (passwordLength >= 8) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++; // special char check

  // Decide level
  if (strength <= 1) {
    strengthIndicator.className = 'strength-indicator weak';
    message.textContent = 'Your Password is Weak';
  } else if (strength === 2 || strength === 3) {
    strengthIndicator.className = 'strength-indicator medium';
    message.textContent = 'Your Password is Medium';
  } else {
    strengthIndicator.className = 'strength-indicator strong';
    message.textContent = 'Your Password is Strong';
  }
});

// --- Toggle Show/Hide Password ---
toggleButton.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = 'HIDE';
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = 'SHOW';
  }
});

// --- Password Generator ---
function generatePassword(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

generateBtn.addEventListener('click', () => {
  const newPassword = generatePassword();
  passwordInput.value = newPassword;

  // Trigger input event to update strength bar
  passwordInput.dispatchEvent(new Event('input'));
});
