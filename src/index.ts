import { addFillFromJsonClickHandler, addSolveButtonClickListener as addSolveButtonClickHandler, generateBoard } from "./htmlHandlers";

(function init() {
  generateBoard();
  addFillFromJsonClickHandler();
  addSolveButtonClickHandler()
})();
