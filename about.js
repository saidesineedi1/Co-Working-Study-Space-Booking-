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
    'meeting-room': 35
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
  initAboutInteractions();
});

function initTheme() {
  document.documentElement.setAttribute('data-theme', APP_STATE.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  APP_STATE.theme = APP_STATE.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', APP_STATE.theme);
  localStorage.setItem('nexus_theme', APP_STATE.theme);
}

function initDirection() {
  document.documentElement.setAttribute('dir', APP_STATE.direction);
  updateRtlButtonText();
  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    rtlBtn.addEventListener('click', toggleDirection);
  }
}

function toggleDirection() {
  APP_STATE.direction = APP_STATE.direction === 'ltr' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', APP_STATE.direction);
  localStorage.setItem('nexus_dir', APP_STATE.direction);
  updateRtlButtonText();
}

function updateRtlButtonText() {
  const btn = document.getElementById('rtlToggleBtn');
  if (btn) {
    const badge = btn.querySelector('.btn-text-badge');
    if (badge) {
      badge.textContent = APP_STATE.direction.toUpperCase();
    }
  }
}

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const mobileToggle = document.getElementById('mobileMenuToggle');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileDrawer);
  }
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  }
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
}

function initUserStatus() {
  const loginBtn = document.getElementById('headerLoginBtn');
  const loginText = document.getElementById('loginBtnText');
  if (APP_STATE.user && APP_STATE.user.isLoggedIn) {
    if (loginText) loginText.textContent = APP_STATE.user.name ? APP_STATE.user.name.split(' ')[0] : 'Dashboard';
    if (loginBtn) {
      loginBtn.href = 'dashboard.html';
      loginBtn.onclick = null;
    }
  } else {
    if (loginText) loginText.textContent = 'Login';
    if (loginBtn) {
      loginBtn.href = 'login.html';
      loginBtn.onclick = null;
    }
  }
}

function openAuthModal(tab = 'login') {
  const modal = document.getElementById('authModal');
  if (modal) {
    switchAuthTab(tab);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const formLogin = document.getElementById('loginForm');
  const formRegister = document.getElementById('registerForm');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.remove('hide');
    formRegister.classList.add('hide');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.remove('hide');
    formLogin.classList.add('hide');
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('loginEmail');
  const email = emailInput ? emailInput.value : 'alex.morgan@workspace.com';

  APP_STATE.user.isLoggedIn = true;
  APP_STATE.user.email = email;
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));

  closeAuthModal();
  initUserStatus();
  showToast(`Welcome back, ${APP_STATE.user.name}!`);
  openDashboardModal();
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('regName');
  const emailInput = document.getElementById('regEmail');

  APP_STATE.user.isLoggedIn = true;
  APP_STATE.user.name = nameInput ? nameInput.value : 'New Member';
  APP_STATE.user.email = emailInput ? emailInput.value : 'member@workspacehub.com';
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));

  closeAuthModal();
  initUserStatus();
  showToast(`Account created! Welcome to Workspace Hub.`);
  openDashboardModal();
}

function openForgotPassword(e) {
  e.preventDefault();
  alert('Password reset instructions sent to your registered email address.');
}

function openDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (modal) {
    renderBookingsTable();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function renderBookingsTable() {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  if (APP_STATE.bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: var(--text-muted);">No active reservations found. Click '+ New Reservation' to book.</td></tr>`;
    return;
  }

  tbody.innerHTML = APP_STATE.bookings.map((b, i) => `
    <tr>
      <td><strong>${b.spaceType}</strong></td>
      <td>${b.dateTime}</td>
      <td><span style="font-family:monospace; background: rgba(36, 59, 83,0.1); padding: 2px 6px; border-radius:4px;">${b.seatNum}</span></td>
      <td>
        <span style="
          display:inline-block;
          font-size:0.75rem;
          font-weight:700;
          padding: 3px 8px;
          border-radius: 9999px;
          background: ${b.status === 'Active' ? 'var(--color-light-aqua)' : b.status === 'Confirmed' ? '#D6A756' : 'rgba(36, 59, 83,0.2)'};
          color: #101B2D;
        ">${b.status}</span>
      </td>
      <td>
        ${b.status !== 'Completed' ? `
          <button class="btn-secondary btn-sm" onclick="cancelBooking(${i})">Cancel</button>
        ` : `
          <button class="btn-secondary btn-sm" onclick="openBookingModal('all')">Re-book</button>
        `}
      </td>
    </tr>
  `).join('');
}

function cancelBooking(index) {
  if (confirm('Are you sure you want to cancel this reservation?')) {
    const cancelled = APP_STATE.bookings.splice(index, 1)[0];
    localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));
    renderBookingsTable();
    showToast(`Cancelled reservation for ${cancelled.spaceType}`);
  }
}

