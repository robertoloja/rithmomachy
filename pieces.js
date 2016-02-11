/**
 * Game pieces. 
 *  Each shape is a subclass of Piece. Thus, the shape of the 
 *  piece should be determined by the instanceof operator, or by getting the
 *  name of the constructor (e.g. variableName.constructor.name).
 *
 *  Piece contains the checkMove() function, which should be invoked by each 
 *  subclass' move() function.
 *
 *  Subclasses are Round, Triangle, Square, and Pyramid.
 **/

var Piece = function (color, position) {
	this.color = color;
	this.position = position;
};

// This should be called at the start of every movement.
Piece.prototype.checkMove = function (destination) {
	if(destination[0] > 7 || destination[0] < 0 ||
	   destination[1] > 15 || destination[1] < 0) {
		console.log("Move destination is off the board.");
        return -1;
	} else {
		return destination;
	}
};


/**
 * Rounds. 
 *
 *	Movement: 
 *		Regular: Diagonally, single square.
 *		Flying:	 Rounds do not fly.
 *
 *	Values:  
 *		Light:	2, 4, 6, 8, and their squares.
 *		Dark:	3, 5, 7, 9, and their squares.
 **/

function Round(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	pieces.push(this);
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;

Round.prototype.move = function(destination) {
	var err = this.checkMove(destination);
	if (err === -1) {
		return err;
	}

	if((destination[0] !== position[0] - 1) || 
	   (destination[0] !== position[0] + 1) ||
	   (destination[1] !== position[1] - 1) ||
	   (destination[1] !== position[1] + 1)) {
		console.log("Illegal move for round piece.");
		return -1;

	} else if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
		return -1;

	} else {
		this.position = destination;
	}
};


/**
 * Triangles. 
 *
 *	Movement: 
 *		Regular: Horizontally or vertically, two squares, if unobstructed.
 *		Flying:	 A knight's move.
 *
 *	Values:
 *		Light:	6, 9, 20, 25, 42, 49, 72, 81.
 *		Dark:	12, 16, 30, 36, 56, 64, 90, 100.
 **/

function Triangle(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	pieces.push(this);
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.move = function(destination) {
	var err = this.checkMove(destination);
	if (err === -1) {
		return err;
	}

	// Regular move, vertical.
	if((destination[0] !== position[0]) || 
	   (destination[1] !== position[1] + 1)) {
		console.log("Illegal move for round piece.");
		return -1;

	} else if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
		return -1;

	} else {
		this.position = destination;
	}
};


/**
 * Squares. 
 *
 *	Movement: 
 *		Regular: Horizontally or vertically, three squares, if unobstructed.
 *		Flying:	 An extended knight's move, landing to either side of a normal
 *				 move.
 *
 *	Values:
 *		Light:	6, 9, 20, 25, 42, 49, 72, 81.
 *		Dark:	12, 16, 30, 36, 56, 64, 90, 100.
 **/

function Triangle(color, position, value) {
	Piece.call(this, color, position);
	this.value = value;
	pieces.push(this);
}

Triangle.prototype = Object.create(Piece.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.move = function(destination) {
	var err = this.checkMove(destination);
	if (err === -1) {
		return err;
	}

	// Regular move, vertical.
	if((destination[0] !== position[0]) || 
	   (destination[1] !== position[1] + 1)) {
		console.log("Illegal move for round piece.");
		return -1;

	} else if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
		return -1;

	} else {
		this.position = destination;
	}
};
