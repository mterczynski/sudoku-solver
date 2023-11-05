import type { BoardWithPossibleValues, TileWithPossibleValues } from './types';
import { boardSize } from './utils';

function createTileWithPossibleValues(value: number): TileWithPossibleValues {
  return {
    value,
    possibleValues: value ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
}

export function createEmptyBoardWithPossibleValues(): BoardWithPossibleValues {
  return Array(boardSize)
    .fill(null)
    .map(() =>
      Array(boardSize)
        .fill(null)
        .map(() => createTileWithPossibleValues(0)),
    );
}
