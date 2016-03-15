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
Square.prototype.findLegalMoves = function findLegalMoves() {
  this.possibleMoves.normal = [
    [this.position[0], this.position[1] - 3],
    [this.position[0], this.position[1] + 3],
    [this.position[0] - 3, this.position[1]],
    [this.position[0] + 3, this.position[1]],
  ].filter(move => this.isDestinationInBoard(move));

  this.possibleMoves.flying = [
    [this.position[0] - 1, this.position[1] - 3],
    [this.position[0] + 1, this.position[1] - 3],
    [this.position[0] - 3, this.position[1] - 1],
    [this.position[0] - 3, this.position[1] + 1],
    [this.position[0] - 1, this.position[1] + 3],
    [this.position[0] + 1, this.position[1] + 3],
    [this.position[0] + 3, this.position[1] + 1],
    [this.position[0] + 3, this.position[1] - 1],
  ].filter(move => this.isDestinationInBoard(move));
};

module.exports = Square;
