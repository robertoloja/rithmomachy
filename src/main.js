/**
 * The game board is a 2D array, containing either Piece objects or 0.
 *
 * N.B.: JavaScript, being JavaScript, has no reliable way to compare 
 *		 inner arrays in 2D arrays. The hack used throughout is to iterate
 *		 over the outer array, then Array.toString() the inner arrays to
 *		 compare with other Array.toString()'ed functions.
 * 
 * This file is included in the HTML document, at the top. Thus, it defines
 * gloval variables for the project.
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
module.exports.gameBoard = gameBoard;


/**
 * Generates the HTML board, naming each row after its number (labels are _x,
 * where x is the number) and each cell as, e.g., "a16" for gameBoard[0][0].
 **/
function generateBoard() {
	var col_labels = " abcdefgh".split("");

	document.write("<table class='game-board'>");

	for (var i = 17; i > 0; i--) {
		document.write("<tr class='game-board-row' id='" + i + "'>");

		for (var col of col_labels) {
			if (col === " ") {
				document.write("<td class='col-label' id='" + "_" + i + "'>");
				document.write((i === 17 ? " " : i));
				document.write("</td>");
			} else if (i === 17) {
				document.write("<td class='col-label' id='" + "_" + col + 
							   "'>");
			    document.write(col.toUpperCase());
				document.write("</td>");
			} else {
				document.write("<td class='game-cell' id='" + col + i + "'>");
			}
		}
	}
	document.write("</table>");
}

/**
 * Iterates over the entire gameBoard, clearing cells filled with 0 and
 * drawing cells that have game pieces in them.
 *
 * TODO: Currently only handles Rounds and Triangles.
 **/
function drawPieces() {
	for (var row = 0; row < gameBoard.length; row++) {
		for (var col = 0; col < gameBoard[0].length; col++) {
			var cell = document.getElementById(col_labels[col + 1] +
								(16 - row).toString());
			if (gameBoard[row][col].constructor.name === "Round") {
				cell.innerHTML = "<div id='" + cell.id + "piece' " +
								 "class='round'>" + gameBoard[row][col].value+
								 "</div>";
			} else if (gameBoard[row][col].constructor.name === "Triangle") {
				cell.innerHTML = "<div id='" + cell.id + "piece' " +
								 "class='triangle'>" + gameBoard[row][col]
								 .value + "</div>";
			} else {
				cell.innerHTML = "";
			}
		}
	}
}
