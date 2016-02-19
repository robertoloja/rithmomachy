gameBoard = require('./main.js').gameBoard;

/**
 * Represents a game piece. 
 * @classdesc Parent class of Round, Triangle, Square, and Pyramid. Find the
 *			  particular subclass by variableName.constructor.name.
 * @constructor
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 */
var Piece = function (color, position) {
	this.color = color;
	this.position = position;
	this.addToBoard();
};


/**
 * Checks if a move destination is within the board's boundaries.
 * @param {number[]} destination - A coordinate, [x,y].
 * @return true if in board, false otherwise.
 */
Piece.prototype.isDestinationInBoard = function (destination) {
	if(destination[0] > 7 || destination[0] < 0 ||
	   destination[1] > 15 || destination[1] < 0) {
        return false;
	} else {
		return true;
	}
};

/**
 * Checks if there is a piece in between this and the destination, including
 * at the destination.
 * @param {number[]} destination - A coordinate, [x,y].
 * @todo Rewrite this stupid function. Rows don't need to be checked if the 
 * movement is vertical, and columns don't need to be checked if the movement
 * is horizontal.
 * @return true is blocked, false otherwise.
 */
Piece.prototype.isPieceBlocking = function (destination) {
	var diff = [this.position[0] - destination[0],
				this.position[1] - destination[1]];

	if (gameBoard[destination[1]][destination[0]] !== 0) {
		return true;

	// If destination is to the left
	} else if (diff[0] > 0) {
		// Check each square till destination
		for (var i = this.position[0]; i >= destination[0]; i--) {
			if (gameBoard[i][destination[1]] !== 0) {
				return true;
			}
		}
	// If it's to the right
	} else if (diff[0] < 0) { 
		for (var j = this.position[0]; j <= destination[0]; j++) {
			if (gameBoard[j][destination[1]] !== 0) {
				return true;
			}
		}
	// If it's above
	} else if (diff[1] > 0) {
		for (var h = this.position[1]; h >= destination[1]; h--) {
			if (gameBoard[destination[0]][h] !== 0) {
				return true;
			}
		}
	// If it's below
	} else if (diff[1] < 0) {
		for (var k = this.position[1]; k <= destination[1]; k++) {
			if (gameBoard[destination[0]][k] !== 0) {
				return true;
			}
		}
	}
	return false;
};


/**
 * Adds a piece to the game board. Invoked via the "this" keyword.
 */
Piece.prototype.addToBoard = function () {
	gameBoard[this.position[1]][this.position[0]] = this;
};


/**
 * Changes Piece.position to the destination of a move, updates the game board,
 * recalculates Piece.possibleMoves.
 */
Piece.prototype.updatePosition = function (destination) {
	gameBoard[this.position[1]][this.position[0]] = 0;
	gameBoard[destination[1]][destination[0]] = this;

	// Copy by value.
	this.position = destination.slice();

	// Finally, update list of legal positions.
	this.findLegalMoves();

	// Here's the only real linkup to the interface. Irrelevant for now.
	//drawPieces();
};

module.exports.Piece = Piece;
