const BoardState = {
  EMPTY: "",
  O: "O",
  X: "X",
};

function createBoard() {
  const state = [
    [BoardState.EMPTY, BoardState.EMPTY, BoardState.EMPTY],
    [BoardState.EMPTY, BoardState.EMPTY, BoardState.EMPTY],
    [BoardState.EMPTY, BoardState.EMPTY, BoardState.EMPTY],
  ];

  return { state };
}
