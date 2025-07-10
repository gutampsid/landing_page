// Fade-in saat halaman load
window.onload = () => {
  document.body.classList.add('fade-in');
  typeWriter(document.querySelector("h1"), "Welcome to Our Page", 80);
};

// Typing animation di h1
function typeWriter(element, text, speed) {
  let i = 0;
  element.innerHTML = "";
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Mode switch
function toggleMode() {
  document.body.classList.toggle("light-mode");
}

// Konfirmasi saat klik link social
document.querySelectorAll('.social-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const confirmOpen = confirm(`Open ${link.title}?`);
    if (!confirmOpen) e.preventDefault();
  });
});
