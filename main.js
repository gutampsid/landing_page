window.onload = () => {
  document.body.classList.add('fade-in');
  typeWriter(document.querySelector("h1"), "Welcome to Our Page", 80);
};

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

document.querySelectorAll('.social-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const confirmOpen = confirm(`Open ${link.title}?`);
    if (!confirmOpen) e.preventDefault();
  });
});

window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});