function downloadInvoiceMock(invoiceId) {
  showToast(`Generating PDF receipt for ${invoiceId}...`);
  setTimeout(() => {
    showToast(`Invoice ${invoiceId}.pdf successfully downloaded.`);
  }, 1200);
}

function setupDefaultBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }
}

function openBookingModal(spaceCategory = 'all') {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  if (spaceCategory !== 'all') {
    const radio = document.querySelector(`input[name="spaceCategory"][value="${spaceCategory}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  updateBookingPricing();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function updateBookingPricing() {
  const selectedRadio = document.querySelector('input[name="spaceCategory"]:checked');
  const durationSelect = document.getElementById('bookingDuration');
  const summarySpaceName = document.getElementById('summarySpaceName');
  const summaryPrice = document.getElementById('summaryPrice');

  if (!selectedRadio || !durationSelect || !summarySpaceName || !summaryPrice) return;

  const spaceType = selectedRadio.value;
  const hours = parseInt(durationSelect.value, 10) || 1;
  const rate = APP_STATE.pricing[spaceType] || 5;

  let displayName = 'Open Desk';
  if (spaceType === 'private-cabin') displayName = 'Private Cabin Suite';
  if (spaceType === 'meeting-room') displayName = 'Executive Meeting Room';

  const total = hours === 8 ? (rate * 6) : (rate * hours);

  summarySpaceName.textContent = `${displayName} (${hours} hr${hours > 1 ? 's' : ''})`;
  summaryPrice.textContent = `$${total.toFixed(2)}`;
}

function handleConfirmBooking(e) {
  e.preventDefault();
  const selectedRadio = document.querySelector('input[name="spaceCategory"]:checked');
  const dateInput = document.getElementById('bookingDate');
  const timeSelect = document.getElementById('bookingTime');
  const durationSelect = document.getElementById('bookingDuration');

  const spaceVal = selectedRadio ? selectedRadio.value : 'open-desk';
  const dateVal = dateInput ? dateInput.value : 'Today';
  const timeVal = timeSelect ? timeSelect.value : '09:00 AM';
  const durVal = durationSelect ? durationSelect.value : '4';

  let spaceTitle = 'Open Desk (Zone A)';
  let seatNum = `Desk #${Math.floor(Math.random() * 20) + 1}`;

  if (spaceVal === 'private-cabin') {
    spaceTitle = 'Private Acoustic Cabin';
    seatNum = `Cabin #${Math.floor(Math.random() * 8) + 1}`;
  } else if (spaceVal === 'meeting-room') {
    spaceTitle = 'Executive Meeting Room';
    seatNum = `Boardroom ${Math.floor(Math.random() * 3) + 1}`;
  }

  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    spaceType: spaceTitle,
    dateTime: `${dateVal}, ${timeVal} (${durVal} hrs)`,
    seatNum: seatNum,
    status: 'Confirmed'
  };

  APP_STATE.bookings.unshift(newBooking);
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));

  closeBookingModal();
  showToast(`Booking Confirmed! ${spaceTitle} reserved.`);
  openDashboardModal();
}

function openSpaceDetails(type) {
  const genericModal = document.getElementById('genericModal');
  const title = document.getElementById('genericModalTitle');
  const body = document.getElementById('genericModalBody');

  if (!genericModal || !title || !body) return;

  const data = {
    'open-desk': {
      title: 'Open Desks Specification',
      html: `
        <p style="margin-bottom:14px; font-size:1rem; color:var(--text-muted);">
          Our open desks provide the ideal balance between ambient collaboration and focused individual work.
        </p>
        <ul style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
          <li>✓ <strong>Ergonomics:</strong> Herman Miller Sayl Chairs & large oak desks</li>
          <li>✓ <strong>Connectivity:</strong> 1 Gbps redundant fiber with dual-band Wi-Fi 6</li>
          <li>✓ <strong>Power:</strong> Individual USB-C, 220V/110V universal outlets</li>
          <li>✓ <strong>Perks:</strong> Unlimited artisan drip coffee and silent call pods</li>
        </ul>
        <button class="btn-primary btn-full-width" onclick="closeGenericModal(); openBookingModal('open-desk');">Book Open Desk Now</button>
      `
    },
    'private-cabin': {
      title: 'Private Cabin Specification',
      html: `
        <p style="margin-bottom:14px; font-size:1rem; color:var(--text-muted);">
          Designed for founders, remote teams, and deep work that requires acoustic isolation and zero interruption.
        </p>
        <ul style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
          <li>✓ <strong>Soundproofing:</strong> Double-glazed acoustic glass (STC 45)</li>
          <li>✓ <strong>Hardware:</strong> 34" Curved 4K Monitor with universal USB-C docking</li>
          <li>✓ <strong>Security:</strong> Smart biometric fingerprint lock & RFID keycard</li>
          <li>✓ <strong>Whiteboard:</strong> Full-length magnetic ideation glass</li>
        </ul>
        <button class="btn-primary btn-full-width" onclick="closeGenericModal(); openBookingModal('private-cabin');">Book Private Cabin</button>
      `
    },
    'meeting-room': {
      title: 'Meeting Room Specification',
      html: `
        <p style="margin-bottom:14px; font-size:1rem; color:var(--text-muted);">
          High-end conference suites for client presentations, stakeholder pitches, and team strategy workshops.
        </p>
        <ul style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
          <li>✓ <strong>Audio/Video:</strong> 75" Sony Bravia 4K Display + Neat Bar Zoom/Teams system</li>
          <li>✓ <strong>Seating:</strong> 12 executive leather conference chairs with cable wells</li>
          <li>✓ <strong>Hospitality:</strong> Dedicated beverage service and refreshments</li>
          <li>✓ <strong>Airflow:</strong> Active HEPA filtration & climate temperature dial</li>
        </ul>
        <button class="btn-primary btn-full-width" onclick="closeGenericModal(); openBookingModal('meeting-room');">Book Meeting Room</button>
      `
    }
  };

  const selected = data[type] || data['open-desk'];
  title.textContent = selected.title;
  body.innerHTML = selected.html;

  genericModal.classList.add('open');
  genericModal.setAttribute('aria-hidden', 'false');
}

