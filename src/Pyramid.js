'use strict';
const Piece = require('./Piece.js').Piece;

/**
 * Represents a pyramidal game piece.
 * @classdesc Pyramids contain pieces of other types, and can move in the same
 *			  way as any of its constituent pieces. The pyramid's starting
 *			  value is the sum of their constituents.
 * @constructor
 * @extends Piece
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {Piece[]} constituents - All the Pieces that make up this pyramid.
 */
function Pyramid(color, constituents) {
  this.constituents = constituents;
  this.value = this.calculateValue();
  Piece.call(this.value, color);
}

Pyramid.prototype = Object.create(Piece.prototype);
Pyramid.prototype.constructor = Pyramid;

Pyramid.prototype.add = function add(piece) {
  this.constituents.push(piece);
  this.value += piece.value;
};

Pyramid.prototype.remove = function remove(pieceIndex) {
  this.value -= this.constituents[pieceIndex].value;
  this.constituents.splice(pieceIndex, 1);
};

Pyramid.prototype.calculateValue = function calculateValue() {
  let sum = 0;

  for (const piece of this.constituents) {
    sum += piece.value;
  }
  return sum;
};


module.exports = Pyramid;
