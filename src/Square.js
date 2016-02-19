gameBoard = require('./main.js').gameBoard;
Piece = require('./Piece.js').Piece;

/**
 * Represents a square game piece. 
 * @classdesc Squares move three squares horizontally or vertically, if
 *			  path is unobstructed. They fly similarly to knights in chess,
 *			  but .
 *			  Light values: 15, 25, 45, 81,  169, 153, 289.
 *			  Dark values:  28, 49, 66, 120, 121, 225, 361.
 * @constructor
 * @extends Piece
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 * @param {number} value - This piece's number value.
 */
function Square(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.possibleMoves = {
		normal: [],
		flying: []
	};
	this.findLegalMoves();
}

Square.prototype = Object.create(Piece.prototype);
Square.prototype.constructor = Square;


/**
 * Moves the Square piece. Ensures move is legal. 
 * @param {number[]} destination - A coordinate, [x, y].
 * @return 0 if move completed, -1 otherwise.
 */
Square.prototype.move = function(destination) {
	for (var t of this.possibleMoves.normal) {
		if (destination.toString() == t.toString() &&
			!this.isPieceBlocking(destination)) {

			this.updatePosition(destination);
			return 0;
		}
	}

	for (var p of this.possibleMoves.flying) {
		if (destination.toString() == p.toString() &&
			gameBoard[destination[1]][destination[0]] === 0) {

			this.updatePosition(destination);
			return 0;
		}
	}
	return -1;
};


/**
 * Populates Piece.possibleMoves with moves that are on the board and follow
 * this piece's movement rules.
 */
Square.prototype.findLegalMoves = function () {
	this.possibleMoves.normal = [
		[this.position[0], this.position[1] - 3],
		[this.position[0], this.position[1] + 3],
		[this.position[0] - 3, this.position[1]],
		[this.position[0] + 3, this.position[1]]
	].filter(move => this.isDestinationInBoard(move));

	this.possibleMoves.flying = [
		[this.position[0] - 1, this.position[1] - 3],
		[this.position[0] + 1, this.position[1] - 3],
		[this.position[0] - 3, this.position[1] - 1],
		[this.position[0] - 3, this.position[1] + 1],
		[this.position[0] - 1, this.position[1] + 3],
		[this.position[0] + 1, this.position[1] + 3],
		[this.position[0] + 3, this.position[1] + 1],
		[this.position[0] + 3, this.position[1] - 1]
	].filter(move => this.isDestinationInBoard(move));
};

module.exports = Square;
