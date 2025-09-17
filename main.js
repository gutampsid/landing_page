document.addEventListener('DOMContentLoaded', () => {
  // --- Preloader fade-out (jika ada) ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
  }

  // --- Body fade-in class ---
  document.body.classList.add('fade-in');

  // --- Typewriter effect ---
  const h1 = document.querySelector('header h1');
  if (h1) typeWriter(h1, 'Welcome to Our Page', 80);

  // --- Modal confirm ---
  const modal = document.getElementById('confirmModal');
  const modalMessage = document.getElementById('modalMessage');
  const modalYes = document.getElementById('modalYes');
  const modalCancel = document.getElementById('modalCancel');
  let pendingLink = null;

  const socialSelectors = '.social-links a, .cta a, .cta-button, .cta a.cta-button';
  document.querySelectorAll(socialSelectors).forEach(link => {
    if (!link.href) return;
    link.addEventListener('click', e => {
      if (!modal || !modalMessage || !modalYes || !modalCancel) {
        const title = (link.title || link.textContent || link.getAttribute('aria-label') || 'this link').trim();
        if (!confirm(`Open ${title}?`)) e.preventDefault();
        return;
      }

      e.preventDefault();
      pendingLink = link.href;
      const title = (link.title || link.textContent || link.getAttribute('aria-label') || 'this link').trim();
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
  if (modal && modalCancel) {
    modalCancel.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', ev => {
      if (ev.target === modal) closeModal();
    });
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    pendingLink = null;
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(button => {
    if (button.tagName.toLowerCase() === 'button' && !button.hasAttribute('type')) {
      button.setAttribute('type', 'button');
    }

    button.setAttribute('aria-expanded', 'false');
    const faq = button.parentElement;
    const answer = faq ? faq.querySelector('.faq-answer') : null;

    if (answer) {
      answer.style.height = "0px"; // default closed
      answer.style.overflow = "hidden";
      answer.style.transition = "height 0.3s ease";
      answer.setAttribute('aria-hidden', 'true');
    }

    button.addEventListener('click', () => {
      if (!faq || !answer) return;

      if (faq.classList.contains('open')) {
        // close
        answer.style.height = "0px";
        faq.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
      } else {
        // close others first
        document.querySelectorAll('.faq.open').forEach(openFaq => {
          const openAnswer = openFaq.querySelector('.faq-answer');
          const openBtn = openFaq.querySelector('.faq-question');
          if (openAnswer) openAnswer.style.height = "0px";
          openFaq.classList.remove('open');
          if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          if (openAnswer) openAnswer.setAttribute('aria-hidden', 'true');
        });

        // open this one
        answer.style.height = answer.scrollHeight + "px";
        faq.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');

        // setelah animasi selesai, set height ke auto supaya dinamis
        setTimeout(() => { if(faq.classList.contains('open')) answer.style.height = 'auto'; }, 300);
      }
    });
  });
}); // DOMContentLoaded

// --- Typewriter function ---
function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  (function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  })();
}
