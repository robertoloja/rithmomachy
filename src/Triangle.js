'use strict';
const Piece = require('./Piece.js');

/**
 * Represents a triangular game piece.
 * @classdesc Triangles move two squares horizontally or vertically, if
 *			  path is unobstructed. They fly just as knights in chess.
 *			  Light values: 6, 9, 20, 25, 42, 49, 72, 81.
 *			  Dark values:  12, 16, 30, 36, 56, 64, 90, 100.
 * @constructor
 * @extends Piece
 * @param {number} value - This piece's number value.
 */
function Triangle(color, position, value) {
  Piece.call(this, value, this.findColor(value));
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.possibleValues = {
  white: [6, 20, 42, 72, 9, 25, 49, 81],
  black: [12, 30, 56, 90, 16, 36, 64, 100],
};

/**
 * Determine whether an attempted normal move is a legal move.
 * @param {int[]} from Origin coordinates, [x, y].
 * @param {int[]} to Destination coordinates, [x, y].
 */
Triangle.prototype.moveIsValidNormal = function moveIsValidNormal(from, to) {
  let ret = false;
  if ((to[0] === from[0] && to[1] === from[1] + 2) ||
      (to[0] === from[0] && to[1] === from[1] - 2) ||
      (to[0] === from[0] - 2 && to[1] === from[1]) ||
      (to[0] === from[0] + 2 && to[1] === from[1])) {
    ret = true;
  }
  return ret;
};

Triangle.prototype.moveIsValidFlying = function moveIsValidFlying(from, to) {
  let ret = false;
  if ((to[0] === from[0] - 1 && to[1] === from[1] - 2) ||
      (to[0] === from[0] + 1 && to[1] === from[1] - 2) ||
      (to[0] === from[0] - 2 && to[1] === from[1] - 1) ||
      (to[0] === from[0] - 2 && to[1] === from[1] + 1) ||
      (to[0] === from[0] - 1 && to[1] === from[1] + 2) ||
      (to[0] === from[0] + 1 && to[1] === from[1] + 2) ||
      (to[0] === from[0] + 2 && to[1] === from[1] + 1) ||
      (to[0] === from[0] + 2 && to[1] === from[1] - 1)) {
    ret = true;
  }
  return ret;
};

module.exports = Triangle;
