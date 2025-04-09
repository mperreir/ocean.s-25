// app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// (1) Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// (2) Servir les fichiers statiques depuis "public"
app.use(express.static(path.join(__dirname, 'public')));

// (3) Charger le contrôleur Socket et le brancher à io
const SocketController = require('./controllers/SocketController');
SocketController(io);

// (4) Monter les routes
const mainRouter = require('./routes/index');
app.use('/', mainRouter);

// (5) Lancement du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://192.168.1.102:${PORT}`);
});
