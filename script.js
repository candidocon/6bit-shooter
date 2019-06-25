let player1;
let player2;
let allTheProjectiles = [];

window.onload = function() {
  ctx = document.getElementById("game-board").getContext("2d");
  $(".start-btn").click(function() {
    startGame($(this).data("players"));
    $("#title-screen").hide();
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
  }
  drawItself() {
    ctx.fillStyle = "#FF0000";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    var myImg = new Image();
    myImg.src = "images/player1.png";
    ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
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
        if (this.y <= 0) {
          this.direction = "down";
        }
      }
    }, 20);
  }
}
class PLayer2 {
  constructor() {
    this.x = 850;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.direction = "up";
    this.human = true;
    this.canShoot = true;
    this.bullets = 6;
  }
  drawItself() {
    ctx.fillStyle = "#19bbc4";
    var myImg = new Image();
    myImg.src = "images/player2.png";
    ctx.drawImage(myImg, this.x, this.y, this.width, this.height);
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
        if (this.y <= 0) {
          this.direction = "down";
        }
      }
    }, 20);
  }
  activatePC() {
    setInterval(() => {
      let randomDodge = Math.floor(Math.random() * 40);

      let randomShoot = Math.floor(Math.random() * 50);

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
      // setTimeout(() => {
      alert("Player 2 wins");
      location.reload();
      // }, 50);
    }
    if (
      player2.x < Projectile.x + Projectile.width &&
      player2.x + player2.width > Projectile.x &&
      player2.y < Projectile.y + Projectile.height &&
      player2.y + player2.height > Projectile.y
    ) {
      // setTimeout(() => {
      alert("Player 1 Wins");
      location.reload();
      // }, 50);
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

  player2 = new PLayer2();
  player2.drawItself();
  player2.move();
  animate();

  if (players === 1) {
    player2.human = false;
    player2.activatePC();
  }
}
