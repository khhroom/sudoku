var sudoku = require('./sudoku3');

var test = '...8...7......46..9...5...2..9.1...354.......2.1.....5.....6...3.2.9.......7..8..'; 
//var test = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......';

console.log('Sudoku:')
console.log(sudokuPrint(test), '\n');

var start = Date.now();

var solutions = sudoku.solve(test);

var end = Date.now();

console.log('Solutions:');

solutions.forEach(function(solution) {
  console.log(sudokuPrint(solution), '\n');
});

console.log('Elapsed time:', end - start, 'ms');


function sudokuPrint(sudoku) {
  var result = '';
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (col === 3 || col === 6) {
        result += ' ';
      }
      result += sudoku.charAt(row * 9 + col); 
    }
    result += '\n';
  }
  return result;  
}
