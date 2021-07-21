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
        accel: 0.5,
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
    var hitBoxes = [];
    var spawnPoint = {
        x: 0,
        y: 0
    }
    var maps = prompt("Insert map code here\n(w-a-s-d to walk, spacebar to interact)", "");
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

    function drawPlayer() {

        /* if the player is not moving he is idling */

        if (!player.L &&
            !player.R &&
            !player.T &&
            !player.B && player.currentSprite !== 0) {
            player.currentSprite = 0;
        } /* going down through the sprite frame */

        // frame counter counts how many frames are passing, each sprite has its speed based on this
        player.centerX = player.x + (player.w / 2) - mapX / cellSize;
        player.centerY = player.y + 1 + ((player.h - 1) / 2) - mapY / cellSize;

        /* if the next frame does not exist return to 0 */
        if (player.currentFrame + 2 > player.sprites[player.currentSprite][0].height / player.sprites[player.currentSprite][0].width / 2) {
            frameCounter = 0;
        }
        /* currentFrame è l'indice dell'altezza della sprite */
        player.currentFrame = Math.floor(frameCounter / player.sprites[player.currentSprite][1]);


        //console.log(frameCounter)
        printPlayer();

        frameCounter++;
    }
    // Only draws the player without calculations
    function printPlayer() {

        c.fillStyle = "#00ff00";
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
            printPlayer();
        }
    }
    /* SPRITE RENDERING */

    function calculatePlayer() {
        playerHitbox = {
            x: player.x,
            y: player.y + 1,
            w: player.w,
            h: player.h - 1
        }

        isGrounded(playerHitbox);
        directionCheck();


    }

    var colSide;

    function isGrounded(entity) {
        id("stat").innerHTML = "";
        colSide = {
            t: 0,
            b: 0,
            l: 0,
            r: 0
        };
        for (i = 0; i < hitBoxes.length; i++) {

            var col = collision(entity, hitBoxes[i]);

            if (col.l) {
                if (player.xVel < 0)
                    mapX += player.xVel;
                colSide.l = 1;
            }
            if (col.r) {
                if (player.xVel > 0)
                    mapX += player.xVel;
                colSide.r = 1;

            }
            if (col.t) {
                if (player.yVel < 0)
                    mapY += player.yVel;
                colSide.t = 1;
            }
            if (col.b) {
                if (player.yVel > 0)
                    mapY += player.yVel;
                colSide.b = 1;
            }


        }
        id("stat").innerHTML += "L: " + colSide.l + " R: " + colSide.r + " T: " + colSide.t + " B: " + colSide.b;

    }

    function directionCheck() {

        if (player.L || player.R) {
            if (player.R && player.xVel < player.speed && !(colSide.r)) {
                player.xVel += player.accel;
            }
            if (player.L && player.xVel > -player.speed && !(colSide.l)) {
                player.xVel -= player.accel;
            }
        } else {
            if (player.xVel !== 0) {
                if (colSide.r || colSide.l) {
                    player.xVel = 0;
                } else
                    (player.xVel > 0) ? player.xVel -= player.accel / 4 : player.xVel += player.accel / 4;
            }
        }
        if (player.B || player.T) {
            if (player.B && player.yVel < player.speed && !(colSide.b)) {
                player.yVel += player.accel;
            }
            if (player.T && player.yVel > -player.speed && !(colSide.t)) {
                player.yVel -= player.accel;
            }
        } else {
            if (player.yVel !== 0) {
                if (colSide.t || colSide.b) {
                    player.yVel = 0;
                } else
                    (player.yVel > 0) ? player.yVel -= player.accel / 4 : player.yVel += player.accel / 4;
            }
        }
        mapX -= player.xVel;
        mapY -= player.yVel;
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

    //the interaction point relative to player
    var inter = {
        //left respective to the player
        l: 0,
        //top respective to the player
        t: 0
    }

    function interact() {
        switch (lastPressed) {
            case "l":
                inter.l = -1;
                inter.t = 0;
                break;
            case "r":
                inter.l = 1;
                inter.t = 0;
                break;
            case "t":
                inter.l = 0;
                inter.t = -1;
                break;
            case "b":
                inter.l = 0;
                inter.t = 1;
                break;
        }
        for (i = 0; i < hitBoxes.length; i++) {
            if (hitBoxes[i].text !== undefined) {
                console.log(player.centerX + " " + player.centerY + "\n" + hitBoxes[i].x + " " + hitBoxes[i].y)
                if (player.centerX + inter.l > hitBoxes[i].x && player.centerX + inter.l < hitBoxes[i].x + hitBoxes[i].w) {
                    if (player.centerY + inter.t > hitBoxes[i].y && player.centerY + inter.t < hitBoxes[i].y + hitBoxes[i].h) {
                        alert(hitBoxes[i].text);
                    }
                }
            }
        }
        for (i = 0; i < map.length; i++) {
            if (map[i].text !== undefined) {
                console.log(player.centerX + " " + player.centerY + "\n" + map[i].x + " " + map[i].y)
                if (player.centerX + inter.l > map[i].x && player.centerX + inter.l < map[i].x + map[i].w) {
                    if (player.centerY + inter.t > map[i].y && player.centerY + inter.t < map[i].y + map[i].h) {
                        alert(map[i].text);
                    }
                }
            }
        }

    }


    window.addEventListener("keypress", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 32: //spacebar
                event.preventDefault();
                interact();
                break;
        }
    });
    var lastPressed;

    window.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 65: //left key down
                player.L = true;
                player.currentSprite = 1;
                lastPressed = "l";
                break;
            case 68: //right key down
                player.R = true;
                player.currentSprite = 2;
                lastPressed = "r";
                break;
            case 87: //top key down
                player.T = true;
                player.currentSprite = 3;
                lastPressed = "t";
                break;
            case 83: //bot key down
                player.B = true;
                player.currentSprite = 4;
                lastPressed = "b";
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
