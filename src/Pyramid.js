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
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 * @param {Piece[]} constituents - All the Pieces that make up this pyramid.
 */
function Pyramid(color, position, constituents) {
  Piece.call(this, color, position);
  this.constituents = constituents;
  this.value = this.calculateValue();
  this.possibleMoves = {
    normal: new Set(),
    flying: new Set(),
  };
  this.findLegalMoves();
}

Pyramid.prototype = Object.create(Piece.prototype);
Pyramid.prototype.constructor = Pyramid;

Pyramid.prototype.add = function add(piece) {
  this.constituents.push(piece);
  this.value += piece.value;
  this.findLegalMoves();
};

Pyramid.prototype.remove = function remove(pieceIndex) {
  this.value -= this.constituents[pieceIndex].value;
  this.constituents.pop(pieceIndex, pieceIndex);
  this.findLegalMoves();
};

Pyramid.prototype.calculateValue = function calculateValue() {
  let sum = 0;

  for (const piece of this.constituents) {
    sum += piece.value;
  }
  return sum;
};


Pyramid.prototype.findLegalMoves = function findLegalMoves() {
  for (const piece of this.constituents) {
    piece.findLegalMoves();
    piece.possibleMoves.normal.forEach(x => this.possibleMoves.normal.add(x));

    if (piece.constructor.name !== 'Round') {
      piece.possibleMoves.flying.forEach(x => this.possibleMoves
                                                  .flying.add(x));
    }
  }
};


// TODO: Write this in a way that uses the new version of update position.
Pyramid.prototype.move = function move(destination) {
  if (this.move(destination) === 0) {
    for (const piece of this.constituents) {
      piece.position = destination;
    }
  }
};

module.exports = Pyramid;
