var row_labels = " abcdefghijklmnop".split("");

function generateBoard() {
	document.write("<table class='game-board'>");

	for (var row of row_labels){
		document.write("<tr class='game-board-row' id='" + 
				(row == " " ? "_" : row) + "'>");

		for (var i = 0; i < 9; i++) {
			if (i === 0) {
				document.write("<td class='row-label' id='" +
							   row + i + "'>");
				document.write(row.toUpperCase());
				document.write("</td>");
			} else if (row == " ") {
				document.write("<td class='col-label' id='" +
							   "_" + i + "'>");
				document.write(i);
				document.write("</td>");
			} else {
				document.write("<td class='game-cell' id='" +
							   row + i + "'>");
			}
		}
	}
}
