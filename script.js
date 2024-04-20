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

  const updateState = (boardState, row, col) => {
    state[row][col] = boardState;
    console.log(state);
  };

  return { updateState };
}

const newBoard = createBoard();
newBoard.updateState(BoardState.X, 1, 1);
