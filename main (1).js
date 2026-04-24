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

/* ════════════════════════════════════════
   RSVP FORM
   ════════════════════════════════════════ */
(function () {
  const TABLE = 'rsvp';

  /* DOM refs */
  const form        = document.getElementById('rsvp-form');
  const successBox  = document.getElementById('rsvp-success');
  const successTitle = document.getElementById('rsvp-success-title');
  const successMsg  = document.getElementById('rsvp-success-msg');
  const againBtn    = document.getElementById('rsvp-again-btn');
  const submitBtn   = document.getElementById('rsvp-submit');
  const guestsField = document.getElementById('guests-field');
  const guestsInput = document.getElementById('rsvp-guests');
  const minusBtn    = document.getElementById('guests-minus');
  const plusBtn     = document.getElementById('guests-plus');
  const listEl      = document.getElementById('rsvp-list');
  const countEl     = document.getElementById('rsvp-count');

  if (!form) return; // guard

  /* ── Show / hide guests field based on attending radio ── */
  function getAttendingValue () {
    const checked = form.querySelector('input[name="attending"]:checked');
    return checked ? checked.value : null;
  }

  form.querySelectorAll('input[name="attending"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const val = getAttendingValue();
      if (val === 'yes') {
        guestsField.removeAttribute('hidden');
      } else {
        guestsField.setAttribute('hidden', '');
      }
    });
  });

  /* ── Stepper buttons ── */
  minusBtn.addEventListener('click', () => {
    const v = parseInt(guestsInput.value, 10);
    if (v > 1) guestsInput.value = v - 1;
  });
  plusBtn.addEventListener('click', () => {
    const v = parseInt(guestsInput.value, 10);
    if (v < 10) guestsInput.value = v + 1;
  });

  /* ── Validation ── */
  function showError (id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('visible', show);
  }

  function validate () {
    let ok = true;

    const name = document.getElementById('rsvp-name');
    const nameOk = name.value.trim().length >= 2;
    name.classList.toggle('invalid', !nameOk);
    showError('err-name', !nameOk);
    if (!nameOk) ok = false;

    const attending = getAttendingValue();
    const toggleGroup = form.querySelector('.rsvp__toggle-group');
    const attendOk = attending !== null;
    toggleGroup.classList.toggle('invalid', !attendOk);
    showError('err-attending', !attendOk);
    if (!attendOk) ok = false;

    return ok;
  }

  /* ── Set loading state ── */
  function setLoading (loading) {
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending…';
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send My RSVP</span>';
    }
  }

  /* ── Submit handler ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const attending = getAttendingValue();
    const payload = {
      full_name:    document.getElementById('rsvp-name').value.trim(),
      attending:    attending,
      guests_count: attending === 'yes' ? parseInt(guestsInput.value, 10) : 0,
      message:      document.getElementById('rsvp-message').value.trim(),
      submitted_at: new Date().toISOString()
    };

    try {
      const res = await fetch(`tables/${TABLE}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Network error');

      /* Show success */
      form.setAttribute('hidden', '');
      successBox.removeAttribute('hidden');

      if (attending === 'yes') {
        successTitle.textContent = 'We Can\'t Wait to See You!';
        successMsg.textContent   = `Thank you, ${payload.full_name}! We've received your RSVP and look forward to celebrating with you on May 29, 2026.`;
      } else {
        successTitle.textContent = "We'll Miss You!";
        successMsg.textContent   = `Thank you for letting us know, ${payload.full_name}. We will miss you and hope to celebrate together another time.`;
      }

      /* Refresh guest list */
      loadGuests();

    } catch (err) {
      setLoading(false);
      alert('Something went wrong. Please try again.');
    }
  });

  /* ── "Submit another" button ── */
  againBtn.addEventListener('click', () => {
    form.reset();
    guestsField.setAttribute('hidden', '');
    guestsInput.value = 1;
    successBox.setAttribute('hidden', '');
    form.removeAttribute('hidden');
    setLoading(false);
    form.querySelector('#rsvp-name').focus();
  });

  /* ── Load & render guest list ── */
  async function loadGuests () {
    try {
      const res  = await fetch(`tables/${TABLE}?limit=100&sort=created_at`);
      const data = await res.json();
      const rows = data.data || [];

      const yesCount = rows.filter(r => r.attending === 'yes').length;
      const noCount  = rows.filter(r => r.attending === 'no').length;

      countEl.textContent = `${yesCount} attending · ${noCount} declined`;

      if (rows.length === 0) {
        listEl.innerHTML = '<li class="rsvp__list-empty">No responses yet. Be the first to RSVP!</li>';
        return;
      }

      listEl.innerHTML = rows.map(r => {
        const initials = r.full_name
          ? r.full_name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
          : '?';
        const seats = r.attending === 'yes' && r.guests_count > 0
          ? `· ${r.guests_count} seat${r.guests_count > 1 ? 's' : ''}`
          : '';
        const dateStr = r.created_at
          ? new Date(r.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short' })
          : '';
        return `
          <li>
            <div class="rsvp__guest-avatar">${initials}</div>
            <div class="rsvp__guest-info">
              <span class="rsvp__guest-name">${escapeHtml(r.full_name)}</span>
              <div class="rsvp__guest-meta">
                <span class="rsvp__guest-status rsvp__guest-status--${r.attending}">
                  ${r.attending === 'yes' ? '✓ Attending' : '✗ Declined'}
                </span>
                <span>${seats}</span>
                <span>${dateStr}</span>
              </div>
            </div>
          </li>`;
      }).join('');

    } catch (err) {
      countEl.textContent = '';
      listEl.innerHTML = '<li class="rsvp__list-empty">Unable to load responses.</li>';
    }
  }

  /* ── HTML escape helper ── */
  function escapeHtml (str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Init ── */
  loadGuests();
  // Refresh every 30s to catch new RSVPs
  setInterval(loadGuests, 30000);
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
