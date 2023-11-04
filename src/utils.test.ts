import { createEasySudoku, getColumn, getSquareOfTile } from './utils';
import type { DetailedBoard } from './types';

describe('utils', () => {
  describe('getColumn', () => {
    it('returns a column at provided index', () => {
      const board = createEasySudoku();
      const mockDetailedBoard: DetailedBoard = board.map((row) =>
        row.map((tileValue) => ({
          value: tileValue,
          possibleValues: [], // not relevant to this scenario
        })),
      );

      const result = getColumn(mockDetailedBoard, 1);

      expect(result.map((i) => i.value)).toEqual([0, 8, 2, 9, 0, 0, 1, 0, 0]);
    });
  });

  describe('getSquareOfTile', () => {
    const board = createEasySudoku();
    const mockDetailedBoard: DetailedBoard = board.map((row) =>
      row.map((tileValue) => ({
        value: tileValue,
        possibleValues: [], // not relevant to this scenario
      })),
    );
    it('returns a 3x3 square to which the provided tile belongs to - top right corner', () => {
      const columnIndex = 5;
      const rowIndex = 3;

      const result = getSquareOfTile(mockDetailedBoard, columnIndex, rowIndex);

      expect(result.map((i) => i.value)).toEqual([0, 0, 0, 6, 2, 0, 9, 0, 1]);
    });

    it('returns a 3x3 square to which the provided tile belongs to - bottom left corner', () => {
      const columnIndex = 3;
      const rowIndex = 5;

      const result = getSquareOfTile(mockDetailedBoard, columnIndex, rowIndex);

      expect(result.map((i) => i.value)).toEqual([0, 0, 0, 6, 2, 0, 9, 0, 1]);
    });
  });
});