function openPlansModal() {
  const genericModal = document.getElementById('genericModal');
  const title = document.getElementById('genericModalTitle');
  const body = document.getElementById('genericModalBody');

  if (!genericModal || !title || !body) return;

  title.textContent = 'Membership Plans';
  body.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="border:1px solid var(--border-subtle); padding:16px; border-radius:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong>Day Pass</strong>
          <span style="font-weight:800; color:var(--color-terracotta);">$25 / day</span>
        </div>
        <p style="font-size:0.8125rem; color:var(--text-muted); margin-bottom:12px;">Full-day hot desk access, 1Gbps internet, free coffee.</p>
        <button class="btn-secondary btn-sm" onclick="closeGenericModal(); openBookingModal('open-desk');">Select Pass</button>
      </div>

      <div style="border:2px solid var(--color-terracotta); padding:16px; border-radius:8px; background:rgba(214, 167, 86,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong>Dedicated Desk Pro</strong>
          <span style="font-weight:800; color:var(--color-terracotta);">$180 / month</span>
        </div>
        <p style="font-size:0.8125rem; color:var(--text-muted); margin-bottom:12px;">Reserved personal desk, lockable pedestal, 10 hrs meeting credits, 24/7 keycard.</p>
        <button class="btn-primary btn-sm" onclick="closeGenericModal(); openBookingModal('open-desk');">Join Pro Tier</button>
      </div>

      <div style="border:1px solid var(--border-subtle); padding:16px; border-radius:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong>Private Cabin Suite</strong>
          <span style="font-weight:800; color:var(--color-terracotta);">$450 / month</span>
        </div>
        <p style="font-size:0.8125rem; color:var(--text-muted); margin-bottom:12px;">Private acoustic glass cabin for 1-4 people, 24/7 biometric access.</p>
        <button class="btn-secondary btn-sm" onclick="closeGenericModal(); openBookingModal('private-cabin');">Inquire Cabin</button>
      </div>
    </div>
  `;

  genericModal.classList.add('open');
  genericModal.setAttribute('aria-hidden', 'false');
}

function openGenericModal(heading, message) {
  const genericModal = document.getElementById('genericModal');
  const title = document.getElementById('genericModalTitle');
  const body = document.getElementById('genericModalBody');

  if (!genericModal || !title || !body) return;

  title.textContent = heading;
  body.innerHTML = `<div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted);">${message}</div>`;

  genericModal.classList.add('open');
  genericModal.setAttribute('aria-hidden', 'false');
}

function closeGenericModal() {
  const genericModal = document.getElementById('genericModal');
  if (genericModal) {
    genericModal.classList.remove('open');
    genericModal.setAttribute('aria-hidden', 'true');
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D6A756" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
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
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

function initAboutInteractions() {
  const milestoneCards = document.querySelectorAll('.milestone-card');
  milestoneCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const titles = [
        'Foundation Milestone (2023)',
        'Architecture Expansion (2024)',
        'Community Milestone (2025)',
        'Innovation Horizon (2026+)'
      ];
      showToast(titles[idx] || 'Milestone inspected');
    });
  });

  const principleCards = document.querySelectorAll('.about-principle-card');
  principleCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--color-terracotta)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });
}
