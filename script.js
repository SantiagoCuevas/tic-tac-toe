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

  const takeTurn = (tileState, row, col) => {
    const askRow = window.prompt("Choose Row (0, 1, 2)");
    const askCol = window.prompt("Choose Column (0, 1, 2)");

    if (state[askRow][askCol] !== TileState.EMPTY) {
      throw new Error("Tile already picked");
    }

    state[askRow][askCol] = tileState;
    console.log(state);
  };

  return { updateState, state };
}

const createGame = () => {
  let activePlayer = TileState.X;
  const board = createBoard();
  console.log(board.state);

  const toggleActivePlayer = (currentPlayer) => {
    activePlayer = currentPlayer === TileState.O ? TileState.X : TileState.O;
  };

  const startGame = () => {
    while (true) {
      board.takeTurn(activePlayer);

      if (checkWin()) {
        endGame();
        break;
      }

      toggleActivePlayer(activePlayer);
    }
  };

  const checkWin = () => {
    const combos = [
      ...board.state,
      [(board.state[0][0], board.state[1][0], board.state[2][0])],
      [board.state[0][1], board.state[1][1], board.state[2][1]],
      [board.state[0][2], board.state[1][2], board.state[2][2]],
      [board.state[0][0], board.state[1][1], board.state[2][2]],
      [board.state[0][2], board.state[1][1], board.state[2][0]],
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

  const endGame = () => {
    console.log("You Win");
  };

  startGame();
};

// const TicTacToe = createGame();
