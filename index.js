const boardRegions = document.querySelectorAll("#gameBoard span");
let gameBoard = [];
let turnPlayer = "";

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>';
  updateTitle();
  boardRegions.forEach(function (el) {
    el.classList.remove("win");
    el.innerText = "";
    el.addEventListener("click", handleBoardClick);
  });
}

function getWinRegions() {
  const winRegions = [];
  if (
    gameBoard[0][0] &&
    gameBoard[0][0] === gameBoard[0][1] &&
    gameBoard[0][0] === gameBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    gameBoard[1][0] &&
    gameBoard[1][0] === gameBoard[1][1] &&
    gameBoard[1][0] === gameBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    gameBoard[2][0] &&
    gameBoard[2][0] === gameBoard[2][1] &&
    gameBoard[2][0] === gameBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    gameBoard[0][0] &&
    gameBoard[0][0] === gameBoard[1][0] &&
    gameBoard[0][0] === gameBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    gameBoard[0][1] &&
    gameBoard[0][1] === gameBoard[1][1] &&
    gameBoard[0][1] === gameBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    gameBoard[0][2] &&
    gameBoard[0][2] === gameBoard[1][2] &&
    gameBoard[0][2] === gameBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    gameBoard[0][0] &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    gameBoard[0][2] &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function disableRegion(el) {
  el.style.cursor = "default";
  el.removeEventListener("click", handleBoardClick);
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = playerName + "venceu!";
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region; // N.N
  const rowColumnPair = region.split("."); //o método split() transforma uma string num array com novas strings dentro
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];
  if (turnPlayer === "player1") {
    span.innerText = "X";
    gameBoard[row][column] = "X";
  } else {
    span.innerText = "O";
    gameBoard[row][column] = "O";
  }
  console.clear();
  console.table(gameBoard);
  disableRegion(span);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (gameBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
  }
}

document.getElementById("start").addEventListener("click", initializeGame);
