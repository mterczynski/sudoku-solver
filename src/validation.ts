export function validateBoard(board: number[][]) {
  const errors = [];
}

/** Returns -1 or index of the first duplicate */
function searchForDuplicates(tileCollection: number[]) {
  return tileCollection.findIndex((tile) => {
    tileCollection.indexOf(tile) !== tileCollection.lastIndexOf(tile);
  });
}
