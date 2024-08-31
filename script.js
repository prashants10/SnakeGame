document.addEventListener("DOMContentLoaded", function () {
  const gameArena = document.getElementById("game-arena");

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena);

    const startButton = document.createElement("div");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");

    startButton.addEventListener("click", function () {
      startButton.style.display = "none";
    });

    document.body.appendChild(startButton);
  }
  initiateGame();
});
