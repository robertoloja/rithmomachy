var Piece = require('../src/Piece.js').Piece;
var Round = require('../src/Round.js').Round;
var gameBoard = require('../src/main.js');
var assert = require('assert');

describe ('Pieces', function () {
	describe ('Rounds', function () {
		it('Create a Round', function () {
			var round_test = new Round("white", [5,5], 12);
			assert.equal(round_test.color, "white");
		});

		it('Move the Round', function () {
			var round_test = new Round("white", [5,5], 12);
			var round_test1 = new Round("white", [7,7], 12);
			round_test.move([6,6]);
			assert.equal(round_test.position.toString(), [6,6].toString());
			round_test.move([7,7]);
			assert.equal(round_test.position.toString(), [6,6].toString());
		});
	});

	describe ('Triangles', function () {
	});

	describe ('Squares', function () {
	});

	describe ('Pyramids', function () {
	});
});
