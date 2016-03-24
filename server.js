const express = require('express');
const Game = require('./src/Game');
const app = express();
const PORT = 3000;

// Functions
function createGame(player1) {
  return player2 => new Game(player1, player2);
}

app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/css', express.static(__dirname + '/style/'));
app.use('/public', express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Game
app.get('/game', (req, res) => {
  const game = createGame(1)(2); // curried because players may join separately.
  game.prepareBoardForMatch();
});

app.listen(PORT, () => {
  console.log('Server is running on port %s.', PORT);
});
