document.addEventListener('DOMContentLoaded', () => {
  initHome2MockupInteractions();
});

function switchToHome2(e) {
  if (e) e.preventDefault();
  showToast('Switched to Home 2: Interactive Grid View');
  const spacesSec = document.getElementById('spaces');
  if (spacesSec) {
    spacesSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function initHome2MockupInteractions() {
  const mockupPills = document.querySelectorAll('.mockup-pill');
  const dateChips = document.querySelectorAll('.mockup-date-chip');
  const slotChips = document.querySelectorAll('.slot-chip');
  const summaryLine = document.querySelector('.mockup-summary-line');

  let currentRate = 5;
  let currentZone = 'Desk #14 (Silent Study)';

  mockupPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      mockupPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (idx === 0) {
        currentRate = 5;
        currentZone = 'Desk #14 (Silent Study)';
      } else if (idx === 1) {
        currentRate = 18;
        currentZone = 'Private Cabin 04';
      } else {
        currentRate = 35;
        currentZone = 'Meeting Suite 01';
      }
      updateMockupSummary();
    });
  });

  dateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dateChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  slotChips.forEach(slot => {
    slot.addEventListener('click', () => {
      slotChips.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
    });
  });

  function updateMockupSummary() {
    if (summaryLine) {
      const total = (currentRate * 4).toFixed(2);
      summaryLine.innerHTML = `
        <span>Zone: ${currentZone}</span>
        <strong>$${total} (4 hrs)</strong>
      `;
    }
  }
}
