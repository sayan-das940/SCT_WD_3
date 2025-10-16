const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let running = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
    cell.textContent = "";
  });
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  running = true;
}

function cellClicked() {
  const index = Array.from(cells).indexOf(this);

  if (cells[index].textContent !== "" || !running) return;

  cells[index].textContent = currentPlayer;
  cells[index].style.color = currentPlayer === "X" ? "#00ffff" : "#ff00ff";
  cells[index].style.textShadow = currentPlayer === "X" ? "0 0 15px #00ffff" : "0 0 15px #ff00ff";
  checkWinner();
}

function checkWinner() {
  let win = false;

  for (const condition of winPatterns) {
    const [a, b, c] = condition;
    const cellA = cells[a].textContent;
    const cellB = cells[b].textContent;
    const cellC = cells[c].textContent;

    if (cellA === "" || cellB === "" || cellC === "") continue;
    if (cellA === cellB && cellB === cellC) {
      win = true;
      highlightWin(condition);
      break;
    }
  }

  if (win) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    running = false;
  } else if ([...cells].every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function highlightWin(cellsIndex) {
  cellsIndex.forEach(i => {
    cells[i].style.backgroundColor = "rgba(0, 255, 255, 0.3)";
    cells[i].style.boxShadow = "0 0 25px #00ffff";
  });
}

function restartGame() {
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "rgba(255,255,255,0.1)";
    cell.style.boxShadow = "none";
  });
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}
