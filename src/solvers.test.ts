import { checkRows } from "./solvers"
import { createEmptyDetailedBoard } from "./testUtils"

describe('solvers', () => {
  describe('checkRows', () => {
    it('solves rows', () => {
      const mockDetailedBoard = createEmptyDetailedBoard()

      for (let i = 0; i < 8; i++) {
        mockDetailedBoard[0][i].value = i + 1
        mockDetailedBoard[0][i].possibleValues = []
      }

      const checkResult = checkRows(mockDetailedBoard)

      expect(checkResult).toEqual(true)
      expect(mockDetailedBoard[0][8].value).toEqual(9)
      expect(mockDetailedBoard[0][8].possibleValues).toEqual([])
      // check if previously filled values are left untouched:
      expect(mockDetailedBoard[0][0].value).toEqual(1)
      expect(mockDetailedBoard[0][1].value).toEqual(2)
    })
  })
})
