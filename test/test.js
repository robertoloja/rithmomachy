/* eslint-env node, mocha */
'use strict';
const assert = require('assert');
const Game = require('../src/Game');


describe('Piece', () => {
  const game = new Game(1, 2);

  describe('Round', () => {
    beforeEach(() => { // reset gameBoard
      game.resetBoard();
    });

    it('- create a Round', () => {
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
      game.makePiece([4, 4], 6, 'white', 'triangle');
      assert.equal(game.getBoardSquare([4, 4]).color, 'white');
    });

    describe('Movement', () => {
      it('- normal move', () => {
        game.move([4, 4], [6, 4]);
        assert.equal(game.getBoardSquare([6, 4]).color, 'white');
        assert.equal(game.getBoardSquare([4, 4]), 0);
      });

      it('- flying move', () => {
        game.move([6, 4], [4, 3]);
        assert.equal(game.getBoardSquare([4, 3]).color, 'white');
        assert.equal(game.getBoardSquare([6, 4]), 0);
      });
    });
  });


/*
  describe('Squares', () => {
    it('- create a Square', () => {
      assert.equal(false, true);
    });

    describe('Movement', () => {
      it('- normal move', () => {
        assert.equal(false, true);
      });

      it('- flying move', () => {
        assert.equal(false, true);
      });

      it('- prevent move onto another piece', () => {
        assert.equal(false, true);
      });

      it('- prevent move off the board', () => {
        assert.equal(false, true);
      });
    });
  });

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
