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
  this.color = color;
  this.value = value;

  this.pieceValues = {
    white: {
      pyramids: [91],
    },
    black: {
      pyramid: [190],
    },
  };
}


/**
 * Find the piece's color based on its value.
 * @param {int} value The piece's value.
 * @return {String} The piece's color.
 */
Piece.prototype.findColor = function findColor(value) {
  let ret;
  for (const color in this.possibleValues) {
    if (this.possibleValues[color].includes(value)) {
      ret = color;
    }
  }
  return ret;
};

module.exports.Piece = Piece;
