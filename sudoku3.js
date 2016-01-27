module.exports = { 
  solve: solve, 
}; 

var ROWS = 9;
var COLS = 9;
var MAX = ROWS*COLS;
var PLACEHOLDER = '.';  

var solutions = [];
var sudoku = []; 
var pretenders = [];
var order = [];

function solve(base) {
  if (typeof base !== 'string' || base.length !== MAX) {
    throw new Error('Incorrect initial sudoku');
  }

  sudoku = base.split('');

  preparePretenders();
  
  prepareOrder();
  
  itterateItem(0);
  
  return solutions;

}


function preparePretenders() {
  for (var pos = 0; pos < MAX; pos++) {
    var list = [];
    if (sudoku[pos] === PLACEHOLDER) {
      for (var i = 1; i <= 9; i++) {
        if (checkItem(pos, i)) {
          list.push(i);
        }
      }
    }
    pretenders[pos] = list;
  }
}

function prepareOrder() {
  for (var pos = 0; pos < MAX; pos++) {
    order.push(pos);
  }

//  order.sort(compare);
  
  function compare(a, b) {
    return pretenders[a].length - pretenders[b].length;
  }
}

function itterateItem(pos) {
  if (pos === MAX) {
    solutions.push(sudoku.join(''));
    return;
  }

  var item = order[pos];
  
  if (sudoku[item] !== PLACEHOLDER) {
    itterateItem(pos + 1);
    return;
  }

  for (var i = 0, l = pretenders[item].length; i < l; i++) {
    if (checkItem(item, pretenders[item][i])) {
      sudoku[item] = pretenders[item][i].toString();
      itterateItem(pos + 1);
    }
  }
  sudoku[item] = PLACEHOLDER;

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
