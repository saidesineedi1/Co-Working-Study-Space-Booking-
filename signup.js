document.addEventListener('DOMContentLoaded', () => {
  initAuthTheme();
  initAuthDirection();
  initPasswordToggles();
  initPasswordStrength();
  initSignupForm();
});

function initAuthTheme() {
  const savedTheme = localStorage.getItem('nexus_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('authThemeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nexus_theme', next);
    });
  }
}

function initAuthDirection() {
  const savedDir = localStorage.getItem('nexus_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);

  const dirBtn = document.getElementById('authDirBtn');
  if (dirBtn) {
    dirBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('nexus_dir', next);
    });
  }
}

function initPasswordToggles() {
  const toggles = document.querySelectorAll('.auth-pwd-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      }
    });
  });
}

function initPasswordStrength() {
  const pwdInput = document.getElementById('signupPassword');
  const bars = [
    document.getElementById('pwdBar1'),
    document.getElementById('pwdBar2'),
    document.getElementById('pwdBar3')
  ];

  if (!pwdInput) return;

  pwdInput.addEventListener('input', () => {
    const val = pwdInput.value;
    bars.forEach(b => b.className = 'pwd-meter-bar');

    if (!val) return;

    if (val.length < 6) {
      bars[0].classList.add('active-weak');
    } else if (val.length < 10) {
      bars[0].classList.add('active-medium');
      bars[1].classList.add('active-medium');
    } else {
      bars[0].classList.add('active-strong');
      bars[1].classList.add('active-strong');
      bars[2].classList.add('active-strong');
    }
  });
}

function initSignupForm() {
  const form = document.getElementById('signupForm');
  const alertBox = document.getElementById('signupAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
      showAlert(alertBox, 'Please fill in all required fields.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showAlert(alertBox, 'Passwords do not match.', 'error');
      return;
    }

    showAlert(alertBox, 'Account successfully created! Redirecting...', 'success');

    const userData = {
      isLoggedIn: true,
      name: name,
      email: email,
      plan: 'Community Open Desk'
    };
    localStorage.setItem('nexus_user', JSON.stringify(userData));

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  });
}

function showAlert(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = `auth-alert ${type}`;
}
