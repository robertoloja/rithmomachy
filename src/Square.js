'use strict';
const Piece = require('./Piece.js');

/**
 * Represents a square game piece.
 * @classdesc Squares move three squares horizontally or vertically, if
 *			  path is unobstructed. They fly similarly to knights in chess,
 *			  but .
 *              white: [15, 25, 36, 45, 153, 25, 81, 169, 289],
 *              black: [28, 66, 120, 49, 64, 121, 225, 361],
 * @constructor
 * @extends Piece
 * @param {Number} value - This piece's number value.
 * @param {String} color This piece's color.
 */
function Square(value, color) {
  Piece.call(this, value, color);
}

Square.prototype = Object.create(Piece.prototype);
Square.prototype.constructor = Square;


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
