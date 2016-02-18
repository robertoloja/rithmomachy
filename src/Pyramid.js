var gameBoard = require('./main.js').gameBoard;
var Piece = require('./Piece.js').Piece;

/**
 * Represents a pyramidal game piece. 
 * @classdesc Pyramids contain pieces of other types, and can move in the same
 *			  way as any of its constituent pieces. The pyramid's starting
 *			  value is the sum of their constituents.
 *			  Light values: 15, 25, 45, 81,  169, 153, 289.
 *			  Dark values:  28, 49, 66, 120, 121, 225, 361.
 * @constructor
 * @extends Piece
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 * @param {Piece[]} constituents - All the Pieces that make up this pyramid.
 */

function Pyramid(color, position, constituents) {
	Piece.call(this, color, position);
	this.constituents = constituents; 
	this.addToBoard();
	this.findLegalMoves();
}

Pyramid.prototype = Object.create(Piece.prototype);
Pyramid.prototype.constructor = Pyramid;

Pyramid.prototype.add = function (piece) {
	this.constituents.push(piece);
	this.value += piece.value;
};

Pyramid.prototype.remove = function (piece) {
	// I'll have to find the piece, by shape and value.
};

Pyramid.prototype.findLegalMoves = function () {
	// TODO: Change this FOR OF into FOR IN.
	for (var piece of this.constituents) {
		this.possibleMoves = piece.possibleMoves;
	}
};

module.exports = Pyramid;
