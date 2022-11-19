import { range } from 'lodash';
import type { DetailedBoard, DetailedTile, SolvingStep } from './types';
import { boardSize, getColumn, getSquareOfTile } from './utils';

export function solve3x3Squares(board: DetailedBoard): boolean {
  let wasAnyProgressMade = false;
  let solvingSteps: SolvingStep[] = [];

  // x, y - coordinates of top left square in a 3x3 square
  for (let x = 0; x <= boardSize * 2 / 3; x += boardSize / 3) {
    for (let y = 0; y <= boardSize * 2 / 3; y += boardSize / 3) {
      const tiles = getSquareOfTile(board, x, y);

      const updateTilesResult = updateTiles(tiles);
      wasAnyProgressMade =
        wasAnyProgressMade || updateTilesResult.wasAnyProgressMade;
      solvingSteps = [...solvingSteps, ...updateTilesResult.solvingSteps];
    }
  }

  return wasAnyProgressMade;
}

export function solveRows(board: DetailedBoard): boolean {
  let wasAnyProgressMade = board
    .map((row) => updateTiles(row))
    .some(({ wasAnyProgressMade }) => wasAnyProgressMade);

  return wasAnyProgressMade;
}

export function solveColumns(board: DetailedBoard): boolean {
  const columns = range(0, boardSize).map((columnIndex) =>
    getColumn(board, columnIndex),
  );

  let wasAnyProgressMade = columns
    .map((columns) => updateTiles(columns))
    .some(({ wasAnyProgressMade }) => wasAnyProgressMade);

  return wasAnyProgressMade;
}

function updateTiles(tileCollection: DetailedTile[]): {
  wasAnyProgressMade: boolean;
  solvingSteps: SolvingStep[];
} {
  const removeResult = removeImpossibleItemsFromPossibleValues(tileCollection);
  const onlyPossibleValuesResult =
    checkForValuesThatArePossibleOnlyOnOneSquareInCollection(tileCollection);

  return {
    wasAnyProgressMade:
      removeResult.wasAnyProgressMade ||
      onlyPossibleValuesResult.wasAnyProgressMade,
    solvingSteps: [
      ...removeResult.solvingSteps,
      ...onlyPossibleValuesResult.solvingSteps,
    ],
  };
}

function removeImpossibleItemsFromPossibleValues(
  tileCollection: DetailedTile[],
): { wasAnyProgressMade: boolean; solvingSteps: SolvingStep[] } {
  let wasAnyProgressMade = false;
  let solvingSteps: SolvingStep[] = [];

  const allValuesInTileCollection = tileCollection
    .map((tile) => tile.value)
    .filter(Boolean);

  tileCollection.forEach((tile) => {
    const filteredPossibleValues = tile.possibleValues.filter(
      (value) => !allValuesInTileCollection.includes(value),
    );

    if (tile.possibleValues.length !== filteredPossibleValues.length) {
      // todo - update solvingSteps
      wasAnyProgressMade = true;
    }
    tile.possibleValues = filteredPossibleValues;
  });

  tileCollection.forEach((tile) => {
    if (tile.possibleValues.length === 1) {
      wasAnyProgressMade = true;
      tile.value = tile.possibleValues[0];
      tile.possibleValues = [];
    }
  });

  return { wasAnyProgressMade, solvingSteps };
}

function checkForValuesThatArePossibleOnlyOnOneSquareInCollection(
  tileCollection: DetailedTile[],
): { wasAnyProgressMade: boolean; solvingSteps: SolvingStep[] } {
  let wasAnyProgressMade = false;
  let solvingSteps: SolvingStep[] = [];
  const tileCollectionCopy = JSON.parse(JSON.stringify(tileCollection));

  // map each value with number of its occurences withing the collection
  const values: { [value: number]: number } = {};

  const possibleValues = tileCollection.flatMap((tile) => tile.possibleValues);

  const uniqueValues = possibleValues.filter((value) => {
    const occurences = possibleValues.filter((_v) => _v === value).length;
    return occurences === 1;
  });

  uniqueValues.forEach((uniqueValue) => {
    const tile = tileCollection.find((tile) =>
      tile.possibleValues.includes(uniqueValue),
    )!;
    tile.possibleValues = [];
    tile.value = uniqueValue;

    // todo
    // setTileValue(board, )
  });

  tileCollectionCopy;

  return { wasAnyProgressMade, solvingSteps };
}

// this function sets the tile's value and removes that value from possibleValues of tiles in column, row and square of that tile
function setTileValue(
  board: DetailedBoard,
  rowIndex: number,
  columnIndex: number,
  value: number,
): void {
  const row = board[rowIndex];
  const column = getColumn(board, columnIndex);
  const square = getSquareOfTile(board, rowIndex, columnIndex);
  const updatePossibleValues = (tile: DetailedTile) =>
  (tile.possibleValues = tile.possibleValues.filter(
    (_value) => _value !== value,
  ));

  const tile = board[rowIndex][columnIndex];

  tile.value = value;
  tile.possibleValues = [];

  row.forEach(updatePossibleValues);
  column.forEach(updatePossibleValues);
  square.forEach(updatePossibleValues);
}
