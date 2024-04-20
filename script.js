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
    // while (!winner
  };

  const checkWin = (board, activePlayer) => {
    const combos = [
      // Rows
      ...board,
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (let i = 0; i < combos.length; i++) {
      const activePlayerWon = combos[i].every((item) => {
        return item === activePlayer;
      });

      if (activePlayerWon) {
        return true;
      }
    }
    return false;
  };

  const checkColumns = (board, activePlayer) => {};
};
// Game loop: Assign active player then active player chooses tile. Board state is updated with tile. Evaluate board state (check for winner). If winner, exit game loop and enter on win flow with active player. If !winner switch active player.
