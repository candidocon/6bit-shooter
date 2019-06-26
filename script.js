let player1;
let player2;
let allTheProjectiles = [];

window.onload = function() {
  ctx = document.getElementById("game-board").getContext("2d");
  $(".start-btn").click(function() {
    startGame($(this).data("players"));
    $("#title-screen").hide();
  });
  $("#how-to-play-btn").click(function() {
    $("#title-screen").hide();
    $("#how-to-play-div").show();
  });
  document.onkeydown = function(e) {
    if (e.keyCode === 65 /*a*/) {
      player1.switchDiretion();
    }
    if (e.keyCode === 83 /*s*/) {
      player1.shoot();
    }

    if (player2.human) {
      if (e.keyCode === 75 /*k*/) {
        player2.switchDiretion();
      }
      if (e.keyCode === 76 /*l*/) {
        player2.shoot();
      }
    }
  };
};

class PLayer1 {
  constructor() {
    this.x = 50;
    this.y = 500;
    this.width = 100;
    this.height = 100;
    this.direction = "down";
    this.canShoot = true;
    this.bullets = 6;
    this.lives = 3;
    this.wins = 0;
  }
  drawItself() {
    ctx.fillStyle = "#FF0000";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    var myImg = new Image();
    if (!this.canShoot) {
      myImg.src = "images/player1-reloading.png";
      ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
      ctx.font = "20pt Calibri";
      ctx.fillText("RELOADING", this.x, this.y + this.height + 20);
    } else {
      myImg.src = "images/player1.png";
      ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
    }
  }
  switchDiretion() {
    if (this.direction === "down") {
      this.direction = "up";
    } else if (this.direction === "up") {
      this.direction = "down";
    }
  }
  shoot() {
    if (this.canShoot) {
      let bullet = new Projectile(
        this.x + this.width,
        this.y + this.height / 2,
        20,
        10,
        "#FF0000"
      );
      allTheProjectiles.push(bullet);
      bullet.moveRightForever();
      this.bullets--;
      if (this.bullets === 0) {
        this.canShoot = false;
        setTimeout(() => {
          this.canShoot = true;
          this.bullets = 6;
        }, 3000);
      }
    }
  }
  move() {
    setInterval(() => {
      if (this.direction === "down") {
        this.y += 5;
        if (this.y >= 500) {
          this.direction = "up";
        }
      } else if (this.direction === "up") {
        this.y -= 5;
        if (this.y <= 75) {
          this.direction = "down";
        }
      }
    }, 20);
  }
  updateBoard() {
    var myImg = new Image();
    myImg.src = "images/heart-pixel-art-32x32.png";
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(myImg, i * 35 + 35, 20, 32, 32);
    }
    // ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FF0000";
    ctx.font = "60px Arial";
    ctx.fillText(this.wins, 470, 60);
  }
}
class PLayer2 {
  constructor() {
    this.x = 850;
    this.y = 75;
    this.width = 100;
    this.height = 100;
    this.direction = "up";
    this.human = true;
    this.difficulty = 1;
    this.canShoot = true;
    this.bullets = 6;
    this.lives = 3;
    this.wins = 0;
  }
  drawItself() {
    ctx.fillStyle = "#19bbc4";
    var myImg = new Image();
    if (!this.canShoot) {
      myImg.src = "images/player2-reloading.png";
      ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
      ctx.font = "20pt Calibri";
      ctx.fillText("RELOADING", this.x, this.y + this.height + 20);
    } else {
      myImg.src = "images/player2.png";
      ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
    }
  }
  switchDiretion() {
    if (this.direction === "down") {
      this.direction = "up";
    } else if (this.direction === "up") {
      this.direction = "down";
    }
  }
  shoot() {
    if (this.canShoot) {
      let bullet = new Projectile(
        this.x - 20,
        this.y + this.height / 2,
        20,
        10,
        "#19bbc4"
      );
      allTheProjectiles.push(bullet);
      bullet.moveLeftForever();

      this.bullets--;
      if (this.bullets === 0) {
        this.canShoot = false;
        setTimeout(() => {
          this.canShoot = true;
          this.bullets = 6;
        }, 3000);
      }
    }
  }
  move() {
    setInterval(() => {
      if (this.direction === "down") {
        this.y += 5;
        if (this.y >= 500) {
          this.direction = "up";
        }
      } else if (this.direction === "up") {
        this.y -= 5;
        if (this.y <= 75) {
          this.direction = "down";
        }
      }
    }, 20);
  }
  updateBoard() {
    var myImg = new Image();
    myImg.src = "images/heart-pixel-art-32x32.png";
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(myImg, 933 - i * 35, 20, 32, 32);
    }
    // ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#19bbc4";
    ctx.font = "60px Arial";
    ctx.fillText(this.wins, 530, 60);
  }
  activatePC() {
    setInterval(() => {
      let randomDodge = Math.floor(Math.random() * (40 - this.difficulty * 10));

      let randomShoot = Math.floor(Math.random() * (40 - this.difficulty * 10));

      if (randomDodge === 2) {
        this.switchDiretion();
      }
      if (randomShoot === 2) {
        this.shoot();
      }
    }, 50);
  }
}
class Projectile {
  constructor(theX, theY, theWidth, theHeight, theColor) {
    this.x = theX;
    this.y = theY;
    this.width = theWidth;
    this.height = theHeight;
    this.color = theColor;
  }
  drawItself() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeftForever() {
    setInterval(() => {
      this.x -= 5;
    }, 20);
  }
  moveRightForever() {
    setInterval(() => {
      this.x += 5;
    }, 20);
  }
}

