'use strict';
const Piece = require('./Piece.js');

/**
 * Represents a triangular game piece.
 * @classdesc Triangles move two squares horizontally or vertically, if
 *			  path is unobstructed. They fly just as knights in chess.
 *              white: [6, 9, 16, 20, 42, 72, 9, 25, 49, 81],
 *              black: [12, 25, 36, 30, 56, 90, 16, 36, 64, 100],
 * @constructor
 * @extends Piece
 * @param {number} value - This piece's number value.
 * @param {String} color The piece's color.
 */
function Triangle(value, color) {
  Piece.call(this, value, color);
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;


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
