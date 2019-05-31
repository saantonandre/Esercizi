window.addEventListener("keydown", function (event) {
    var key = event.keyCode;
    if (key !== 122) {
        event.preventDefault();
    }
    if (key === 112) {
        id("stats").style.visibility = "visible";
        stats.colPoints = true;
    }
    if (key === 113) {
        console.log("Playing as Admin.")
        admin = true;
    }
    if (!gamePaused && !player.uncontrollable) {
        switch (key) {
            case 27:
            case 32: // esc/space key
                gamePaused = true;
                //c.globalAlpha=0.6;
                //UI
                if (player.reading) {
                    id(player.currentBook).style.visibility = "visible";
                } else {
                    id("pause-screen").style.display = "block";
                    id("pause-screen").style.visibility = "visible";
                    id("controls").style.visibility = "hidden";
                }

                break;
            case 65: //left key down (A / left arrow)
            case 37:
                player.L = true;
                break;
            case 68: //right key down (D / right arrow)
            case 39:
                player.R = true;
                break;
            case 83: //down key down (S /down arrow)
            case 40:
                watchDown = true;
                break;
            case 87: //jump key down (W / Z / up arrow)
            case 90:
            case 38:
                if (!jmpKeyPressed) {
                    player.jump();
                    jmpKeyPressed = true;
                }
                break;
            case 82:
                if (!player.dead) {
                    visualFxs.push(new DeathFx(player.x, player.y));
                    audio.death.playy();
                    player.dead = true;
                    setTimeout(function () {
                        player.respawnEvent();
                    }, 1500);
                }
                break;
            case 70: //attack key down (F / X)
            case 88:
                player.attackEvent();
                break;
            case 67: //camera key (C)
                cameraType = 1;
                break;
            case 69: //dance key (E)
                player.dance = true;
                console.log("player.x: " + player.x + "\nplayer.y: " + player.y);
                break;
            case 71: //g key down
                console.log(player);
                break;
            case 72: //h key down
                //nothing
                break;
            case 49: // 1
                monsters.push(new Slime(5 - mapX, -mapY));
                break;
            case 50: // 2
                monsters.push(new Lizard(5 - mapX, -mapY));
                break;
            case 51: // 3
                monsters.push(new Zombie(5 - mapX, -mapY));
                break;
            case 52: // 4
                monsters.push(new Superzombie(5 - mapX, -mapY));
                break;
            case 53: // 5
                monsters.push(new Bear(5 - mapX, -mapY));
                break;
            case 54: // 6
                safeEval(maps[0]);
                initializeMap();
                break;
            case 55: // 7
                safeEval(maps[10]);
                initializeMap();
                break;
        }
    } else if (key === 27 || key === 32) {

        //UI
        if (player.reading) {
            id(player.currentBook).style.visibility = "hidden";
            gamePaused = false;
            requestAnimationFrame(loop);
        } else if (player.uncontrollable) {
            dialogueEngine.input = 1;
        } else {
            id("pause-screen").style.display = "none";
            id("pause-screen").style.visibility = "hidden";
            id("controls").style.visibility = "hidden";
            gamePaused = false;
            requestAnimationFrame(loop);
        }
    }
});
var sheets = ["PixelSamurai/sheet11.png", "PixelSamurai/sheetWarmPalette.png"]
var selectedSheet = 0;
window.addEventListener("keyup", function (event) {
    var key = event.keyCode;
    switch (key) {
        case 65: //left key up (A / left arrow)
        case 37:
            player.L = false;
            break;
        case 9:
            switch (selectedSheet) {
                case 0:
                    selectedSheet = 1;
                    id("sheet").src = sheets[selectedSheet];
                    bgColor = getColor(0, 0);
                    biomes[biome].bgColor = getColor(0, 0);
                    break;
                case 1:
                    selectedSheet = 0;
                    id("sheet").src = sheets[selectedSheet];
                    bgColor = getColor(1, 0);
                    biomes[biome].bgColor = bgColor;
                    break;
            }
            break;
        case 67: //camera key (C)
            cameraType = 0;
            break;
        case 68: //right key up (D / right arrow)
        case 39:
            player.R = false;
            break;
        case 83: //down key up (S /down arrow)
        case 40:
            watchDown = false;
            break;
        case 87: //jump key down (W / Z / up arrow)
        case 90:
        case 38:
            player.jumping = false;
            if (player.jumping && player.jumpCounter < 9) {
                p.yVel = 0;
            }
            jmpKeyPressed = false;
            break;
    }
});
