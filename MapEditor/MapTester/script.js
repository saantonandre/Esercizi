window.onload = function () {
    function id(arg) {
        return document.getElementById(arg);
    }
    var canvas = id("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var c = canvas.getContext("2d");
    var cellSize = 30;
    var map = [];
    var hitboxes = [];

    var player = {
        x: canvas.width / cellSize / 2,
        y: canvas.height / cellSize / 2,
        h: 2,
        w: 1,
        //movement
        L: 0,
        R: 0,
        T: 0,
        B: 0,
        xVel: 0,
        yVel: 0,
        speed: 3,
        accel: 0.25
    };

    var playerHitbox = {
        x: player.x,
        y: player.y + 1,
        w: player.w,
        h: player.h - 1
    }
    var maps = prompt("Insert map code here", "");
    eval(maps);

    requestAnimationFrame(loop);

    function loop() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawMap();
        calculatePlayer();
        requestAnimationFrame(loop);
    }
    var mapX = 0;
    var mapY = 0;

    //if collide solo verde con i blu disegna sopra
    //if collide rosso disegna sotto

    function drawMap() {
        var ok1 = false;
        var ok2 = false;
        for (i = 0; i < map.length; i++) {
            c.fillStyle = "#0000ff";
            c.beginPath()
            c.fillRect(map[i].x * cellSize + mapX, map[i].y * cellSize + mapY, map[i].w * cellSize, map[i].h * cellSize);
            c.closePath();
            c.stroke();
            if (col2(player, map[i])) {
                ok1 = true;
            }
            if (col2(playerHitbox, map[i])) {
                ok2 = true;
            }

        }
        for (i = 0; i < hitBoxes.length; i++) {
            c.strokeStyle = "#ff0000";
            c.beginPath()
            c.rect(hitBoxes[i].x * cellSize + mapX, hitBoxes[i].y * cellSize + mapY, hitBoxes[i].w * cellSize, hitBoxes[i].h * cellSize);
            c.closePath();
            c.stroke();
        }
        if (!(ok1 && ok2)) {
            drawPlayer();
        }
    }

    function col2(player, box) {
        if (player.x + player.w > box.x + mapX / cellSize) {
            if (player.x < box.x + mapX / cellSize + box.w) {
                if (player.y + player.h > box.y + mapY / cellSize) {
                    if (player.y < box.y + mapY / cellSize + box.h) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function drawPlayer() {
        c.fillStyle = "#00ff00";
        c.fillRect(
            player.x * cellSize,
            player.y * cellSize,
            player.w * cellSize,
            player.h * cellSize
        );
        c.stroke();

        c.fillStyle = "#ff0000";
        c.fillRect(
            player.x * cellSize,
            player.y * cellSize + cellSize,
            player.w * cellSize,
            player.h * cellSize - cellSize
        );
        c.stroke();
    }

    function calculatePlayer() {
        playerHitbox = {
            x: player.x,
            y: player.y + 1,
            w: player.w,
            h: player.h - 1
        }
        directionCheck();

        isGrounded(playerHitbox);
        mapX -= player.xVel;
        mapY -= player.yVel;
    }


    function directionCheck() {
        if (player.L || player.R) {
            if (player.R && player.xVel < player.speed) {
                player.xVel += player.accel;
            }
            if (player.L && player.xVel > -player.speed) {
                player.xVel -= player.accel;
            }
        } else {
            if (player.xVel !== 0) {
                (player.xVel > 0) ? player.xVel -= player.accel / 4: player.xVel += player.accel / 4;
            }
        }
        if (player.B || player.T) {
            if (player.B && player.yVel < player.speed) {
                player.yVel += player.accel;
            }
            if (player.T && player.yVel > -player.speed) {
                player.yVel -= player.accel;
            }
        } else {
            if (player.yVel !== 0) {
                (player.yVel > 0) ? player.yVel -= player.accel / 4: player.yVel += player.accel / 4;
            }
        }
    }





    function isGrounded(entity) {
        id("stat").innerHTML = "";
        for (i = 0; i < hitBoxes.length; i++) {
            var col = collision(entity, hitBoxes[i]);
            if (col.l) {
                id("stat").innerHTML += "L ";
                player.xVel -= player.xVel * 2;
            }
            if (col.r) {
                id("stat").innerHTML += "R ";
                player.xVel -= player.xVel * 2;

            }
            if (col.t) {
                id("stat").innerHTML += "T ";
                player.yVel -= player.yVel * 2;
            }
            if (col.b) {
                id("stat").innerHTML += "B ";
                player.yVel -= player.yVel * 2;
            }
        }

    }









    //COLLISION DETECTOR
    function collision(Box1, Box2) {
        var vectorX = (Box1.x + (Box1.w / 2)) - (Box2.x + mapX / cellSize + (Box2.w / 2)),
            vectorY = (Box1.y + (Box1.h / 2)) - (Box2.y + mapY / cellSize + (Box2.h / 2)),
            hWidths = (Box1.w / 2) + (Box2.w / 2),
            hHeights = (Box1.h / 2) + (Box2.h / 2),
            colDir = {
                t: 0,
                b: 0,
                l: 0,
                r: 0
            };
        if (Math.abs(vectorX) < hWidths && Math.abs(vectorY) < hHeights) {
            var oX = hWidths - Math.abs(vectorX),
                oY = hHeights - Math.abs(vectorY);
            if (oX >= oY) {

                if (vectorY >= 0) {
                    colDir.t = 1;
                } else {
                    colDir.b = 1;
                }
            } else {
                if (vectorX >= 0) {
                    colDir.l = 1;
                } else {
                    colDir.r = 1;
                }
            }
        }
        return colDir;
    }









    window.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 65: //left key down
                player.L = true;
                break;
            case 68: //right key down
                player.R = true;
                break;
            case 87: //top key down
                player.T = true;
                break;
            case 83: //bot key down
                player.B = true;
                break;
        }
    });
    window.addEventListener("keyup", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 65: //left key up
                player.L = false;
                break;
            case 68: //right key up
                player.R = false;
                break;
            case 87: //top key up
                player.T = false;
                break;
            case 83: //bot key up
                player.B = false;
                break;
        }
    });
};
