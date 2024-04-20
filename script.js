const TileState = {
  EMPTY: "",
  O: "O",
  X: "X",
};

function createBoard() {
  const state = [
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
  ];

  const updateState = (tileState, row, col) => {
    if (state[row][col] !== TileState.EMPTY) {
      throw new Error("Tile already picked");
    }

    state[row][col] = tileState;
    console.log(state);
  };

  return { updateState };
}

const createGame = () => {
  let activePlayer = TileState.X;
  const newBoard = createBoard();

  const toggleActivePlayer = (currentPlayer) => {
    activePlayer = currentPlayer === TileState.O ? TileState.X : TileState.O;
  };

  const startGame = () => {
    // while (!winner)
  };

  const evaluateBoard = () => {};

  const checkRows = (board, activePlayer) => {
    for (let i = 0; i < board.length; i++) {
      const activePlayerWon = board[i].every((item) => {
        return item === activePlayer;
      });

      if (activePlayerWon) {
        return true;
      }
    }
    return false;
  };
};
// Game loop: Assign active player then active player chooses tile. Board state is updated with tile. Evaluate board state (check for winner). If winner, exit game loop and enter on win flow with active player. If !winner switch active player.
