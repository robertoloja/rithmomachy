/*****************************************************************************
 * Game pieces. 
 *  Each shape is a subclass of Piece. Thus, the shape of the 
 *  piece should be determined by the instanceof operator, or by getting the
 *  name of the constructor (e.g. variableName.constructor.name).
 *
 *  Piece contains the isDestinationInBoard() function, which should be invoked by each 
 *  subclass' move() function. The updatePosition() function should also be
 *  called once a move has been verified.
 *
 *  Subclasses are Round, Triangle, Square, and Pyramid.
 *
 *  Position is an array, [x, y].
 *
 *****************************************************************************/

var Piece = function (color, position) {
	this.color = color;
	this.position = position;
};

// This ensures that a move is within the limits of the board. 
Piece.prototype.isDestinationInBoard = function (destination) {
	if(destination[0] > 7 || destination[0] < 0 ||
	   destination[1] > 15 || destination[1] < 0) {
        return false;
	} else {
		return true;
	}
};

Piece.prototype.addToBoard = function () {
	gameBoard[this.position[1]][this.position[0]] = this;
};

// This both updates the piece's position property and repositions the piece
// on the board.
Piece.prototype.updatePosition = function (destination) {
	gameBoard[this.position[1]][this.position[0]] = 0;
	gameBoard[destination[1]][destination[0]] = this;

	// Copy by value.
	this.position = destination.slice();
};


/*****************************************************************************
 * Rounds. 
 *
 *	Movement: 
 *		Regular: Diagonally, single square.
 *		Flying:	 Rounds do not fly.
 *
 *	Values:  
 *		Light:	2, 4, 6, 8, and their squares.
 *		Dark:	3, 5, 7, 9, and their squares.
 *
 *****************************************************************************/

function Round(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.addToBoard(position);
	this.possibleMoves = {
		normal: this.findNormalMoves(),
		flying: []
	};
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;

Round.prototype.findLegalMoves = function() {
	var candidateMoves = [
		[this.position[0] + 1, this.position[1] + 1],
		[this.position[0] - 1, this.position[1] + 1],
		[this.position[0] + 1, this.position[1] - 1],
		[this.position[0] - 1, this.position[1] - 1],
	];

	var legalMoves = candidateMoves.filter(isDestinationInBoard(move));

	return legalMoves;
};

Round.prototype.move = function(destination) {
	var err = this.isDestinationInBoard(destination);
	if (err === -1) {
		return err;
	}

	if((destination[0] !== this.position[0] - 1) && 
	   (destination[0] !== this.position[0] + 1) &&
	   (destination[1] !== this.position[1] - 1) &&
	   (destination[1] !== this.position[1] + 1)) {
		console.log("Illegal move for round piece.");
		return -1;

	} else if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
		return -1;

	} else {
		this.updatePosition(destination);
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

function Triangle(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	this.addToBoard(position);
	this.possibleMoves = this.findLegalMoves();
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.move = function(destination) {
	var err = this.isDestinationInBoard(destination);
	if (err === -1) {
		return err;
	}

	// Regular move, vertical.
	if((destination[0] !== this.position[0])	 &&
	   (destination[1] !== this.position[1] + 2) &&
	   (destination[1] !== this.position[1] - 2) &&
	   (destination[1] !== this.position[1])	 &&
	   (destination[0] !== this.position[0] + 2) &&
	   (destination[0] !== this.position[0] - 2)) {
		console.log("Illegal move for triangular piece.");
		return -1;

	} else if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
		return -1;

	} else {
		this.updatePosition(destination);
	}
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
