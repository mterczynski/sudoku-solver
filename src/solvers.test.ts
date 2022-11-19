import { solve3x3Squares, solveRows, solveColumns } from "./solvers"
import { createEmptyDetailedBoard } from "./testUtils"
import type { DetailedTile } from "./types"

function setTileValue(tile: DetailedTile, value: number) {
  tile.value = value
  tile.possibleValues = []
}

describe('solvers', () => {
  describe('solveRows', () => {
    it('solves rows', () => {
      const mockDetailedBoard = createEmptyDetailedBoard()

      for (let i = 0; i < 8; i++) {
        setTileValue(mockDetailedBoard[0][i], i + 1)
      }

      const checkResult = solveRows(mockDetailedBoard)

      expect(checkResult).toEqual(true)
      expect(mockDetailedBoard[0][8].value).toEqual(9)
      expect(mockDetailedBoard[0][8].possibleValues).toEqual([])
      // check if previously filled values are left untouched:
      expect(mockDetailedBoard[0][0].value).toEqual(1)
      expect(mockDetailedBoard[0][0].possibleValues).toEqual([])
    })
  })

  describe('solveColumns', () => {
    it('solves columns', () => {
      const mockDetailedBoard = createEmptyDetailedBoard()

      for (let i = 0; i < 8; i++) {
        setTileValue(mockDetailedBoard[i][0], i + 1)
      }

      const checkResult = solveColumns(mockDetailedBoard)

      expect(checkResult).toEqual(true)
      expect(mockDetailedBoard[8][0].value).toEqual(9)
      expect(mockDetailedBoard[8][0].possibleValues).toEqual([])
      // check if previously filled values are left untouched:
      expect(mockDetailedBoard[0][0].value).toEqual(1)
      expect(mockDetailedBoard[0][0].possibleValues).toEqual([])
    })
  })

  describe('solve3x3Squares', () => {
    it('solves 3x3 Squares', () => {
      const mockDetailedBoard = createEmptyDetailedBoard()

      setTileValue(mockDetailedBoard[0][0], 1)
      setTileValue(mockDetailedBoard[0][1], 2)
      setTileValue(mockDetailedBoard[0][2], 3)

      setTileValue(mockDetailedBoard[1][0], 4)
      setTileValue(mockDetailedBoard[1][1], 5)
      setTileValue(mockDetailedBoard[1][2], 6)

      setTileValue(mockDetailedBoard[2][0], 7)
      setTileValue(mockDetailedBoard[2][1], 8)

      const checkResult = solve3x3Squares(mockDetailedBoard)

      expect(checkResult).toEqual(true)
      expect(mockDetailedBoard[2][2].value).toEqual(9)
      expect(mockDetailedBoard[2][2].possibleValues).toEqual([])
      // check if previously filled values are left untouched:
      expect(mockDetailedBoard[0][0].value).toEqual(1)
      expect(mockDetailedBoard[0][0].possibleValues).toEqual([])
    })
  })
})
