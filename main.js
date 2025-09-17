document.addEventListener('DOMContentLoaded', () => {
  // Preloader fade-out (jika ada)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
  }

  // Body fade-in class (jika dipakai di CSS)
  document.body.classList.add('fade-in');

  // Typewriter effect (optional)
  const h1 = document.querySelector('header h1');
  if (h1) typeWriter(h1, 'Welcome to Our Page', 80);

  // --- Modal confirm (safely) ---
  const modal = document.getElementById('confirmModal'); // might be null
  const modalMessage = document.getElementById('modalMessage'); // might be null
  const modalYes = document.getElementById('modalYes'); // might be null
  const modalCancel = document.getElementById('modalCancel'); // might be null
  let pendingLink = null;

  // select social link anchors — support both .social-links a and .cta-button (your HTML uses .cta)
  const socialSelectors = '.social-links a, .cta a, .cta-button, .cta a.cta-button';
  document.querySelectorAll(socialSelectors).forEach(link => {
    // only add handler for anchors with href
    if (!link.href) return;
    link.addEventListener('click', e => {
      // If modal markup exists, use custom modal; otherwise fallback to native confirm
      if (!modal || !modalMessage || !modalYes || !modalCancel) {
        const title = (link.title || link.textContent || link.getAttribute('aria-label') || 'this link').trim();
        if (!confirm(`Open ${title}?`)) e.preventDefault();
        return;
      }

      // use custom modal
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
    modalCancel.addEventListener('click', () => {
      closeModal();
    });
  }

  // allow clicking overlay to close
  if (modal) {
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal();
    });
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    pendingLink = null;
  }

  // --- FAQ accordion (dynamic slide) ---
  document.querySelectorAll('.faq-question').forEach(button => {
    // ensure button is type="button"
    if (button.tagName.toLowerCase() === 'button' && !button.hasAttribute('type')) {
      button.setAttribute('type', 'button');
    }

    // initial aria states
    button.setAttribute('aria-expanded', 'false');
    const faq = button.parentElement;
    const answer = faq ? faq.querySelector('.faq-answer') : null;
    if (answer) {
      answer.style.maxHeight = null; // collapsed by default
      answer.setAttribute('aria-hidden', 'true');
    }

    button.addEventListener('click', () => {
      if (!faq || !answer) return;

      if (faq.classList.contains('open')) {
        // close it
        answer.style.maxHeight = null;
        faq.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
      } else {
        // OPTIONAL: close other open FAQs so only one open at a time
        document.querySelectorAll('.faq.open').forEach(openFaq => {
          const openAnswer = openFaq.querySelector('.faq-answer');
          const openBtn = openFaq.querySelector('.faq-question');
          if (openAnswer) openAnswer.style.maxHeight = null;
          openFaq.classList.remove('open');
          if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          if (openAnswer) openAnswer.setAttribute('aria-hidden', 'true');
        });

        // open this one
        answer.style.maxHeight = answer.scrollHeight + 'px';
        faq.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

}); // DOMContentLoaded

// Typewriter function (unchanged)
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
