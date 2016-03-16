'use strict';
const Round = require('./Round');
const Triangle = require('./Triangle');
const Square = require('./Square');


function Game(player1, player2) {
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
  this.players = [player1, player2]; // these will eventually be playerIDs.
  this.moveList = [];
}


/**
 * Reset the gameBoard to all zeroes.
 */
Game.prototype.resetBoard = function resetBoard() {
  this.gameBoard.map(x => x.map(() => 0));
};


/**
 * Factory method for Pieces.
 * @param {int[]} position The position in this.gameBoard, [x,y].
 * @param {int} value The value of the piece.
 */
Game.prototype.makePiece = function makePiece(position, value) {
  for (const Type of [Round, Triangle, Square]) {
    if (Type.prototype.possibleValues.white.concat(
        Type.prototype.possibleValues.black).indexOf(value) !== -1) {
      this.setBoardSquare(position, new Type(value));
      return;
    }
  }
};


/**
 * Set a board square.
 * @param {int[]} coord An [x,y] coordinate on the board.
 * @param {var} value Either a Piece of a 0.
 */
Game.prototype.setBoardSquare = function setBoardSquare(coord, value) {
  this.gameBoard[coord[1]][coord[0]] = value;
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
 * @todo Emitters.
 * @todo Check if blocked.
 * @param {int[]} from Piece to move; coordinates [x,y] on gameBoard.
 * @param {int[]} to Move destination; coordinates [x,y] on gameBoard.
 * @return
 */
Game.prototype.move = function move(from, to) {
  const sourcePiece = this.getBoardSquare(from);
  const validity = sourcePiece.moveIsValid(from, to);

  if (validity === 1) {
    if (this.getBoardSquare(to) !== 0 &&
        this.getBoardSquare(to).color !== sourcePiece.color) {
      this.capture(from, to);
    } else if (this.getBoardSquare(to) === 0) {
      this.gameBoard[to[1]][to[0]] = this.getBoardSquare(from);
      this.gameBoard[from[1]][from[0]] = 0;
    }
    // emit?
    console.log(this.gameBoard);
  }
};


/**
 * Capture a piece.
 * @todo The entire thing. This is a doozy.
 * @param {int[]} defender The coordinates ([x,y]) of the defending piece.
 * @return int An error code; -1 if the capture is not possible, 0 if it is.
 */
Game.prototype.capture = function capture(defender) {
  return defender;
};


/**
 * Determines if the squares between two positions are unoccupied.
 * @todo Write the diagonal checks.
 * @param {int[]} from Source.
 * @param {int[]} to Destination.
 * @return {bool} True if the path between 'from' and 'to' is unoccupied.
 */
Game.prototype.pathBlocked = function pathBlocked(from, to) {
  let blocked = true;

  if (from[0] === to[0] &&
      this.gameBoard
          .map(x => x[to[0]])
          .slice(1, -1)
          .filter(x => x !== 0) === []) { // same file
    blocked = false;
  } else if (from[1] === to[1] &&
             this.gameBoard[from[1]]
                  .slice(from[0] + 1, to[0])
                  .filter(x => x !== 0) === []) { // same rank
    blocked = false;
  } else if (Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) {
    // do things, dammit.
    blocked = 'who knows';
  }

  return blocked;
};

module.exports = Game;
