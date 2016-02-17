var pieces = require ('../src/pieces.js');
var main = require ('../src/main.js');
var assert = require('assert');

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
