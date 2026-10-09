# Luxury Guest Experience Design — website

Static site (HTML + CSS + JS). No build step, no dependencies. Works on GitHub Pages as-is.

```
index.html      page content (Greek source text)
css/style.css   design + colours (see :root at the top)
js/main.js      3D scroll scene, before/after, calculator, contact form
js/i18n.js      EL/EN switch — English texts live in the EN table
assets/         images (banner (clean photo, the title is live text in index.html), logo, before/after, ritual photos)
```

## Preview locally
    python3 -m http.server 8000      # Windows: py -m http.server 8000
then open http://localhost:8000

## Publish on GitHub Pages
1. Create a repository (e.g. `luxury-experience`) and upload **the contents of this folder** to its root
   (index.html must be at the top level, not inside a subfolder).
2. Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
3. After ~1 minute: https://YOUR-USERNAME.github.io/luxury-experience/
   (Own domain? Settings → Pages → Custom domain.)

## Contact form — one-time activation (important)
The form posts to the free service FormSubmit and delivers to **michaelmarianna25@gmail.com**.
1. Once the site is live, open it and send ONE test message from the form.
2. FormSubmit emails michaelmarianna25@gmail.com an "Activate form" link — click it (check spam).
3. From then on every message arrives in that inbox. Until activated, messages are not delivered.
To change the recipient, edit the address in the `<form action=...>` line of index.html.

## Language
Default follows the visitor's browser (Greek browsers → Greek, others → English); the choice is remembered.
Force a language with `?lang=en` or `?lang=el` at the end of the link (handy for email campaigns).
To change an English text, edit its number in the EN table in js/i18n.js.
