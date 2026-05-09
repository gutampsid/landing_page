document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
  }

  document.body.classList.add('fade-in');

  const h1 = document.querySelector('header h1');
  if (h1) typeWriter(h1, 'Welcome to Our Page', 80);

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
  if (modal && modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', ev => { if (ev.target === modal) closeModal(); });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    pendingLink = null;
  }

  document.querySelectorAll('.faq-question').forEach(button => {
    const faq = button.parentElement;
    const answer = faq ? faq.querySelector('.faq-answer') : null;
    if (!answer) return;

    button.setAttribute('type', 'button');
    button.setAttribute('aria-expanded', 'false');

    answer.style.opacity = "0";
    answer.style.paddingTop = "0";
    answer.style.paddingBottom = "0";
    answer.style.transition = "opacity 0.4s ease, padding 0.3s ease";

    button.addEventListener('click', () => {
      const isOpen = faq.classList.contains('open');

      document.querySelectorAll('.faq.open').forEach(openFaq => {
        const openAnswer = openFaq.querySelector('.faq-answer');
        const openBtn = openFaq.querySelector('.faq-question');
        if (openAnswer) {
          openAnswer.style.opacity = "0";
          openAnswer.style.paddingTop = "0";
          openAnswer.style.paddingBottom = "0";
        }
        openFaq.classList.remove('open');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        answer.style.opacity = "1";
        answer.style.paddingTop = "14px";
        answer.style.paddingBottom = "14px";
        faq.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  (function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  })();
}

document.addEventListener('DOMContentLoaded', () => {
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  const interactables = document.querySelectorAll('a, button, .faq-question, .cta-button');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 100;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/,/g, ''); 
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc).toLocaleString('en-US');
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target.toLocaleString('en-US');
      }
    };
    
    updateCount();
  });
});