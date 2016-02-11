/**
 * This file is included in the HTML document, at the top. Thus, it defines
 * gloval variables for the project.
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

/**
 * The game board is a 2D array, containing either Piece objects or 0.
 **/
var gameBoard = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * The pieces array contains every piece in play. It can be iterated over to
 * position all pieces on the board.
 **/
var pieces = [];
