import { addSolveButtonClickListener as addSolveButtonClickHandler, generateBoard, addFillFromJsonClickHandler, parseBoardHTMLToArray, renderData } from "./htmlHandlers";

(function init() {
  generateBoard();
  addFillFromJsonClickHandler();
  addSolveButtonClickHandler()
})();
