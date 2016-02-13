// TODO: Line 87.
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

	// If destination is to the left
	if (diff[0] > 0) {
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
	this.addToBoard(position);
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


Round.prototype.isPieceBlocking = function (destination) {
	if (gameBoard[destination[1]][destination[0]] !== 0) {
		return true;
	}
	return false;
};

/**
 * Moves the Round piece. Ensures move is legal. 
 * @param {number[]} destination - A coordinate, [x, y].
 * @todo Check if destination is occupied and if there was a piece in the way.
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


/******************************************************************************
 * Triangles. 
 *
 *	Movement: 
 *		Regular: Horizontally or vertically, two squares, if unobstructed.
 *		Flying:	 A knight's move.
 *
 *	Values:
 *		Light:	6, 9, 20, 25, 42, 49, 72, 81.
 *		Dark:	12, 16, 30, 36, 56, 64, 90, 100.
 *
 *****************************************************************************/

/**
 * Represents a triangular game piece. 
 * @classdesc Rounds move two squares horizontally or vertically, if
 *			  path is unobstructed. They fly just as knights in chess.
 * @constructor
 * @extends Piece
 * @param {string} color - Light or dark; which player controls this piece.
 * @param {number[]} position - Position on the board. Two integers, [x, y].
 * @param {number} value - This piece's number value.
 */
function Triangle(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.addToBoard(position);
	this.findLegalMoves();
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.move = function(destination) {
	for (var t of this.possibleMoves.normal) {
		if (destination.toString() == t.toString() &&
			!this.isPieceBlocking(destination)) {

			Piece.prototype.updatePosition(destination, this);
		}
	}
};

Triangle.prototype.findLegalMoves = function () {
	var candidateMoves = {
		normal:	[
			[this.position[0] - 1, this.position[1] - 2],
			[this.position[0] + 1, this.position[1] - 2],
			[this.position[0] - 2, this.position[1] - 1],
			[this.position[0] - 2, this.position[1] + 1],
			[this.position[0] - 1, this.position[1] + 2],
			[this.position[0] + 1, this.position[1] + 2],
			[this.position[0] + 2, this.position[1] + 1],
			[this.position[0] + 2, this.position[1] - 1]
		],

		flying: [
			[this.position[0], this.position[1] - 2],
			[this.position[0], this.position[1] + 2],
			[this.position[0] - 2, this.position[1]],
			[this.position[0] + 2, this.position[1]],
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


/******************************************************************************
 * Squares. 
 *
 *	Movement: 
 *		Regular: Horizontally or vertically, three squares, if unobstructed.
 *		Flying:	 An extended knight's move, landing to either side of a normal
 *				 square move.
 *
 *	Values:
 *		Light:	15, 25, 45, 81,  169, 153, 289.
 *		Dark:	28, 49, 66, 120, 121, 225, 361.
 *
 *****************************************************************************/

function Square(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.addToBoard(position);
	this.possibleMoves = this.findLegalMoves();
}

Square.prototype = Object.create(Piece.prototype);
Square.prototype.constructor = Square;

Square.prototype.move = function(destination) {
	var err = this.isDestinationInBoard(destination);
	if (err === -1) {
		return err;
	}

	// Regular move, vertical.
	if((destination[0] !== position[0]) || 
	   (destination[1] !== position[1] + 1)) {
		console.log("Illegal move for square piece.");
		return -1;

	} else if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
		return -1;

	} else {
		this.updatePosition(destination);
	}
};
