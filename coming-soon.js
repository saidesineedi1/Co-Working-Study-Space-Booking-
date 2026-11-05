document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDirectionToggle();
  initLiveCountdown();
  initWaitlistSubmission();
});

function initThemeToggle() {
  const themeBtn = document.getElementById('csThemeBtn');
  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nexus_theme', next);
  });
}

function initDirectionToggle() {
  const dirBtn = document.getElementById('csDirBtn');
  const dirText = dirBtn ? dirBtn.querySelector('.cs-dir-text') : null;
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

function initLiveCountdown() {
  const daysEl = document.getElementById('csDays');
  const hoursEl = document.getElementById('csHours');
  const minutesEl = document.getElementById('csMinutes');
  const secondsEl = document.getElementById('csSeconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  let targetTimestamp = localStorage.getItem('nexus_cs_target_timestamp');
  if (!targetTimestamp) {
    const now = Date.now();
    const duration = (24 * 24 * 60 * 60 * 1000) + (17 * 60 * 60 * 1000) + (59 * 60 * 1000) + (56 * 1000);
    targetTimestamp = now + duration;
    localStorage.setItem('nexus_cs_target_timestamp', targetTimestamp.toString());
  } else {
    targetTimestamp = parseInt(targetTimestamp, 10);
  }

  function tick() {
    const now = Date.now();
    const diff = targetTimestamp - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

function initWaitlistSubmission() {
  const form = document.getElementById('csWaitlistForm');
  const input = document.getElementById('csEmailInput');
  const submitBtn = document.getElementById('csSubmitBtn');
  const alertBox = document.getElementById('csAlertMessage');

  if (!form || !input || !submitBtn || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      displayAlert(alertBox, 'Please provide a valid email address.', 'error');
      input.focus();
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    submitBtn.innerHTML = `
      <span>Joining...</span>
    `;

    setTimeout(() => {
      try {
        const waitlist = JSON.parse(localStorage.getItem('nexus_waitlist')) || [];
        if (!waitlist.includes(email)) {
          waitlist.push(email);
          localStorage.setItem('nexus_waitlist', JSON.stringify(waitlist));
        }
      } catch (err) {}

      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalText;

      displayAlert(alertBox, '🎉 You are on the priority waitlist! Check your inbox soon for your 20% launch voucher.', 'success');
      form.reset();
    }, 800);
  });
}

function displayAlert(el, message, type) {
  if (!el) return;
  el.textContent = message;
  el.className = `cs-alert-box ${type}`;
  el.style.display = 'block';
}
