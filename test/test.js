const Round = require('../src/Round.js');
const Triangle = require('../src/Triangle.js');
const Square = require('../src/Square.js');
const Pyramid = require('../src/Pyramid.js');
const gameBoard = require('../src/main.js').gameBoard;
const assert = require('assert');
const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;


describe('Piece', () => {
  beforeEach(() => { // reset gameBoard
    for (let a = 0; a < gameBoard.length; a++) {
      for (let b = 0; b < gameBoard[a].length; b++) {
        gameBoard[a][b] = 0;
      }
    }
  });

  describe('Round', () => {
    it('- create a Round', () => {
      const rndTest = new Round('white', [5, 5], 12);
      assert.equal(rndTest.color, 'white');
      assert.equal(rndTest.position.toString(), '5, 5');
      assert.equal(rndTest.value, 12);
    });

    describe('Movement', () => {
      it('- normal move', () => {
        const rndTest = new Round('white', [5, 5], 12);
        rndTest.move([6, 6]);
        assert.equal(rndTest.position.toString(), [6, 6].toString());
      });

      it('- prevent move onto another piece', () => {
        const rndTest = new Round('white', [5, 5], 12);
        const rndTest1 = new Round('white', [6, 6], 12);
        rndTest.move([6, 6]);
        assert.equal(rndTest.position.toString(), [5, 5].toString());
      });

      it('- prevent move off the board', () => {
        const rndTest = new Round('white', [5, 5], 12);
        rndTest.move([6, 6]);
        rndTest.move([7, 7]);
        rndTest.move([8, 8]);
        assert.equal(rndTest.position.toString(), [7, 7].toString());
      });
    });
  });


  describe('Triangle', () => {
    it('- create a Triangle', () => {
      const triTest = new Triangle('white', [5, 5], 12);
      assert.equal(triTest.color, 'white');
      assert.equal(triTest.position.toString(), [5, 5].toString());
      assert.equal(triTest.value, 12);
    });

    describe('Movement', () => {
      it('- normal move', () => {
        const triTest = new Triangle('white', [5, 5], 12);
        triTest.move([5, 7]);
        assert.equal(triTest.position.toString(), [5, 7].toString());
      });

      it('- flying move', () => {
        const triTest = new Triangle('white', [5, 5], 12);

        triTest.move([6, 7]);
        assert.equal(triTest.position.toString(), [6, 7].toString());
      });

      it('- prevent move onto another piece', () => {
        const triTest = new Triangle('white', [5, 5], 12);
        const triTest1 = new Triangle('white', [7, 6], 12);

        triTest.move([7, 6]);
        assert.equal(triTest.position.toString(), [5, 5].toString());
      });

      it('- prevent move off the board', () => {
        const triTest = new Triangle('white', [5, 5], 12);
        triTest.move([7, 5]);
        triTest.move([9, 5]);
        assert.equal(triTest.position.toString(), [7, 5].toString());
      });
    });
  });


  describe('Squares', () => {
    it('- create a Square', () => {
      const sqTest = new Square('white', [5, 5], 12);

      assert.equal(sqTest.color, 'white');
      assert.equal(sqTest.position.toString(), [5, 5].toString());
      assert.equal(sqTest.value, 12);
    });

    describe('Movement', () => {
      it('- normal move', () => {
        const sqTest = new Square('white', [5, 5], 12);

        sqTest.move([5, 8]);
        assert.equal(sqTest.position.toString(), [5, 8].toString());
      });

      it('- flying move', () => {
        const sqTest = new Square('white', [5, 5], 12);

        sqTest.move([6, 8]);
        assert.equal(sqTest.position.toString(), [6, 8].toString());
      });

      it('- prevent move onto another piece', () => {
        const sqTest = new Square('white', [5, 5], 12);
        const sqTest1 = new Square('white', [4, 8], 12);

        sqTest.move([4, 8]);
        assert.equal(sqTest.position.toString(), [5, 5].toString());
      });

      it('- prevent move off the board', () => {
        const sqTest = new Square('white', [5, 5], 12);

        sqTest.move([8, 5]);
        assert.equal(sqTest.position.toString(), [5, 5].toString());
      });
    });
  });

  describe('Pyramid', () => {
    it('- create a pyramid', () => {
      const pyrTest = new Pyramid('white', [5, 5],
        [
          new Round('white', [5, 5], 12),
          new Triangle('white', [5, 5], 12),
          new Square('white', [5, 5], 12),
        ]);

      assert.equal(pyrTest.color, 'white');
      assert.equal(pyrTest.position.toString(), [5, 5].toString());
      assert.equal(pyrTest.constituents[0].constructor.name, 'Round');
      assert.equal(pyrTest.constituents[1].constructor.name, 'Triangle');
      assert.equal(pyrTest.constituents[2].constructor.name, 'Square');
      assert.equal(pyrTest.value, 36);
    });

    it('- add a piece', () => {
      const pyrTest = new Pyramid('white', [5, 5],
        [
          new Round('white', [5, 5], 12),
          new Triangle('white', [5, 5], 12),
        ]);

      pyrTest.add(new Square('white', [5, 5], 12));
      assert.equal(pyrTest.constituents[2].constructor.name, 'Square');
      assert.equal(pyrTest.value, 36);
    });

    it('- remove a piece', () => {
      const pyrTest = new Pyramid('white', [5, 5],
        [
          new Round('white', [5, 5], 12),
          new Triangle('white', [5, 5], 12),
        ]);

      pyrTest.remove(1);
      assert.equal(pyrTest.constituents.length, 1);
      assert.equal(pyrTest.value, 12);
    });

    describe('Movement', () => {
      it('- move like a Round', () => {
        const pyrTest = new Pyramid('white', [6, 4], [
          new Round('white', [6, 4], 12),
          new Triangle('white', [6, 4], 12),
        ]);

        const pyrTest1 = new Pyramid('white', [6, 6], [
          new Round('white', [6, 6], 12),
          new Triangle('white', [6, 6], 12),
        ]);

        pyrTest.move([7, 5]);
        pyrTest.move([6, 6]);
        assert.equal(pyrTest.position.toString(), [5, 5].toString());
      });

      it('- move like a Triangle', () => {
        assert.equal(true, false);
      });

      it('- move like a Square', () => {
        assert.equal(true, false);
      });
    });
  });
});
