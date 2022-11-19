import Joi from "joi";
import _ from "lodash";
import { check3x3Squares, checkColumns, checkRows } from "./solvers";
import type { DetailedBoard } from "./types";
import { boardSize } from "./utils";

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

function solve() {
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
    return window.alert('Incorrect value provided in one of the inputs');
  }

  const solution = provideSolution(data);

  renderData(solution.simpleSolution);

  console.log('detailed solution', solution.detailedSolution);
}

function provideSolution(inputData: number[][]): { detailedSolution: DetailedBoard, simpleSolution: number[][] } {
  // const boardClone = JSON.parse(JSON.stringify(inputData));
  const detailedBoard = inputData.map(row => row.map(tile => {
    return {
      value: tile,
      possibleValues: tile ? [] : _.range(1, boardSize + 1)
    }
  }));

  function recursivelyCheckForNewDiscoveries() {
    const check3x3SquaresResult = check3x3Squares(detailedBoard);
    console.log('after check3x3Squares', _.cloneDeep(detailedBoard));
    const checkRowsResult = checkRows(detailedBoard);
    console.log('after checkRows', _.cloneDeep(detailedBoard));
    const checkColumnsResult = checkColumns(detailedBoard);
    console.log('after checkColumns', _.cloneDeep(detailedBoard));

    const progress = [
      check3x3SquaresResult,
      checkRowsResult,
      checkColumnsResult
    ];

    console.log('progress', progress);

    if (progress.some(Boolean)) {
      recursivelyCheckForNewDiscoveries();
    }
  }

  recursivelyCheckForNewDiscoveries();

  return {
    detailedSolution: detailedBoard,
    simpleSolution: detailedBoard.map(row => row.map(tile => tile.value))
  }
}

function handleFillFromJSON(): void {
  const button = document.getElementById('button-fill-from-json');

  button?.addEventListener('click', async () => {
    const defaultPromptValue = JSON.stringify(Array(boardSize).fill(0).map(() => Array(boardSize).fill(0)));
    const promptResult = window.prompt(`The input accepts ${boardSize}x${boardSize} array of numbers`, defaultPromptValue)!
    const filteredPromptResult = promptResult.replace(/\n/g, '').replace(/\r/g, '')
    const userInput = JSON.parse(filteredPromptResult);

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
