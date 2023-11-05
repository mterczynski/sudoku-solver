import _ from "lodash";
import { createEmptyBoardWithPossibleValues } from "./testUtils";
import type { BoardWithPossibleValues } from "./types";

export class State {
  protected static boardWithPossibleValues: BoardWithPossibleValues = createEmptyBoardWithPossibleValues()

  static getBoardWithPossibleValues() {
    return State.boardWithPossibleValues
  }

  static setBoardWithPossibleValues(boardWithPossibleValues: BoardWithPossibleValues) {
    console.log('setBoardWithPossibleValues called with', _.cloneDeep(boardWithPossibleValues))
    this.boardWithPossibleValues = boardWithPossibleValues
  }
}
