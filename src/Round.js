gameBoard = require('./main.js').gameBoard;
Piece = require('./Piece.js').Piece;

/**
 * Represents a round game piece. 
 * @classdesc Rounds move a single square, diagonally, and never fly.
 *			  Light values: 2, 4, 6, 8, and their squares.
 *			  Dark values:  3, 5, 7, 9, and their squares.
 * @constructor
 * @extends Piece
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 * @param {number} value - This piece's number value.
 */
function Round(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.possibleMoves = {
		normal: []
	};
	this.findLegalMoves();
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;


/**
 * Populates Piece.possibleMoves with moves that are on the board, follow this
 * piece's movement rules, and land on empty squares.
 */
Round.prototype.findLegalMoves = function() {
	this.possibleMoves.normal = [
		[this.position[0] + 1, this.position[1] + 1],
		[this.position[0] - 1, this.position[1] + 1],
		[this.position[0] + 1, this.position[1] - 1],
		[this.position[0] - 1, this.position[1] - 1],
	].filter( move => Piece.prototype.isDestinationInBoard(move));
};


/**
 * Moves the Round piece. Ensures move is legal. 
 * @param {number[]} destination - A coordinate, [x, y].
 */
Round.prototype.move = function(destination) {
	var normalMoves = this.possibleMoves.normal;

	for (var i of normalMoves) {
	// This is because I cannot find a way to compare internal arrays of arrays
		if (destination.toString() === i.toString() &&
			!this.isPieceBlocking(destination)) {
			this.updatePosition(destination);
		}
	}
};

module.exports = Round;
