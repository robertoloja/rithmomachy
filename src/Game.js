var Game = function(player1, player2) {
	this.gameBoard = [
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
		[0, 0, 0, 0, 0, 0, 0, 0]
	];
	this.players = [player1, player2]; // these are playerIDs.
	this.moveList = [];
};

Game.prototype.resetBoard = function () {
	// Place pieces
};

/**
 * Move a piece, or capture and move (if destination is occupied). 
 * @param {int[]} from Piece to move; coordinates [x,y] on gameBoard.
 * @param {int[]} to Move destination; coordinates [x,y] on gameBoard.
 * @return 
 */
Game.prototype.move = function (from, to) {
	if (from !== 0 && from.isMoveValid(to)) {
		if (to === 0) {
		}
	} else {
		//return error codes
	}
};
