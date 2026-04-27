/* Reset Auto Details — Main JS */

// ── Navbar scroll ──────────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── Mobile hamburger ───────────────────────────────────────
const hamburger = document.querySelector('.navbar__hamburger');
const mobileMenu = document.querySelector('.navbar__mobile');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });
}

// ── Active nav link ────────────────────────────────────────
(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── FAQ accordion ──────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Smooth anchor scroll ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger && hamburger.classList.remove('active');
      }
    }
  });
});

// ── Quote form ─────────────────────────────────────────────
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = quoteForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Request Sent — We\'ll Be in Touch!';
    btn.style.background = '#2e7d32';
    btn.style.borderColor = '#2e7d32';
  });
}

// ── 10% OFF POPUP ──────────────────────────────────────────
(function() {
  const overlay = document.getElementById('discountPopup');
  if (!overlay) return;

  const dismissed = sessionStorage.getItem('rad_popup');

  function showPopup() {
    if (!dismissed) overlay.classList.add('open');
  }
  function closePopup() {
    overlay.classList.remove('open');
    sessionStorage.setItem('rad_popup', '1');
  }

  // Show after 5 seconds
  if (!dismissed) setTimeout(showPopup, 5000);

  // Exit intent (desktop)
  document.addEventListener('mouseleave', e => {
    if (e.clientY <= 0 && !sessionStorage.getItem('rad_popup')) showPopup();
  });

  // Close button
  const closeBtn = overlay.querySelector('.popup-close');
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Click backdrop to close
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });

  // Form submit
  const popupForm = document.getElementById('popupForm');
  if (popupForm) {
    popupForm.addEventListener('submit', e => {
      e.preventDefault();
      const card = overlay.querySelector('.popup-card');
      card.innerHTML = `
        <div style="padding:1rem 0">
          <div style="font-size:2.5rem;margin-bottom:1rem">&#127881;</div>
          <h2 style="color:var(--white);margin-bottom:.75rem">You're In!</h2>
          <p style="color:var(--grey-4);max-width:none">We'll reach out shortly to confirm your 10% discount. Talk soon!</p>
          <button onclick="document.getElementById('discountPopup').classList.remove('open')" class="btn btn--primary" style="margin-top:1.5rem;width:100%;justify-content:center">Close</button>
        </div>`;
      sessionStorage.setItem('rad_popup', '1');
    });
  }
})();

// ── GALLERY FILTER ─────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.gallery-filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galleryCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

// ── GALLERY BEFORE / AFTER TOGGLE ─────────────────────────
document.querySelectorAll('.gallery-toggle').forEach(toggle => {
  const btns = toggle.querySelectorAll('.gallery-toggle-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = toggle.closest('.gallery-card');
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const ph = card.querySelector('.gallery-img-ph');
      if (ph) ph.textContent = btn.dataset.state === 'before' ? 'Before Photo' : 'After Photo';
    });
  });
});

// ── SCROLL REVEAL ──────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .testimonial-card, .process-step, .why-item, .problem-card, .gallery-card, .tier-card, .referral-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});
