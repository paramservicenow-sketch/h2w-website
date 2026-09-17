# H2W Home Care & Hospitality — Website

Static website (HTML + CSS + vanilla JS) for H2W Home Care & H2W Hospitality,
based in Gaur City, Shahberi, Greater Noida — serving Delhi NCR.

- Enquiry form prepares a WhatsApp message client-side. No backend, no data collection.
- Deployed via Cloudflare Pages (build command: none, output directory: `/`).

## Files
- `index.html` — single-page site
- `styles.css` — styles
- `site.js` — enquiry form logic (home/business modes, validation, WhatsApp deep link)
- `test_site.py` — Playwright checks used before release (not required at runtime)
