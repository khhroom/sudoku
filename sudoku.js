module.exports = { 
  solve: solve, 
}; 

var ROWS = 9;
var COLS = 9;
var MAX = ROWS*COLS;
var PLACEHOLDER = '.';  

var solutions = [];
var sudoku = []; 


function solve(base) {
  if (typeof base !== 'string' || base.length !== MAX) {
    throw new Error('Incorrect initial sudoku');
  }

  sudoku = base.split('');

  solveItem(0);
  
  return solutions;

}



function solveItem(pos) {
  if (pos === MAX) {
    solutions.push(sudoku.join(''));
    return;
  }
  
  if (sudoku[pos] !== PLACEHOLDER) {
    solveItem(pos + 1);
    return;
  }

  for (var i = 1; i <= 9; i++) {
    if (checkItem(pos, i)) {
      sudoku[pos] = i.toString();
      solveItem(pos + 1);
    }
  }

  sudoku[pos] = PLACEHOLDER;
  return;
}


function checkItem(pos, i) {
  return checkRow(pos, i) && checkCol(pos, i) && checkSquare(pos, i);
}

function checkRow(pos, i) {
  var row = ~~(pos / 9);
  for (var col = 0; col < 9; col++) {
    if (sudoku[row * 9 + col] === i.toString()) {
      return false;
    }
  }
  return true;
}

function checkCol(pos, i) {
  var col = pos % 9;
  for (var row = 0; row < 9; row++) {
    if (sudoku[row * 9 + col] === i.toString()) {
      return false;
    }
  }
  return true;
}

function checkSquare(pos, i) {
  var toprow = 3 * ~~(~~(pos / 9) / 3); 
  var topcol = 3 * ~~(  (pos % 9) / 3);
  for (var row = toprow; row < toprow + 3; row++) {
    for (var col = topcol; col < topcol + 3; col++) {
      if (sudoku[row * 9 + col] === i.toString()) {
        return false;
      }
    }
  }
  return true;
}
