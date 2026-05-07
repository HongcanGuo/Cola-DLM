# Cola DLM — Project Page

Static project page for **Continuous Latent Diffusion Language Model (Cola DLM)**, ByteDance Seed.
Deployed as the entire content of `cola-dlm.github.io` (or any other GitHub Pages
host) — fully self-contained, no build step.

## Layout

```
.
├─ index.html                 # the whole page
├─ .nojekyll                  # disable Jekyll on GitHub Pages
└─ static/
   ├─ css/index.css           # custom styling
   ├─ js/index.js             # sticky-nav, scroll reveals, lightbox,
   │                          # BibTeX copy, back-to-top, afterword toggle
   └─ images/                 # paper figures (SVG vectors + high-DPI PNGs)
      └─ unified/             # 39 text-to-image samples (lightbox gallery)
```

## Local preview

```bash
python3 -m http.server 8000
open http://localhost:8000
```

## Deploy to GitHub Pages

```bash
# inside the proj_page directory
git init -b main
git remote add origin git@github.com:<ORG-OR-USER>/cola-dlm.github.io.git
git add .
git commit -m "Cola DLM project page"
git push -u origin main
```

For a `<user>.github.io` or `<org>.github.io` repository, GitHub Pages serves
`index.html` from the root of `main` automatically — usually live within a minute.

## Updating the page later

The page is intentionally trivial to update — open `index.html` and edit
strings in place.

### When the arXiv link is ready

In `index.html`, find these two `<a>` blocks (Paper and arXiv) inside
`<div class="publication-links">`:

```html
<a class="btn is-soft" href="#" title="Paper link will be added once arXiv is live">
```

Replace each with the live link, drop the `is-soft` class (so the button is no
longer treated as disabled), and remove the inner
`<span class="coming-soon-badge">Soon</span>`. Example:

```html
<a class="btn" href="https://arxiv.org/abs/XXXX.XXXXX" target="_blank" rel="noopener">
  <span class="icon"><i class="ai ai-arxiv"></i></span>
  <span>arXiv</span>
</a>
```

### When code & model go live

The Code and Model buttons already point at the right URLs. Just remove their
`<span class="coming-soon-badge">Soon</span>` to drop the orange "SOON" pill.

### Update BibTeX

In the `#bibtex` section (search for `arXiv:XXXX.XXXXX`), replace the placeholder
`eprint`, `journal`, and `year` fields with the final values.

## Credits

Page styling adapted from the [Nerfies](https://nerfies.github.io/) /
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template).
