document.addEventListener('DOMContentLoaded', () => {
  initAuthTheme();
  initAuthDirection();
  initPasswordToggles();
  initLoginForm();
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

function initLoginForm() {
  const form = document.getElementById('loginForm');
  const alertBox = document.getElementById('loginAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
      showAlert(alertBox, 'Please provide both email and password.', 'error');
      return;
    }

    showAlert(alertBox, 'Signing in to member dashboard...', 'success');

    const userData = {
      isLoggedIn: true,
      name: email.split('@')[0].replace('.', ' ') || 'Alex Morgan',
      email: email,
      plan: 'Pro Dedicated Desk'
    };
    localStorage.setItem('nexus_user', JSON.stringify(userData));

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 900);
  });
}

function showAlert(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = `auth-alert ${type}`;
}
