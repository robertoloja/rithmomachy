'use strict';
const Piece = require('./Piece.js');

/**
 * Represents a round game piece.
 * @classdesc Rounds move a single square, diagonally, and never fly.
 *			  Light values: 2, 4, 6, 8, and their squares.
 *			  Dark values:  3, 5, 7, 9, and their squares.
 * @constructor
 * @extends Piece
 * @param {number} value - This piece's number value.
 */
function Round(value) {
  Piece.call(this, value, this.findColor(value));
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;

Round.prototype.possibleValues = {
  white: [2, 4, 6, 8, 16, 36, 64],
  black: [3, 5, 7, 9, 25, 49, 81],
};

/**
 * Determine whether an attempted normal move is a legal move.
 * @param {int[]} from Origin coordinates, [x, y].
 * @param {int[]} to Destination coordinates, [x, y].
 */
Round.prototype.moveIsValidNormal = function moveIsValidNormal(from, to) {
  let ret = false;
  if ((to[0] === from[0] + 1 && to[1] === from[1] + 1) ||
      (to[0] === from[0] - 1 && to[1] === from[1] + 1) ||
      (to[0] === from[0] - 1 && to[1] === from[1] - 1) ||
      (to[0] === from[0] + 1 && to[1] === from[1] - 1)) {
    ret = true;
  }
  return ret;
};

Round.prototype.moveIsValidFlying = function moveIsValidFlying() {
  return false;
};

module.exports = Round;
