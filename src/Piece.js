// TODO: updatePosition should not add the piece to the board.
'use strict';
const gameBoard = require('./GameBoard');

/**
 * Represents a game piece.
 * @classdesc Parent class of Round, Triangle, Square, and Pyramid. Find the
 *			  particular subclass by variableName.constructor.name.
 * @constructor
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 */
function Piece(color, position) {
  this.color = color;
  this.position = position;
  this.addToBoard();
}


/**
 * Checks if a move destination is within the board's boundaries.
 * @param {number[]} destination - A coordinate, [x,y].
 * @return true if in board, false otherwise.
 */
Piece.prototype.destinationOnBoard = function destinationOnBoard(destination) {
  return (destination[0] > 7 || destination[0] < 0 || destination[1] > 15 ||
    destination[1] < 0);
};

/**
 * Checks if there is a piece in between this and the destination, including
 * at the destination.
 * @param {number[]} destination - A coordinate, [x,y].
 * @todo Find a way to write less ugly code.
 * @return true is blocked, false otherwise.
 */
Piece.prototype.pieceIsBlocking = function pieceIsBlocking(destination) {
  // destination is occupied
  if (gameBoard[destination[1]][destination[0]] !== 0) {
    return true;
  }

  // vertical move (same file)
  if (destination[0] === this.position[0]) {
    if (this.position[1] - destination[1] > 0) { // moving up
      for (let i = this.position[1] - 1; i > destination[1] + 1; i--) {
        if (gameBoard[i][destination[0]] !== 0) {
          return true;
        }
      }
    } else if (this.position[1] - destination[1] < 0) { // moving down
      for (let j = this.position[1] + 1; j < destination[1] - 1; j++) {
        if (gameBoard[j][destination[0]] !== 0) {
          return true;
        }
      }
    }

  // horizontal move (same rank)
  } else if (destination[1] === this.position[1]) {
    if (this.position[0] > destination[0]) { // moving left
      for (let k = this.position[0] - 1; k > destination[0] + 1; k--) {
        if (gameBoard[destination[1]][k] !== 0) {
          return true;
        }
      }
    } else if (this.position[0] < destination[0]) { // moving right
      for (let l = this.position[0] + 1; l < destination[0] - 1; l++) {
        if (gameBoard[destination[1]][l] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
};


/**
* Adds a piece to the game board. Invoked via the "this" keyword.
*/
Piece.prototype.addToBoard = function addToBoard() {
  gameBoard[this.position[1]][this.position[0]] = this;
};


/**
* Changes Piece.position to the destination of a move, updates the game board,
* recalculates Piece.possibleMoves.
*/
Piece.prototype.updatePosition = function updatePosition(destination) {
  gameBoard[this.position[1]][this.position[0]] = 0;
  gameBoard[destination[1]][destination[0]] = this;

  // Copy by value.
  this.position = destination.slice();

  // Finally, update list of legal positions.
  this.findLegalMoves();

  // Here's the only real linkup to the interface. Irrelevant for now.
  // drawPieces();
};

/**
* Moves the Piece. Ensures move is legal.
* @param {number[]} destination - A coordinate, [x, y].
* @return {number} 0 if move completed, -1 otherwise.
*/
Piece.prototype.move = function move(destination) {
  for (const t of this.possibleMoves.normal) {
    if (destination.toString() === t.toString() &&
      !this.isPieceBlocking(destination)) {
      this.updatePosition(destination);
      return 0;
    }
  }

  for (const p of this.possibleMoves.flying) {
    if (destination.toString() === p.toString() &&
        gameBoard[destination[1]][destination[0]] === 0) {
      this.updatePosition(destination);
      return 0;
    }
  }
  return -1;
};

module.exports.Piece = Piece;
