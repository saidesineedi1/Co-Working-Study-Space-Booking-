document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDirectionToggle();
  initKeyboardNav();
});

function initThemeToggle() {
  const themeBtn = document.getElementById('errThemeBtn');
  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nexus_theme', next);
  });
}

function initDirectionToggle() {
  const dirBtn = document.getElementById('errDirBtn');
  const dirText = dirBtn ? dirBtn.querySelector('.err-dir-text') : null;
  if (!dirBtn) return;

  const initialDir = document.documentElement.getAttribute('dir') || 'ltr';
  if (dirText) dirText.textContent = initialDir.toUpperCase();

  dirBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('nexus_dir', next);
    if (dirText) dirText.textContent = next.toUpperCase();
  });
}

function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.location.href = 'index.html';
    }
  });
}

