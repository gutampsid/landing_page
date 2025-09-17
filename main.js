window.addEventListener("load", () => {
  // Preloader fade-out
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 500);
  }

  // Body fade-in
  document.body.classList.add("fade-in");

  // Typewriter effect untuk header h1
  const h1 = document.querySelector("header h1");
  if (h1) typeWriter(h1, "Welcome to Our Page", 80);
});

// Typewriter function
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

// Custom modal confirm untuk social links
const modal = document.getElementById("confirmModal");
const modalMessage = document.getElementById("modalMessage");
const modalYes = document.getElementById("modalYes");
const modalCancel = document.getElementById("modalCancel");

let pendingLink = null;

document.querySelectorAll(".social-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    pendingLink = link.href;
    modalMessage.textContent = `Open ${link.title}?`;
    modal.classList.add("active");
  });
});

if (modalYes) {
  modalYes.addEventListener("click", () => {
    if (pendingLink) window.open(pendingLink, "_blank");
    modal.classList.remove("active");
    pendingLink = null;
  });
}

if (modalCancel) {
  modalCancel.addEventListener("click", () => {
    modal.classList.remove("active");
    pendingLink = null;
  });
}

// FAQ accordion dengan animasi slide
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faq = button.parentElement;
    const answer = faq.querySelector(".faq-answer");

    if (faq.classList.contains("open")) {
      // Tutup FAQ
      answer.style.maxHeight = null;
      faq.classList.remove("open");
    } else {
      // Tutup semua FAQ lain (opsional → kalau mau satu-satu saja yang terbuka)
      document.querySelectorAll(".faq.open").forEach(openFaq => {
        openFaq.querySelector(".faq-answer").style.maxHeight = null;
        openFaq.classList.remove("open");
      });

      // Buka FAQ yang diklik
      answer.style.maxHeight = answer.scrollHeight + "px";
      faq.classList.add("open");
    }
  });
});