function drawEverything() {
  player1.drawItself();
  player2.drawItself();
  player1.updateBoard();
  player2.updateBoard();

  allTheProjectiles.forEach(eachProjectile => {
    eachProjectile.drawItself();
  });
}
function detectCollisions() {
  allTheProjectiles.forEach(Projectile => {
    if (
      player1.x < Projectile.x + Projectile.width &&
      player1.x + player1.width > Projectile.x &&
      player1.y < Projectile.y + Projectile.height &&
      player1.y + player1.height > Projectile.y
    ) {
      Projectile.y += 1000; //remove bullet
      //player 1 gets hit
      player1.lives--;
      if (player1.lives === 0) {
        player2.wins++;
        setTimeout(() => {
          alert("Player 2 wins");
          $("#title-screen").show();
          $("#retry").show();
          $("#start").hide();
          // location.reload();
          restartGame();
        }, 50);
      }
    }
    if (
      player2.x < Projectile.x + Projectile.width &&
      player2.x + player2.width > Projectile.x &&
      player2.y < Projectile.y + Projectile.height &&
      player2.y + player2.height > Projectile.y
    ) {
      Projectile.y += 1000; //remove bullet
      //player 2 gets hit
      player2.lives--;
      if (player2.lives === 0) {
        player1.wins++;
        setTimeout(() => {
          alert("Player 1 wins");
          // location.reload();
          restartGame();
        }, 50);
      }
    }
  });
}
function animate() {
  setInterval(() => {
    ctx.clearRect(0, 0, 1200, 600);
    drawEverything();
    detectCollisions();
  }, 16);
}

function startGame(players) {
  console.log(players);
  player1 = new PLayer1();
  player1.drawItself();
  player1.move();
  player1.updateBoard();

  player2 = new PLayer2();
  player2.drawItself();
  player2.move();
  animate();

  if (players === 1) {
    player2.human = false;
    player2.activatePC();
  }
}
function restartGame() {
  allTheProjectiles = [];
  player1.lives = 3;
  if (player2.human) {
    player2.lives = 3;
  } else {
    if (player1.wins < 5) {
      player2.lives = player1.wins + 3;
    }
    if (player1.wins < 3) {
      player2.difficulty = 1 + player1.wins;
    }
  }
  player1.bullets = 6;
  player2.bullets = 6;
}
