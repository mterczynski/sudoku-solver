export interface TileWithPossibleValues {
  value: number;
  possibleValues: number[];
}

export type BoardWithPossibleValues = TileWithPossibleValues[][];

enum SolvingStepType {
  Solve = 'Solve',
  RemovePossibility = 'RemovePossibility',
}

export interface SolvingStep {
  type: SolvingStepType;
  rowIndex: number;
  columnIndex: number;
  value: number;
}
