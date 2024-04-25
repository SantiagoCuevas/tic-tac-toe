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

  const resetBoard = () => {
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state.length; j++) {
        state[i][j] = TileState.EMPTY;
      }
    }
  };

  return { state, changeTileState, resetBoard };
})();

const displayGame = (() => {
  const gameTracker = document.querySelector(".turn-tracker");
  const tiles = document.querySelectorAll(".tile");
  const restartBtn = document.querySelector(".restart-btn");

  const updateGameStatus = () => {
    if (playGame.checkWin()) {
      gameTracker.innerHTML = `Player ${player.activePlayer} Wins!`;
      return;
    }

    if (playGame.checkDraw()) {
      gameTracker.innerHTML = "Draw!";
      return;
    }

    gameTracker.innerHTML = `Player ${player.activePlayer}'s turn.`;
  };

  const resetGameDisplay = () => {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      tile.innerHTML = "";
    });
  };

  tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);

      if (
        tile.innerHTML === "O" ||
        tile.innerHTML === "X" ||
        playGame.checkWin()
      ) {
        return;
      }

      tile.classList.add("selected");
      tile.innerHTML = `${player.activePlayer}`;
      playGame.takeTurn(player.activePlayer, row, col);
      updateGameStatus();
    });
  });

  restartBtn.addEventListener("click", () => playGame.resetGame());

  return { updateGameStatus, resetGameDisplay };
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

    if (checkDraw()) {
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

  const checkDraw = () => {
    return round === 9;
  };

  const playerWins = () => displayGame.updateGameStatus();

  const draw = () => displayGame.updateGameStatus(true);

  const resetGame = () => {
    round = 0;
    player.activePlayer = TileState.X;

    gameBoard.resetBoard();
    displayGame.resetGameDisplay();
    displayGame.updateGameStatus();
  };

  return { takeTurn, checkWin, checkDraw, resetGame };
})();
