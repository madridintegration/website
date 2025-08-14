/* =============================================================
   script.js — Basic interactivity for the landing page
   -----------------------------------------------------
   WHAT YOU CAN SAFELY CHANGE:
   - Toast message text (inside showToast call or function).
   - Form validation message strings.
   - Add / remove buttons with data-action="add-to-cart" (used for demo toast).
   - You can delete a whole feature if you don't need it; remove its entire block.
   Avoid changing querySelector(...) unless you know why.
   ============================================================= */

// -------------------------------------------------------------
// Mobile nav toggle (shows / hides the menu on small screens)
// -------------------------------------------------------------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// -------------------------------------------------------------
// Smooth scroll for links starting with # (in-page navigation)
// Clicking a link like <a href="#about"> smoothly scrolls there.
// -------------------------------------------------------------
for (const a of document.querySelectorAll('a[href^="#"]')) {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#' || id.length < 2) return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
      if (navLinks?.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

// -------------------------------------------------------------
// Newsletter form (demo only — no backend)
// Validates a simple email pattern, shows a thank-you message.
// To connect to a real service, send 'email' to your API instead.
// -------------------------------------------------------------
const newsForm = document.getElementById('newsletter-form');
if (newsForm) {
  const emailInput = /** @type {HTMLInputElement|null} */ (newsForm.querySelector('#email'));
  const msg = newsForm.querySelector('.form-msg');
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput?.value.trim() || '';
    const valid = /.+@.+\..+/.test(email);
    if (!valid) {
      if (msg) msg.textContent = 'Please enter a valid email.';
      emailInput?.focus();
      return;
    }
    if (msg) msg.textContent = 'Thanks! Check your inbox to confirm.';
    newsForm.reset();
  });
}

// -------------------------------------------------------------
// Toast notification (small temporary popup)
// Used here for demo when clicking "Get Quote" buttons.
// Change default text by editing the showToast argument below.
// -------------------------------------------------------------
function showToast(text) {
  const toast = document.createElement('div');
  toast.textContent = text;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(17,24,39,.95)';
  toast.style.color = 'white';
  toast.style.border = '1px solid rgba(148,163,184,.3)';
  toast.style.padding = '10px 14px';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,.3)';
  toast.style.zIndex = '1000';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}

for (const btn of document.querySelectorAll('[data-action="add-to-cart"]')) {
  // Change the message below if you want different text
  btn.addEventListener('click', () => showToast('Request received!'));
}

// -------------------------------------------------------------
// Footer year auto-update (so you don't need to change it manually)
// -------------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// -------------------------------------------------------------
// Image fallback:
// If any remote image fails to load (e.g., network block), we hide
// the broken <img> and inject a subtle SVG gradient into the parent.
// You usually do NOT need to edit this. It keeps layout intact.
// -------------------------------------------------------------
(function setupImageFallbacks() {
  /** A dark gradient SVG placeholder (embedded) */
  const fallbackSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#0b1220"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1350" cy="120" r="280" fill="rgba(96,165,250,0.18)"/><circle cx="200" cy="780" r="260" fill="rgba(34,211,238,0.16)"/></svg>'
  )}`;

  const selectors = ['.hero-bg', '.cat-thumb img', '.product-thumb img'];
  const imgs = document.querySelectorAll(selectors.join(','));
  imgs.forEach((img) => {
    img.addEventListener('error', () => {
      img.style.display = 'none'; // hides broken icon
      const parent = img.parentElement;
      if (parent) {
        const prevBg = getComputedStyle(parent).backgroundImage;
        parent.style.backgroundImage = `url(${fallbackSvg})${prevBg && prevBg !== 'none' ? ',' + prevBg : ''}`;
        parent.style.backgroundSize = 'cover';
        parent.style.backgroundPosition = 'center';
      }
    }, { once: true }); // only handle first error
  });
})();
