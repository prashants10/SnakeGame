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

  let dx = 20;
  let dy = 0;
  let intervalId;
  let gameSpeed = 100;

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

  function updateSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      score += 10;
      document.getElementById("score-board").textContent = `Score: ${score}`;
      if (gameSpeed > 50) {
        clearInterval(intervalId);
        gameSpeed -= 10;
        gameLoop();
      }
      moveFood();
    } else {
      snake.pop();
    }
  }

  function moveFood() {
    let newX, newY;

    do {
      newX = Math.floor(Math.random() * 30) * cellSize;
      newY = Math.floor(Math.random() * 30) * cellSize;
    } while (snake.some((snakeCell) => snakeCell.x === newX && snakeCell.y === newY));

    food = { x: newX, y: newY };
  }

  function changeDirection(e) {
    const isGoingDown = dy === cellSize;
    const isGoingUp = dy === -cellSize;
    const isGoingRight = dx === cellSize;
    const isGoingLeft = dx === -cellSize;

    if (e.key === "ArrowUp" && !isGoingDown) {
      dx = 0;
      dy = -cellSize;
    } else if (e.key === "ArrowDown" && !isGoingUp) {
      dx = 0;
      dy = cellSize;
    } else if (e.key === "ArrowLeft" && !isGoingRight) {
      dx = -cellSize;
      dy = 0;
    } else if (e.key === "ArrowRight" && !isGoingLeft) {
      dx = cellSize;
      dy = 0;
    }
  }

  function isGameOver() {
    // snake collision checks
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }

    // wall collision checks
    const hitLeftWall = snake[0].x < 0; // snake[0] -> head
    const hitRightWall = snake[0].x > arenaSize - cellSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > arenaSize - cellSize;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }

  function restartGame() {
    score = 0;
    food = { x: 300, y: 200 }; // {x: 15*20, y: 10*20} // -> cell coordinate -> pixels// top left pixels for food
    snake = [
      { x: 160, y: 200 },
      { x: 140, y: 200 },
      { x: 120, y: 200 },
    ]; // [head, body, body, tail]

    dx = 20;
    dy = 0;
    gameSpeed = 100;
    gameLoop();
  }

  function gameLoop() {
    intervalId = setInterval(() => {
      if (isGameOver()) {
        clearInterval(intervalId);
        gameStarted = false;
        alert("Game Over" + "\n" + "Your Score: " + score + "\nRestart Game");
        restartGame();
        return;
      }
      updateSnake();
      drawSnakeAndFood();
      drawScoreBoard();
    }, gameSpeed);
  }

  function runGame() {
    // drawSnakeAndFood();
    document.addEventListener("keydown", changeDirection);
    gameLoop();
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
