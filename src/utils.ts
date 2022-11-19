import { range } from 'lodash';
import type { DetailedBoard, DetailedTile } from './types';

export const boardSize = 9

export function getColumn(
  board: DetailedBoard,
  columnIndex: number,
): DetailedTile[] {
  return range(0, boardSize).map((rowIndex) => board[rowIndex][columnIndex]);
}

export function getSquareOfTile(
  board: DetailedBoard,
  columnIndex: number,
  rowIndex: number,
): DetailedTile[] {
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
}

export const createMockEasySudoku = () => [
  [6, 1, 4, 0, 7, 3, 0, 8, 9],
  [0, 2, 0, 0, 0, 0, 0, 5, 1],
  [7, 0, 5, 1, 9, 2, 0, 3, 6],

  [0, 0, 0, 0, 0, 8, 1, 0, 0],
  [4, 3, 0, 7, 2, 0, 0, 0, 0],
  [8, 0, 7, 0, 0, 0, 0, 0, 3],

  [0, 0, 0, 0, 5, 7, 6, 0, 2],
  [0, 0, 6, 8, 1, 0, 3, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 7],
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
