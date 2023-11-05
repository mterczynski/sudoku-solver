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
): TileWithPossibleValues[] {
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
