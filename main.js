document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Link Confirmation Handler (dengan info domain & tombol Escape)
  const modal = document.getElementById('confirmModal');
  const modalMessage = document.getElementById('modalMessage');
  const modalDomain = document.getElementById('modalDomain');
  const modalYes = document.getElementById('modalYes');
  const modalCancel = document.getElementById('modalCancel');
  let pendingLink = null;
  let lastFocusedElement = null;

  document.querySelectorAll('.cta a, .cta-button').forEach(link => {
    if (!link.href) return;
    link.addEventListener('click', e => {
      if (!modal || !modalMessage || !modalYes || !modalCancel) return;
      e.preventDefault();
      lastFocusedElement = link;
      pendingLink = link.href;

      const title = (link.textContent || 'this link').trim();
      modalMessage.textContent = `Open ${title}?`;

      if (modalDomain) {
        try {
          const parsedUrl = new URL(link.href);
          modalDomain.textContent = parsedUrl.hostname;
        } catch {
          modalDomain.textContent = link.href;
        }
      }

      modal.classList.add('active');
      modalYes.focus();
    });
  });

  if (modal && modalYes) {
    modalYes.addEventListener('click', () => {
      if (pendingLink) {
        window.open(pendingLink, '_blank', 'noopener,noreferrer');
      }
      closeModal();
    });
  }

  if (modal && modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', ev => {
      if (ev.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    pendingLink = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  // 2. FAQ Accordion Handler (dengan sinkronisasi aria-expanded)
  document.querySelectorAll('.faq-question').forEach(button => {
    const faq = button.parentElement;
    const answer = faq ? faq.querySelector('.faq-answer') : null;
    if (!answer) return;

    button.addEventListener('click', () => {
      const isOpen = faq.classList.contains('open');

      document.querySelectorAll('.faq.open').forEach(openFaq => {
        openFaq.classList.remove('open');
        const openBtn = openFaq.querySelector('.faq-question');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faq.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Smooth Count-Up Animation untuk Statistik
  const counters = document.querySelectorAll('.stat-number');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runCountUp(el, target, duration = 900) {
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString('en-US');
      return;
    }

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic agar melambat halus di akhir
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(eased * target);

      el.textContent = currentVal.toLocaleString('en-US');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('en-US');
      }
    }

    requestAnimationFrame(update);
  }

  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.getAttribute('data-target')) || 0;
        runCountUp(counter, target);
        observer.unobserve(counter);
      }
    });
  };

  const observer = new IntersectionObserver(animateCounters, { threshold: 0.3 });
  counters.forEach(counter => observer.observe(counter));

  // 4. Winter Terminal Preloader (dengan tombol skip)
  const terminal = document.getElementById('terminal-preloader');
  const output = document.getElementById('terminal-output');
  const skipBtn = document.getElementById('skipPreloader');
  let preloaderDismissed = false;
  let timers = [];

  function dismissPreloader() {
    if (preloaderDismissed || !terminal) return;
    preloaderDismissed = true;
    timers.forEach(id => clearTimeout(id));
    timers = [];

    terminal.classList.add('is-hiding');
    const hideTimer = setTimeout(() => {
      terminal.style.display = 'none';
    }, 500);
    timers.push(hideTimer);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissPreloader);
  }

  if (terminal && output) {
    const bootSequence = [
      "INITIALIZING GUTAMPS WINTER KERNEL...",
      "[OK] Loading Frost Profile...",
      "WELCOME TO GUTAMPS OFFICIAL [WINTER]."
    ];

    let lineIndex = 0;
    function printLine() {
      if (preloaderDismissed) return;
      if (lineIndex < bootSequence.length) {
        output.innerHTML += bootSequence[lineIndex] + "<br>";
        lineIndex++;
        timers.push(setTimeout(printLine, 160));
      } else {
        timers.push(setTimeout(dismissPreloader, 450));
      }
    }
    printLine();
  }

  // 5. Partikel Salju Ringan (otomatis nonaktif jika reduced motion aktif)
  const snowLayer = document.querySelector('.snow-layer');
  if (snowLayer && !prefersReducedMotion) {
    const flakeCount = window.innerWidth < 600 ? 18 : 32;
    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement('span');
      flake.className = 'snowflake';

      const size = (Math.random() * 4 + 2.5).toFixed(1);
      const left = (Math.random() * 100).toFixed(2);
      const duration = (Math.random() * 7 + 7).toFixed(2);
      const delay = (Math.random() * -12).toFixed(2);
      const opacity = (Math.random() * 0.45 + 0.25).toFixed(2);
      const drift = ((Math.random() * 26 + 8) * (Math.random() < 0.5 ? -1 : 1)).toFixed(0);

      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${left}%`;
      flake.style.opacity = opacity;
      flake.style.animationDuration = `${duration}s`;
      flake.style.animationDelay = `${delay}s`;
      flake.style.setProperty('--drift', `${drift}px`);

      snowLayer.appendChild(flake);
    }
  }
});