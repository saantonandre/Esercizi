function id(arg) {
    return document.getElementById(arg)
}
var canvas = id("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var player = {
    x: canvas.width / 5,
    y: canvas.height / 2,
    w: 20,
    h: 20,
    yVel: 0
}
var playerInit = {
    x: canvas.width / 5,
    y: canvas.height / 2,
    w: 20,
    h: 20,
    yVel: 0
}
const gForce = 0.3;

class Ostacolo {
    constructor(x, y) {
        let rand = random();
        this.x1 = x;
        this.y1 = y - canvas.height / 2 + rand;
        this.x2 = x;
        this.y2 = y + canvas.height / 2 + 300 + rand;
        this.w1 = 40;
        this.h1 = canvas.height;
        this.w2 = 40;
        this.h2 = canvas.height;
    }
    compute() {
        this.x1 -= 2;
        this.x2 -= 2;
    }
    draw() {
        c.fillStyle = "green";
        c.fillRect(this.x1, this.y1, this.w1, this.h1);
        c.fillRect(this.x2, this.y2, this.w2, this.h2);
    }
}
var ostacoli = [];

function random() {
    return Math.floor(Math.random() * -300)
}
for (let i = 0; i < 100; i++) {
    ostacoli.push(new Ostacolo(200 * i + 800, 0));
}
var counter = 0;
var points = 0;
var bestScore = 0;

function loop() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "#a6dedc";
    c.fillRect(0, 0, canvas.width, canvas.height)
    compute();
    draw();
    counter++;
    if (counter >= 15) {
        points++;
        id("score").innerHTML = points;
        counter = 0;
    }



    for (let i = 0; i < ostacoli.length; i++) {
        if (collided(player, ostacoli[i])) {
            youLose();
        }
        ostacoli[i].compute();
        ostacoli[i].draw();
    }


    setTimeout(loop, 1000 / 60)
}

function youLose() {
    player.y = playerInit.y;
    player.yVel = playerInit.yVel;
    ostacoli = [];
    if (points > bestScore) {
        bestScore = points;
        id("best").innerHTML = "best score:" + points;
    }
    counter = 0;
    points = 0;

    for (let i = 0; i < 100; i++) {
        ostacoli.push(new Ostacolo(200 * i + 800, 0));
    }
}


loop();

function compute() {
    player.yVel += gForce;
    player.y += player.yVel;
    if (player.y > canvas.height || player.y + player.h < 0) {
        player.y = playerInit.y;
        player.yVel = playerInit.yVel;
        youLose()
    }

}

function draw() {
    c.fillStyle = "red";
    c.fillRect(player.x, player.y, player.w, player.h)
}
document.addEventListener("click", function () {
    player.yVel = -10;
})


function collided(a, b) {

    if (a.x < b.x1 + b.w1) {
        if (a.x + a.w > b.x1) {
            if (a.y < b.y1 + b.h1) {
                if (a.y + a.h > b.y1) {
                    return true;
                }
            }
        }
    }

    if (a.x < b.x2 + b.w2) {
        if (a.x + a.w > b.x2) {
            if (a.y < b.y2 + b.h2) {
                if (a.y + a.h > b.y2) {
                    return true;
                }
            }
        }
    }
    return false;
}
