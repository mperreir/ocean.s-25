// public/js/index1.js

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', () => {
    console.log("startClicked émis depuis index1");
    socket.emit('startClicked');

    // Fade-out local
    gsap.to("body", {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        // Redirection locale
        window.location.href = "/regles"; 
        // (ou "rules.html" si vous avez une autre page)
        // A adapter selon votre route
      }
    });
  });
});
