var Piece = require('../src/Piece.js');
var Round = require('../src/Round.js');
var Triangle = require('../src/Triangle.js');
var Square = require('../src/Square.js');
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
			
			// Normal move.
			round_test.move([6,6]);
			assert.equal(round_test.position.toString(), [6,6].toString());

			// Prevent move onto another piece.
			var round_test1 = new Round("white", [7,7], 12);
			round_test.move([7,7]);
			assert.equal(round_test.position.toString(), [6,6].toString());
		});
	});

	describe ('Triangles', function () {
		it('Create a Triangle', function () {
			var triangle_test = new Triangle("white", [5,5], 12);
			assert.equal(triangle_test.color, "white");
		});
	});

	describe ('Squares', function () {
		it('Create a Square', function () {
			var square_test = new Square("white", [5,5], 12);
			assert.equal(square_test.color, "white");
		});
	});

	describe ('Pyramids', function () {
	});
});
