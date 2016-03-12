const Game = function Game(player1, player2) {
  this.gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  this.players = [player1, player2]; // these are playerIDs.
  this.moveList = [];
};

Game.prototype.resetBoard = function resetBoard() {
	// Place pieces
};


/**
 * Fetch a square from the board, whether it is a Piece of a zero.
 * @param {Number[]} coord In [x,y] format.
 * @return Piece
 */
Game.prototype.getBoardSquare = function getBoardSquare(coord) {
  return this.gameBoard[coord[1]][coord[0]];
};

/**
 * Move a piece, or capture and move (if destination is occupied).
 * @param {int[]} from Piece to move; coordinates [x,y] on gameBoard.
 * @param {int[]} to Move destination; coordinates [x,y] on gameBoard.
 * @return
 */
Game.prototype.move = function move(from, to) {
  if (this.getBoardSquare(from) === 0) {// pre-move capture
    this.capture(from, to);
  } else if (this.getBoardSquare(from).moveIsValid(from, to)) {
    if (this.getBoardSquare(to) !== 0) {// capture and move
      this.capture(from, to);
    }
    this.gameBoard[to[1]][to[0]] = this.getBoardSquare(from);
    this.gameBoard[from[1]][from[0]] = 0;
  }
};
