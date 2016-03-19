'use strict';
const Round = require('./Round');
const Triangle = require('./Triangle');
const Square = require('./Square');
const range = require('./functions').range;

/**
 * A game.
 * @classdesc Contains most of the game's functionality.
 * @constructor
 * @param {Number} player1 The player ID of player 1.
 * @param {Number} player2 The player ID of player 2.
 */
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
 * @param {Number[]} position The position in this.gameBoard, [x,y].
 * @param {Number} value The value of the piece.
 * @param {String} color The color of the piece.
 * @param {String} type The type of piece.
 */
Game.prototype.makePiece = function makePiece(position, value, color, type) {
  let Type = {};

  if (type === 'round') {
    Type = Round;
  } else if (type === 'triangle') {
    Type = Triangle;
  } else {
    Type = Square;
  }

  if (Type.prototype.possibleValues[color].indexOf(value) !== -1 &&
      this.getBoardSquare(position) === 0) {
    this.setBoardSquare(position, new Type(value));
  }
};


/**
 * Set a board square.
 * @param {Number[]} coord An [x,y] coordinate on the board.
 * @param {var} value Either a Piece of a 0.
 */
Game.prototype.setBoardSquare = function setBoardSquare(coord, value) {
  this.gameBoard[coord[1]][coord[0]] = value;
};


/**
 * Fetch a square from the board, whether it is a Piece or a zero.
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
 * @param {Number[]} from Piece to move; coordinates [x,y] on gameBoard.
 * @param {Number[]} to Move destination; coordinates [x,y] on gameBoard.
 * @return
 */
Game.prototype.move = function move(from, to) {
  const sourcePiece = this.getBoardSquare(from);
  const valid = (this.isOnBoard(to) ? sourcePiece.moveIsValid(from, to) : 0);

  if (valid === 1 && !this.pathBlocked(from, to)) {
    if (this.getBoardSquare(to) !== 0 &&
        this.getBoardSquare(to).color !== sourcePiece.color) {
      this.capture(from, to);
    }

    if (this.getBoardSquare(to) === 0) {
      this.setBoardSquare(to, this.getBoardSquare(from));
      this.setBoardSquare(from, 0);
    }
  } else if (valid === 2 && this.getBoardSquare(to) === 0) {
    this.gameBoard[to[1]][to[0]] = this.getBoardSquare(from);
    this.gameBoard[from[1]][from[0]] = 0;
  }
};


/**
 * Capture a piece.
 * @todo The entire thing. This is a doozy.
 * @param {Number[]} defender The coordinates ([x,y]) of the defending piece.
 * @return Number An error code; -1 if the capture is not possible, 0 if it is.
 */
Game.prototype.capture = function capture(defender) {
  return defender;
};


/**
 * Determines if the squares between two positions are unoccupied.
 * @param {Number[]} from Source.
 * @param {Number[]} to Destination.
 * @return {bool} True if the path between 'from' and 'to' is unoccupied.
 */
Game.prototype.pathBlocked = function pathBlocked(from, to) {
  let blocked = true;

  if (from[0] === to[0] && // same file
      this.gameBoard
          .map(x => x[to[0]])
          .slice(from[1] < to[1] ? from[1] + 1 : to[1] + 1,
                 from[1] < to[1] ? to[1] : from[1])
          .filter(x => x !== 0)
          .length === 0) {
    blocked = false;
  } else if (from[1] === to[1] && // same rank
             this.gameBoard[from[1]]
                 .slice(from[0] < to[0] ? from[0] + 1 : to[0] + 1,
                        from[0] < to[0] ? to[0] : from[0])
                 .filter(x => x !== 0)
                 .length === 0) {
    blocked = false;
  } else if (Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) {
    // diagonal
    blocked = false;
    const xRange = range(from[0], to[0]).slice(1);
    const yRange = range(from[1], to[1]).slice(1);

    for (const i in xRange) {
      if (this.getBoardSquare([xRange[i], yRange[i]]) !== 0) {
        blocked = true;
        break;
      }
    }
  }
  return blocked;
};


/**
 *
 */
Game.prototype.isOnBoard = function isOnBoard(coord) {
  let result = true;

  if (coord[1] >= this.gameBoard.length || coord[1] < 0 ||
      coord[0] >= this.gameBoard[0].length || coord[0] < 0) {
    result = false;
  }
  return result;
};


Game.prototype.moveIsValid = function moveIsValid(from, to) {
  return this.moveIsValidNormal(from, to) || this.moveIsValidFlying(from, to);
};

module.exports = Game;
