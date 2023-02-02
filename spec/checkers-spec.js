
describe("Checker functions", function () {
  describe('rowSafe', function () {
    it("should detect, if a row is safe for any number, for an empty board", function () {
      var puzzle = new Board();
      var isSafeForNumber = puzzle.rowSafe(puzzle.board, 0, 1)
      expect(isSafeForNumber).toBe(true);
    });

    it("should detect, if a row is safe for any number, for a generated board", function () {
      let GENERATED_PUZZLE = [
        [1, 2, "", 4, "", 6, 7, "", ""],
        ["", 5, 6, "", 8, 9, "", "", 3],
        ["", "", 9, "", 2, "", 4, 5, ""],
        ["", 1, 4, "", 6, 5, 8, 9, ""],
        [3, 6, "", 8, 9, 7, "", 1, 4],
        ["", 9, 7, 2, "", 4, 3, 6, 5],
        [5, 3, 1, 6, 4, 2, 9, 7, 8],
        [6, "", 2, "", "", "", 5, 3, 1],
        [9, "", "", "", "", 1, 6, "", 2],
      ];
      var puzzle = new Board(GENERATED_PUZZLE);
      var isSafeForNumber = puzzle.rowSafe(puzzle.board, 6, 1)
      expect(isSafeForNumber).toEqual(false);
      expect(puzzle.rowSafe(puzzle.board, 2, 7)).toBe(true)
      expect(puzzle.rowSafe(puzzle.board, 7, 3)).toBe(false)
    });

    it("should not detect a column conflict.", function () {
      const colConflicPuzzle = [
        ["", 1, "", "", "", "", "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 3, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 6, ""],
        ["", 1, "", "", "", 5, "", "", ""],
      ];
      var puzzle = new Board(colConflicPuzzle);
      var isSafeForNumber = puzzle.rowSafe(puzzle.board, 1, 1)
      expect(isSafeForNumber).toEqual(true);
      expect(puzzle.rowSafe(puzzle.board, 3, 3)).toBe(true)
      expect(puzzle.rowSafe(puzzle.board, 7, 3)).toBe(true)
    });

    it("should not detect a box conflict. ", function () {
      const boxisSafeForNumberPuzzle = [
        ["", 5, "", "", "", "", "", "", ""],
        ["", "", 5, "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 1, "", 2, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", 6, "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", 6, "", "", "", ""],
      ];
      var puzzle = new Board(boxisSafeForNumberPuzzle);
      var isSafeForNumber = puzzle.rowSafe(puzzle.board, 2, 5)
      expect(isSafeForNumber).toEqual(true);
      expect(puzzle.rowSafe(puzzle.board, 7, 6)).toBe(true)
      expect(puzzle.rowSafe(puzzle.board, 4, 2)).toBe(false)
    });
  })
  describe('colSafe', function () {
    it("should  detect if a column is safe for a number, for an empty board.", function () {
      var puzzle = new Board();
      var isSafeForNumber = puzzle.colSafe(puzzle.board, 0, 1)
      expect(isSafeForNumber).toBe(true);
    });

    it("should  detect if a column is safe for a number.", function () {
      let GENERATED_PUZZLE = [
        [1, 2, "", 4, "", 6, 7, "", ""],
        ["", 5, 6, "", 8, 9, "", "", 3],
        ["", "", 9, "", 2, "", 4, 5, ""],
        ["", 1, 4, "", 6, 5, 8, 9, ""],
        [3, 6, "", 8, 9, 7, "", 1, 4],
        ["", 9, 7, 2, "", 4, 3, 6, 5],
        [5, 3, 1, 6, 4, 2, 9, 7, 8],
        [6, "", 2, "", "", "", 5, 3, 1],
        [9, "", "", "", "", 1, 6, "", 2],
      ];
      var puzzle = new Board(GENERATED_PUZZLE);
      var isSafeForNumber = puzzle.colSafe(puzzle.board, 6, 1)
      expect(isSafeForNumber).toEqual(true);
      expect(puzzle.colSafe(puzzle.board, 2, 7)).toBe(false)
      expect(puzzle.colSafe(puzzle.board, 8, 2)).toBe(false)
    });

    it("should not detect a row conflict.", function () {
      const colConflicPuzzle = [
        ["", 1, "", "", "", "", "", "", ""],
        ["", "", "", 3, 3, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 3, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 6, ""],
        ["", 4, "", "", "", 5, "", "", ""],
      ];
      var puzzle = new Board(colConflicPuzzle);
      var isSafeForNumber = puzzle.rowSafe(puzzle.board, 1, 3)
      expect(isSafeForNumber).toEqual(false);
      expect(puzzle.colSafe(puzzle.board, 1, 3)).toBe(true)
      expect(puzzle.colSafe(puzzle.board, 7, 6)).toBe(false)
    });

    it("should not detect a box conflict.", function () {
      const boxisSafeForNumberPuzzle = [
        ["", 5, "", "", "", "", "", "", ""],
        ["", "", 5, "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 1, "", 2, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", 6, "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", 6, "", "", "", ""],
      ];
      var puzzle = new Board(boxisSafeForNumberPuzzle);
      var isSafeForNumber = puzzle.colSafe(puzzle.board, 0, 5)
      expect(isSafeForNumber).toEqual(true);
      expect(puzzle.colSafe(puzzle.board, 2, 6)).toBe(true)
      expect(puzzle.colSafe(puzzle.board, 7, 2)).toBe(false)
    });
  })

  describe('boxSafe', function () {
    it("should detect if the box is safe for a number.", function () {
      var puzzle = new Board();
      var isSafeForNumber = puzzle.boxSafe(puzzle.board, 0, 1, 5)
      expect(isSafeForNumber).toBe(true);
    });

    it("should detect if a box is safe for a given number", function () {
      let GENERATED_PUZZLE = [
        [1, 2, "", 4, "", 6, 7, "", ""],
        ["", 5, 6, "", 8, 9, "", "", 3],
        ["", "", 9, "", 2, "", 4, 5, ""],
        ["", 1, 4, "", 6, 5, 8, 9, ""],
        [3, 6, "", 8, 9, 7, "", 1, 4],
        ["", 9, 7, 2, "", 4, 3, 6, 5],
        [5, 3, 1, 6, 4, 2, 9, 7, 8],
        [6, "", 2, "", "", "", 5, 3, 1],
        [9, "", "", "", "", 1, 6, "", 2],
      ];
      var puzzle = new Board(GENERATED_PUZZLE);
      var isSafeForNumber = puzzle.boxSafe(puzzle.board, 0, 0, 5)
      expect(isSafeForNumber).toEqual(false);
      expect(puzzle.boxSafe(puzzle.board, 3, 0, 5)).toBe(true)
      expect(puzzle.boxSafe(puzzle.board, 6, 8, 4)).toBe(true)
    });

    it("should not detect a row conflict.", function () {
      const colConflicPuzzle = [
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 3, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 6, ""],
        ["", 4, "", "", "", 5, "", "", ""],
      ];
      var puzzle = new Board(colConflicPuzzle);
      var isSafeForNumber = puzzle.boxSafe(puzzle.board, 0, 0, 1)
      expect(isSafeForNumber).toEqual(true);
      expect(puzzle.rowSafe(puzzle.board, 0, 1)).toBe(false)
      expect(puzzle.colSafe(puzzle.board, 7, 6, 6)).toBe(false)
    });

    it("should not detect a column conflict.", function () {
      const boxisSafeForNumberPuzzle = [
        ["", 6, "", "", "", "", "", "", ""],
        ["", "", 9, "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 1, "", 2, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", 6, "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", 5, "", "", 6, "", "", "", ""],
      ];
      var puzzle = new Board(boxisSafeForNumberPuzzle);
      var isSafeForNumber = puzzle.colSafe(puzzle.board, 1, 5)
      expect(isSafeForNumber).toEqual(false);
      expect(puzzle.boxSafe(puzzle.board, 0, 0, 5)).toBe(true)
    });
  })

  describe('allrowsValid', function () {
    it('should return false if at least one row has a conflict.', function () {
      var puzzle = new Board()
      var invalidBoard = [
        [2, "", "", "", "", "", "", "", 5],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", 6, "", 7, "", 6, "", ""],
        ["", 3, "", "", "", "", 5, 5, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", 9, "", 3, "", "", 2, "", 3],
        ["", "", "", "", "", "", "", "", ""],
        ["", 6, "", "", 6, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
      ];
      puzzle.board = invalidBoard;
      expect(puzzle.allrowsValid()).toBe(false)
    })

    it('Should return true if all rows are valid.', function () {
      var puzzle = new Board()
      var validBoard = [
        [2, "", "", "", "", "", "", "", 5],
        ["", "", 9, "", "", "", "", 2, ""],
        ["", "", 1, "", 7, "", 6, "", ""],
        ["", 3, "", "", "", "", 4, 5, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", 9, "", 3, "", "", 2, "", 8],
        ["", "", "", "", "", "", "", "", ""],
        ["", 6, "", "", 1, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
      ];
      puzzle.board = validBoard;
      expect(puzzle.allrowsValid()).toBe(true)
    })

    it('Should not detect if the board have a column, or a box conflict', function () {
      const colConflicPuzzle = [
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 3, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 6, ""],
        ["", 4, "", "", "", 5, "", "", ""],
      ];
      var puzzle = new Board(colConflicPuzzle);
      expect(puzzle.allrowsValid()).toBe(true)
    })
  })

  describe('allcolsValid', function () {
    it('Should return true if the board has no column conflicts.', function () {
      var puzzle = new Board();
      expect(puzzle.allcolsValid()).toBe(true)
      puzzle.board = [
        [2, "", "", "", "", "", "", "", 5],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", 6, "", 7, "", 6, "", ""],
        ["", 3, "", "", "", "", 5, 5, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", 9, "", 3, "", "", 2, "", 3],
        ["", "", "", "", "", "", "", "", 8],
        ["", 6, "", "", 6, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
      ];
    })
    it(' Should return false if the board contains a column conflict', function () {
      var puzzle = new Board([
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 3, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 6, ""],
        ["", 4, "", "", "", 5, "", "", ""],
      ])
      expect(puzzle.allcolsValid()).toBe(false)
    })

    it(' Should not detect a row or a box conlicts.', function () {
      var puzzle = new Board([
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", 3, "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 6, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 7, ""],
        ["", 4, "", "", "", 2, "", "", ""],
      ])
      expect(puzzle.allcolsValid()).toBe(true)
    })
  })

  describe('allBoxValid', function () {
    it('Should return true if the board does not contain any box conflict.', function () {
      var puzzle = new Board();
      expect(puzzle.allBoxValid()).toBe(true);

      puzzle.board = [
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 6, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 7, ""],
        ["", 4, "", "", "", 2, "", "", ""],
      ]

      expect(puzzle.allBoxValid()).toBe(true)
    })

    it('Should return false if the board contains a box conflict', function () {
      var puzzle = new Board([
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", 6],
        ["", "", "", 6, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 7, ""],
        ["", 4, "", "", "", 2, "", "", ""],
      ]);

      expect(puzzle.allBoxValid()).toBe(false)

      puzzle.board = [
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", ""],
        ["", 3, "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", ""],
        ["", "", "", 6, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 7, ""],
        ["", 4, "", "", "", 2, "", "", ""],
      ]
      expect(puzzle.allBoxValid()).toBe(false)
    })

    it('Should not detect a row or a column conflict.', function () {
      var puzzle = new Board([
        ["", "", "", "", "", "", 1, "", ""],
        [3, "", "", 9, 4, "", "", "", 3],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", 8],
        ["", "", "", 6, "", "", "", 6, ""],
        ["", 2, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", 7, ""],
        ["", 4, "", "", "", 2, "", "", ""],
      ]);

      expect(puzzle.allBoxValid()).toBe(true)
    })
  })

  describe('isSafe', function () {
    it('should return true if a number would not result any conflict if it is placed in a cell.', function () {
      var puzzle = new Board();
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (choice) {
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (position) {
          expect(puzzle.isSafe(puzzle.board, position, position, choice)).toBe(true)
        })
      })
    })

    it('should return false if a number would result any conflict if it is placed in a cell.', function () {
      var puzzle = new Board([
        ["", "", "", "", "", "", 7, 4, ""],
        [3, 4, "", 9, 4, "", "", "", 3],
        ["", 2, "", "", "", "", "", "", 2],
        ["", "", "", "", "", 5, "", "", ""],
        ["", "", "", 3, "", "", "", "", 8],
        ["", "", "", 6, "", "", "", 6, ""],
        ["", 2, "", "", "", 4, "", "", ""],
        ["", "", "", "", 3, "", "", 7, ""],
        ["", 4, "", 4, "", 2, "", "", ""],
      ]);

      [2, 3, 4].map(function (choice) {
        [0, 2, 5, 8].map(function (position) {
          expect(puzzle.isSafe(puzzle.board, position, position, choice)).toBe(false)
        })
      })

      [0, 1, 2, 3, 4, 5, 6, 7, 8]?.map(function (position) {
        expect(puzzle.isSafe(puzzle.board, position, position, 1)).toBe(true)
      })
    })


  })

  describe('validBoard', function () {
    it('Should return true if the board is empty.', function () {
      var puzzle = new Board()
      expect(puzzle.validBoard()).toBe(true)
    })

    it('Should return true if the board has no conflict.', function () {
      var puzzle = new Board([
        ["", "", 2, "", "", "", "", "", ""],
        ["", "", 9, "", "", "", "", "", ""],
        ["", 4, "", "", "", "", "", 6, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", 5, 9, "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        [7, "", "", "", "", "", 4, "", 2],
        ["", 8, "", "", "", "", "", "", ""],
      ])
      expect(puzzle.validBoard()).toBe(true)
    })

    it('Should return false if a board has any conflict.', function () {
      var puzzle = new Board([
        ["", "", 2, "", "", "", "", "", ""],
        ["", "", 9, "", "", "", "", "", ""],
        ["", 4, "", "", "", 4, "", 6, ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", 5, "", "", "", ""],
        ["", "", "", "", 5, 9, "", "", ""],
        ["", "", "", "", "", "", "", "", 2],
        [7, "", "", "", "", "", 4, "", 2],
        ["", 8, "", "", "", "", "", "", ""],
      ])
      expect(puzzle.validBoard()).toBe(false)
    })
  })

})