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
    'daily-pass': 25,
    'monthly-membership': 180,
    'private-cabin': 550,
    'meeting-room': 35,
    'study-zone': 4
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initHeaderScroll();
  initUserStatus();
  initMobileDrawer();
  initContactFormValidation();
  initSmoothScroll();
});

function initTheme() {
  const currentTheme = APP_STATE.theme;
  document.documentElement.setAttribute('data-theme', currentTheme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  APP_STATE.theme = newTheme;
  localStorage.setItem('nexus_theme', newTheme);
  
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.setAttribute('title', newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

function initDirection() {
  const currentDir = APP_STATE.direction;
  document.documentElement.setAttribute('dir', currentDir);
  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    const badge = rtlBtn.querySelector('.btn-text-badge');
    if (badge) badge.textContent = currentDir.toUpperCase();
    rtlBtn.addEventListener('click', toggleDirection);
  }
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', newDir);
  APP_STATE.direction = newDir;
  localStorage.setItem('nexus_dir', newDir);

  const rtlBtn = document.getElementById('rtlToggleBtn');
  if (rtlBtn) {
    const badge = rtlBtn.querySelector('.btn-text-badge');
    if (badge) badge.textContent = newDir.toUpperCase();
  }
}

function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('active');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileDrawer);
  }

  document.addEventListener('click', (e) => {
    if (drawer && drawer.classList.contains('active')) {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMobileDrawer();
      }
    }
  });
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  if (drawer) {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (toggleBtn) {
    toggleBtn.classList.add('is-active');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  if (drawer) {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (toggleBtn) {
    toggleBtn.classList.remove('is-active');
  }
  document.body.style.overflow = '';
}

function initUserStatus() {
  const user = APP_STATE.user;
  const loginBtn = document.getElementById('headerLoginBtn');
  const loginText = document.getElementById('loginBtnText');

  if (loginBtn && loginText) {
    if (user && user.isLoggedIn) {
      loginText.textContent = user.name ? user.name.split(' ')[0] : 'Dashboard';
      loginBtn.setAttribute('title', `Logged in as ${user.name}`);
      loginBtn.href = 'dashboard.html';
      loginBtn.onclick = null;
    } else {
      loginText.textContent = 'Login';
      loginBtn.setAttribute('title', 'Sign In or Register');
      loginBtn.href = 'login.html';
      loginBtn.onclick = null;
    }
  }
}

function openAuthModal(mode = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;

  const title = document.getElementById('authModalTitle');
  const subtitle = document.getElementById('authModalSubtitle');
  const submitText = document.getElementById('authSubmitText');
  const switchPrompt = document.getElementById('authSwitchPrompt');
  const switchBtn = document.getElementById('authSwitchBtn');
  const nameGroup = document.getElementById('authNameGroup');

  if (mode === 'login') {
    if (title) title.textContent = 'Welcome Back';
    if (subtitle) subtitle.textContent = 'Enter your credentials to access your Workspace Hub membership dashboard.';
    if (submitText) submitText.textContent = 'Sign In to Workspace';
    if (switchPrompt) switchPrompt.textContent = "Don't have an account?";
    if (switchBtn) {
      switchBtn.textContent = 'Create one';
      switchBtn.onclick = () => openAuthModal('register');
    }
    if (nameGroup) nameGroup.style.display = 'none';
  } else {
    if (title) title.textContent = 'Create an Account';
    if (subtitle) subtitle.textContent = 'Join Workspace Hub to unlock flexible spaces, fast booking, and member perks.';
    if (submitText) submitText.textContent = 'Register Account';
    if (switchPrompt) switchPrompt.textContent = 'Already have an account?';
    if (switchBtn) {
      switchBtn.textContent = 'Sign In';
      switchBtn.onclick = () => openAuthModal('login');
    }
    if (nameGroup) nameGroup.style.display = 'block';
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('authEmail');
  const nameInput = document.getElementById('authFullName');
  const passInput = document.getElementById('authPassword');

  if (!emailInput || !passInput) return;

  const email = emailInput.value.trim();
  const name = (nameInput && nameInput.value.trim()) || 'Alex Morgan';

  if (!email || !passInput.value) {
    showToast('Please fill in all required credentials.', 'error');
    return;
  }

  APP_STATE.user = {
    isLoggedIn: true,
    name: name,
    email: email,
    plan: 'Pro Dedicated Desk'
  };
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));

  initUserStatus();
  closeAuthModal();
  showToast(`Welcome back, ${APP_STATE.user.name}!`, 'success');
}

function handleLogout() {
  APP_STATE.user = {
    isLoggedIn: false,
    name: 'Guest',
    email: '',
    plan: 'Visitor'
  };
  localStorage.removeItem('nexus_user');
  initUserStatus();
  closeDashboardModal();
  showToast('You have been signed out.', 'info');
}

function openDashboardModal() {
  const modal = document.getElementById('dashboardModal');
  if (!modal) return;

  const user = APP_STATE.user;
  const nameEl = document.getElementById('dashUserName');
  const emailEl = document.getElementById('dashUserEmail');
  const planEl = document.getElementById('dashUserPlan');

  if (nameEl) nameEl.textContent = user.isLoggedIn ? user.name : 'Guest User (Demo)';
  if (emailEl) emailEl.textContent = user.isLoggedIn ? user.email : 'guest@workspacehub.com';
  if (planEl) planEl.textContent = user.isLoggedIn ? user.plan : 'Flexible Daily Pass';

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
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const bookings = APP_STATE.bookings;

  if (bookings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding: 32px; color: var(--color-secondary-text);">
          No active or past bookings found. Ready to reserve your desk?
        </td>
      </tr>
    `;
    return;
  }

  bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(b.id)}</strong></td>
      <td>${escapeHtml(b.spaceType)}</td>
      <td>${escapeHtml(b.dateTime)}</td>
      <td><span class="booking-badge badge-${b.status.toLowerCase()}">${escapeHtml(b.status)}</span></td>
      <td>
        ${b.status !== 'Cancelled' ? `
          <button class="btn-cancel-booking" onclick="cancelBooking('${escapeHtml(b.id)}')">Cancel</button>
        ` : `
          <span style="color:var(--color-secondary-text); font-size:12px;">Cancelled</span>
        `}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function cancelBooking(bookingId) {
  const booking = APP_STATE.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  if (confirm(`Are you sure you want to cancel booking ${bookingId} (${booking.spaceType})?`)) {
    booking.status = 'Cancelled';
    localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));
    renderBookingsTable();
    showToast(`Booking ${bookingId} was successfully cancelled.`, 'info');
  }
}

function openBookingModal(preselectedSpace = 'open-desk') {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  const spaceSelect = document.getElementById('modalSpaceSelect');
  if (spaceSelect && preselectedSpace) {
    spaceSelect.value = preselectedSpace;
  }

  const dateInput = document.getElementById('modalBookingDate');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  updateBookingCost();

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

function updateBookingCost() {
  const spaceSelect = document.getElementById('modalSpaceSelect');
  const durationInput = document.getElementById('modalBookingDuration');
  const costEstimateEl = document.getElementById('modalEstimatedCost');
  const rateEstimateEl = document.getElementById('modalHourlyRate');

  if (!spaceSelect || !costEstimateEl) return;

  const spaceKey = spaceSelect.value || 'open-desk';
  const duration = parseInt(durationInput ? durationInput.value : 1, 10) || 1;
  const baseRate = APP_STATE.pricing[spaceKey] || 15;

  let totalCost = 0;
  let rateLabel = '';

  if (spaceKey === 'monthly-membership') {
    totalCost = baseRate * duration;
    rateLabel = `$${baseRate}/month rate`;
  } else if (spaceKey === 'private-cabin') {
    totalCost = baseRate * duration;
    rateLabel = `$${baseRate}/month base rate`;
  } else if (spaceKey === 'daily-pass') {
    totalCost = baseRate * duration;
    rateLabel = `$${baseRate}/day flat rate`;
  } else {
    totalCost = baseRate * duration;
    rateLabel = `$${baseRate}/hr base rate`;
  }

  costEstimateEl.textContent = `$${totalCost}`;
  if (rateEstimateEl) {
    rateEstimateEl.textContent = rateLabel;
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const spaceSelect = document.getElementById('modalSpaceSelect');
  const dateInput = document.getElementById('modalBookingDate');
  const timeSelect = document.getElementById('modalBookingTime');
  const durationInput = document.getElementById('modalBookingDuration');

  if (!spaceSelect || !dateInput || !timeSelect) return;

  const spaceName = spaceSelect.options[spaceSelect.selectedIndex].text;
  const dateVal = dateInput.value;
  const timeVal = timeSelect.value;
  const duration = durationInput ? durationInput.value : '2';

  if (!dateVal) {
    showToast('Please select a date for your booking.', 'error');
    return;
  }

  const newId = `BK-${Math.floor(100 + Math.random() * 900)}`;
  const newBooking = {
    id: newId,
    spaceType: spaceName,
    dateTime: `${dateVal}, ${timeVal} (${duration} hrs)`,
    seatNum: `Assigned on Arrival`,
    status: 'Confirmed'
  };

  APP_STATE.bookings.unshift(newBooking);
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));

  closeBookingModal();
  showToast(`Booking ${newId} confirmed! See your Dashboard for details.`, 'success');
  
  setTimeout(() => {
    openDashboardModal();
  }, 600);
}

function openGenericModal(title, contentHtml) {
  const modal = document.getElementById('genericModal');
  if (!modal) return;

  const titleEl = document.getElementById('genericModalTitle');
  const bodyEl = document.getElementById('genericModalBody');

  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = `<div style="line-height:1.7; color:var(--color-secondary-text);">${contentHtml}</div>`;

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

function initContactFormValidation() {
  const form = document.getElementById('nexusContactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactFullName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const consentInput = document.getElementById('contactConsent');

  if (nameInput) {
    nameInput.addEventListener('input', () => validateField('name'));
    nameInput.addEventListener('blur', () => validateField('name'));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => validateField('email'));
    emailInput.addEventListener('blur', () => validateField('email'));
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', () => validateField('phone'));
    phoneInput.addEventListener('blur', () => validateField('phone'));
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => validateField('message'));
    messageInput.addEventListener('blur', () => validateField('message'));
  }
  if (consentInput) {
    consentInput.addEventListener('change', () => validateField('consent'));
  }
}

function validateField(fieldName) {
  let isValid = true;

  switch (fieldName) {
    case 'name': {
      const el = document.getElementById('contactFullName');
      const group = document.getElementById('groupName');
      if (!el || !group) break;
      if (el.value.trim().length === 0) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
      break;
    }
    case 'email': {
      const el = document.getElementById('contactEmail');
      const group = document.getElementById('groupEmail');
      if (!el || !group) break;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(el.value.trim())) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
      break;
    }
    case 'phone': {
      const el = document.getElementById('contactPhone');
      const group = document.getElementById('groupPhone');
      if (!el || !group) break;
      const phoneVal = el.value.trim();
      if (phoneVal.length > 0) {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        const digitsOnly = phoneVal.replace(/\D/g, '');
        if (digitsOnly.length < 7 || !phoneRegex.test(phoneVal)) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      } else {
        group.classList.remove('has-error');
      }
      break;
    }
    case 'message': {
      const el = document.getElementById('contactMessage');
      const group = document.getElementById('groupMessage');
      if (!el || !group) break;
      if (el.value.trim().length < 10) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
      break;
    }
    case 'consent': {
      const el = document.getElementById('contactConsent');
      const group = document.getElementById('groupConsent');
      if (!el || !group) break;
      if (!el.checked) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
      break;
    }
  }

  return isValid;
}

function validateAllFields() {
  const validName = validateField('name');
  const validEmail = validateField('email');
  const validPhone = validateField('phone');
  const validMessage = validateField('message');
  const validConsent = validateField('consent');

  return validName && validEmail && validPhone && validMessage && validConsent;
}

function handleContactSubmit(e) {
  e.preventDefault();

  const isFormValid = validateAllFields();

  if (!isFormValid) {
    const firstError = document.querySelector('.form-group.has-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const inputEl = firstError.querySelector('input, textarea, select');
      if (inputEl) inputEl.focus();
    }
    showToast('Please correct the highlighted fields before submitting.', 'error');
    return;
  }

  const nameVal = document.getElementById('contactFullName').value.trim();
  const emailVal = document.getElementById('contactEmail').value.trim();
  const phoneVal = document.getElementById('contactPhone').value.trim();
  const subjectVal = document.getElementById('contactSubject').value;
  const serviceVal = document.getElementById('contactService').value;
  const messageVal = document.getElementById('contactMessage').value.trim();

  const submitBtn = document.getElementById('contactSubmitBtn');
  const form = document.getElementById('nexusContactForm');
  const banner = document.getElementById('formStatusBanner');

  if (submitBtn) {
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
  }

  const inputs = form.querySelectorAll('input, select, textarea, button');
  inputs.forEach(el => el.disabled = true);

  if (banner) {
    banner.style.display = 'none';
    banner.className = 'form-status-banner';
    banner.innerHTML = '';
  }

  setTimeout(() => {
    inputs.forEach(el => el.disabled = false);
    if (submitBtn) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }

    if (banner) {
      banner.style.display = 'block';
      banner.className = 'form-status-banner success-state';
      banner.innerHTML = `
        <div class="banner-inner">
          <div class="banner-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="banner-content">
            <h4 class="banner-title">Message Delivered Successfully!</h4>
            <p class="banner-desc">
              Thank you, <strong>${escapeHtml(nameVal)}</strong>. We received your inquiry regarding <strong>${escapeHtml(subjectVal)} (${escapeHtml(serviceVal)})</strong>. Our concierge team will review your requirements and respond to <strong>${escapeHtml(emailVal)}</strong> within two business hours.
            </p>
          </div>
        </div>
      `;
    }

    form.reset();

    document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));

    showToast('Your message has been received! We will be in touch shortly.', 'success');

    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  }, 1200);
}

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let iconHtml = '';
  if (type === 'success') {
    iconHtml = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
  } else if (type === 'error') {
    iconHtml = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  } else {
    iconHtml = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconHtml}</div>
    <div class="toast-msg">${escapeHtml(message)}</div>
    <button class="toast-close-btn" aria-label="Close notification" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAuthModal();
    closeDashboardModal();
    closeBookingModal();
    closeGenericModal();
    closeMobileDrawer();
  }
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeAuthModal();
      closeDashboardModal();
      closeBookingModal();
      closeGenericModal();
    }
  });
});

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
