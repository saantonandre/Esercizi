window.onload = function () {
    function id(arg) {
        return document.getElementById(arg);
    }
    var canvas = id("canvas");
    canvas.imageSmoothingEnabled = false;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var CHARA_IDLE = id("CHARA_IDLE");
    var CHARA_WALK_L = id("CHARA_WALK_L");
    var CHARA_WALK_R = id("CHARA_WALK_R");
    var CHARA_WALK_T = id("CHARA_WALK_T");
    var CHARA_WALK_B = id("CHARA_WALK_B");
    var c = canvas.getContext("2d");
    var cellSize = 30;
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
        accel: 0.25,
        /* sprites have an address and a delay */
        sprites: [
            /* IDLE: */
            [CHARA_IDLE, 10],
            /* L: */
            [CHARA_WALK_L, 4],
            /* R: */
            [CHARA_WALK_R, 4],
            /* T: */
            [CHARA_WALK_T, 7],
            /* B: */
            [CHARA_WALK_B, 7]
        ],
        currentSprite: 0,
        currentFrame: 0
    };

    var map = [];
    var hitboxes = [];
    var spawnPoint = {
        x: 0,
        y: 0
    }

    var maps = prompt("Insert map code here", "");
    eval(maps);

    var mapX = (player.x - spawnPoint.x) * cellSize;
    /*    +1 for hitbox    */
    var mapY = (player.y - spawnPoint.y + 1) * cellSize;

    var playerHitbox = {
        x: player.x,
        y: player.y + 1,
        w: player.w,
        h: player.h - 1
    }

    requestAnimationFrame(loop);

    function loop() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        drawPlayer();
        drawMap();
        calculatePlayer();

        requestAnimationFrame(loop);
    }

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
    var frameCounter = 0;

    function drawPlayer() {
        c.fillStyle = "#00ff00";

        /* if the player is not moving he is idling */

        if (!player.L &&
            !player.R &&
            !player.T &&
            !player.B) {
            player.currentSprite = 0;
        }

        /* going down through the sprite frame */

        frameCounter++;

        /* if the next frame does not exist return to 0 */
        if (player.currentFrame + 1 > player.sprites[player.currentSprite][0].height / player.sprites[player.currentSprite][0].width / 2) {
            frameCounter = 0;
        }
        /* currentFrame è l'indice dell'altezza della sprite */
        player.currentFrame = parseInt(frameCounter / player.sprites[player.currentSprite][1]);
        //console.log(frameCounter)

        c.drawImage(
            player.sprites[player.currentSprite][0],
            0,
            64 * player.currentFrame,
            32,
            64,
            player.x * cellSize,
            player.y * cellSize,
            player.w * cellSize,
            player.h * cellSize
        );


        c.stroke();
        c.beginPath();

        c.strokeStyle = "#ff0000";
        c.rect(
            player.x * cellSize,
            player.y * cellSize + cellSize,
            player.w * cellSize,
            player.h * cellSize - cellSize
        );
        c.closePath();
        c.stroke();
    }
    /* SPRITE RENDERING */

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
                player.currentSprite = 1;
                break;
            case 68: //right key down
                player.R = true;
                player.currentSprite = 2;
                break;
            case 87: //top key down
                player.T = true;
                player.currentSprite = 3;
                break;
            case 83: //bot key down
                player.B = true;
                player.currentSprite = 4;
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
