'use strict';
/**
 * Represents a game piece.
 * @classdesc Parent class of Round, Triangle, Square, and Pyramid. Find the
 *			  particular subclass by variableName.constructor.name.
 * @constructor
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 */
function Piece(value, color) {
  this.value = value;
  this.color = color;
}


/**
 * Find the piece's color based on its value.
 * @param {int} value The piece's value.
 * @return {String} The piece's color.
 */
Piece.prototype.findColor = function findColor(value) {
  let ret;
  for (const color in this.possibleValues) {
    if (this.possibleValues[color].indexOf(value) !== -1) {
      ret = color;
    }
  }
  return ret;
};

Piece.prototype.moveIsValid = function moveIsValid(from, to) {
  let ret = false;

  if (this.moveIsValidNormal(from, to)) {
    ret = 1;
  } else if (this.moveIsValidFlying(from, to)) {
    ret = 2;
  }
  return ret;
};

module.exports = Piece;
