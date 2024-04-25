const TileState = {
  EMPTY: "",
  O: "O",
  X: "X",
};

const player = (() => {
  let activePlayer = TileState.X;

  const toggleActivePlayer = () => {
    player.activePlayer =
      player.activePlayer === TileState.O ? TileState.X : TileState.O;
  };

  return { activePlayer, toggleActivePlayer };
})();

const gameBoard = (() => {
  const state = [
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
    [TileState.EMPTY, TileState.EMPTY, TileState.EMPTY],
  ];

  const changeTileState = (tileState, row, col) => {
    state[row][col] = tileState;
  };

  return { changeTileState, state };
})();

const displayGame = (() => {
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);

      if (
        tile.innerHTML === "O" ||
        tile.innerHTML === "X" ||
        playGame.checkWin() === true ||
        playGame.round === 9
      ) {
        return;
      }

      tile.classList.add("selected");
      tile.innerHTML = `${player.activePlayer}`;
      playGame.takeTurn(player.activePlayer, row, col);
    });
  });
})();

const playGame = (() => {
  let round = 0;

  const takeTurn = (tileState, row, col) => {
    gameBoard.changeTileState(tileState, row, col);

    if (checkWin()) {
      playerWins();
      return;
    }

    round++;

    if (round == 9) {
      draw();
      return;
    }

    player.toggleActivePlayer();
  };

  const checkWin = () => {
    const combos = [
      ...gameBoard.state,
      [gameBoard.state[0][0], gameBoard.state[1][0], gameBoard.state[2][0]],
      [gameBoard.state[0][1], gameBoard.state[1][1], gameBoard.state[2][1]],
      [gameBoard.state[0][2], gameBoard.state[1][2], gameBoard.state[2][2]],
      [gameBoard.state[0][0], gameBoard.state[1][1], gameBoard.state[2][2]],
      [gameBoard.state[0][2], gameBoard.state[1][1], gameBoard.state[2][0]],
    ];

    for (let i = 0; i < combos.length; i++) {
      const activePlayerWon = combos[i].every((item) => {
        return item === player.activePlayer;
      });

      if (activePlayerWon) {
        return true;
      }
    }
    return false;
  };

  const playerWins = () => {
    console.log(`${player.activePlayer} Wins!`);
  };

  const draw = () => {
    console.log("Draw!");
  };

  return { takeTurn, checkWin, round };
})();
