/* ============================================================
   HIROKI ICHINOSE — Site JavaScript
   ============================================================ */

const ARCHIVE_PASSWORD = 'hiroki';

// ---- Page routing ----

function showPage(id, updateHistory = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');

  const navLink = document.getElementById('nav-' + id);
  if (navLink) navLink.classList.add('active');

  // Close mobile nav
  document.querySelector('.nav-links').classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'instant' });

  if (updateHistory) {
    history.pushState({ page: id }, '', '#' + id);
  }
}

// Handle back/forward
window.addEventListener('popstate', (e) => {
  const id = e.state?.page || 'home';
  showPage(id, false);
});

// Initial load — read hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '') || 'home';
  const validPages = ['home', 'about', 'film', 'stage', 'past', 'archive'];
  showPage(validPages.includes(hash) ? hash : 'home', false);
});

// ---- Mobile nav toggle ----

function toggleMobileNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ---- Archive password ----

function checkPassword() {
  const input = document.getElementById('pw-input');
  const error = document.getElementById('pw-error');

  if (input.value === ARCHIVE_PASSWORD) {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('archive-content').style.display = 'block';
    error.style.display = 'none';
    input.value = '';
  } else {
    error.style.display = 'block';
    input.value = '';
    input.focus();
    // Shake animation
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
  }
}

function lockArchive() {
  document.getElementById('lock-screen').style.display = 'flex';
  document.getElementById('archive-content').style.display = 'none';
}

// ---- Archive filtering ----

function filterArchive(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.archive-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// ---- Password input: submit on Enter ----

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('pw-input') === document.activeElement) {
    checkPassword();
  }
});
