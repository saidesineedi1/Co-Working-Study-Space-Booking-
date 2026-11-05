const APP_STATE = {
  theme: localStorage.getItem('nexus_theme') || 'light',
  direction: localStorage.getItem('nexus_dir') || 'ltr',
  currentTab: 'overview',
  resFilter: 'all',
  invFilter: 'all',
  
  user: JSON.parse(localStorage.getItem('nexus_user')) || {
    isLoggedIn: true,
    name: 'Alex Morgan',
    email: 'alex.morgan@workspace.com',
    phone: '+1 (555) 389-2041',
    company: 'Morgan Design Studio',
    plan: 'Pro Dedicated Desk',
    memberSince: 'January 15, 2026',
    avatar: 'assets/user-1.jpg'
  },

  bookings: JSON.parse(localStorage.getItem('nexus_bookings')) || [
    {
      id: 'BK-101',
      spaceType: 'Open Desk (Zone B - Silent Pod)',
      spaceKey: 'open-desk',
      date: '2026-11-04',
      dateFormatted: 'Today, Nov 4, 2026',
      timeSlot: '02:00 PM – 06:00 PM',
      durationHours: 4,
      seatNum: 'Desk #14 (Zone B)',
      accessPin: '8849',
      status: 'Active',
      price: 20.00,
      tax: 1.70,
      total: 21.70,
      invoiceId: 'INV-2026-081',
      image: 'assets/open-desk.jpg',
      attendees: 1
    },
    {
      id: 'BK-102',
      spaceType: 'Private Cabin Suite 04',
      spaceKey: 'private-cabin',
      date: '2026-11-06',
      dateFormatted: 'Friday, Nov 6, 2026',
      timeSlot: '10:00 AM – 02:00 PM',
      durationHours: 4,
      seatNum: 'Cabin Suite 4B',
      accessPin: '4491',
      status: 'Confirmed',
      price: 140.00,
      tax: 11.90,
      total: 151.90,
      invoiceId: 'INV-2026-079',
      image: 'assets/private-cabin.jpg',
      attendees: 3
    },
    {
      id: 'BK-103',
      spaceType: 'Executive Meeting Room A',
      spaceKey: 'meeting-room',
      date: '2026-10-29',
      dateFormatted: 'Oct 29, 2026',
      timeSlot: '03:00 PM – 05:00 PM',
      durationHours: 2,
      seatNum: 'Studio Conf Room 1',
      accessPin: '2041',
      status: 'Completed',
      price: 80.00,
      tax: 6.80,
      total: 86.80,
      invoiceId: 'INV-2026-068',
      image: 'assets/meeting-room.jpg',
      attendees: 8
    },
    {
      id: 'BK-104',
      spaceType: 'Dedicated Desk (Resident Studio)',
      spaceKey: 'dedicated-desk',
      date: '2026-10-15',
      dateFormatted: 'Oct 15, 2026',
      timeSlot: '09:00 AM – 06:00 PM',
      durationHours: 9,
      seatNum: 'Desk #08 (Resident Bay)',
      accessPin: '6390',
      status: 'Completed',
      price: 180.00,
      tax: 15.30,
      total: 195.30,
      invoiceId: 'INV-2026-052',
      image: 'assets/dedicated-desk.jpg',
      attendees: 1
    },
    {
      id: 'BK-105',
      spaceType: 'Study Zone (Booth 3)',
      spaceKey: 'study-zone',
      date: '2026-10-02',
      dateFormatted: 'Oct 02, 2026',
      timeSlot: '01:00 PM – 03:00 PM',
      durationHours: 2,
      seatNum: 'Silent Booth 3',
      accessPin: '9102',
      status: 'Cancelled',
      price: 8.00,
      tax: 0.68,
      total: 8.68,
      invoiceId: 'INV-2026-044',
      image: 'assets/study-zone.jpg',
      attendees: 1
    }
  ],

  invoices: JSON.parse(localStorage.getItem('nexus_invoices')) || [
    {
      id: 'INV-2026-081',
      reference: 'BK-101',
      date: 'Nov 04, 2026',
      dueDate: 'Paid on Receipt',
      description: 'Open Desk (Zone B - Silent Pod) – 4 Hours Session',
      amount: 20.00,
      tax: 1.70,
      total: 21.70,
      paymentMethod: 'Visa •••• 4242',
      status: 'Paid',
      authCode: 'AUTH-94021'
    },
    {
      id: 'INV-2026-079',
      reference: 'BK-102',
      date: 'Oct 30, 2026',
      dueDate: 'Paid on Receipt',
      description: 'Private Cabin Suite 04 – 4 Hours Session',
      amount: 140.00,
      tax: 11.90,
      total: 151.90,
      paymentMethod: 'Visa •••• 4242',
      status: 'Paid',
      authCode: 'AUTH-89214'
    },
    {
      id: 'INV-2026-068',
      reference: 'BK-103',
      date: 'Oct 29, 2026',
      dueDate: 'Paid on Receipt',
      description: 'Executive Meeting Room A – 2 Hours Session',
      amount: 80.00,
      tax: 6.80,
      total: 86.80,
      paymentMethod: 'Mastercard •••• 8812',
      status: 'Paid',
      authCode: 'AUTH-77319'
    },
    {
      id: 'INV-2026-052',
      reference: 'MEM-PRO-10',
      date: 'Oct 01, 2026',
      dueDate: 'Paid on Receipt',
      description: 'Pro Dedicated Desk – Monthly Recurring Membership',
      amount: 180.00,
      tax: 15.30,
      total: 195.30,
      paymentMethod: 'Visa •••• 4242',
      status: 'Paid',
      authCode: 'AUTH-65103'
    },
    {
      id: 'INV-2026-044',
      reference: 'BK-105',
      date: 'Sep 28, 2026',
      dueDate: 'Refund Processed',
      description: 'Study Zone Silent Booth – 2 Hours Session (Cancelled)',
      amount: 8.00,
      tax: 0.68,
      total: 8.68,
      paymentMethod: 'Visa •••• 4242',
      status: 'Refunded',
      authCode: 'REF-10928'
    }
  ],

  notifications: JSON.parse(localStorage.getItem('nexus_notifications')) || [
    {
      id: 'notif-1',
      type: 'booking',
      message: 'Your reservation for Private Cabin Suite 04 (BK-102) is confirmed for Nov 6, 2026.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 'notif-2',
      type: 'invoice',
      message: 'Invoice INV-2026-081 ($21.70) has been paid successfully.',
      time: '1 day ago',
      unread: true
    },
    {
      id: 'notif-3',
      type: 'membership',
      message: 'Your Pro Dedicated Desk monthly cycle auto-renews on Dec 01, 2026.',
      time: '3 days ago',
      unread: false
    },
    {
      id: 'notif-4',
      type: 'system',
      message: 'Campus fiber speed has been upgraded to 1,000 Mbps symmetrical across all floors.',
      time: '1 week ago',
      unread: false
    }
  ],

  inventory: {
    'open-desk': {
      name: 'Open Desk (Zone B - Silent Pod)',
      category: 'Open Desk',
      hourlyRate: 5,
      dayRate: 25,
      maxCapacity: 1,
      image: 'assets/open-desk.jpg',
      defaultSeat: 'Desk #14 (Zone B)'
    },
    'private-cabin': {
      name: 'Private Cabin Suite 04',
      category: 'Private Cabin',
      hourlyRate: 35,
      monthRate: 550,
      maxCapacity: 4,
      image: 'assets/private-cabin.jpg',
      defaultSeat: 'Cabin Suite 4B'
    },
    'meeting-room': {
      name: 'Executive Meeting Room A',
      category: 'Meeting Room',
      hourlyRate: 40,
      maxCapacity: 12,
      image: 'assets/meeting-room.jpg',
      defaultSeat: 'Studio Conf Room 1'
    },
    'dedicated-desk': {
      name: 'Dedicated Desk (Resident Studio)',
      category: 'Dedicated Desk',
      hourlyRate: 20,
      monthRate: 180,
      maxCapacity: 1,
      image: 'assets/dedicated-desk.jpg',
      defaultSeat: 'Desk #08 (Resident Bay)'
    },
    'study-zone': {
      name: 'Study Zone (Silent Library Booth)',
      category: 'Study Zone',
      hourlyRate: 4,
      maxCapacity: 1,
      image: 'assets/study-zone.jpg',
      defaultSeat: 'Silent Booth 3'
    }
  },

  bookingDraft: {
    currentStep: 1,
    spaceKey: 'open-desk',
    date: '',
    timeSlot: '02:00 PM – 04:00 PM',
    duration: 2,
    attendees: 1,
    addons: {
      monitor: false,
      coffee: false,
      whiteboard: false,
      guest: false
    }
  }
};

