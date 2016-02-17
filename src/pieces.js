var gameBoard = require('./main.js');
module.exports = Round;
// TODO: Tests.
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
	this.possibleMoves = {
		normal: [],
		flying: []
	};
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
Piece.prototype.updatePosition = function (destination, obj) {
	gameBoard[obj.position[1]][obj.position[0]] = 0;
	gameBoard[destination[1]][destination[0]] = obj;

	// Copy by value.
	obj.position = destination.slice();

	// Finally, update list of legal positions.
	obj.findLegalMoves();

	// Here's the only real linkup to the interface.
	drawPieces();
};

/*************************************************************************/

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
	this.addToBoard();
	this.findLegalMoves();
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;


/**
 * Populates Piece.possibleMoves with moves that are on the board, follow this
 * piece's movement rules, and land on empty squares.
 */
Round.prototype.findLegalMoves = function() {
	var candidateMoves = [
		[this.position[0] + 1, this.position[1] + 1],
		[this.position[0] - 1, this.position[1] + 1],
		[this.position[0] + 1, this.position[1] - 1],
		[this.position[0] - 1, this.position[1] - 1],
	];

	var legalMoves = candidateMoves.filter( move => Piece.prototype
												.isDestinationInBoard(move));
		// The "this" keyword returns the Window when called from the console.
		// Investigate if this is the case when called in-program.

	this.possibleMoves.normal = legalMoves;
};


/**
 * Moves the Round piece. Ensures move is legal. 
 * @param {number[]} destination - A coordinate, [x, y].
 */
Round.prototype.move = function(destination) {
	for (var t of this.possibleMoves.normal) {
	// This is because I cannot find a way to compare internal arrays of arrays
		if (destination.toString() == t.toString() &&
			!this.isPieceBlocking(destination)) {
			Piece.prototype.updatePosition(destination, this);
		}
	}
};

/*************************************************************************/

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
	this.addToBoard();
	this.findLegalMoves();
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;


/**
 * Moves the Triangle piece. Ensures move is legal. 
 * @param {number[]} destination - A coordinate, [x, y].
 * @return 0 if move completed, -1 otherwise.
 */
Triangle.prototype.move = function(destination) {
	for (var t of this.possibleMoves.normal) {
		if (destination.toString() == t.toString() &&
			!this.isPieceBlocking(destination)) {

			Piece.prototype.updatePosition(destination, this);
			return 0;
		}
	}

	for (var p of this.possibleMoves.flying) {
		if (destination.toString() == p.toString() &&
			!this.isPieceBlocking(destination)) {

			Piece.prototype.updatePosition(destination, this);
			return 0;
		}
	}
	return -1;
};


/**
 * Populates Piece.possibleMoves with moves that are on the board, follow this
 * piece's movement rules, and land on empty squares.
 */
Triangle.prototype.findLegalMoves = function () {
	var candidateMoves = {
		normal:	[
			[this.position[0], this.position[1] - 2],
			[this.position[0], this.position[1] + 2],
			[this.position[0] - 2, this.position[1]],
			[this.position[0] + 2, this.position[1]]
		],

		flying: [
			[this.position[0] - 1, this.position[1] - 2],
			[this.position[0] + 1, this.position[1] - 2],
			[this.position[0] - 2, this.position[1] - 1],
			[this.position[0] - 2, this.position[1] + 1],
			[this.position[0] - 1, this.position[1] + 2],
			[this.position[0] + 1, this.position[1] + 2],
			[this.position[0] + 2, this.position[1] + 1],
			[this.position[0] + 2, this.position[1] - 1]
		]
	};

	candidateMoves.normal = candidateMoves.normal.filter(move => Piece
												.prototype
												.isDestinationInBoard(move));
	
	candidateMoves.flying = candidateMoves.flying.filter(move => Piece
												.prototype
												.isDestinationInBoard(move));
	
	this.possibleMoves.normal = candidateMoves.normal;
	this.possibleMoves.flying = candidateMoves.flying;
};


/*************************************************************************/

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
	this.addToBoard();
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

			Piece.prototype.updatePosition(destination, this);
			return 0;
		}
	}

	for (var p of this.possibleMoves.flying) {
		if (destination.toString() == p.toString() &&
			!this.isPieceBlocking(destination)) {

			Piece.prototype.updatePosition(destination, this);
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
	var candidateMoves = {
		normal:	[
			[this.position[0], this.position[1] - 3],
			[this.position[0], this.position[1] + 3],
			[this.position[0] - 3, this.position[1]],
			[this.position[0] + 3, this.position[1]]
		],

		flying: [
			[this.position[0] - 1, this.position[1] - 3],
			[this.position[0] + 1, this.position[1] - 3],
			[this.position[0] - 3, this.position[1] - 1],
			[this.position[0] - 3, this.position[1] + 1],
			[this.position[0] - 1, this.position[1] + 3],
			[this.position[0] + 1, this.position[1] + 3],
			[this.position[0] + 3, this.position[1] + 1],
			[this.position[0] + 3, this.position[1] - 1]
		]
	};

	candidateMoves.normal = candidateMoves.normal.filter(move => Piece
												.prototype
												.isDestinationInBoard(move));
	
	candidateMoves.flying = candidateMoves.flying.filter(move => Piece
												.prototype
												.isDestinationInBoard(move));
	
	this.possibleMoves.normal = candidateMoves.normal;
	this.possibleMoves.flying = candidateMoves.flying;
};

/*************************************************************************/

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
	this.value = value;
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
	for (var piece of this.constituents) {
		this.possibleMoves = piece.possibleMoves;
	}
};
