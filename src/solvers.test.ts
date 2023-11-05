import { solve3x3Squares, solveRows, solveColumns } from './solvers';
import { createEmptyBoardWithPossibleValues } from './testUtils';
import type { TileWithPossibleValues } from './types';

function setTileValue(tile: TileWithPossibleValues, value: number) {
  tile.value = value;
  tile.possibleValues = [];
}

describe('solvers', () => {
  describe('solveRows', () => {
    it('solves rows', () => {
      const mockBoardWithPossibleValues = createEmptyBoardWithPossibleValues();

      for (let i = 0; i < 8; i++) {
        setTileValue(mockBoardWithPossibleValues[0][i], i + 1);
      }

      const checkResult = solveRows(mockBoardWithPossibleValues);

      expect(checkResult).toEqual(true);
      expect(mockBoardWithPossibleValues[0][8].value).toEqual(9);
      expect(mockBoardWithPossibleValues[0][8].possibleValues).toEqual([]);
      // check if previously filled values are left untouched:
      expect(mockBoardWithPossibleValues[0][0].value).toEqual(1);
      expect(mockBoardWithPossibleValues[0][0].possibleValues).toEqual([]);
    });

    it('rules out impossible values', () => {
      const mockBoardWithPossibleValues = createEmptyBoardWithPossibleValues();

      for (let i = 0; i < 7; i++) {
        setTileValue(mockBoardWithPossibleValues[0][i], i + 1);
      }

      const checkResult = solveRows(mockBoardWithPossibleValues);

      expect(checkResult).toEqual(true);
      expect(mockBoardWithPossibleValues[0][7].possibleValues).toEqual([8, 9]);
      expect(mockBoardWithPossibleValues[0][8].possibleValues).toEqual([8, 9]);
      // check if previously filled values are left untouched:
      expect(mockBoardWithPossibleValues[0][0].value).toEqual(1);
      expect(mockBoardWithPossibleValues[0][0].possibleValues).toEqual([]);
    });
  });

  describe('solveColumns', () => {
    it('solves columns', () => {
      const mockBoardWithPossibleValues = createEmptyBoardWithPossibleValues();

      for (let i = 0; i < 8; i++) {
        setTileValue(mockBoardWithPossibleValues[i][0], i + 1);
      }

      const checkResult = solveColumns(mockBoardWithPossibleValues);

      expect(checkResult).toEqual(true);
      expect(mockBoardWithPossibleValues[8][0].value).toEqual(9);
      expect(mockBoardWithPossibleValues[8][0].possibleValues).toEqual([]);
      // check if previously filled values are left untouched:
      expect(mockBoardWithPossibleValues[0][0].value).toEqual(1);
      expect(mockBoardWithPossibleValues[0][0].possibleValues).toEqual([]);
    });

    it('rules out impossible values', () => {
      const mockBoardWithPossibleValues = createEmptyBoardWithPossibleValues();

      for (let i = 0; i < 7; i++) {
        setTileValue(mockBoardWithPossibleValues[i][0], i + 1);
      }

      const checkResult = solveColumns(mockBoardWithPossibleValues);

      expect(checkResult).toEqual(true);
      expect(mockBoardWithPossibleValues[7][0].possibleValues).toEqual([8, 9]);
      expect(mockBoardWithPossibleValues[8][0].possibleValues).toEqual([8, 9]);
      // check if previously filled values are left untouched:
      expect(mockBoardWithPossibleValues[0][0].value).toEqual(1);
      expect(mockBoardWithPossibleValues[0][0].possibleValues).toEqual([]);
    });
  });

  describe('solve3x3Squares', () => {
    it('solves 3x3 Squares', () => {
      const mockBoardWithPossibleValues = createEmptyBoardWithPossibleValues();

      setTileValue(mockBoardWithPossibleValues[0][0], 1);
      setTileValue(mockBoardWithPossibleValues[0][1], 2);
      setTileValue(mockBoardWithPossibleValues[0][2], 3);

      setTileValue(mockBoardWithPossibleValues[1][0], 4);
      setTileValue(mockBoardWithPossibleValues[1][1], 5);
      setTileValue(mockBoardWithPossibleValues[1][2], 6);

      setTileValue(mockBoardWithPossibleValues[2][0], 7);
      setTileValue(mockBoardWithPossibleValues[2][1], 8);

      const checkResult = solve3x3Squares(mockBoardWithPossibleValues);

      expect(checkResult).toEqual(true);
      expect(mockBoardWithPossibleValues[2][2].value).toEqual(9);
      expect(mockBoardWithPossibleValues[2][2].possibleValues).toEqual([]);
      // check if previously filled values are left untouched:
      expect(mockBoardWithPossibleValues[0][0].value).toEqual(1);
      expect(mockBoardWithPossibleValues[0][0].possibleValues).toEqual([]);
    });

    it('rules out impossible values', () => {
      const mockBoardWithPossibleValues = createEmptyBoardWithPossibleValues();

      setTileValue(mockBoardWithPossibleValues[0][0], 1);
      setTileValue(mockBoardWithPossibleValues[0][1], 2);
      setTileValue(mockBoardWithPossibleValues[0][2], 3);

      setTileValue(mockBoardWithPossibleValues[1][0], 4);
      setTileValue(mockBoardWithPossibleValues[1][1], 5);
      setTileValue(mockBoardWithPossibleValues[1][2], 6);

      const checkResult = solve3x3Squares(mockBoardWithPossibleValues);

      expect(checkResult).toEqual(true);
      expect(mockBoardWithPossibleValues[2][0].possibleValues).toEqual([
        7, 8, 9,
      ]);
      expect(mockBoardWithPossibleValues[2][1].possibleValues).toEqual([
        7, 8, 9,
      ]);
      expect(mockBoardWithPossibleValues[2][2].possibleValues).toEqual([
        7, 8, 9,
      ]);
      // check if previously filled values are left untouched:
      expect(mockBoardWithPossibleValues[0][0].value).toEqual(1);
      expect(mockBoardWithPossibleValues[0][0].possibleValues).toEqual([]);
    });
  });
});
