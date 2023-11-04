import Joi from "joi";
import JSON5 from 'json5';
import { provideSolution } from "./solvers";
import { boardSize, createEasySudoku } from "./utils";

init();

export function init() {
  generateBoard();

  handleFillFromJSON();
  const solveButton = document.getElementById('button-solve')!;
  solveButton.addEventListener('click', () => solve());
}

function generateBoard() {
  const board = document.getElementById('board')!;

  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    board.appendChild(row);

    for (let j = 0; j < boardSize; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      row.appendChild(tile);

      const input = document.createElement('input');
      input.classList.add('tile-input');
      input.setAttribute('maxlength', '1');
      input.setAttribute('pattern', "\d");
      tile.appendChild(input);
    }
  }
}

async function solve() {
  try {
    const data = parseBoardHTMLToArray()
    const solution = await provideSolution(data)

    renderData(solution.simpleSolution)
  } catch (err) {
    return window.alert('Incorrect value provided in one of the inputs');
  }
}

function parseBoardHTMLToArray() {
  const rows = Array.from(document.getElementsByClassName('row'));
  const data = rows.map(row => {
    const tiles = Array.from(row.children);
    return tiles.map(tile => {
      const input = tile.querySelector('.tile-input') as HTMLInputElement;
      return Number(input.value)
    })
  });

  const flatData = data.flat();

  if (flatData.includes(NaN)) {
    throw new Error('Incorrect value provided in one of the inputs')
  }

  return data
}

function handleFillFromJSON(): void {
  const button = document.getElementById('button-fill-from-json');

  button?.addEventListener('click', async () => {
    const defaultPromptValue = JSON.stringify(createEasySudoku())
    const promptResult = window.prompt(`The input accepts ${boardSize}x${boardSize} array of numbers`, defaultPromptValue)!
    const filteredPromptResult = promptResult.replace(/\n/g, '').replace(/\r/g, '')
    const userInput = JSON5.parse(filteredPromptResult);

    const schema = Joi.array().length(boardSize).items(
      Joi.array().length(boardSize).items(
        Joi.number().integer().min(0).max(boardSize).required()
      ).required()
    ).required();

    try {
      const data: number[][] = await Joi.attempt(userInput, schema);

      renderData(data);
    } catch (error) {
      alert(`Invalid data ${error}`);
    }
  });
}

function getHTMLTileInput(rowIndex: number, columnIndex: number) {
  return document.querySelector(`.board > :nth-child(${rowIndex}) > :nth-child(${columnIndex}) .tile-input`) as HTMLInputElement;
}

function renderData(data: number[][]) {
  data.forEach((row, rowIndex) => {
    row.forEach((tileValue, columnIndex) => {
      const htmlTile = getHTMLTileInput(rowIndex + 1, columnIndex + 1)

      if (tileValue === 0) {
        htmlTile.value = '';
      } else {
        htmlTile.value = tileValue + '';
      }
    })
  });
}
