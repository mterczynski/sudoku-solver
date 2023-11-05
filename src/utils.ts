import { range } from 'lodash';
import type { BoardWithPossibleValues, TileWithPossibleValues } from './types';

export const boardSize = 9

export function getColumn(
  board: BoardWithPossibleValues,
  columnIndex: number,
): TileWithPossibleValues[] {
  return range(0, boardSize).map((rowIndex) => board[rowIndex][columnIndex]);
}

export function mapBoardToBoardWithPossibleValues(board: number[][]): BoardWithPossibleValues {
  return board.map(row => row.map(tile => {
    return {
      value: tile,
      possibleValues: tile ? [] : range(1, boardSize + 1)
    }
  }));
}

export function mapBoardWithPossibleValuesToBoard(board: BoardWithPossibleValues): number[][] {
  return board.map(row => row.map(tile => {
    return tile.value
  }));
}

export function getSquareOfTile(
  board: BoardWithPossibleValues,
  columnIndex: number,
  rowIndex: number,
  // @ts-ignore
): TileWithPossibleValues[] {
  try {
    const x = columnIndex - (columnIndex % (boardSize / 3)); // index of square's left column
    const y = rowIndex - (rowIndex % (boardSize / 3)); // index of square's top row

    return [
      board[y][x],
      board[y][x + 1],
      board[y][x + 2],
      board[y + 1][x],
      board[y + 1][x + 1],
      board[y + 1][x + 2],
      board[y + 2][x],
      board[y + 2][x + 1],
      board[y + 2][x + 2],
    ];
  } catch (e) {
    debugger
  }

}

export const createEasySudoku = () => [
  [0, 0, 0, 0, 8, 0, 5, 0, 4],
  [7, 8, 4, 1, 0, 5, 2, 0, 3],
  [1, 2, 0, 3, 4, 6, 9, 0, 7],
  [0, 9, 0, 0, 0, 0, 0, 4, 0],
  [8, 0, 1, 6, 2, 0, 0, 0, 0],
  [0, 0, 0, 9, 0, 1, 0, 0, 2],
  [5, 1, 0, 0, 0, 0, 0, 3, 8],
  [4, 0, 9, 0, 0, 3, 0, 2, 0],
  [0, 0, 0, 0, 6, 0, 0, 0, 1]
];

export const createMediumSudoku = () => [
  [0, 0, 0, 3, 0, 0, 0, 6, 2],
  [0, 7, 3, 4, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 3, 0, 0],

  [0, 0, 0, 9, 8, 0, 5, 3, 1],
  [0, 0, 1, 0, 0, 7, 0, 4, 9],
  [0, 0, 0, 6, 0, 0, 0, 0, 0],

  [0, 0, 6, 0, 0, 0, 2, 1, 8],
  [0, 0, 4, 0, 0, 6, 0, 5, 0],
  [0, 1, 7, 0, 3, 2, 0, 9, 0]
]

export const createHardSudoku = () => [
  [0, 0, 7, 1, 0, 0, 0, 0, 4],
  [0, 3, 0, 0, 7, 0, 0, 0, 8],
  [1, 0, 6, 0, 0, 0, 0, 0, 0],

  [5, 6, 0, 3, 0, 0, 0, 2, 0],
  [0, 0, 0, 0, 1, 0, 0, 6, 0],
  [0, 4, 0, 0, 9, 0, 0, 5, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 0, 2, 0, 4, 0],
  [0, 5, 0, 0, 3, 0, 0, 0, 9]
]
