var Piece = function (color, shape, value, position) {
	this.color = color;
	this.shape = shape;
	this.value = value;
	this.position = position;
};

Piece.prototype.move = function(destination) {
	if(destination[0] > 7 || destination[0] < 0 ||
	   destination[1] > 15 || destination[1] < 0) {
		console.log("Move destination is off the board.");
        return -1;
	}

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
