Piece = require('./Piece.js').Piece;

/**
 * Represents a triangular game piece. 
 * @classdesc Triangles move two squares horizontally or vertically, if
 *			  path is unobstructed. They fly just as knights in chess.
 *			  Light values: 6, 9, 20, 25, 42, 49, 72, 81.
 *			  Dark values:  12, 16, 30, 36, 56, 64, 90, 100.
 * @constructor
 * @extends Piece
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 * @param {number} value - This piece's number value.
 */
function Triangle(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.possibleMoves = {
		normal: [],
		flying: []
	};
	this.findLegalMoves();
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;


/**
 * Populates Piece.possibleMoves with moves that are on the board, follow this
 * piece's movement rules, and land on empty squares.
 */
Triangle.prototype.findLegalMoves = function () {
	this.possibleMoves.normal = [
		[this.position[0], this.position[1] - 2],
		[this.position[0], this.position[1] + 2],
		[this.position[0] - 2, this.position[1]],
		[this.position[0] + 2, this.position[1]]
	].filter(move => this.isDestinationInBoard(move));

	this.possibleMoves.flying = [
		[this.position[0] - 1, this.position[1] - 2],
		[this.position[0] + 1, this.position[1] - 2],
		[this.position[0] - 2, this.position[1] - 1],
		[this.position[0] - 2, this.position[1] + 1],
		[this.position[0] - 1, this.position[1] + 2],
		[this.position[0] + 1, this.position[1] + 2],
		[this.position[0] + 2, this.position[1] + 1],
		[this.position[0] + 2, this.position[1] - 1]
	].filter(move => this.isDestinationInBoard(move));
};

module.exports = Triangle;
