document.addEventListener('DOMContentLoaded', () => {
  // Modal Link Confirmation Handler
  const modal = document.getElementById('confirmModal');
  const modalMessage = document.getElementById('modalMessage');
  const modalYes = document.getElementById('modalYes');
  const modalCancel = document.getElementById('modalCancel');
  let pendingLink = null;

  document.querySelectorAll('.cta a, .cta-button').forEach(link => {
    if (!link.href) return;
    link.addEventListener('click', e => {
      if (!modal || !modalMessage || !modalYes || !modalCancel) return;
      e.preventDefault();
      pendingLink = link.href;
      const title = (link.textContent || 'this link').trim();
      modalMessage.textContent = `Open ${title}?`;
      modal.classList.add('active');
    });
  });

  if (modal && modalYes) {
    modalYes.addEventListener('click', () => {
      if (pendingLink) window.open(pendingLink, '_blank');
      closeModal();
    });
  }
  if (modal && modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', ev => { if (ev.target === modal) closeModal(); });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    pendingLink = null;
  }

  // FAQ Accordion Handler
  document.querySelectorAll('.faq-question').forEach(button => {
    const faq = button.parentElement;
    const answer = faq ? faq.querySelector('.faq-answer') : null;
    if (!answer) return;

    button.addEventListener('click', () => {
      const isOpen = faq.classList.contains('open');

      document.querySelectorAll('.faq.open').forEach(openFaq => {
        openFaq.classList.remove('open');
      });

      if (!isOpen) {
        faq.classList.add('open');
      }
    });
  });

  // Lightweight Counter Animation
  const counters = document.querySelectorAll('.stat-number');
  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        counter.innerText = target.toLocaleString('en-US');
        observer.unobserve(counter);
      }
    });
  };

  const observer = new IntersectionObserver(animateCounters, { threshold: 0.3 });
  counters.forEach(counter => observer.observe(counter));

  // Minimal Terminal Preloader Boot Sequence
  const terminal = document.getElementById('terminal-preloader');
  const output = document.getElementById('terminal-output');
  if (terminal && output) {
    const bootSequence = [
      "INITIALIZING GUTAMPS KERNEL...",
      "[OK] Loading Mobile Profile...",
      "WELCOME TO GUTAMPS OFFICIAL."
    ];

    let lineIndex = 0;
    function printLine() {
      if (lineIndex < bootSequence.length) {
        output.innerHTML += bootSequence[lineIndex] + "<br>";
        lineIndex++;
        setTimeout(printLine, 150);
      } else {
        setTimeout(() => {
          terminal.style.opacity = '0';
          setTimeout(() => terminal.style.display = 'none', 500);
        }, 400);
      }
    }
    printLine();
  }
});