const APP_STATE = {
  theme: localStorage.getItem('nexus_theme') || 'light',
  direction: localStorage.getItem('nexus_dir') || 'ltr',
  user: JSON.parse(localStorage.getItem('nexus_user')) || {
    isLoggedIn: false,
    name: 'Alex Morgan',
    email: 'alex.morgan@workspace.com',
    plan: 'Pro Dedicated Desk'
  },
  bookings: JSON.parse(localStorage.getItem('nexus_bookings')) || [
    {
      id: 'BK-101',
      spaceType: 'Open Desk (Zone B - Silent Pod)',
      dateTime: 'Today, 02:00 PM - 06:00 PM',
      seatNum: 'Desk #14',
      status: 'Active'
    },
    {
      id: 'BK-102',
      spaceType: 'Private Cabin Suite 04',
      dateTime: 'Tomorrow, 10:00 AM - 02:00 PM',
      seatNum: 'Cabin 4B',
      status: 'Confirmed'
    },
    {
      id: 'BK-103',
      spaceType: 'Executive Meeting Room A',
      dateTime: 'Oct 29, 2026, 03:00 PM - 05:00 PM',
      seatNum: 'Conf Room 1',
      status: 'Completed'
    }
  ],
  pricing: {
    'open-desk': 5,
    'private-cabin': 18,
    'meeting-room': 35,
    'dedicated-desk': 12,
    'study-zone': 4,
    'virtual-office': 25
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initHeaderScroll();
  initUserStatus();
  renderBookingsTable();
  setupDefaultBookingDate();
  updateBookingPricing();
  setupKeyboardAccessibility();
  initFaqAccordion();
});

function initTheme() {
  const html = document.documentElement;
  html.setAttribute('data-theme', APP_STATE.theme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  APP_STATE.theme = newTheme;
  localStorage.setItem('nexus_theme', newTheme);
}

function initDirection() {
  const html = document.documentElement;
  html.setAttribute('dir', APP_STATE.direction);
  updateRTLButtonText();

  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    rtlBtn.addEventListener('click', toggleDirection);
  }
}

function toggleDirection() {
  const html = document.documentElement;
  const currentDir = html.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

  html.setAttribute('dir', newDir);
  APP_STATE.direction = newDir;
  localStorage.setItem('nexus_dir', newDir);

  updateRTLButtonText();
}

