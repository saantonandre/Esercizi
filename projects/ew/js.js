function id(arg) {
    return document.getElementById(arg);
}
var fullScreen = false;
var elem = document.documentElement;

/* View in fullscreen */
id("start").onclick = function () {
    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(startGame());
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function startGame() {
    id("start").style.display = "none";
    id("game").style.display = "block";
    var canvas = id("canvas");
    canvas.width = screen.width;
    canvas.height = screen.height;
    var c = canvas.getContext("2d");
    var player = {
        x: canvas.width / 8,
        y: canvas.height / 8,
        w: 60,
        h: 40,
        left: false
    };
    var enemy = {
        x: canvas.width / 8 * 6,
        y: canvas.height / 8 * 6,
        w: 60,
        h: 40,
        left: true,
        area: [0, 0, 0],
        a1: {
            x: canvas.width / 8 * 6,
            y: canvas.height / 8 * 6,
            w: 20,
            h: 40,
        },
        a2: {
            x: canvas.width / 8 * 6,
            y: canvas.height / 8 * 6,
            w: 20,
            h: 40,
        },
        a3: {
            x: canvas.width / 8 * 6,
            y: canvas.height / 8 * 6,
            w: 20,
            h: 40,
        },
    };
    const maxW = canvas.width / 8 * 6;
    const minW = canvas.width / 8;

    function drawEnemy(en) {
        c.fillStyle = "#FF0000";
        c.fillRect(en.x, en.y, en.w, en.h);
        refreshArea(enemy);
        if (en.area[0]) {
            c.fillStyle = "aqua";
            c.fillRect(en.a1.x, en.a1.y, en.a1.w, en.a1.h);
        }
        if (en.area[1]) {
            c.fillStyle = "aqua";
            c.fillRect(en.a2.x, en.a2.y, en.a2.w, en.a2.h);
        }
        if (en.area[2]) {
            c.fillStyle = "aqua";
            c.fillRect(en.a3.x, en.a3.y, en.a3.w, en.a3.h);
        }


    }

    function refreshArea(obj) {
        var w = obj.w / 3;
        obj.a1.x = obj.x;
        obj.a1.y = obj.y;
        obj.a1.w = w;
        obj.a1.h = obj.h;

        obj.a2.x = obj.x + w;
        obj.a2.y = obj.y;
        obj.a2.w = w;
        obj.a2.h = obj.h;

        obj.a3.x = obj.x + w * 2;
        obj.a3.y = obj.y;
        obj.a3.w = w;
        obj.a3.h = obj.h;

    }

    function drawPlayer(pl) {
        c.fillStyle = "#00FF00";
        c.fillRect(pl.x, pl.y, pl.w, pl.h);


    }


    function computeMovements(obj) {
        if (obj.left) {
            obj.x--;
            if (obj.x <= minW) {
                obj.left = false;
            }
        } else {
            obj.x++;
            if (obj.x >= maxW) {
                obj.left = true;
            }
        }
    }

    function movingWalls() {
        c.fillStyle = "pink";
        c.fillRect(wa1.x, wa1.y, wa1.w, wa1.h);
        c.fillRect(wa2.x, wa2.y, wa2.w, wa2.h);
        if (wa1.x >= -screen.width / 3) {
            wa1.left = true;
        }
        if (wa1.x <= -screen.width) {
            wa1.left = false;
        }
        if (wa1.left) {
            wa1.x -= 1.25;
            wa2.x -= 1.25;
        } else {
            wa1.x += 1.25;
            wa2.x += 1.25;
        }
    }

    function loop() {
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);
        computeMovements(player);
        computeMovements(enemy);
        movingWalls();
        drawEnemy(enemy);
        drawPlayer(player);
        if (mousedown) {
            c.lineWidth = 5;
            c.strokeStyle = '#003300';
            c.beginPath();
            c.moveTo(fPos[0], fPos[1]);
            c.lineTo(lPos[0], lPos[1]);
            c.stroke();
            c.closePath();
        }
        if (ball.ready === false) {
            drawBall();
        }
        requestAnimationFrame(loop);
    }


    var mousedown = false;
    var mouseUp = false;
    var c = canvas.getContext("2d");
    var fPos, lPos; // first position, last position

    var ball = {
        x: 50,
        y: 50,
        r: 20,
        xVel: 0,
        yVel: 0,
        ready: true
    };
    var wa1 = {
        x: -canvas.width + canvas.width / 3,
        y: canvas.height / 2 - 5,
        w: canvas.width,
        h: 10,
        left: true
    };
    var wa2 = {
        x: canvas.width - canvas.width / 3,
        y: canvas.height / 2 - 5,
        w: canvas.width,
        h: 10,
    };

    function shoot(f, l) {
        ball.ready = false;
        ball.x = player.x + (player.w / 2);
        ball.y = player.y + (player.h / 2);
        ball.xVel = 0;
        ball.yVel = 0;
        deltaX = l[0] - f[0];
        deltaY = l[1] - f[1];
        rotation = Math.atan2(deltaY, deltaX);
        xtarget = -Math.cos(rotation);
        ytarget = -Math.sin(rotation);
        var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        speed = distance / 5;
        console.log(speed);
        ball.xVel += xtarget * speed;
        ball.yVel += ytarget * speed;
        console.log(ball.yVel);
    }

    function drawBall() {
        calculateBall();
        c.beginPath();
        c.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
        c.fillStyle = 'brown';
        c.fill();
        c.lineWidth = 5;
        c.strokeStyle = '#003300';
        c.stroke();
        c.closePath();

    }

    function calculateBall() {
        ball.x += ball.xVel;
        ball.y += ball.yVel;
        if ((ball.xVel > 0.1 || ball.xVel < -0.1) || (ball.yVel > 0.1 || ball.yVel < -0.1)) {
            previousYVel = ball.yVel;
            ball.xVel /= 1.05;
            ball.yVel /= 1.05;
        } else {
            ball.xVel = 0;
            ball.yVel = 0;
        }
        if ((ball.xVel < 0.5 && ball.xVel > -0.5) && (ball.yVel < 0.5 && ball.yVel > -0.5)) {
            ball.ready = true;
        }
        lineCircleColliding(ball, wa1);
        lineCircleColliding(ball, wa2);
        if (rectCircleColliding(enemy.a1, ball)) {
            enemy.area[0]=1;
            resetBall();
        }
        if (rectCircleColliding(enemy.a2, ball)) {
            enemy.area[1]=1;
            resetBall();
        }
        if (rectCircleColliding(enemy.a3, ball)) {
            enemy.area[2]=1;
            resetBall();
        }

        isColliding();
    }
    var previousYVel = 0;

    function isColliding() {
        if (ball.x + ball.xVel + ball.r > canvas.width) {
            ball.xVel = -ball.xVel;
        }
        if (ball.y + ball.yVel + ball.r > canvas.height) {
            resetBall();
        }
        if (ball.x + ball.xVel - ball.r < 0) {
            ball.xVel = -ball.xVel;
        }
        if (ball.y + ball.yVel - ball.r < 0) {
            resetBall();
        }
    }

    function resetBall() {
        ball.ready = true;
    }

    var preventBouncing = 0;

    function lineCircleColliding(ba, line) {
        if (preventBouncing == 0) {
            if (ba.yVel > 0) {
                if (ba.y + ba.r > line.y && line.y > ba.y - ba.r - previousYVel) {
                    if (ba.x + ba.r <= line.x + line.w && ba.x - ba.r >= line.x) {
                        ba.y = line.y - ba.r - 1;
                        ba.yVel = -ba.yVel;
                        preventBouncing = 2;
                        console.log("it worked!")
                        return;
                    }
                }
            }
            if (ba.yVel < 0) {
                if (ba.y - ba.r < line.y && line.y < ba.y + ba.r + previousYVel) {
                    if (ba.x + ba.r <= line.x + line.w && ba.x - ba.r >= line.x) {
                        ba.yVel = -ba.yVel;
                        preventBouncing = 2;
                        ba.y = line.y + ba.r + 1;
                        console.log("it worked!2")
                        return;
                    }
                }
            }
            if (ba.y + ba.r >= line.y && ba.y - ba.r <= line.y && ba.yVel < line.h && ba.yVel > -line.h) {
                if (ba.x + ba.r <= line.x + line.w && ba.x - ba.r >= line.x) {
                    if (ba.yVel > 0) {
                        ba.y = line.y - ba.r - 1;
                    } else {
                        ba.y = line.y + ba.r + 1;
                    }
                    ba.yVel = -ba.yVel;
                    console.log("it worked!3")
                    preventBouncing = 2;
                    return;
                }
            }

        } else {
            preventBouncing--;
            console.log("not bouncing!")
        }

    }

    function rectCircleColliding(rect, circle) {
        var distX = Math.abs(circle.x - rect.x - rect.w / 2);
        var distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.h / 2 + circle.r)) {
            return false;
        }

        if (distX <= (rect.w / 2)) {
            return true;
        }
        if (distY <= (rect.h / 2)) {
            return true;
        }

        var dx = distX - rect.w / 2;
        var dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }







    //controls
    window.addEventListener("mousedown", function (evt) {
        mousedown = true;
        console.log("mousedown");
        fPos = [evt.clientX, evt.clientY];
        lPos = [evt.clientX, evt.clientY];
    });

    window.addEventListener("mousemove", function (evt) {
        lPos = [evt.clientX, evt.clientY];
    });

    window.addEventListener("mouseup", function () {
        mousedown = false;
        console.log("mouseup");
        if (ball.ready) {
            shoot(fPos, lPos);
        }
    });

    // touch controls
    window.addEventListener("touchstart", function (evt) {
        var touches = evt.touches[0];
        mousedown = true;
        console.log("touchstart");
        fPos = [touches.clientX, touches.clientY];
        lPos = [touches.clientX, touches.clientY];
    });

    window.addEventListener("touchmove", function (evt) {
        var touches = evt.touches[0];
        lPos = [touches.clientX, touches.clientY];
    });

    window.addEventListener("touchend", function () {
        mousedown = false;
        console.log("touchend");
        if (ball.ready) {
            shoot(fPos, lPos);
        }
    });








    loop();

}