function syncStorage() {
  localStorage.setItem('nexus_user', JSON.stringify(APP_STATE.user));
  localStorage.setItem('nexus_bookings', JSON.stringify(APP_STATE.bookings));
  localStorage.setItem('nexus_invoices', JSON.stringify(APP_STATE.invoices));
  localStorage.setItem('nexus_notifications', JSON.stringify(APP_STATE.notifications));
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  checkAuthStatus();
  initSidebarMobileDrawer();
  initBookingDefaults();
  renderAllViews();
  setupClickOutsideListeners();
});

function checkAuthStatus() {
  if (!APP_STATE.user) {
    APP_STATE.user = {
      isLoggedIn: true,
      name: 'Alex Morgan',
      email: 'alex.morgan@workspace.com',
      phone: '+1 (555) 389-2041',
      company: 'Morgan Design Studio',
      plan: 'Pro Dedicated Desk',
      memberSince: 'January 15, 2026',
      avatar: 'assets/user-1.jpg'
    };
  }
  APP_STATE.user.isLoggedIn = true;
  updateUserInterface();
}

function handleAuthBarrierLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById('barrierEmail');
  const emailVal = emailInput ? emailInput.value.trim() : 'alex.morgan@workspace.com';

  APP_STATE.user = {
    isLoggedIn: true,
    name: 'Alex Morgan',
    email: emailVal || 'alex.morgan@workspace.com',
    phone: '+1 (555) 389-2041',
    company: 'Morgan Design Studio',
    plan: 'Pro Dedicated Desk',
    memberSince: 'January 15, 2026',
    avatar: 'assets/user-1.jpg'
  };
  syncStorage();
  checkAuthStatus();
  showToast(`Welcome back, ${APP_STATE.user.name}!`, 'success');
}

function handleLogout() {
  closeProfileMenu();
  window.location.href = 'index.html';
}

function updateUserInterface() {
  const user = APP_STATE.user;
  
  const sName = document.getElementById('sidebarUserName');
  const sPlan = document.getElementById('sidebarUserPlan');
  const sAvatar = document.getElementById('sidebarUserAvatar');
  if (sName) sName.textContent = user.name;
  if (sPlan) sPlan.textContent = user.plan.split(' ')[0] + ' Member';
  if (sAvatar && user.avatar) sAvatar.src = user.avatar;

  const tName = document.getElementById('topbarUserName');
  const tPlan = document.getElementById('topbarUserPlan');
  const tAvatar = document.getElementById('topbarAvatar');
  const dFullName = document.getElementById('dropdownUserFullName');
  const dEmail = document.getElementById('dropdownUserEmail');
  if (tName) tName.textContent = user.name;
  if (tPlan) tPlan.textContent = user.plan;
  if (tAvatar && user.avatar) tAvatar.src = user.avatar;
  if (dFullName) dFullName.textContent = user.name;
  if (dEmail) dEmail.textContent = user.email;

  const wName = document.getElementById('welcomeMemberName');
  if (wName) wName.textContent = `Welcome Back, ${user.name}!`;

  const pName = document.getElementById('profFullName');
  const pEmail = document.getElementById('profEmail');
  const pPhone = document.getElementById('profPhone');
  const pCompany = document.getElementById('profCompany');
  const pAvatar = document.getElementById('profileFormAvatar');
  if (pName) pName.value = user.name;
  if (pEmail) pEmail.value = user.email;
  if (pPhone) pPhone.value = user.phone || '';
  if (pCompany) pCompany.value = user.company || '';
  if (pAvatar && user.avatar) pAvatar.src = user.avatar;
}

