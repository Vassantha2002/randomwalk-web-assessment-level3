(() => {
    function init() {
      const DOM = {
        $currentPlayer: document.querySelector(".player"),
        $reset: document.querySelector(".reset"),
        $board: document.querySelector(".board"),
        $scorePlayerX: document.getElementById("scorePlayerX"),
        $scorePlayerO: document.getElementById("scorePlayerO"),
        $playerXInput: document.getElementById("playerX"),
        $playerOInput: document.getElementById("playerO"),
      };
  
      const SIZE = 3;
  
      function initialState() {
        return {
          boardModel: Array(SIZE)
            .fill(null)
            .map((_) => Array(SIZE).fill(null)),
          players: ["", ""],
          currentPlayer: 0,
          gameEnded: false,
          turn: 0,
          scores: [0, 0],
        };
      }
  
      let state = initialState();
  
      function boardRender() {
        DOM.$currentPlayer.textContent = state.players[state.currentPlayer];
        DOM.$board.innerHTML = "";
        for (let i = 0; i < SIZE; i++) {
          const $row = document.createElement("div");
          $row.classList.add("board-row");
          for (let j = 0; j < SIZE; j++) {
            const $cell = document.createElement("div");
            $cell.classList.add("board-cell");
            $cell.setAttribute("data-i", i);
            $cell.setAttribute("data-j", j);
            const $content = document.createElement("span");
            $content.classList.add("content");
  
            // Display "X" or "O" instead of player names
            $content.textContent = state.boardModel[i][j];
  
            $cell.appendChild($content);
            $row.appendChild($cell);
          }
          DOM.$board.appendChild($row);
        }
      }
  
      function winCheck(board, player) {
        for (let i = 0; i < SIZE; i++) {
          if (board[i].every((cell) => cell === player)) {
            return true;
          }
        }
  
        for (let j = 0; j < SIZE; j++) {
          let verticalPlayer = true;
          for (let i = 0; i < SIZE; i++) {
            if (board[i][j] !== player) {
              verticalPlayer = false;
              break;
            }
          }
          if (verticalPlayer) {
            return verticalPlayer;
          }
        }
  
        let diagPlayer = true;
        for (let i = 0; i < SIZE; i++) {
          if (board[i][i] !== player) {
            diagPlayer = false;
            break;
          }
        }
        if (diagPlayer) {
          return diagPlayer;
        }
  
        diagPlayer = true;
        for (let i = SIZE - 1, j = 0; i >= 0; i--, j++) {
          if (board[i][j] !== player) {
            diagPlayer = false;
            break;
          }
        }
        if (diagPlayer) {
          return diagPlayer;
        }
  
        return false;
      }
  
      function updateScores() {
        DOM.$scorePlayerX.textContent = `${state.players[0]}: ${state.scores[0]}`;
        DOM.$scorePlayerO.textContent = `${state.players[1]}: ${state.scores[1]}`;
      }
  
      function attachEventListeners() {
        DOM.$board.addEventListener("click", (event) => {
          if (state.gameEnded) {
            return;
          }
          if (!event.target.classList.contains("board-cell")) {
            return;
          }
          const $cell = event.target;
          const i = parseInt($cell.getAttribute("data-i"), 10);
          const j = parseInt($cell.getAttribute("data-j"), 10);
          if (state.boardModel[i][j] !== null) {
            alert("Cell has already been taken!");
            return;
          }
          const player = state.players[state.currentPlayer];
          state.boardModel[i][j] = player;
          const winningMove = winCheck(state.boardModel, player);
          state.turn++;
          if (!winningMove) {
            state.currentPlayer = (state.currentPlayer + 1) % 2;
            boardRender();
            if (state.turn === SIZE * SIZE) {
              alert("It's a draw!");
              state.gameEnded = true;
            }
          } else {
            state.scores[state.currentPlayer]++;
            updateScores();
            boardRender();
            state.gameEnded = true;
            alert(`Player ${player} wins!`);
          }
        });
  
        DOM.$reset.addEventListener("click", () => {
          const playerXName = DOM.$playerXInput.value.trim();
          const playerOName = DOM.$playerOInput.value.trim();
  
          if (playerXName === "" || playerOName === "") {
            alert("Please enter names for both players.");
            return;
          }
  
          state = initialState();
          state.players = ["X", "O"];
          boardRender();
          updateScores();
        });
      }
  
      boardRender();
      attachEventListeners();
    }
  
    document.addEventListener("DOMContentLoaded", init);
  })();
  
  