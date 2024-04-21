
let currentPlayer = "X";
let gameActive = false;

function startGame() {
  document.getElementById("player-turn").innerText = "";
  document.querySelector("h1").innerText = "Hãy chiến đấu hết mình!";
  gameActive = true;
  currentPlayer = "X";
  resetBoard();
}

function resetGame() {
  document.getElementById("player-turn").innerText =
    "Hãy chiến đấu hết mình!";
  document.querySelector("h1").innerText = "Bấm bắt đầu để chơi";
  gameActive = false;
  resetBoard();
}

function resetBoard() {
  const cells = document.querySelectorAll(".board td");
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.pointerEvents = "auto";
  });
}

function cellClicked(row, col) {
  if (!gameActive) return;

  const cell = document.querySelector(
    `.board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`
  );

  if (cell.innerText === "") {
    cell.innerText = currentPlayer;
    cell.style.pointerEvents = "none";
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById(
      "player-turn"
    ).innerText = `Lượt người chơi ${currentPlayer}`;
  }
}

function checkWin() {
  const cells = document.querySelectorAll(".board td");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      gameActive = false;
      document.getElementById(
        "player-turn"
      ).innerText = `Người chơi ${currentPlayer} thắng!`;
      return;
    }
  }

  if ([...cells].every((cell) => cell.innerText !== "")) {
    gameActive = false;
    document.getElementById("player-turn").innerText = "Hòa!";
  }
}
