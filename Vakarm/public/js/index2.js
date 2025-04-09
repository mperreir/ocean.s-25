// public/js/index2.js

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  socket.on('startClicked', () => {
    console.log("startClicked reçu dans index2");
    gsap.to("body", {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        // Redirection
        window.location.href = "/map";
      }
    });
  });
});
