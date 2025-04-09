// controllers/SocketController.js

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Nouveau client connecté :', socket.id);

    // Quand "startClicked" arrive depuis index1
    socket.on('startClicked', () => {
      console.log('Event startClicked reçu de', socket.id);
      // On diffuse à tous les autres (ou à tous, y compris l’émetteur) :
      socket.broadcast.emit('startClicked');
    });

    // Quand une zone est sélectionnée
    socket.on('zoneSelected', (zone) => {
      console.log(`Zone sélectionnée : ${zone} - par ${socket.id}`);
      // On envoie à tout le monde
      io.emit('zoneSelected', zone);
    });

    socket.on('disconnect', () => {
      console.log('Client déconnecté :', socket.id);
    });
  });
};
