/* ==========================================================================
   ACADEMIC PORTFOLIO INTERACTIVE JAVASCRIPT ENGINE
   Professor Anh L. Tran | Bayes Business School
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initPublicationsFilter();
  initCoursesFilter();
  initBibtexModal();
  initContactForm();
  initBackToTop();
  initActiveSectionHighlight();
});

/* --------------------------------------------------------------------------
   1. Dark / Light Theme Toggle & Persistence
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });
}

/* --------------------------------------------------------------------------
   2. Accessible Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    } else {
      navMenu.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
    }
  });

  // Close menu when clicking outside or pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Real-Time Publications Filtering & Search
   -------------------------------------------------------------------------- */
function initPublicationsFilter() {
  const searchInput = document.getElementById('pub-search');
  const filterTabs = document.querySelectorAll('.pub-filter-tab');
  const pubCards = document.querySelectorAll('.pub-card-wrapper');
  const emptyNotice = document.getElementById('pub-empty-notice');

  if (!pubCards.length) return;

  let activeTopic = 'all';
  let searchQuery = '';

  function filterCards() {
    let visibleCount = 0;

    pubCards.forEach((card) => {
      const topic = card.getAttribute('data-topic') || '';
      const text = card.textContent.toLowerCase();

      const matchesTopic = (activeTopic === 'all' || topic === activeTopic);
      const matchesSearch = text.includes(searchQuery.toLowerCase());

      if (matchesTopic && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterCards();
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeTopic = tab.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });
}

/* --------------------------------------------------------------------------
   4. Courses Filter System
   -------------------------------------------------------------------------- */
function initCoursesFilter() {
  const filterTabs = document.querySelectorAll('.course-filter-tab');
  const courseCards = document.querySelectorAll('.course-card-wrapper');

  if (!courseCards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const activeLevel = tab.getAttribute('data-filter') || 'all';

      courseCards.forEach((card) => {
        const level = card.getAttribute('data-level') || '';
        if (activeLevel === 'all' || level.toLowerCase().includes(activeLevel.toLowerCase())) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. BibTeX Citation Modal & Copy to Clipboard
   -------------------------------------------------------------------------- */
function initBibtexModal() {
  const modal = document.getElementById('bibtex-modal');
  const modalClose = document.getElementById('modal-close');
  const bibtexContent = document.getElementById('bibtex-content');
  const copyBtn = document.getElementById('copy-bibtex-btn');
  const triggerBtns = document.querySelectorAll('.btn-bibtex');

  if (!modal) return;

  let lastFocusedElement = null;

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      lastFocusedElement = document.activeElement;
      const rawBibtex = btn.getAttribute('data-bibtex') || '';
      if (bibtexContent) {
        bibtexContent.textContent = rawBibtex;
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      if (modalClose) modalClose.focus();
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (copyBtn && bibtexContent) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtexContent.textContent).then(() => {
        showToast('BibTeX citation copied to clipboard!');
        closeModal();
      }).catch(() => {
        showToast('Failed to copy citation.');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('academic-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Reset errors
    document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));

    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'Please enter your name.');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showFieldError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showFieldError(messageInput, 'Please enter your message.');
      isValid = false;
    }

    if (isValid) {
      showToast('Thank you! Your message has been sent successfully.');
      form.reset();
    }
  });
}

function showFieldError(input, message) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --------------------------------------------------------------------------
   7. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   8. Active Section & Page Highlighting
   -------------------------------------------------------------------------- */
function initActiveSectionHighlight() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    } else if (currentPath === '/' && href === '/') {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   9. Toast Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}
