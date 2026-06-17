/* ============================================================
   HIROKI ICHINOSE — Site JavaScript
   ============================================================ */

const ARCHIVE_PASSWORD = 'hiroki';

// All known pages (main + work details)
const MAIN_PAGES = ['home', 'about', 'film', 'stage', 'past', 'archive'];
const WORK_PAGES = ['red-fate', 'upcoming-ane-brun', 'red', 'lay-him-quietly', 'together-we-cry', 'margot'];
const ALL_PAGES  = [...MAIN_PAGES, ...WORK_PAGES];

// ---- Page routing ----

function showPage(id, updateHistory = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');

  const navLink = document.getElementById('nav-' + id);
  if (navLink) navLink.classList.add('active');

  // Highlight parent nav for work detail pages
  if (WORK_PAGES.includes(id)) {
    const parent = getParentPage(id);
    const parentLink = document.getElementById('nav-' + parent);
    if (parentLink) parentLink.classList.add('active');
  }

  document.querySelector('.nav-links').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (updateHistory) {
    history.pushState({ page: id }, '', '#' + id);
  }
}

function showWork(workId) {
  showPage(workId);
}

function getParentPage(workId) {
  const filmWorks  = ['red-fate', 'upcoming-ane-brun'];
  const stageWorks = ['red', 'lay-him-quietly'];
  const pastWorks  = ['together-we-cry', 'margot'];
  if (filmWorks.includes(workId))  return 'film';
  if (stageWorks.includes(workId)) return 'stage';
  if (pastWorks.includes(workId))  return 'past';
  return 'home';
}

// Handle back/forward
window.addEventListener('popstate', (e) => {
  const id = e.state?.page || 'home';
  showPage(ALL_PAGES.includes(id) ? id : 'home', false);
});

// Initial load
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '') || 'home';
  showPage(ALL_PAGES.includes(hash) ? hash : 'home', false);
});

// ---- Mobile nav ----

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
  }
}

function lockArchive() {
  document.getElementById('lock-screen').style.display = 'flex';
  document.getElementById('archive-content').style.display = 'none';
}

// Enter key on password field
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('pw-input') === document.activeElement) {
    checkPassword();
  }
});

// ---- Archive filtering ----

function filterArchive(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.archive-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
  });
}
