document.addEventListener("DOMContentLoaded", function () {
  const gameArena = document.getElementById("game-arena");
  const arenaSize = 600;
  const cellSize = 20;
  let score = 0;
  let food = { x: 300, y: 200 }; // {x: 15*20, y: 10*20} // -> cell coordinate -> pixels// top left pixels for food
  let snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 },
  ]; // [head, body, body, tail]

  function drawDiv(cell, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.style.top = `${cell.y}px`;
    div.style.left = `${cell.x}px`;
    return div;
  }

  function drawSnakeAndFood() {
    gameArena.innerHTML = "";
    snake.forEach((snakeCell) => {
      const snakeElement = drawDiv(snakeCell, "snake");
      gameArena.appendChild(snakeElement);
    });

    const foodElement = drawDiv(food, "food");
    gameArena.appendChild(foodElement);
  }

  function runGame() {
    drawSnakeAndFood();
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena);

    const startButton = document.createElement("div");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");

    startButton.addEventListener("click", function () {
      startButton.style.display = "none";
      runGame();
    });

    document.body.appendChild(startButton);
  }
  initiateGame();
});
