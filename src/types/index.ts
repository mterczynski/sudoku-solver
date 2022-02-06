export interface DetailedTile {
  value: number;
  possibleValues: number[];
}

export type DetailedBoard = DetailedTile[][];

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
