function generateBoard() {
  const board = document.getElementById('board');

  for(let i=0; i<9; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      board.appendChild(row);

      for(let j=0; j<9; j++) {
          const tile = document.createElement('div');
          tile.classList.add('tile');
          row.appendChild(tile);

          const input = document.createElement('input');
          input.classList.add('tile-input');
          input.setAttribute('maxlength', 1);
          input.setAttribute('pattern', /\d/);
          tile.appendChild(input);
      }
  }
}

function solve() {
  const rows = Array.from(document.getElementsByClassName('row'));
  const data = rows.map(row => {
      const tiles = Array.from(row.children);
      return tiles.map(tile => {
          const input = tile.querySelector('.tile-input')
          return Number(input.value)
      })
  });

  const flatData = data.flat();

  if(flatData.includes(NaN)) {
      return window.alert('Incorrect value provided in one of the inputs');
  }

  const solution = provideSolution(data);

  console.log('solution', solution);
}

function provideSolution(inputData) {
  const boardClone = JSON.parse(JSON.stringify(inputData));

  return boardClone;
}


const solveButton = document.getElementById('button-solve');
solveButton.addEventListener('click', () => solve());

generateBoard();