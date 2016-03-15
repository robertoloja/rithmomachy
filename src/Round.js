'use strict';
const Piece = require('./Piece.js').Piece;

/**
 * Represents a round game piece.
 * @classdesc Rounds move a single square, diagonally, and never fly.
 *			  Light values: 2, 4, 6, 8, and their squares.
 *			  Dark values:  3, 5, 7, 9, and their squares.
 * @constructor
 * @extends Piece
 * @param {number} value - This piece's number value.
 * @return {Round} or false.
 */
function Round(value) {
  Piece.call(value, this.findColor(value));
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;

Round.prototype.possibleValues = {
  white: [2, 4, 6, 8, 16, 36, 64],
  black: [3, 5, 7, 9, 25, 49, 81],
};

/**
 * Populates Piece.possibleMoves with moves that are on the board, follow this
 * piece's movement rules, and land on empty squares.
 */
Round.prototype.findLegalMoves = function findLegalMoves() {
  this.possibleMoves.normal = [
    [this.position[0] + 1, this.position[1] + 1],
    [this.position[0] - 1, this.position[1] + 1],
    [this.position[0] + 1, this.position[1] - 1],
    [this.position[0] - 1, this.position[1] - 1],
  ].filter(move => this.isDestinationInBoard(move));
};


module.exports = Round;
