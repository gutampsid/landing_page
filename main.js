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

// Custom Winter Discord Widget Renderer (ID: 1019852867659632750)
  const WINTER_GUILD_ID = '1019852867659632750';
  const wdServerNameEl = document.getElementById('wdServerName');
  const wdOnlinePillEl = document.getElementById('wdOnlinePill');
  const wdMembersListEl = document.getElementById('wdMembersList');
  const wdJoinBtnEl = document.getElementById('wdJoinBtn');

  function createMemberRow(member) {
    const li = document.createElement('li');
    li.className = 'wd-member-item';

    const left = document.createElement('div');
    left.className = 'wd-member-left';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'wd-avatar-wrap';

    const img = document.createElement('img');
    img.className = 'wd-avatar';
    img.src = member.avatar_url;
    img.alt = member.username || 'Member';
    img.loading = 'lazy';

    const status = ['online', 'idle', 'dnd'].includes(member.status) ? member.status : 'online';
    const dot = document.createElement('span');
    dot.className = `wd-status-dot ${status}`;

    avatarWrap.appendChild(img);
    avatarWrap.appendChild(dot);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'wd-username';
    nameSpan.textContent = member.username || 'Member';

    left.appendChild(avatarWrap);
    left.appendChild(nameSpan);
    li.appendChild(left);

    const activityName = member.game && member.game.name ? member.game.name : '';
    if (activityName) {
      const actSpan = document.createElement('span');
      actSpan.className = 'wd-activity';
      actSpan.textContent = activityName;
      li.appendChild(actSpan);
    }

    return li;
  }

  async function renderWinterDiscordWidget() {
    if (!wdMembersListEl) return;

    try {
      const res = await fetch(`https://discord.com/api/guilds/${WINTER_GUILD_ID}/widget.json`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Failed to load guild widget');

      const data = await res.json();

      if (data.name && wdServerNameEl) {
        wdServerNameEl.textContent = data.name;
      }

      if (typeof data.presence_count === 'number') {
        if (wdOnlinePillEl) {
          wdOnlinePillEl.textContent = `${data.presence_count.toLocaleString('en-US')} Members Online`;
        }
        const statOnlineEl = document.getElementById('discordOnlineCount');
        if (statOnlineEl) {
          statOnlineEl.setAttribute('data-target', String(data.presence_count));
          statOnlineEl.textContent = data.presence_count.toLocaleString('en-US');
        }
      }

      if (data.instant_invite && wdJoinBtnEl) {
        wdJoinBtnEl.href = data.instant_invite;
      }

      const members = Array.isArray(data.members) ? data.members : [];
      wdMembersListEl.innerHTML = '';

      if (members.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'wd-empty';
        emptyLi.textContent = 'Server is live, but individual member list is hidden.';
        wdMembersListEl.appendChild(emptyLi);
        return;
      }

      const fragment = document.createDocumentFragment();
      members.forEach(member => {
        fragment.appendChild(createMemberRow(member));
      });
      wdMembersListEl.appendChild(fragment);
    } catch {
      if (wdOnlinePillEl) wdOnlinePillEl.textContent = 'Live Sync Paused';
      if (wdMembersListEl && !wdMembersListEl.children.length) {
        const errLi = document.createElement('li');
        errLi.className = 'wd-empty';
        errLi.textContent = 'Unable to load live Discord members right now.';
        wdMembersListEl.appendChild(errLi);
      }
    }
  }

  if (wdMembersListEl) {
    renderWinterDiscordWidget();
    setInterval(() => {
      if (!document.hidden) {
        renderWinterDiscordWidget();
      }
    }, 30000);
  }