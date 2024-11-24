const totalBoxes = $("div.box").length;
const totalMines = $("div.mine").length;
let boxes, mines;
let clickedBoxes = 0;

$(document).ready(() => {
  setupNewGame();

  $("button#new-game, button#reset").on("click", () => {
    location.reload();
    setupNewGame();
  });

  $("div.box").on("click", function () {
    $(this).css({ background: "#37eb34" });
    clickedBoxes++;
    checkWinCondition();
  });

  $("div.mine").on("click", function () {
    gameOver();
  });
});

function setupNewGame() {
  boxes = $(".box-container").children();
  
  mines = $.makeArray(boxes.splice(boxes.length - totalMines, totalMines));

  resetGameField();
  distributeMinesRandomly();
}

function resetGameField() {
  $("button#new-game, button#reset").hide();
  clickedBoxes = 0;
}

function distributeMinesRandomly() {
  const boxContainer = $(".box-container");
  for (let i = mines.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (totalBoxes + totalMines));
    const mine = mines.pop();
    boxContainer[0].insertBefore(mine, boxContainer.children()[randomIndex]);
    mines.unshift(mine);
  }
}

function checkWinCondition() {
  if (clickedBoxes === totalBoxes) {
    $(".box-container")
      .css({
        "background-color": "#37eb34",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        height: "250px",
        width: "250px",
      })
      .html(
        "<h2 style='color: black; font-family: verdana, sans-serif;'>You Win!</h2>"
      );

    $("button#new-game").fadeIn().css({ display: "block" });
  }
}

function gameOver() {
  $(".box-container")
    .css({
      "background-color": "red",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      height: "250px",
      width: "250px",
      opacity: "60%",
    })
    .html(
      '<h2 style="color: white; font-family: verdana, sans-serif;">Game Over</h2>'
    );

  $("button#reset").fadeIn().css({ display: "block" });
}
