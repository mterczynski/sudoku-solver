import { provideSolution } from "./solvers";
import { generateBoard, handleFillFromJSON, parseBoardHTMLToArray, renderData } from "./htmlHandlers";

(function init() {
  generateBoard();

  handleFillFromJSON();
  const solveButton = document.getElementById('button-solve')!;
  solveButton.addEventListener('click', () => solve());
})();

async function solve() {
  try {
    const data = parseBoardHTMLToArray()
    const solution = await provideSolution(data)

    renderData(solution.simpleSolution)
  } catch (err) {
    return window.alert('Incorrect value provided in one of the inputs');
  }
}

