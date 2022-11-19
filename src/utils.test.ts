import { createMockEasySudoku, getColumn, getSquareOfTile } from './utils';
import type { DetailedBoard } from './types';

describe('utils', () => {
  describe('getColumn', () => {
    it('returns a column at provided index', () => {
      const board = createMockEasySudoku();
      const mockDetailedBoard: DetailedBoard = board.map((row) =>
        row.map((tileValue) => ({
          value: tileValue,
          possibleValues: [], // not relevant to this scenario
        })),
      );

      const result = getColumn(mockDetailedBoard, 1);

      expect(result.map((i) => i.value)).toEqual([1, 2, 0, 0, 3, 0, 0, 0, 4]);
    });
  });

  describe('getSquareOfTile', () => {
    it('returns a 3x3 square to which the provided tile belongs to', () => {
      const board = createMockEasySudoku();
      const mockDetailedBoard: DetailedBoard = board.map((row) =>
        row.map((tileValue) => ({
          value: tileValue,
          possibleValues: [], // not relevant to this scenario
        })),
      );

      const columnIndex = 5;
      const rowIndex = 3;

      const result = getSquareOfTile(mockDetailedBoard, columnIndex, rowIndex);

      expect(result.map((i) => i.value)).toEqual([0, 0, 8, 7, 2, 0, 0, 0, 0]);
    });
  });
});
