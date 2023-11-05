import { addFillFromJsonClickHandler, addSolveButtonsClickListeners as addSolveButtonClickHandler, generateBoard } from "./htmlHandlers";

(function init() {
  generateBoard();
  addFillFromJsonClickHandler();
  addSolveButtonClickHandler()
})();
