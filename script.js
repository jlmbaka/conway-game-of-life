let rows = 40, cols = 40;
let gridState;

function initGrid(rows, cols) {
  const grid = new Array(rows);
  for (let row = 0; row < rows; row++) {
    grid[row] = Array.from(Array(cols)).map(x => Math.round(Math.random()));
    floor(random(2))
  }
  return grid;
}

function isAlive(cell) {
  return cell === 1;
}

function countNeighbours(gridState, rows, cols, row, col) {
  let count = 0;

  const row_minus = (row - 1 + rows) % rows;
  const row_plus = (row + 1) % rows;
  const col_minus = (col - 1+ rows) % cols;
  const col_plus = (col + 1) % cols;

  let n0 = gridState[row_minus][col_minus];
  let n1 = gridState[row_minus][col];
  let n2 = gridState[row_minus][col_plus];

  let n3 = gridState[row][col_minus];
  let n4 = gridState[row][col_plus];

  let n5 = gridState[row_plus][col_minus];
  let n6 = gridState[row_plus][col];
  let n7 = gridState[row_plus][col_plus];

  count = n0 + n1 + n2 + n3 + n4 + n5 + n6 + n7;

  return count;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function generateNextGeneration(gridState) {
  const nextGenerationGridState = initGrid(rows, cols);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = gridState[row][col];
      const neighbours = countNeighbours(gridState, rows, cols, row, col);
      if (cell === 1) {
        if (neighbours === 2 || neighbours === 3) {
          // Any live cell with two or three live neighbours survives.
          nextGenerationGridState[row][col] = 1; 
        } else {
          // All other live cells die in the next generation.
          nextGenerationGridState[row][col] = 0; 
        }
      } else {
        if (cell === 0 && neighbours === 3) {
          // Any dead cell with three live neighbours becomes a live cell.
          nextGenerationGridState[row][col] = 1;
        } else {
          // Similarly, all other dead cells stay dead.
          nextGenerationGridState[row][col] = 0;
        }
      }
    }
  }
  return nextGenerationGridState;
}

function setup() {
  createCanvas(400, 400);
  gridState = initGrid(rows, cols);
  console.table(gridState);
  // setTimeout(generate, 1000);
}

function draw() {
  background(0);
  let colWidth = width / cols;
  let rowWidth = height / rows;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = row * rowWidth;
      const y = col * colWidth;
      gridState[row][col] === 0 ? fill(255, 204, 0) : noFill();
      rect(x, y, rowWidth, rowWidth);
    }
  }
  gridState = generateNextGeneration(gridState);
}
