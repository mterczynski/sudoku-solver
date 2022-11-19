import type { DetailedBoard, DetailedTile } from "./types";
import { boardSize } from "./utils";

function createDetailedTile(value: number): DetailedTile {
  return {
    value,
    possibleValues: value ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
}

export function createEmptyDetailedBoard(): DetailedBoard {
  return Array(boardSize).fill(null).map(() =>
    Array(boardSize).fill(null).map(() => createDetailedTile(0))
  )
}
