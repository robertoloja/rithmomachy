Piece = require('../src/Piece.js');
Round = require('../src/Round.js');
Triangle = require('../src/Triangle.js');
Square = require('../src/Square.js');
Pyramid = require('../src/Pyramid.js');
gameBoard = require('../src/main.js').gameBoard;
assert = require('assert');


describe ('Piece', function () {

	describe ('Round', function () {
		var rnd_test = new Round("white", [5,5], 12);

		it('- create a Round', function () {
			assert.equal(rnd_test.color, "white");
			assert.equal(rnd_test.position.toString(), '5,5');
			assert.equal(rnd_test.value, 12);
		});

		describe ('Movement', function () {
			var rnd_test1 = new Round("white", [7,7], 12);

			it('- normal move', function () {
				rnd_test.move([6,6]);
				assert.equal(rnd_test.position.toString(), [6,6].toString());

			});

			it('- prevent move onto another piece', function () {
				rnd_test.move([7,7]);
				assert.equal(rnd_test.position.toString(), [6,6].toString());
			});

			it('- prevent move off the board', function () {
				rnd_test1.move([6,8]);
				assert.equal(rnd_test1.position.toString(), [7,7].toString());
			});
		});
	});


	describe ('Triangle', function () {
		var tri_test = new Triangle("white", [5,5], 12);

		it('- create a Triangle', function () {
			assert.equal(tri_test.color, "white");
			assert.equal(tri_test.position.toString(), [5,5].toString());
			assert.equal(tri_test.value, 12);
		});

		describe ('Movement', function () {
			var tri_test1 = new Triangle("white", [7,6], 12);
			
			it('- normal move', function () {
				tri_test.move([5,7]);
				assert.equal(tri_test.position.toString(), [5,7].toString());
			});

			it('- flying move', function () {
				tri_test.move([5,5]); // Reset for test.

				tri_test.move([6,7]);
				assert.equal(tri_test.position.toString(), [6,7].toString());
			});

			it('- prevent move onto another piece', function () {
				tri_test.move([5,5]); // Reset for test.

				tri_test.move([7,6]);
				assert.equal(tri_test.position.toString(), [5,5].toString());
			});

			it('- prevent move off the board', function () {
				console.log(gameBoard[7][5]);
				console.log(tri_test.isPieceBlocking([5,7]));
				tri_test.move([5,7]);
				assert.equal(tri_test.position.toString(), [5,7].toString());
			});
		});
	});

	/*
	describe ('Squares', function () {
		it('Create a Square', function () {
			var square_test = new Square("white", [5,5], 12);
			assert.equal(square_test.color, "white");
		});
	});

	describe ('Pyramids', function () {
		it('Create a Pyramid', function () {
			var pyramid_test = new Pyramid("white", [5,5], 12);
			assert.equal(pyramid_test.color, "white");
		});
	});
	*/
});
