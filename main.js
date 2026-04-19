/* ═══════════════════════════════════════════
   FARAH & MARWAN — Main JS
   ═══════════════════════════════════════════ */

/* ────────── Countdown Timer ────────── */
(function () {
  const weddingDate = new Date('2026-05-29T19:00:00');

  const pad = n => String(n).padStart(2, '0');

  function updateCountdown () {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent  = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

/* ────────── Scroll Reveal ────────── */
(function () {
  const revealEls  = document.querySelectorAll('.reveal');
  const revealUpEls = document.querySelectorAll('.reveal-up');

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => observer.observe(el));

  // Staggered children — observe their parent section, then apply when parent visible
  const upObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.reveal-up');
        children.forEach(child => child.classList.add('visible'));
        upObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.story__timeline, .details__cards').forEach(el => {
    upObserver.observe(el);
  });
})();

/* ────────── Smooth-scroll nav ────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
