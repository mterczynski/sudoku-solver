import { range } from 'lodash';
import type { DetailedBoard, DetailedTile } from './types';

export function getColumn(
  board: DetailedBoard,
  columnIndex: number,
): DetailedTile[] {
  return range(0, 9).map((rowIndex) => board[rowIndex][columnIndex]);
}

export function getSquareOfTile(
  board: DetailedBoard,
  columnIndex: number,
  rowIndex: number,
): DetailedTile[] {
  const x = columnIndex - (columnIndex % 3); // index of square's left column
  const y = rowIndex - (rowIndex % 3); // index of square's top row

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
