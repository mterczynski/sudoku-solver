import { provideSolutionForCustomBoard } from './solvers';
import { sudokus } from './sudokus';

describe('e2e', () => {
  test('easy sudoku', () => {
    const sudoku = sudokus.easy();
    const solution = provideSolutionForCustomBoard(sudoku);

    expect(solution.simpleSolution).toEqual([
      [9, 3, 6, 2, 8, 7, 5, 1, 4],
      [7, 8, 4, 1, 9, 5, 2, 6, 3],
      [1, 2, 5, 3, 4, 6, 9, 8, 7],
      [2, 9, 3, 7, 5, 8, 1, 4, 6],
      [8, 5, 1, 6, 2, 4, 3, 7, 9],
      [6, 4, 7, 9, 3, 1, 8, 5, 2],
      [5, 1, 2, 4, 7, 9, 6, 3, 8],
      [4, 6, 9, 8, 1, 3, 7, 2, 5],
      [3, 7, 8, 5, 6, 2, 4, 9, 1],
    ]);
  });

  test('hard sudoku', () => {
    const sudoku = sudokus.hard();
    const solution = provideSolutionForCustomBoard(sudoku);

    expect(solution.simpleSolution).toEqual([
      [2, 8, 7, 1, 5, 3, 6, 9, 4],
      [4, 3, 5, 6, 7, 9, 2, 1, 8],
      [1, 9, 6, 8, 2, 4, 3, 7, 5],

      [5, 6, 1, 3, 4, 8, 9, 2, 7],
      [9, 2, 8, 7, 1, 5, 4, 6, 3],
      [7, 4, 3, 2, 9, 6, 8, 5, 1],

      [8, 1, 4, 9, 6, 7, 5, 3, 2],
      [3, 7, 9, 5, 8, 2, 1, 4, 6],
      [6, 5, 2, 4, 3, 1, 7, 8, 9],
    ]);
  });
});
