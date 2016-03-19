/* eslint-env node, mocha */
'use strict';
const assert = require('assert');
const Game = require('../src/Game');


describe('Piece', () => {
  const game = new Game(1, 2);

  describe('Round', () => {
    it('- create a Round', () => {
      game.resetBoard();
      game.makePiece([1, 1], 2, 'white', 'round');
      assert.equal(game.getBoardSquare([1, 1]).color, 'white');
    });

    describe('Movement', () => {
      it('- normal move', () => {
        game.move([1, 1], [2, 2]);
        assert.notEqual(game.getBoardSquare([2, 2]), 0);
        assert.equal(game.getBoardSquare([1, 1]), 0);

        // prevent movement onto another piece.
        game.makePiece([1, 3], 4, 'white', 'round');
        game.move([2, 2], [1, 3]);
        assert.notEqual(game.getBoardSquare([2, 2]), 0);
      });
    });

    describe('Capture', () => {
      it('- by encounter', () => {
        // TODO
        assert.equal(true, false);
      });
    });
  });

  describe('Triangle', () => {
    it('- create a Triangle', () => {
      game.resetBoard();
      game.makePiece([4, 4], 6, 'white', 'triangle');
      assert.equal(game.getBoardSquare([4, 4]).color, 'white');
    });

    describe('Movement', () => {
      it('- normal move', () => {
        game.move([4, 4], [6, 4]);
        assert.equal(game.getBoardSquare([6, 4]).color, 'white');
        assert.equal(game.getBoardSquare([4, 4]), 0);

        // prevent movement onto another piece
        game.makePiece([5, 4], 6, 'white', 'triangle');
        game.move([6, 4], [4, 4]);
        assert.equal(game.getBoardSquare([4, 4]), 0);
        assert.equal(game.getBoardSquare([6, 4]).color, 'white');
      });

      it('- flying move', () => {
        game.move([6, 4], [4, 3]);
        assert.equal(game.getBoardSquare([4, 3]).color, 'white');
        assert.equal(game.getBoardSquare([6, 4]), 0);
      });
    });
  });


  describe('Squares', () => {
    it('- create a Square', () => {
      game.resetBoard();
      game.makePiece([4, 4], 15, 'white', 'square');
      assert.equal(game.getBoardSquare([4, 4]).color, 'white');
    });

    describe('Movement', () => {
      it('- normal move', () => {
        game.move([4, 4], [4, 1]);
        assert.notEqual(game.getBoardSquare([4, 1]), 0);
        assert.equal(game.getBoardSquare([4, 4]), 0);

        // don't move onto another piece
        game.makePiece([4, 2], 45, 'white', 'square');
        game.move([4, 1], [4, 4]);
        assert.notEqual(game.getBoardSquare([4, 1]), 0);
        assert.equal(game.getBoardSquare([4, 4]), 0);
      });

      it('- flying move', () => {
        game.move([4, 1], [5, 4]);
        assert.equal(game.getBoardSquare([4, 1]), 0);
        assert.equal(game.getBoardSquare([5, 4]).color, 'white');
      });
    });
  });

  /*
  describe('Pyramid', () => {
    it('- create a pyramid', () => {
      assert.equal(false, true);
    });

    it('- add a piece', () => {
      assert.equal(false, true);
    });

    it('- remove a piece', () => {
      assert.equal(false, true);
    });

    describe('Movement', () => {
      it('- move like a Round', () => {
        assert.equal(false, true);
      });

      it('- move like a Triangle', () => {
        assert.equal(false, true);
      });

      it('- move like a Square', () => {
        assert.equal(false, true);
      });
    });
  });
  */
});
