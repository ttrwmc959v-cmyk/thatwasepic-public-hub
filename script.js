/* ThatWasEpic public hub — minimal client behavior */
(function () {
  'use strict';

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Toast helper
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
  }

  const shareUrl = () => window.location.href;
  const shareText = 'ThatWasEpic — every official link in one place.';

  // Phone/Facebook browser-safe tap handling for every outbound card.
  // Normal anchor tags can be blocked or swallowed in some in-app browsers,
  // so each destination has an explicit click fallback.
  document.querySelectorAll('[data-open-url]').forEach((el) => {
    el.addEventListener('click', async (event) => {
      const destination = el.getAttribute('data-open-url');
      const emailToCopy = el.getAttribute('data-copy-email');
      if (!destination) return;

      event.preventDefault();

      if (emailToCopy) {
        try {
          await navigator.clipboard.writeText(emailToCopy);
          toast('Business email copied — opening Night.');
        } catch {
          toast('Opening Night. Email: ' + emailToCopy);
        }
      }

      const opened = window.open(destination, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = destination;
      }
    });
  });

  // Copy
  const copyBtn = document.getElementById('copyBtn');
  const copyLabel = document.getElementById('copyLabel');
  async function copy() {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }
    if (copyBtn) {
      copyBtn.setAttribute('data-copied', 'true');
      if (copyLabel) copyLabel.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.removeAttribute('data-copied');
        if (copyLabel) copyLabel.textContent = 'Copy hub link';
      }, 1800);
    }
    toast('Link copied — go share it.');
  }
  if (copyBtn) copyBtn.addEventListener('click', copy);

  // Native share with fallback to copy
  const shareBtn = document.getElementById('shareBtn');
  async function share() {
    const data = {
      title: 'ThatWasEpic',
      text: shareText,
      url: shareUrl(),
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    copy();
  }
  if (shareBtn) shareBtn.addEventListener('click', share);

  // Reveal-on-scroll. Items already on-screen reveal immediately; others animate as they enter.
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('is-in'), i * 80);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
    // Safety: nothing should remain hidden forever (e.g. in static screenshots, or if the user never scrolls).
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => el.classList.add('is-in'));
    }, 2500);
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }
})();
