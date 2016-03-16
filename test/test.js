/* eslint-env node, mocha */
'use strict';
const assert = require('assert');
const Game = require('../src/Game');
/*
const Round = require('../src/Round.js');
const Triangle = require('../src/Triangle.js');
const Square = require('../src/Square.js');
const Pyramid = require('../src/Pyramid.js');*/


describe('Piece', () => {
  const game = new Game(1, 2);
  beforeEach(() => { // reset gameBoard
    game.resetBoard();
  });

  describe('Round', () => {
    it('- create a Round', () => {
      game.makePiece([1, 1], 2);
      assert.equal(game.getBoardSquare([1, 1]).color, 'white');
    });

    describe('Movement', () => {
      it('- normal move', () => {
        game.move([1, 1], [2, 2]);
        assert.notEqual(game.getBoardSquare([2, 2]), 0);
        assert.equal(game.getBoardSquare([1, 1]), 0);
      });
    });
  });
/*

  describe('Triangle', () => {
    it('- create a Triangle', () => {
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
