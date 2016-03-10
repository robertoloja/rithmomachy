gameBoard = require('./main.js').gameBoard;
Piece = require('./Piece.js').Piece;

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
		normal: [],
		flying: []
	};
	this.findLegalMoves();
}

Pyramid.prototype = Object.create(Piece.prototype);
Pyramid.prototype.constructor = Pyramid;

Pyramid.prototype.add = function (piece) {
	this.constituents.push(piece);
	this.value += piece.value;
};

Pyramid.prototype.remove = function (pieceIndex) {
	this.value -= this.constituents[pieceIndex].value;
	this.constituents.pop(pieceIndex, pieceIndex);
};

Pyramid.prototype.calculateValue = function () {
	var sum = 0;

	for (var piece of this.constituents) {
		sum += piece.value;
	}
	return sum;
};

Pyramid.prototype.findLegalMoves = function () {
	for (var piece of this.constituents) {
		piece.findLegalMoves();
		this.possibleMoves.normal.concat(piece.possibleMoves.normal);
		this.possibleMoves.flying.concat(piece.possibleMoves.flying);
	}
};

Pyramid.prototype.move = function (position) {
};

module.exports = Pyramid;
