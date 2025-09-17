window.addEventListener("load", () => {
  // Preloader fade-out
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 500);
  }

  // Body fade-in
  document.body.classList.add("fade-in");

  // Typewriter effect
  const h1 = document.querySelector("header h1");
  if (h1) typeWriter(h1, "Welcome to Our Page", 80);
});

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

// Confirm before opening social links
document.querySelectorAll(".social-links a").forEach(link => {
  link.addEventListener("click", e => {
    if (!confirm(`Open ${link.title}?`)) e.preventDefault();
  });
});

// FAQ accordion with smooth toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faq = button.parentElement;
    const answer = faq.querySelector(".faq-answer");

    if (faq.classList.contains("open")) {
      answer.style.maxHeight = null;
      faq.classList.remove("open");
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      faq.classList.add("open");
    }
  });
});
