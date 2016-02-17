import '../src/pieces.js';
import '../src/main.js';
import assert from 'assert';

describe ('Pieces', function () {
	describe ('Rounds', function () {
		it('should create a Round.', function () {
			var new_round_test = new Round("white", [5,5], 12);
			assert.equal(new_round_test.color, "white");
		});
	});

	describe ('Triangles', function () {
	});

	describe ('Squares', function () {
	});

	describe ('Pyramids', function () {
	});
});