function updateRTLButtonText() {
  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    const badge = rtlBtn.querySelector('.btn-text-badge');
    if (badge) {
      badge.textContent = APP_STATE.direction.toUpperCase();
    }
  }
}

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initFaqAccordion() {
  const accordion = document.getElementById('servicesAccordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((other) => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

const mobileToggle = document.getElementById('mobileMenuToggle');
const closeDrawer = document.getElementById('closeDrawerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

if (closeDrawer) {
  closeDrawer.addEventListener('click', closeMobileDrawer);
}

function closeMobileDrawer() {
  if (mobileDrawer) {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function initUserStatus() {
  const loginBtn = document.getElementById('headerLoginBtn');
  const loginText = document.getElementById('loginBtnText');
  const dashUser = document.getElementById('dashUserName');
  const dashPlan = document.getElementById('dashUserPlan');

  if (APP_STATE.user && APP_STATE.user.isLoggedIn) {
    if (loginText) loginText.textContent = APP_STATE.user.name ? APP_STATE.user.name.split(' ')[0] : 'Dashboard';
    if (loginBtn) {
      loginBtn.setAttribute('title', 'Open Dashboard');
      loginBtn.href = 'dashboard.html';
      loginBtn.onclick = null;
    }
  } else {
    if (loginText) loginText.textContent = 'Login';
    if (loginBtn) {
      loginBtn.setAttribute('title', 'Sign In');
      loginBtn.href = 'login.html';
      loginBtn.onclick = null;
    }
  }

  if (dashUser) dashUser.textContent = APP_STATE.user.name;
  if (dashPlan) dashPlan.textContent = APP_STATE.user.plan;
}

function openAuthModal(mode = 'login') {
  const modal = document.getElementById('authModal');
  const title = document.getElementById('authModalTitle');
  const toggle = document.getElementById('authToggleQuestion');

  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (mode === 'signup') {
    if (title) title.textContent = 'Create Workspace Hub Account';
    if (toggle) toggle.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode(event, \'login\')">Login</a>';
  } else {
    if (title) title.textContent = 'Welcome Back to Workspace Hub';
    if (toggle) toggle.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthMode(event, \'signup\')">Sign up</a>';
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function toggleAuthMode(e, targetMode) {
  if (e) e.preventDefault();
  openAuthModal(targetMode);
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('authEmail');
  const email = emailInput ? emailInput.value : 'Member';

  APP_STATE.user.isLoggedIn = true;
  APP_STATE.user.email = email;
  APP_STATE.user.name = email.split('@')[0] || 'Alex Morgan';
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));

  initUserStatus();
  closeAuthModal();
  showToast(`Welcome back, ${APP_STATE.user.name}!`, 'success');
}

function handleLogout() {
  APP_STATE.user.isLoggedIn = false;
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));
  initUserStatus();
  closeDashboardModal();
  showToast('You have been logged out.', 'info');
}

function openDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (!modal) return;

  renderBookingsTable();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function renderBookingsTable() {
  const tbody = document.getElementById('dashboardBookingsList');
  if (!tbody) return;

  if (APP_STATE.bookings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 32px; color: var(--color-secondary-text);">
          No active bookings found. <a href="#" onclick="closeDashboardModal(); openBookingModal('open-desk');" style="color: var(--color-terracotta); font-weight: 600;">Book a space now</a>.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = APP_STATE.bookings.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.spaceType}</td>
      <td>${b.dateTime}</td>
      <td><span class="seat-badge">${b.seatNum}</span></td>
      <td>
        <span class="badge ${b.status === 'Active' ? 'badge-primary' : b.status === 'Confirmed' ? 'badge-confirmed' : 'badge-completed'}">
          ${b.status}
        </span>
        ${b.status !== 'Completed' ? `
          <button class="btn-cancel-link" onclick="cancelBooking('${b.id}')" title="Cancel booking">&times;</button>
        ` : ''}
      </td>
    </tr>
  `).join('');
}

function cancelBooking(id) {
  APP_STATE.bookings = APP_STATE.bookings.filter(b => b.id !== id);
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));
  renderBookingsTable();
  showToast(`Booking ${id} was successfully cancelled.`, 'info');
}

function openBookingModal(serviceSlug = 'open-desk') {
  const modal = document.getElementById('bookingModal');
  const spaceSelect = document.getElementById('spaceTypeSelect');

  if (!modal) return;

  if (spaceSelect && serviceSlug && serviceSlug !== 'all') {
    spaceSelect.value = serviceSlug;
  }

  updateBookingPricing();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function setupDefaultBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  if (!dateInput) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split('T')[0];
  dateInput.min = new Date().toISOString().split('T')[0];
}

function updateBookingPricing() {
  const spaceSelect = document.getElementById('spaceTypeSelect');
  const hoursSelect = document.getElementById('bookingDuration');
  const summarySpace = document.getElementById('summarySpaceName');
  const summaryPrice = document.getElementById('summaryPrice');

  if (!spaceSelect || !hoursSelect) return;

  const space = spaceSelect.value || 'open-desk';
  const hours = parseInt(hoursSelect.value, 10) || 4;
  const rate = APP_STATE.pricing[space] || 5;
  const total = rate * hours;

  if (summarySpace) {
    const selectedText = spaceSelect.options[spaceSelect.selectedIndex]?.text || 'Open Desk';
    summarySpace.textContent = selectedText.split('(')[0].trim();
  }

  if (summaryPrice) {
    summaryPrice.textContent = `$${total.toFixed(2)}`;
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();

  const spaceSelect = document.getElementById('spaceTypeSelect');
  const dateInput = document.getElementById('bookingDate');
  const hoursSelect = document.getElementById('bookingDuration');

  const spaceName = spaceSelect.options[spaceSelect.selectedIndex]?.text.split('(')[0].trim() || 'Workspace';
  const date = dateInput.value || 'Upcoming';
  const hours = hoursSelect.value || '4';

  const newBooking = {
    id: 'BK-' + Math.floor(100 + Math.random() * 900),
    spaceType: spaceName,
    dateTime: `${date}, ${hours} Hours`,
    seatNum: `Station #${Math.floor(1 + Math.random() * 30)}`,
    status: 'Confirmed'
  };

  APP_STATE.bookings.unshift(newBooking);
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));

  closeBookingModal();
  showToast(`Booking ${newBooking.id} confirmed! Code sent via SMS.`, 'success');

  setTimeout(() => {
    openDashboardModal();
  }, 1000);
}

function openSpaceDetails(slug) {
  window.location.href = `Services Details.html?service=${slug}`;
}

function openPlansModal() {
  openGenericModal('Membership Plans', `
    <p style="margin-bottom:14px; color:var(--color-secondary-text);">Choose from our flexible membership tiers:</p>
    <ul style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
      <li><strong>Day Pass ($25/day):</strong> Full access to open desk zones &amp; craft coffee bar.</li>
      <li><strong>Dedicated Desk ($280/mo):</strong> Reserved 24/7 personal workstation with lockable storage.</li>
      <li><strong>Private Cabin ($750/mo):</strong> Soundproof executive suite with meeting credits.</li>
    </ul>
  `);
}

function openGenericModal(title, contentHtml) {
  const modal = document.getElementById('genericModal');
  const titleEl = document.getElementById('genericModalTitle');
  const bodyEl = document.getElementById('genericModalBody');

  if (!modal) return;
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = contentHtml;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGenericModal() {
  const modal = document.getElementById('genericModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  toast.setAttribute('role', 'alert');

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  } else {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-body">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 4000);
}

function setupKeyboardAccessibility() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
      closeDashboardModal();
      closeBookingModal();
      closeGenericModal();
      closeMobileDrawer();
    }
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });
}
