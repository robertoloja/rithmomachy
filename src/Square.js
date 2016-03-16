'use strict';
const Piece = require('./Piece.js').Piece;

/**
 * Represents a square game piece.
 * @classdesc Squares move three squares horizontally or vertically, if
 *			  path is unobstructed. They fly similarly to knights in chess,
 *			  but .
 *			  Light values: 15, 25, 45, 81,  169, 153, 289.
 *			  Dark values:  28, 49, 66, 120, 121, 225, 361.
 * @constructor
 * @extends Piece
 * @param {number} value - This piece's number value.
 */
function Square(value) {
  Piece.call(value, this.findColor(value));
}

Square.prototype = Object.create(Piece.prototype);
Square.prototype.constructor = Square;

Square.prototype.possibleValues = {
  white: [15, 45, 153, 25, 81, 169, 289],
  black: [28, 66, 120, 49, 121, 225, 361],
};

/**
 * Populates Piece.possibleMoves with moves that are on the board and follow
 * this piece's movement rules.
 */
Square.prototype.moveIsValidNormal = function moveIsValidNormal(from, to) {
  let ret = false;

  if ((to[0] === from[0] && to[1] === from[1] + 3) ||
      (to[0] === from[0] && to[1] === from[1] - 3) ||
      (to[0] === from[0] - 3 && to[1] === from[1]) ||
      (to[0] === from[0] + 3 && to[1] === from[1])) {
    ret = true;
  }
  return ret;
};


Square.prototype.moveIsValidFlying = function moveIsValidFlying(from, to) {
  let ret = false;

  if ((to[0] === from[0] - 1 && to[1] === from[1] - 3) ||
      (to[0] === from[0] + 1 && to[1] === from[1] - 3) ||
      (to[0] === from[0] - 1 && to[1] === from[1] + 3) ||
      (to[0] === from[0] + 1 && to[1] === from[1] + 3) ||
      (to[0] === from[0] - 3 && to[1] === from[1] - 1) ||
      (to[0] === from[0] + 3 && to[1] === from[1] - 1) ||
      (to[0] === from[0] - 3 && to[1] === from[1] + 1) ||
      (to[0] === from[0] + 3 && to[1] === from[1] + 1)) {
    ret = true;
  }
  return ret;
};

module.exports = Square;
