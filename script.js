const TileState = {
  EMPTY: "",
  O: "O",
  X: "X",
};
const createBoard = (() => {
  const state = [
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
  ];

  const takeTurn = (tileState, row, col) => {
    if (state[row][col] !== TileState.EMPTY) {
      throw new Error("Tile already picked");
    }

    state[row][col] = tileState;

    console.log(state);
  };

  return { takeTurn, state };
})();

const displayGame = (() => {
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      row = tile.getAttribute("data-row");
      col = tile.getAttribute("data-col");
    });
  });
})();

const createGame = (() => {
  let activePlayer = TileState.X;
  const board = createBoard;
  console.log(board.state);

  const toggleActivePlayer = (currentPlayer) => {
    activePlayer = currentPlayer === TileState.O ? TileState.X : TileState.O;
  };

  const startGame = () => {
    while (true) {
      board.takeTurn(activePlayer, row, col);

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

  return {};
})();
