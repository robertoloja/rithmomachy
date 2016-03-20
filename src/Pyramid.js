'use strict';
const Piece = require('./Piece.js');
const Round = require('./Round.js');
const Triangle = require('./Triangle.js');
const Square = require('./Square.js');

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
  this.constituents = [];
  this.generateConstituents(constituents);
  this.value = this.calculateValue();
  Piece.call(this, this.value, color);
}

Pyramid.prototype = Object.create(Piece.prototype);
Pyramid.prototype.constructor = Pyramid;

Pyramid.prototype.generateConstituents = function generateConstituents(arr) {
  arr.forEach(x => {
    this.add(x[0], x[1], x[2]);
  });
};

Pyramid.prototype.add = function add(value, type, color) {
  let Type = {};

  if (type === 'round') {
    Type = Round;
  } else if (type === 'triangle') {
    Type = Triangle;
  } else if (type === 'square') {
    Type = Square;
  }
  this.constituents.push(new Type(value, color));
  this.value += value;
};

Pyramid.prototype.remove = function remove(value, type, color) {
  for (let i = 0; i < this.constituents.length; i++) {
    if (this.constituents[i].value === value &&
        this.constituents[i].color === color &&
        this.constituents[i].constructor.name.toLowerCase() === type) {
      this.value -= this.constituents[i].value;
      this.constituents.splice(i, 1);
      break;
    }
  }
};

Pyramid.prototype.calculateValue = function calculateValue() {
  let sum = 0;

  for (const piece of this.constituents) {
    sum += piece.value;
  }
  return sum;
};


module.exports = Pyramid;
