document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // Connexion socket
  const socket = io();

  // Quand l'autre écran (map) choisit une zone
  socket.on('zoneSelected', (zone) => {
    console.log(`[Règles] zoneSelected reçu => redirection infos...`);
    window.location.href = "/infos";
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 15000);

  showSlide(currentSlide);
});
