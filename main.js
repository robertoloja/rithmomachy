/**
 * Game pieces.
 **/
var Piece = function (color, value, position) {
	this.color = color;
	this.value = value;
	this.position = position;
};

Piece.prototype.checkMove = function (destination) {
	if(destination[0] > 7 || destination[0] < 0 ||
	   destination[1] > 15 || destination[1] < 0) {
		console.log("Move destination is off the board.");
        return -1;
	} else {
		return destination;
	}
};

function Round(color, value, position) {
	Piece.call(this, color, value, position);
}

Round.prototype = Object.create(Piece.prototype);
Round.prototype.constructor = Round;

Round.prototype.move = function(destination) {
	// Rounds only move diagonally, one square.
	if (this.shape === "round") {
		if((destination[0] !== position[0] - 1) || 
		   (destination[0] !== position[0] + 1) ||
		   (destination[1] !== position[1] - 1) ||
		   (destination[1] !== position[1] + 1)) {
			console.log("Illegal move for round piece.");
			return -1;
		}
	}

	if (gameBoard[destination[0]][destination[1]] !== 0) {
		console.log("Destination square is occupied.");
	}
};

/**
 * Presentation logic.
 **/
function generateBoard() {
	var col_labels = " abcdefgh".split("");
	document.write("<table class='game-board'>");

	for (var i = 17; i > 0; i--) {
		document.write("<tr class='game-board-row' id='" + i + "'>");

		for (var col of col_labels) {
			if (col === " ") {
				document.write("<td class='col-label' id='" +
							   "_" + i + "'>");
				document.write((i === 17 ? " " : i));
				document.write("</td>");
			} else if (i === 17) {
				document.write("<td class='col-label' id='" +
							   "_" + col + "'>");
			    document.write(col.toUpperCase());
				document.write("</td>");
			} else {
				document.write("<td class='game-cell' id='" +
							   col + i + "'>");
			}
		}
	}
	document.write("</table>");
}
