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

// GANTI DENGAN KODE INI
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 100;

  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = +counter.innerText.replace(/,/g, ''); 
        const inc = target / speed;

        const updateCount = () => {
          if (count < target) {
            count += inc;
            counter.innerText = Math.ceil(count).toLocaleString('en-US');
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target.toLocaleString('en-US');
          }
        };
        
        updateCount();
        observer.unobserve(counter); // Menghentikan pantauan setelah animasi selesai
      }
    });
  };

  const observer = new IntersectionObserver(animateCounters, {
    threshold: 0.5 // Animasi akan mulai saat elemen 50% terlihat di layar saat di-scroll
  });

  counters.forEach(counter => observer.observe(counter));
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.cta-button, .stat-item');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posisi x dalam elemen
      const y = e.clientY - rect.top;  // Posisi y dalam elemen
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Hitung rotasi maksimal 15 derajat
      const rotateX = ((y - centerY) / centerY) * -15; 
      const rotateY = ((x - centerX) / centerX) * 15;

      btn.style.transition = 'transform 0.1s ease';
      btn.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s ease';
      btn.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Tambahkan class 'reveal' otomatis ke semua kotak bagian
  const sections = document.querySelectorAll('.section-box');
  sections.forEach(sec => sec.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opsional: Hentikan observasi jika hanya ingin animasi diputar 1x
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Aktif saat 15% bagian elemen terlihat
  });

  sections.forEach(sec => revealObserver.observe(sec));
});

document.addEventListener('DOMContentLoaded', () => {
  // Array kombinasi Konami Code
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  let konamiPosition = 0;

  // Dengarkan setiap tekanan tombol di keyboard
  document.addEventListener('keydown', (e) => {
    // Cek apakah tombol yang ditekan sesuai urutan
    if (e.key === konamiCode[konamiPosition]) {
      konamiPosition++;
      
      // Jika seluruh kombinasi berhasil ditekan
      if (konamiPosition === konamiCode.length) {
        unlockSecretMode();
        konamiPosition = 0; // Reset posisi
      }
    } else {
      // Jika salah ketik, reset dari awal
      konamiPosition = 0;
    }
  });

  // Fungsi yang dipanggil saat kode rahasia aktif
  function unlockSecretMode() {
    alert('🎮 SECRET UNLOCKED! Welcome to Gutamps Developer Mode!');
    
    // Ubah tema website menjadi perpaduan warna neon hijau/biru (Matrix/Cyberpunk)
    document.body.style.transition = 'filter 2s ease';
    document.body.style.filter = 'hue-rotate(90deg) contrast(1.2) invert(10%)';
    
    // Ubah judul sementara
    const title = document.querySelector('header h1');
    if (title) title.innerText = "GOD MODE ACTIVATED";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal-preloader');
  const output = document.getElementById('terminal-output');
  if (!terminal || !output) return;

  const bootSequence = [
    "INITIALIZING GUTAMPS KERNEL...",
    "[OK] Loading Core Modules...",
    "[OK] Establishing Secure Connection to Discord...",
    "[OK] Bypassing Mainframe Security...",
    "Decrypting Payload: 100%",
    "WELCOME TO GUTAMPS OFFICIAL."
  ];

  let lineIndex = 0;
  
  function printLine() {
    if (lineIndex < bootSequence.length) {
      output.innerHTML += bootSequence[lineIndex] + "<br>";
      lineIndex++;
      setTimeout(printLine, Math.random() * 300 + 200); // Waktu jeda acak agar realistis
    } else {
      setTimeout(() => {
        terminal.style.opacity = '0';
        setTimeout(() => terminal.style.display = 'none', 800);
      }, 1000);
    }
  }
  
  printLine();
});

// OVERKILL: Sintesis Audio Bawaan Browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
}

// Suara saat mouse masuk (Hover - High Pitch Beep)
function playHoverSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime); 
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume sangat rendah
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

// Suara saat tombol diklik (Click - Bass Thud / Confirm)
function playClickSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

document.addEventListener('DOMContentLoaded', () => {
  // Browser butuh interaksi pertama pengguna untuk mengizinkan audio
  document.body.addEventListener('mousemove', initAudio, { once: true });
  document.body.addEventListener('touchstart', initAudio, { once: true });

  const buttons = document.querySelectorAll('.cta-button, .faq-question, button');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', playHoverSound);
    btn.addEventListener('click', playClickSound);
  });
});

// OVERKILL: Algoritma Jaring Partikel (Nexus)
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-network');
  const ctx = canvas.getContext('2d');
  let particlesArray;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = '#FF00FF'; // Warna neon ungu
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000; // Kepadatan partikel
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 1;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 2) - 1;
      let directionY = (Math.random() * 2) - 1;
      particlesArray.push(new Particle(x, y, directionX, directionY, size, '#FF00FF'));
    }
  }

  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                       ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
        
        // Garis penghubung antar partikel
        if (distance < (canvas.width / 10) * (canvas.height / 10)) {
          opacityValue = 1 - (distance / 20000);
          ctx.strokeStyle = 'rgba(255, 0, 255,' + opacityValue + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }

        // Garis penghubung ke kursor mouse
        let mouseDistance = ((mouse.x - particlesArray[a].x) * (mouse.x - particlesArray[a].x)) + 
                            ((mouse.y - particlesArray[a].y) * (mouse.y - particlesArray[a].y));
        if (mouseDistance < 20000) {
          ctx.strokeStyle = 'rgba(0, 255, 255,' + (1 - mouseDistance/20000) + ')'; // Warna cyan saat dekat mouse
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0,innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connectParticles();
  }

  initParticles();
  animate();
});

// OVERKILL 2: Hacker Text Decryption Effect
document.addEventListener('DOMContentLoaded', () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const headings = document.querySelectorAll('h2'); // Terapkan ke semua H2

  const decryptObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let iterations = 0;
        const target = entry.target;
        // Simpan teks asli jika belum ada
        if (!target.dataset.value) target.dataset.value = target.innerText;
        
        const originalText = target.dataset.value;
        clearInterval(target.interval);

        target.interval = setInterval(() => {
          target.innerText = originalText.split("")
            .map((letter, index) => {
              if (index < iterations) return originalText[index];
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

          if (iterations >= originalText.length) {
            clearInterval(target.interval);
          }
          iterations += 1 / 3; // Kecepatan dekripsi (semakin kecil, semakin lama)
        }, 30);
        
        decryptObserver.unobserve(target); // Hanya putar sekali
      }
    });
  }, { threshold: 0.8 }); // Aktif saat 80% elemen terlihat

  headings.forEach(heading => decryptObserver.observe(heading));
});

// OVERKILL 2: Holographic Mouse Tracking
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.section-box, .stat-item');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      // Hitung posisi kursor relatif terhadap kotak
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Kirim kordinat ke CSS Variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

