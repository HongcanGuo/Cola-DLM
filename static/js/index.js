/* Cola DLM project page — interactive layer */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Sticky-nav scroll state ---- */
  const nav = document.querySelector('.topnav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
    if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- 2. Reveal-on-scroll ---- */
  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('is-in'));
  }

  /* ---- 3. Disabled-link guard ---- */
  document.querySelectorAll('.btn.is-soft, a.is-soft').forEach((el) => {
    el.addEventListener('click', (e) => e.preventDefault());
  });

  /* ---- 4. BibTeX copy ---- */
  const copyBtn = document.querySelector('.bibtex-block .copy-btn');
  const bibtexEl = document.querySelector('.bibtex-block pre');
  if (copyBtn && bibtexEl) {
    copyBtn.addEventListener('click', async () => {
      const original = copyBtn.innerText;
      try {
        await navigator.clipboard.writeText(bibtexEl.innerText.trim());
        copyBtn.innerText = 'Copied!';
      } catch (e) {
        copyBtn.innerText = 'Press Cmd/Ctrl+C';
      }
      setTimeout(() => (copyBtn.innerText = original), 1500);
    });
  }

  /* ---- 5. Back to top ---- */
  const toTop = document.querySelector('.back-to-top');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 6. Lightbox for unified gallery ---- */
  const tiles = Array.from(document.querySelectorAll('.unified-gallery .tile'));
  const lb = document.querySelector('.lightbox');
  if (tiles.length && lb) {
    const lbImg = lb.querySelector('img');
    const lbCounter = lb.querySelector('.lb-counter');
    const btnPrev = lb.querySelector('.lb-prev');
    const btnNext = lb.querySelector('.lb-next');
    const btnClose = lb.querySelector('.lb-close');

    const sources = tiles.map((t) => t.querySelector('img').getAttribute('data-full') || t.querySelector('img').src);
    let idx = 0;

    const open = (i) => {
      idx = (i + sources.length) % sources.length;
      lbImg.src = sources[idx];
      lbCounter.textContent = `${idx + 1} / ${sources.length}`;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lb.classList.remove('is-open');
      lbImg.src = '';
      document.body.style.overflow = '';
    };

    tiles.forEach((t, i) => t.addEventListener('click', () => open(i)));

    btnPrev.addEventListener('click', (e) => { e.stopPropagation(); open(idx - 1); });
    btnNext.addEventListener('click', (e) => { e.stopPropagation(); open(idx + 1); });
    btnClose.addEventListener('click', (e) => { e.stopPropagation(); close(); });

    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target === lbImg) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') open(idx - 1);
      else if (e.key === 'ArrowRight') open(idx + 1);
    });
  }

  /* ---- 7. Afterword expand / collapse ---- */
  const aPassage = document.getElementById('afterwordPassage');
  const aToggle  = document.getElementById('afterwordToggle');
  if (aPassage && aToggle) {
    aToggle.addEventListener('click', () => {
      const willExpand = !aPassage.classList.contains('expanded');
      aPassage.classList.toggle('expanded', willExpand);
      aToggle.setAttribute('aria-expanded', String(willExpand));
      if (!willExpand) {
        // Smoothly scroll the passage back into view when collapsing
        aPassage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* prime initial state */
  onScroll();
});
