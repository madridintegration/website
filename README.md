# ShopMate — Ecommerce Landing Page

A modern, responsive ecommerce landing page built with plain HTML, CSS, and JavaScript. No build tools required.

## Features
- Responsive header and mobile menu
- Hero section with CTAs
- Highlights (shipping, selection, security, support)
- Category cards and promo banner
- Featured products grid
- Testimonials and newsletter signup (client-side validation)
- Accessible skip link, focus styles, and ARIA labels

## Getting started
Open `index.html` in your browser.

### Optional: run a local server
If you prefer a local server (for routing or CORS-sensitive features):

- With Python (if installed):
```powershell
python -m http.server 8080
```
Then visit http://localhost:8080

- With VS Code Live Server: install the "Live Server" extension and click "Go Live".

## Customize
- Edit text/content in `index.html`.
- Tweak theme colors, spacing, or layout in `styles.css`.
- Adjust behavior (newsletter, toasts, nav) in `script.js`.

## Notes
- Product images use decorative gradients (no external assets). Replace `.p-img` backgrounds with real images as needed.
- This is a static demo; hook up real search/cart/newsletter backends when ready.
