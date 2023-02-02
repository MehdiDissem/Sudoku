class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }

  getCol(index) {
    var result = [];
    for (var i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }

  generateBoard() {
    const hardPuzzle = [
      ["", "", 2, "", "", "", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ];

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    let result = [];
    let boxRowStart = rowIndex - (rowIndex % 3);
    let boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index) {
    var result = [];
    var startingRow = Math.floor(index / 3) * 3;
    var startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  rowSafe(board, row, num) {
    //check if the row contains num
    return !this.getRow(row).includes(num);
  }

  colSafe(board, col, num) {
    //check if the column contains num
    return !this.getCol(col).includes(num);
  }

  boxSafe(board, row, col, num) {
    //check if the box contains num
    return !this.getBox(row, col).includes(num);
  }

  //adding a helper function to check if a row is valid at a given index
  rowValidAt(rowIndex) {
    var row = this.getRow(rowIndex);
    for (var i = 0; i < 9; i++) {
      var element = row[i];
      if (element && row.lastIndexOf(element) !== i) return false;
    }
    return true;
  }

  //adding a helper function to check if a column is valid at a given index
  colValidAt(colIndex) {
    var col = this.getCol(colIndex);
    for (var i = 0; i < 9; i++) {
      var element = col[i];
      if (element && col.lastIndexOf(element) !== i) return false;
    }
    return true;
  }

  //adding a helper function to check if a box is valid at a given index
  boxValidAt(boxIndex) {
    var box = this.getBoxByIndex(boxIndex);
    for (var i = 0; i < 9; i++) {
      var element = box[i];
      if (element && box.lastIndexOf(element) !== i) return false;
    }
    return true;
  }

  allrowsValid() {
    for (var i = 0; i < 9; i++) {
      if (!this.rowValidAt(i)) return false;
    }
    return true;
  }
  allcolsValid() {
    for (var i = 0; i < 9; i++) {
      if (!this.colValidAt(i)) return false;
    }
    return true;
  }
  allBoxValid() {
    for (var i = 0; i < 9; i++) {
      if (!this.boxValidAt(i)) return false;
    }
    return true;
  }

  validBoard() {
    return this.allBoxValid() && this.allcolsValid() && this.allrowsValid();
  }

  isSafe(board, row, col, num) {
    return (
      this.rowSafe(board, row, num) &&
      this.colSafe(board, col, num) &&
      this.boxSafe(board, row, col, num)
    );
  }

  solve(rowIndex = 0, colIndex = 0, num = 1) {
    //current board can't generate a solution
    if (num > 9) return;
    //updating row and column indexes when we exceed the last element of the row
    if (colIndex === 9) {
      rowIndex++;
      colIndex = 0;
    }
    //board fully filled with no conflicts => solution
    if (rowIndex === 9) return true;
    //if the cell is not empty we pass to the next column
    if (this.getRow(rowIndex)[colIndex])
      return this.solve(rowIndex, colIndex + 1);
    if (this.isSafe(undefined, rowIndex, colIndex, num)) {
      //if the num is safe, update the current cell
      this.getRow(rowIndex)[colIndex] = num;
      //if num can generate a solution return that solution
      if (this.solve(rowIndex, colIndex + 1)) return this.board;
      //else undo the last change
      this.getRow(rowIndex)[colIndex] = 0;
    }
    //call the function recursively with num + 1
    //if current num can't generate a solution or it is not safe
    return this.solve(rowIndex, colIndex, num + 1);
  }
  solveBoard() {
    while (this.validBoard()) {
      if (this.solve()) {
        this.emit("validBoard", this.board);
        return true;
      }
    }
    this.emit("invalidBoard");
    return false;
  }
}
