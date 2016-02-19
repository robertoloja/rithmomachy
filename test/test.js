Piece = require('../src/Piece.js');
Round = require('../src/Round.js');
Triangle = require('../src/Triangle.js');
Square = require('../src/Square.js');
Pyramid = require('../src/Pyramid.js');
gameBoard = require('../src/main.js').gameBoard;
assert = require('assert');


describe ('Piece', function () {

	beforeEach(function() { // reset gameBoard
		for (var a = 0; a < gameBoard.length; a++) {
			for (var b = 0; b < gameBoard[a].length; b++) {
				gameBoard[a][b] = 0;
			}
		}
	});

	describe ('Round', function () {
		it('- create a Round', function () {
			var rnd_test = new Round("white", [5,5], 12);

			assert.equal(rnd_test.color, "white");
			assert.equal(rnd_test.position.toString(), '5,5');
			assert.equal(rnd_test.value, 12);
		});

		describe ('Movement', function () {
			it('- normal move', function () {
				var rnd_test = new Round("white", [5,5], 12);

				rnd_test.move([6,6]);
				assert.equal(rnd_test.position.toString(), [6,6].toString());

			});

			it('- prevent move onto another piece', function () {
				var rnd_test = new Round("white", [5,5], 12);
				var rnd_test1 = new Round("white", [6,6], 12);

				rnd_test.move([6,6]);
				assert.equal(rnd_test.position.toString(), [5,5].toString());
			});

			it('- prevent move off the board', function () {
				var rnd_test = new Round("white", [5,5], 12);

				rnd_test.move([6,6]);
				rnd_test.move([7,7]);
				rnd_test.move([8,8]);
				assert.equal(rnd_test.position.toString(), [7,7].toString());
			});
		});
	});


	describe ('Triangle', function () {
		it('- create a Triangle', function () {
			var tri_test = new Triangle("white", [5,5], 12);
			assert.equal(tri_test.color, "white");
			assert.equal(tri_test.position.toString(), [5,5].toString());
			assert.equal(tri_test.value, 12);
		});

		describe ('Movement', function () {

			it('- normal move', function () {
				var tri_test = new Triangle("white", [5,5], 12);
				tri_test.move([5,7]);
				assert.equal(tri_test.position.toString(), [5,7].toString());
			});

			it('- flying move', function () {
				var tri_test = new Triangle("white", [5,5], 12);

				tri_test.move([6,7]);
				assert.equal(tri_test.position.toString(), [6,7].toString());
			});

			it('- prevent move onto another piece', function () {
				var tri_test = new Triangle("white", [5,5], 12);
				var tri_test1 = new Triangle("white", [7,6], 12);

				tri_test.move([7,6]);
				assert.equal(tri_test.position.toString(), [5,5].toString());
			});

			it('- prevent move off the board', function () {
				var tri_test = new Triangle("white", [5,5], 12);
				tri_test.move([7,5]);
				tri_test.move([9,5]);
				assert.equal(tri_test.position.toString(), [7,5].toString());
			});
		});
	});


	describe ('Squares', function () {
		it('- create a Square', function () {
			var sq_test = new Square("white", [5,5], 12);

			assert.equal(sq_test.color, "white");
			assert.equal(sq_test.position.toString(), [5,5].toString());
			assert.equal(sq_test.value, 12);
		});

		describe ('Movement', function () {
			it('- normal move', function () {
				var sq_test = new Square("white", [5,5], 12);
			
				sq_test.move([5,8]);
				assert.equal(sq_test.position.toString(), [5,8].toString());
			});

			it('- flying move', function () {
				var sq_test = new Square("white", [5,5], 12);

				sq_test.move([6,8]);
				assert.equal(sq_test.position.toString(), [6,8].toString());
			});

			it('- prevent move onto another piece', function () {
				var sq_test = new Square("white", [5,5], 12);
				var sq_test1 = new Square("white", [4,8], 12);

				sq_test.move([4,8]);
				assert.equal(sq_test.position.toString(), [5,5].toString());
			});

			it('- prevent move off the board', function () {
				var sq_test = new Square("white", [5,5], 12);

				sq_test.move([8,5]);
				assert.equal(sq_test.position.toString(), [5,5].toString());
			});
		});
	});

	describe ('Pyramid', function () {
		it('- create a pyramid', function () {
			var pyr_test = new Pyramid('white', [5,5],
				[
					new Round("white", [5,5], 12),
					new Triangle("white", [5,5], 12),
					new Square("white", [5,5], 12)
				]);

			assert.equal(pyr_test.color, 'white');
			assert.equal(pyr_test.position.toString(), [5,5].toString());
			assert.equal(pyr_test.constituents[0].constructor.name, 'Round');
			assert.equal(pyr_test.constituents[1].constructor.name,'Triangle');
			assert.equal(pyr_test.constituents[2].constructor.name, 'Square');
			assert.equal(pyr_test.value, 36);
		});

		it('- add a piece', function() {
			var pyr_test = new Pyramid('white', [5,5],
				[
					new Round("white", [5,5], 12),
					new Triangle("white", [5,5], 12),
				]);

			pyr_test.add(new Square("white", [5,5], 12));
			assert.equal(pyr_test.constituents[2].constructor.name, 'Square');
			assert.equal(pyr_test.value, 36);
		});

		it('- remove a piece', function () {
			var pyr_test = new Pyramid('white', [5,5],
				[
					new Round("white", [5,5], 12),
					new Triangle("white", [5,5], 12),
				]);

			pyr_test.remove();
			assert.equal(true, false);
		});
		// TODO: Movement like each constituent Piece.
	});
});