function initTheme() {
  document.documentElement.setAttribute('data-theme', APP_STATE.theme);
  const themeBtn = document.getElementById('dashThemeBtn');
  if (themeBtn) {
    themeBtn.setAttribute('title', APP_STATE.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

function toggleTheme() {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  APP_STATE.theme = nextTheme;
  localStorage.setItem('nexus_theme', nextTheme);
  
  const themeBtn = document.getElementById('dashThemeBtn');
  if (themeBtn) {
    themeBtn.setAttribute('title', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

function initDirection() {
  document.documentElement.setAttribute('dir', APP_STATE.direction);
  const rtlBtn = document.getElementById('dashRtlBtn');
  if (rtlBtn) {
    const badge = rtlBtn.querySelector('.btn-text-badge');
    if (badge) badge.textContent = APP_STATE.direction.toUpperCase();
  }
}

function toggleDirection() {
  const current = document.documentElement.getAttribute('dir') || 'ltr';
  const nextDir = current === 'ltr' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', nextDir);
  APP_STATE.direction = nextDir;
  localStorage.setItem('nexus_dir', nextDir);

  const rtlBtn = document.getElementById('dashRtlBtn');
  if (rtlBtn) {
    const badge = rtlBtn.querySelector('.btn-text-badge');
    if (badge) badge.textContent = nextDir.toUpperCase();
  }
}

function switchTab(tabId, subFilter = null) {
  APP_STATE.currentTab = tabId;

  document.querySelectorAll('.sidebar-link').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  const titles = {
    overview: 'Dashboard Overview',
    book: 'Book a Workspace',
    reservations: 'My Reservations',
    membership: 'Membership & Billing',
    invoices: 'My Invoices',
    profile: 'Profile & Settings'
  };

  const breadcrumbs = {
    overview: 'Overview',
    book: 'Book a Space',
    reservations: 'Reservations',
    membership: 'Membership',
    invoices: 'Invoices',
    profile: 'Settings'
  };

  const titleEl = document.getElementById('topbarTitle');
  const breadcrumbEl = document.getElementById('breadcrumbCurrent');
  if (titleEl) titleEl.textContent = titles[tabId] || 'Member Portal';
  if (breadcrumbEl) breadcrumbEl.textContent = breadcrumbs[tabId] || 'Overview';

  if (tabId === 'reservations' && subFilter) {
    filterReservations(subFilter);
  }

  renderAllViews();

  closeSidebarDrawer();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAllViews() {
  renderOverviewStats();
  renderOverviewUpcoming();
  renderOverviewActivity();
  renderReservationsList();
  renderInvoicesList();
  renderMembershipHistory();
  renderNotificationsList();
  updateSidebarCounts();
}

function updateSidebarCounts() {
  const badge = document.getElementById('sidebarBookingCount');
  if (badge) {
    const upcomingCount = APP_STATE.bookings.filter(b => b.status === 'Confirmed' || b.status === 'Active').length;
    badge.textContent = upcomingCount;
  }
}

function renderOverviewStats() {
  const upcomingCount = APP_STATE.bookings.filter(b => b.status === 'Confirmed').length;
  const activeCount = APP_STATE.bookings.filter(b => b.status === 'Active').length;
  const completedCount = APP_STATE.bookings.filter(b => b.status === 'Completed').length;

  const statUpcoming = document.getElementById('statUpcomingCount');
  const statActive = document.getElementById('statActiveCount');
  const statCompleted = document.getElementById('statCompletedCount');
  const statPlan = document.getElementById('statPlanName');

  if (statUpcoming) statUpcoming.textContent = upcomingCount;
  if (statActive) statActive.textContent = activeCount;
  if (statCompleted) statCompleted.textContent = completedCount;
  if (statPlan) statPlan.textContent = APP_STATE.user.plan;

  const msTitle = document.getElementById('msPlanTitle');
  if (msTitle) msTitle.textContent = APP_STATE.user.plan;
}

function renderOverviewUpcoming() {
  const container = document.getElementById('overviewUpcomingList');
  if (!container) return;

  const relevant = APP_STATE.bookings
    .filter(b => b.status === 'Active' || b.status === 'Confirmed')
    .slice(0, 3);

  if (relevant.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 13.5px;">
        No active or upcoming reservations found. Ready to book your desk or cabin?
        <div style="margin-top: 12px;">
          <button class="btn-primary btn-sm" onclick="switchTab('book')">Book a Space</button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = relevant.map(b => `
    <div class="upcoming-card-item">
      <div class="upcoming-thumb">
        <img src="${b.image}" alt="${escapeHtml(b.spaceType)}" onerror="this.onerror=null;this.src='assets/open-desk.jpg';">
      </div>
      <div class="upcoming-meta">
        <div class="upcoming-meta-top">
          <span class="upcoming-badge badge-${b.status.toLowerCase()}">${escapeHtml(b.status)}</span>
          <span style="font-size: 11.5px; font-weight: 700; color: var(--color-terracotta);">${escapeHtml(b.id)}</span>
        </div>
        <h4 class="upcoming-title">${escapeHtml(b.spaceType)}</h4>
        <div class="upcoming-time">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${escapeHtml(b.dateFormatted || b.date)} • ${escapeHtml(b.timeSlot)}</span>
        </div>
      </div>
      <div class="upcoming-actions">
        <button class="btn-sm-action" onclick="openBookingDetailsModal('${b.id}')">View Pass</button>
      </div>
    </div>
  `).join('');
}

function renderOverviewActivity() {
  const container = document.getElementById('overviewActivityFeed');
  if (!container) return;

  const activities = [
    { text: 'Checked in at <strong>Desk #14 (Zone B)</strong> for today\'s session.', time: '2 hours ago' },
    { text: 'Confirmed booking <strong>BK-102</strong> for Private Cabin Suite 04.', time: 'Yesterday' },
    { text: 'Tax Invoice <strong>INV-2026-081</strong> ($21.70) settled via Visa •••• 4242.', time: 'Nov 01, 2026' },
    { text: 'Completed 2 hours meeting session in <strong>Executive Meeting Room A</strong>.', time: 'Oct 29, 2026' }
  ];

  container.innerHTML = activities.map(a => `
    <div class="activity-feed-item">
      <div class="activity-dot"></div>
      <div class="activity-text-wrap">
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function startQuickBooking(spaceKey) {
  switchTab('book');
  selectWorkspaceCard(spaceKey);
}

function initBookingDefaults() {
  const today = new Date().toISOString().split('T')[0];
  const datePicker = document.getElementById('bookingDatePicker');
  if (datePicker) {
    datePicker.value = today;
    datePicker.min = today;
  }
  APP_STATE.bookingDraft.date = today;
  renderTimeSlots();
}

function goToBookingStep(step) {
  if (step === 3) {
    const selectedSlot = document.querySelector('.time-slot-btn.selected');
    if (!selectedSlot) {
      showToast('Please choose an available start time slot first.', 'error');
      return;
    }
  }

  for (let i = 1; i <= 4; i++) {
    const ind = document.getElementById(`stepIndicator${i}`);
    const line = document.getElementById(`stepLine${i}`);
    const panel = document.getElementById(`bookingStep${i}`);

    if (panel) panel.classList.remove('active');
    if (ind) {
      ind.classList.remove('active', 'completed');
      if (i < step) ind.classList.add('completed');
      if (i === step) ind.classList.add('active');
    }
    if (line) {
      if (i < step) line.classList.add('active');
      else line.classList.remove('active');
    }
  }

  const activePanel = document.getElementById(`bookingStep${step}`);
  if (activePanel) activePanel.classList.add('active');

  APP_STATE.bookingDraft.currentStep = step;

  if (step === 4) {
    updateBookingCalculation();
  }

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function selectWorkspaceCard(spaceKey) {
  APP_STATE.bookingDraft.spaceKey = spaceKey;
  
  document.querySelectorAll('.space-select-card').forEach(card => {
    if (card.getAttribute('data-space-key') === spaceKey) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const inv = APP_STATE.inventory[spaceKey];
  const capInput = document.getElementById('bookingAttendees');
  const capSub = document.getElementById('capacitySubtitle');

  if (inv && capInput) {
    capInput.max = inv.maxCapacity;
    capInput.value = 1;
    APP_STATE.bookingDraft.attendees = 1;
    if (capSub) capSub.textContent = `Maximum permitted capacity for this space: ${inv.maxCapacity} person${inv.maxCapacity > 1 ? 's' : ''}`;
  }

  renderTimeSlots();
}

function handleDateChange() {
  const picker = document.getElementById('bookingDatePicker');
  if (picker) {
    APP_STATE.bookingDraft.date = picker.value;
    renderTimeSlots();
  }
}

function handleDurationChange() {
  const durSelect = document.getElementById('bookingDurationSelect');
  if (durSelect) {
    APP_STATE.bookingDraft.duration = parseInt(durSelect.value, 10) || 2;
    renderTimeSlots();
  }
}

function renderTimeSlots() {
  const grid = document.getElementById('timeSlotsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const selectedDate = APP_STATE.bookingDraft.date;
  const selectedSpace = APP_STATE.bookingDraft.spaceKey;
  const duration = APP_STATE.bookingDraft.duration;

  const slots = [
    { start: '08:00 AM', hour24: 8 },
    { start: '10:00 AM', hour24: 10 },
    { start: '12:00 PM', hour24: 12 },
    { start: '02:00 PM', hour24: 14 },
    { start: '04:00 PM', hour24: 16 },
    { start: '06:00 PM', hour24: 18 }
  ];

  let selectedSet = false;

  slots.forEach(slot => {
    const endHour24 = slot.hour24 + duration;
    let endStr = '';
    if (endHour24 <= 12) endStr = `${endHour24 === 12 ? 12 : endHour24}:00 ${endHour24 === 12 ? 'PM' : 'AM'}`;
    else endStr = `${endHour24 - 12}:00 PM`;

    const fullSlotStr = `${slot.start} – ${endStr}`;

    const isConflict = APP_STATE.bookings.some(b => {
      if (b.status === 'Cancelled') return false;
      if (b.date === selectedDate && b.spaceKey === selectedSpace) {
        if (b.timeSlot.includes(slot.start)) return true;
      }
      return false;
    });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `time-slot-btn ${isConflict ? 'disabled' : ''}`;
    
    if (!isConflict && !selectedSet) {
      btn.classList.add('selected');
      APP_STATE.bookingDraft.timeSlot = `${fullSlotStr} (${duration} hrs)`;
      selectedSet = true;
    }

    btn.innerHTML = `
      <span>${slot.start}</span>
      <span class="slot-status">${isConflict ? 'Booked' : 'Available'}</span>
    `;

    if (!isConflict) {
      btn.onclick = () => {
        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        APP_STATE.bookingDraft.timeSlot = `${fullSlotStr} (${duration} hrs)`;
      };
    }

    grid.appendChild(btn);
  });
}

function adjustCapacity(delta) {
  const input = document.getElementById('bookingAttendees');
  if (!input) return;

  const min = parseInt(input.min, 10) || 1;
  const max = parseInt(input.max, 10) || 1;
  let val = parseInt(input.value, 10) || 1;

  val += delta;
  if (val < min) val = min;
  if (val > max) val = max;

  input.value = val;
  APP_STATE.bookingDraft.attendees = val;
}

function updateBookingCalculation() {
  const draft = APP_STATE.bookingDraft;
  const space = APP_STATE.inventory[draft.spaceKey];
  if (!space) return;

  const monitor = document.getElementById('addonMonitor')?.checked || false;
  const coffee = document.getElementById('addonCoffee')?.checked || false;
  const whiteboard = document.getElementById('addonWhiteboard')?.checked || false;
  const guest = document.getElementById('addonGuest')?.checked || false;

  let addonsCost = 0;
  const addonsSelectedList = [];

  if (monitor) { addonsCost += 5; addonsSelectedList.push('4K Display ($5.00)'); }
  if (coffee) { addonsCost += 4 * draft.attendees; addonsSelectedList.push(`Coffee Package ($${4 * draft.attendees}.00)`); }
  if (whiteboard) { addonsCost += 10; addonsSelectedList.push('Whiteboard Kit ($10.00)'); }
  if (guest) { addonsCost += 12; addonsSelectedList.push('Guest Day Pass ($12.00)'); }

  const baseCost = space.hourlyRate * draft.duration;
  const tax = (baseCost + addonsCost) * 0.085;
  const total = baseCost + addonsCost + tax;

  const sImg = document.getElementById('summarySpaceImg');
  const sCat = document.getElementById('summaryCategoryBadge');
  const sName = document.getElementById('summarySpaceName');
  const sRate = document.getElementById('summarySpaceRate');
  const sDate = document.getElementById('summaryDate');
  const sTime = document.getElementById('summaryTime');
  const sAtt = document.getElementById('summaryAttendees');
  const sSeat = document.getElementById('summarySeat');
  const sAddons = document.getElementById('summaryAddons');

  if (sImg) sImg.src = space.image;
  if (sCat) sCat.textContent = space.category;
  if (sName) sName.textContent = space.name;
  if (sRate) sRate.textContent = `$${space.hourlyRate}.00 / hour`;
  if (sDate) sDate.textContent = draft.date || 'Today';
  if (sTime) sTime.textContent = draft.timeSlot;
  if (sAtt) sAtt.textContent = `${draft.attendees} Person${draft.attendees > 1 ? 's' : ''}`;
  if (sSeat) sSeat.textContent = space.defaultSeat;
  if (sAddons) sAddons.textContent = addonsSelectedList.length > 0 ? addonsSelectedList.join(', ') : 'None selected';

  document.getElementById('priceBase').textContent = `$${baseCost.toFixed(2)}`;
  document.getElementById('priceAddons').textContent = `$${addonsCost.toFixed(2)}`;
  document.getElementById('priceTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('priceTotal').textContent = `$${total.toFixed(2)}`;

  const mName = document.getElementById('summaryMemberName');
  const mEmail = document.getElementById('summaryMemberEmail');
  const mPlan = document.getElementById('summaryMemberPlan');
  const mAvatar = document.getElementById('summaryMemberAvatar');
  if (mName) mName.textContent = APP_STATE.user.name;
  if (mEmail) mEmail.textContent = APP_STATE.user.email;
  if (mPlan) mPlan.textContent = APP_STATE.user.plan;
  if (mAvatar && APP_STATE.user.avatar) mAvatar.src = APP_STATE.user.avatar;
}

function handleBookingFormSubmit(e) {
  e.preventDefault();

  const consent = document.getElementById('bookingTermsConsent');
  if (!consent || !consent.checked) {
    showToast('Please accept the campus booking terms before confirming.', 'error');
    return;
  }

  const submitBtn = document.getElementById('confirmBookingBtn');
  if (submitBtn) {
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
  }

  const draft = APP_STATE.bookingDraft;
  const space = APP_STATE.inventory[draft.spaceKey];

  const monitor = document.getElementById('addonMonitor')?.checked || false;
  const coffee = document.getElementById('addonCoffee')?.checked || false;
  const whiteboard = document.getElementById('addonWhiteboard')?.checked || false;
  const guest = document.getElementById('addonGuest')?.checked || false;

  let addonsCost = 0;
  if (monitor) addonsCost += 5;
  if (coffee) addonsCost += 4 * draft.attendees;
  if (whiteboard) addonsCost += 10;
  if (guest) addonsCost += 12;

  const baseCost = space.hourlyRate * draft.duration;
  const tax = (baseCost + addonsCost) * 0.085;
  const total = baseCost + addonsCost + tax;

  setTimeout(() => {
    const newBookingId = `BK-${Math.floor(100 + Math.random() * 900)}`;
    const newInvoiceId = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking = {
      id: newBookingId,
      spaceType: space.name,
      spaceKey: draft.spaceKey,
      date: draft.date,
      dateFormatted: draft.date,
      timeSlot: draft.timeSlot,
      durationHours: draft.duration,
      seatNum: space.defaultSeat,
      accessPin: pin,
      status: 'Confirmed',
      price: baseCost + addonsCost,
      tax: tax,
      total: total,
      invoiceId: newInvoiceId,
      image: space.image,
      attendees: draft.attendees
    };

    const newInvoice = {
      id: newInvoiceId,
      reference: newBookingId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: 'Paid on Receipt',
      description: `${space.name} – ${draft.duration} Hours Reservation`,
      amount: baseCost + addonsCost,
      tax: tax,
      total: total,
      paymentMethod: 'Visa •••• 4242',
      status: 'Paid',
      authCode: `AUTH-${Math.floor(10000 + Math.random() * 90000)}`
    };

    APP_STATE.bookings.unshift(newBooking);
    APP_STATE.invoices.unshift(newInvoice);
    APP_STATE.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'booking',
      message: `Reservation confirmed for ${space.name} (${newBookingId}) on ${draft.date}.`,
      time: 'Just now',
      unread: true
    });

    syncStorage();

    if (submitBtn) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }

    document.getElementById('nexusBookingEngineForm').style.display = 'none';
    const successScreen = document.getElementById('bookingSuccessScreen');
    if (successScreen) {
      successScreen.style.display = 'block';
      document.getElementById('confirmedRef').textContent = newBookingId;
      document.getElementById('confirmedSpace').textContent = space.name;
      document.getElementById('confirmedTime').textContent = `${draft.date} • ${draft.timeSlot}`;
      document.getElementById('confirmedPin').textContent = `#${pin}`;
    }

    renderAllViews();
    showToast(`Reservation ${newBookingId} confirmed! Digital pass ready.`, 'success');
  }, 1000);
}

function resetBookingEngine() {
  document.getElementById('nexusBookingEngineForm').style.display = 'block';
  document.getElementById('bookingSuccessScreen').style.display = 'none';
  goToBookingStep(1);
}

function filterReservations(filter) {
  APP_STATE.resFilter = filter;

  document.querySelectorAll('.res-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-res-filter') === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderReservationsList();
}

function handleReservationSearch(e) {
  renderReservationsList(e.target.value.toLowerCase().trim());
}

function renderReservationsList(searchQuery = '') {
  const container = document.getElementById('reservationsGrid');
  if (!container) return;

  const all = APP_STATE.bookings;

  document.getElementById('countResAll').textContent = all.length;
  document.getElementById('countResUpcoming').textContent = all.filter(b => b.status === 'Confirmed').length;
  document.getElementById('countResActive').textContent = all.filter(b => b.status === 'Active').length;
  document.getElementById('countResCompleted').textContent = all.filter(b => b.status === 'Completed').length;
  document.getElementById('countResCancelled').textContent = all.filter(b => b.status === 'Cancelled').length;

  let filtered = all;

  if (APP_STATE.resFilter !== 'all') {
    filtered = filtered.filter(b => b.status.toLowerCase() === APP_STATE.resFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(b => 
      b.id.toLowerCase().includes(searchQuery) ||
      b.spaceType.toLowerCase().includes(searchQuery) ||
      b.seatNum.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-panel">
        <div class="empty-state-icon">📋</div>
        <h4 class="empty-state-title">No Reservations Found</h4>
        <p class="empty-state-desc">There are no bookings matching your selected filter. Book a new desk or cabin anytime.</p>
        <button class="btn-primary" onclick="switchTab('book')">Book a Space Now</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(b => `
    <article class="reservation-card">
      <div class="res-card-thumb">
        <img src="${b.image}" alt="${escapeHtml(b.spaceType)}" onerror="this.onerror=null;this.src='assets/open-desk.jpg';">
      </div>
      <div class="res-card-info">
        <div class="res-card-top">
          <span class="res-card-id">${escapeHtml(b.id)}</span>
          <span class="upcoming-badge badge-${b.status.toLowerCase()}">${escapeHtml(b.status)}</span>
        </div>
        <h3 class="res-card-title">${escapeHtml(b.spaceType)}</h3>
        <div class="res-card-meta-row">
          <span>📅 ${escapeHtml(b.dateFormatted || b.date)}</span>
          <span>🕒 ${escapeHtml(b.timeSlot)}</span>
          <span>📍 ${escapeHtml(b.seatNum)}</span>
          <span>💵 $${b.total ? b.total.toFixed(2) : b.price.toFixed(2)} (Paid)</span>
        </div>
      </div>
      <div class="res-card-actions">
        ${renderReservationActionButtons(b)}
      </div>
    </article>
  `).join('');
}

function renderReservationActionButtons(booking) {
  if (booking.status === 'Confirmed') {
    return `
      <button class="btn-sm-action" onclick="openBookingDetailsModal('${booking.id}')">View Pass</button>
      <button class="btn-sm-action" onclick="openRescheduleModal('${booking.id}')">Reschedule</button>
      <button class="btn-sm-action btn-sm-danger" onclick="openCancelModal('${booking.id}')">Cancel</button>
    `;
  } else if (booking.status === 'Active') {
    return `
      <button class="btn-sm-action" onclick="openBookingDetailsModal('${booking.id}')">Active Pass</button>
      <button class="btn-sm-action" onclick="showToast('Your session is checked in at ${booking.seatNum}', 'info')">Check-In Info</button>
    `;
  } else if (booking.status === 'Completed') {
    return `
      <button class="btn-sm-action" onclick="openBookingDetailsModal('${booking.id}')">View Details</button>
      <button class="btn-sm-action" onclick="openInvoiceModal('${booking.invoiceId}')">View Invoice</button>
    `;
  } else {
    return `
      <button class="btn-sm-action" onclick="showToast('This booking was cancelled and credited to your account.', 'info')">Cancelled Info</button>
    `;
  }
}

function openRescheduleModal(bookingId) {
  const booking = APP_STATE.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const modal = document.getElementById('rescheduleModal');
  const idInput = document.getElementById('rescheduleBookingId');
  const dateInput = document.getElementById('rescheduleDateInput');
  const intro = document.getElementById('rescheduleModalIntro');

  if (idInput) idInput.value = bookingId;
  if (intro) intro.innerHTML = `Choose a new date and time for <strong>${booking.spaceType} (${booking.id})</strong>.`;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  if (dateInput) {
    dateInput.value = tomorrowStr;
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  handleRescheduleDateChange();
  openModal('rescheduleModal');
}

function handleRescheduleDateChange() {
  const grid = document.getElementById('rescheduleSlotsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const slots = ['08:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '01:00 PM – 03:00 PM', '03:00 PM – 05:00 PM'];

  slots.forEach((s, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `time-slot-btn ${idx === 0 ? 'selected' : ''}`;
    btn.innerHTML = `<span>${s}</span><span class="slot-status">Available</span>`;
    btn.onclick = () => {
      document.querySelectorAll('#rescheduleSlotsGrid .time-slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    grid.appendChild(btn);
  });
}

function confirmReschedule() {
  const bookingId = document.getElementById('rescheduleBookingId').value;
  const newDate = document.getElementById('rescheduleDateInput').value;
  const selectedSlotBtn = document.querySelector('#rescheduleSlotsGrid .time-slot-btn.selected');

  if (!newDate || !selectedSlotBtn) {
    showToast('Please select a valid date and time slot.', 'error');
    return;
  }

  const slotStr = selectedSlotBtn.querySelector('span').textContent;
  const booking = APP_STATE.bookings.find(b => b.id === bookingId);

  if (booking) {
    booking.date = newDate;
    booking.dateFormatted = newDate;
    booking.timeSlot = slotStr;
    syncStorage();

    APP_STATE.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'booking',
      message: `Reservation ${bookingId} has been rescheduled to ${newDate} (${slotStr}).`,
      time: 'Just now',
      unread: true
    });

    renderAllViews();
    closeModal('rescheduleModal');
    showToast(`Booking ${bookingId} rescheduled successfully!`, 'success');
  }
}

function openCancelModal(bookingId) {
  const booking = APP_STATE.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const targetInput = document.getElementById('cancelTargetBookingId');
  const prompt = document.getElementById('cancelBookingPrompt');

  if (targetInput) targetInput.value = bookingId;
  if (prompt) prompt.innerHTML = `Are you sure you want to cancel booking <strong>${booking.id}</strong> (${booking.spaceType})?`;

  openModal('cancelBookingModal');
}

function confirmCancelBooking() {
  const bookingId = document.getElementById('cancelTargetBookingId').value;
  const booking = APP_STATE.bookings.find(b => b.id === bookingId);

  if (booking) {
    booking.status = 'Cancelled';
    syncStorage();

    APP_STATE.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'booking',
      message: `Booking ${bookingId} cancelled. A 100% credit was issued to your account.`,
      time: 'Just now',
      unread: true
    });

    renderAllViews();
    closeModal('cancelBookingModal');
    showToast(`Booking ${bookingId} has been cancelled.`, 'info');
  }
}

function scrollToAvailablePlans() {
  const section = document.getElementById('availablePlansSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function selectPlanToUpgrade(planId, planName, planRate) {
  openPlanModal('upgrade', planId, planName, planRate);
}

function openPlanModal(action, planId = 'monthly-membership', planName = 'Monthly Membership', planRate = '$180/month') {
  const title = document.getElementById('membershipModalTitle');
  const body = document.getElementById('membershipModalBody');
  const confirmBtn = document.getElementById('confirmPlanBtn');

  if (action === 'renew') {
    if (title) title.textContent = 'Renew Current Membership';
    if (body) {
      body.innerHTML = `
        <div style="font-size:14px; line-height:1.6; color:var(--text-main);">
          <p>You are about to renew your <strong>${APP_STATE.user.plan}</strong> subscription.</p>
          <div style="background:var(--bg-surface-elevated); padding:16px; border-radius:8px; margin:16px 0; border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>Renewal Rate:</span>
              <strong>$180.00 / month</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>New Expiration Date:</span>
              <strong>January 01, 2027</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Payment Method:</span>
              <span>Visa •••• 4242</span>
            </div>
          </div>
          <p style="font-size:12px; color:var(--text-muted);">An itemized payment invoice will be immediately added to your Invoices tab.</p>
        </div>
      `;
    }
    if (confirmBtn) {
      confirmBtn.innerHTML = '<span>Confirm Renewal</span>';
      confirmBtn.onclick = () => processPlanUpdate(APP_STATE.user.plan, 180.00, 'Renewal');
    }
  } else {
    if (title) title.textContent = `Upgrade to ${planName}`;
    const priceNum = parseFloat(planRate.replace(/[^0-9.]/g, '')) || 180;
    if (body) {
      body.innerHTML = `
        <div style="font-size:14px; line-height:1.6; color:var(--text-main);">
          <p>Switch your membership from <strong>${APP_STATE.user.plan}</strong> to <strong>${planName}</strong> (${planRate}).</p>
          <div style="background:var(--bg-surface-elevated); padding:16px; border-radius:8px; margin:16px 0; border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>New Plan:</span>
              <strong>${planName}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>Rate:</span>
              <strong>${planRate}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Prorated Adjustment:</span>
              <strong class="text-terracotta">Applied to Invoice</strong>
            </div>
          </div>
          <p style="font-size:12px; color:var(--text-muted);">Your digital keycard and campus privileges will be updated automatically.</p>
        </div>
      `;
    }
    if (confirmBtn) {
      confirmBtn.innerHTML = '<span>Confirm Plan Switch</span>';
      confirmBtn.onclick = () => processPlanUpdate(planName, priceNum, 'Plan Upgrade');
    }
  }

  openModal('membershipModal');
}

function processPlanUpdate(newPlanName, amount, actionType) {
  APP_STATE.user.plan = newPlanName;
  
  const newInvId = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
  const tax = amount * 0.085;
  const total = amount + tax;

  APP_STATE.invoices.unshift({
    id: newInvId,
    reference: `MEM-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    dueDate: 'Paid on Receipt',
    description: `${newPlanName} – ${actionType}`,
    amount: amount,
    tax: tax,
    total: total,
    paymentMethod: 'Visa •••• 4242',
    status: 'Paid',
    authCode: `AUTH-${Math.floor(10000 + Math.random() * 90000)}`
  });

  APP_STATE.notifications.unshift({
    id: `notif-${Date.now()}`,
    type: 'membership',
    message: `Membership updated to ${newPlanName}. Invoice ${newInvId} generated.`,
    time: 'Just now',
    unread: true
  });

  syncStorage();
  updateUserInterface();
  renderAllViews();
  closeModal('membershipModal');
  showToast(`Membership successfully updated to ${newPlanName}!`, 'success');
}

function renderMembershipHistory() {
  const tbody = document.getElementById('membershipHistoryTable');
  if (!tbody) return;

  const history = [
    { date: 'Nov 01, 2026', plan: 'Pro Dedicated Desk', period: 'Nov 01 – Nov 30, 2026', amount: '$180.00', status: 'Active', invId: 'INV-2026-081' },
    { date: 'Oct 01, 2026', plan: 'Pro Dedicated Desk', period: 'Oct 01 – Oct 31, 2026', amount: '$180.00', status: 'Settled', invId: 'INV-2026-052' },
    { date: 'Sep 01, 2026', plan: 'Monthly Membership', period: 'Sep 01 – Sep 30, 2026', amount: '$180.00', status: 'Settled', invId: 'INV-2026-031' }
  ];

  tbody.innerHTML = history.map(h => `
    <tr>
      <td>${h.date}</td>
      <td><strong>${h.plan}</strong></td>
      <td>${h.period}</td>
      <td><strong>${h.amount}</strong></td>
      <td><span class="status-pill-paid">${h.status}</span></td>
      <td>
        <button class="btn-sm-action" onclick="openInvoiceModal('${h.invId}')">View</button>
      </td>
    </tr>
  `).join('');
}

function filterInvoices(filter) {
  APP_STATE.invFilter = filter;

  document.querySelectorAll('[data-inv-filter]').forEach(btn => {
    if (btn.getAttribute('data-inv-filter') === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderInvoicesList();
}

function handleInvoiceSearch(e) {
  renderInvoicesList(e.target.value.toLowerCase().trim());
}

function renderInvoicesList(searchQuery = '') {
  const tbody = document.getElementById('invoicesTableBody');
  if (!tbody) return;

  const all = APP_STATE.invoices;

  document.getElementById('countInvAll').textContent = all.length;
  document.getElementById('countInvPaid').textContent = all.filter(i => i.status === 'Paid').length;
  document.getElementById('countInvPending').textContent = all.filter(i => i.status === 'Pending').length;
  document.getElementById('countInvRefunded').textContent = all.filter(i => i.status === 'Refunded').length;

  let filtered = all;

  if (APP_STATE.invFilter !== 'all') {
    filtered = filtered.filter(i => i.status.toLowerCase() === APP_STATE.invFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(i => 
      i.id.toLowerCase().includes(searchQuery) ||
      i.reference.toLowerCase().includes(searchQuery) ||
      i.description.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 32px; color: var(--text-muted);">
          No invoices found matching your criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(inv => `
    <tr>
      <td><strong>${escapeHtml(inv.id)}</strong></td>
      <td><span style="font-size:12px; color:var(--color-terracotta);">${escapeHtml(inv.reference)}</span></td>
      <td>${escapeHtml(inv.date)}</td>
      <td>${escapeHtml(inv.description)}</td>
      <td><strong>$${inv.total ? inv.total.toFixed(2) : inv.amount.toFixed(2)}</strong></td>
      <td><span class="status-pill-${inv.status.toLowerCase()}">${escapeHtml(inv.status)}</span></td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="btn-sm-action" onclick="openInvoiceModal('${inv.id}')">View</button>
        <button class="btn-sm-action" onclick="quickPrintInvoice('${inv.id}')" title="Download Printable PDF">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

function openInvoiceModal(invId) {
  let inv = APP_STATE.invoices.find(i => i.id === invId);
  if (!inv) {
    inv = APP_STATE.invoices[0];
  }

  const container = document.getElementById('invoicePrintArea');
  if (!container) return;

  const subtotal = inv.amount || 20;
  const tax = inv.tax || subtotal * 0.085;
  const total = inv.total || (subtotal + tax);

  container.innerHTML = `
    <div class="inv-brand-row">
      <div class="inv-brand-left">
        <h2>WORKSPACE HUB</h2>
        <p>
          Flagship Innovation Campus • Suite 400<br>
          742 Innovation Way, Metro City, 94105<br>
          Tax ID: US-8849201-WH • Phone: +1 (800) 849-9675
        </p>
      </div>
      <div class="inv-brand-right">
        <div class="inv-badge-paid">${escapeHtml(inv.status)}</div>
      </div>
    </div>

    <div class="inv-meta-grid">
      <div class="inv-block">
        <strong>Billed To:</strong>
        <p>
          <strong>${escapeHtml(APP_STATE.user.name)}</strong><br>
          ${escapeHtml(APP_STATE.user.company || 'Member Studio')}<br>
          ${escapeHtml(APP_STATE.user.email)}<br>
          Phone: ${escapeHtml(APP_STATE.user.phone || '+1 (555) 389-2041')}
        </p>
      </div>
      <div class="inv-block">
        <strong>Invoice Details:</strong>
        <p>
          Invoice Number: <strong>${escapeHtml(inv.id)}</strong><br>
          Reference ID: <strong>${escapeHtml(inv.reference)}</strong><br>
          Issue Date: <strong>${escapeHtml(inv.date)}</strong><br>
          Payment Method: <strong>${escapeHtml(inv.paymentMethod || 'Visa •••• 4242')}</strong>
        </p>
      </div>
    </div>

    <table class="inv-items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: right;">Rate / Period</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${escapeHtml(inv.description)}</strong><br>
            <span style="font-size: 11.5px; color: #526174;">Access PIN Code authorized • Full campus amenities included</span>
          </td>
          <td style="text-align: right;">$${subtotal.toFixed(2)}</td>
          <td style="text-align: right;">$${subtotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <div class="inv-totals-wrap">
      <div class="inv-totals-box">
        <div class="inv-total-row">
          <span>Subtotal:</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="inv-total-row">
          <span>City Commercial Tax (8.5%):</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="inv-total-row grand-total">
          <strong>Total Paid:</strong>
          <strong>$${total.toFixed(2)} USD</strong>
        </div>
      </div>
    </div>

    <div class="inv-footer-note">
      <p>
        Payment processed successfully on ${escapeHtml(inv.date)}. Transaction Auth Code: <code>${escapeHtml(inv.authCode || 'AUTH-77319')}</code>.<br>
        Thank you for being a valued Workspace Hub member. For billing inquiries, contact <code>billing@workspacehub.com</code>.
      </p>
    </div>
  `;

  openModal('invoiceModal');
}

function quickPrintInvoice(invId) {
  openInvoiceModal(invId);
  setTimeout(() => {
    downloadInvoicePDF();
  }, 300);
}

function downloadInvoicePDF() {
  window.print();
}

function handleProfileUpdate(e) {
  e.preventDefault();
  const name = document.getElementById('profFullName').value.trim();
  const email = document.getElementById('profEmail').value.trim();
  const phone = document.getElementById('profPhone').value.trim();
  const company = document.getElementById('profCompany').value.trim();

  if (!name || !email) {
    showToast('Name and email are required fields.', 'error');
    return;
  }

  APP_STATE.user.name = name;
  APP_STATE.user.email = email;
  APP_STATE.user.phone = phone;
  APP_STATE.user.company = company;

  syncStorage();
  updateUserInterface();
  showToast('Profile information successfully saved.', 'success');
}

function cycleAvatar() {
  const avatars = ['assets/user-1.jpg', 'assets/user-2.jpg', 'assets/user-3.jpg', 'assets/user-4.jpg'];
  const currentIdx = avatars.indexOf(APP_STATE.user.avatar);
  const nextIdx = (currentIdx + 1) % avatars.length;
  
  APP_STATE.user.avatar = avatars[nextIdx];
  syncStorage();
  updateUserInterface();
  showToast('Profile avatar updated.', 'info');
}

function handlePasswordUpdate(e) {
  e.preventDefault();
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;

  if (newPass.length < 8) {
    showToast('New password must have at least 8 characters.', 'error');
    return;
  }

  if (newPass !== confirmPass) {
    showToast('New password and confirmation do not match.', 'error');
    return;
  }

  document.getElementById('profileSecurityForm').reset();
  showToast('Password successfully updated!', 'success');
}

function openBookingDetailsModal(bookingId) {
  const b = APP_STATE.bookings.find(item => item.id === bookingId);
  if (!b) return;

  const body = document.getElementById('bookingDetailsModalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="confirmed-pass-card" style="margin: 0; box-shadow: none;">
      <div class="pass-header">
        <div>
          <span class="pass-label">DIGITAL PASS • ${escapeHtml(b.status.toUpperCase())}</span>
          <h3 class="pass-ref">${escapeHtml(b.id)}</h3>
        </div>
        <div class="pass-qr-box" style="text-align: right;">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="14.01"/><line x1="14" y1="17" x2="14" y2="20"/><line x1="17" y1="14" x2="20" y2="14"/><line x1="20" y1="17" x2="20" y2="20"/></svg>
        </div>
      </div>
      <div class="pass-body">
        <div class="pb-row">
          <span>Member Name:</span>
          <strong>${escapeHtml(APP_STATE.user.name)}</strong>
        </div>
        <div class="pb-row">
          <span>Workspace Type:</span>
          <strong>${escapeHtml(b.spaceType)}</strong>
        </div>
        <div class="pb-row">
          <span>Scheduled Date:</span>
          <strong>${escapeHtml(b.dateFormatted || b.date)}</strong>
        </div>
        <div class="pb-row">
          <span>Time Slot:</span>
          <strong>${escapeHtml(b.timeSlot)}</strong>
        </div>
        <div class="pb-row">
          <span>Assigned Seat / Cabin:</span>
          <strong>${escapeHtml(b.seatNum)}</strong>
        </div>
        <div class="pb-row">
          <span>Keycard Door PIN:</span>
          <strong class="text-terracotta" style="font-size: 16px;">#${escapeHtml(b.accessPin || '8849')}</strong>
        </div>
      </div>
    </div>
    <div style="font-size: 12px; color: var(--text-muted); margin-top: 14px; text-align: center;">
      Hold your phone NFC near the door lock or enter your 4-digit PIN at the keypad upon arrival.
    </div>
  `;

  openModal('bookingDetailsModal');
}

function printPass() {
  window.print();
}

function renderNotificationsList() {
  const container = document.getElementById('notificationsList');
  const badge = document.getElementById('notificationBadge');
  if (!container) return;

  const unreadCount = APP_STATE.notifications.filter(n => n.unread).length;
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  container.innerHTML = APP_STATE.notifications.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markNotificationRead('${n.id}')">
      <div class="notif-item-icon ${getNotifIconClass(n.type)}">
        ${getNotifIcon(n.type)}
      </div>
      <div class="notif-item-content">
        <div class="notif-item-msg">${escapeHtml(n.message)}</div>
        <div class="notif-item-time">${escapeHtml(n.time)}</div>
      </div>
    </div>
  `).join('');
}

function getNotifIcon(type) {
  if (type === 'booking') return '📅';
  if (type === 'invoice') return '💳';
  if (type === 'membership') return '⭐';
  return '🔔';
}

function getNotifIconClass(type) {
  if (type === 'booking') return 'icon-aqua';
  if (type === 'invoice') return 'icon-terracotta';
  if (type === 'membership') return 'icon-brown';
  return 'icon-dark';
}

function markAllNotificationsRead() {
  APP_STATE.notifications.forEach(n => n.unread = false);
  syncStorage();
  renderNotificationsList();
  showToast('All notifications marked as read', 'info');
}

function markNotificationRead(notifId) {
  const notif = APP_STATE.notifications.find(n => n.id === notifId);
  if (notif) {
    notif.unread = false;
    syncStorage();
    renderNotificationsList();
  }
}

function toggleNotificationsPanel(e) {
  e.stopPropagation();
  closeProfileMenu();
  const panel = document.getElementById('notificationsPanel');
  if (panel) panel.classList.toggle('active');
}

function toggleProfileMenu(e) {
  e.stopPropagation();
  closeNotificationsPanel();
  const menu = document.getElementById('profileDropdown');
  if (menu) menu.classList.toggle('active');
}

function closeNotificationsPanel() {
  const panel = document.getElementById('notificationsPanel');
  if (panel) panel.classList.remove('active');
}

function closeProfileMenu() {
  const menu = document.getElementById('profileDropdown');
  if (menu) menu.classList.remove('active');
}

function initSidebarMobileDrawer() {
  const toggleBtn = document.getElementById('dashboardMobileToggle');
  const closeBtn = document.getElementById('sidebarCloseBtn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openSidebarDrawer);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebarDrawer);
  }
}

function openSidebarDrawer() {
  const sidebar = document.getElementById('dashboardSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebarDrawer() {
  const sidebar = document.getElementById('dashboardSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function openSupportModal() {
  openModal('supportModal');
}

function setupClickOutsideListeners() {
  document.addEventListener('click', () => {
    closeNotificationsPanel();
    closeProfileMenu();
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal.id);
      });
      closeNotificationsPanel();
      closeProfileMenu();
      closeSidebarDrawer();
    }
  });
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

  let icon = '🔔';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '✕';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-msg">${escapeHtml(message)}</div>
    <button class="toast-close-btn" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
