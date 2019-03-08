window.onload = function initialize() {
    //canvas-related variables
    var canvas = id("canvas");
    var c = canvas.getContext("2d");
    canvas.width = (window.innerHeight < window.innerWidth) ? window.innerHeight / 1.1 : window.innerWidth / 1.1;
    canvas.height = canvas.width;
    c.imageSmoothingEnabled = false;
    var tilesWidth = 9;
    var tilesHeight = 9;
    var pixelRatio = canvas.width / (16 * tilesWidth);
    var tileSize = 16;
    var ratio = tileSize * pixelRatio;
    var textSize = Math.round(0.3 * ratio);
    var fontSize = textSize + "px";
    var paused = 1;
    var fps = false;

    const gForce = 0.016 * ratio;
    var mapX = 0;
    var mapY = 0;


    var tiles = [
        [4, 4], [5, 4], [6, 4], //grass top
        [4, 5], [5, 5], [6, 5], //grass middle
        [4, 6], [5, 6], [6, 6], //grass bottom
        [7, 4], [8, 4], [9, 4], //rock top
        [7, 5], [8, 5], //rock to grass
        [7, 6], [8, 6], [9, 6], //grass short
    ];
    setInterval(function () {
        id("FPS").innerHTML = fps + " FPS";
        fps = 0;
    }, 1000);

    //environment
    var tile = [{
        x: 1,
        y: 3,
        w: 1,
        h: 1,
        type: 0
    }, {
        x: 2,
        y: 3,
        w: 1,
        h: 1,
        type: 1
    }, {
        x: 3,
        y: 3,
        w: 1,
        h: 1,
        type: 2
    }, {
        x: 3,
        y: 4,
        w: 1,
        h: 3,
        type: 5
    }, {
        x: 2,
        y: 4,
        w: 1,
        h: 3,
        type: 4
    }, {
        x: 3,
        y: 7,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 2,
        y: 7,
        w: 1,
        h: 2,
        type: 4
    }, {
        x: 3,
        y: 8,
        w: 6,
        h: 1,
        type: 4
    }, {
        x: 5,
        y: 7,
        w: 1,
        h: 1,
        type: 13
    }, {
        x: 2,
        y: 9,
        w: 6,
        h: 1,
        type: 7
    }, {
        x: 1,
        y: 9,
        w: 1,
        h: 1,
        type: 6
    }, {
        x: 1,
        y: 4,
        w: 1,
        h: 5,
        type: 3
    }, {
        x: 10,
        y: 8,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 9,
        y: 9,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 9,
        y: 8,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 8,
        y: 9,
        w: 1,
        h: 1,
        type: 7
    }, {
        x: 4,
        y: 7,
        w: 1,
        h: 1,
        type: 12
    }, {
        x: 6,
        y: 7,
        w: 1,
        h: 1,
        type: 12
    }, {
        x: 7,
        y: 5,
        w: 1,
        h: 1,
        type: 14
    }, {
        x: 7,
        y: 7,
        w: 2,
        h: 1,
        type: 1
    }, {
        x: 9,
        y: 7,
        w: 1,
        h: 1,
        type: 13
    }, {
        x: 10,
        y: 5,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 10,
        y: 7,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 10,
        y: 6,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 9,
        y: 5,
        w: 1,
        h: 1,
        type: 13
    }, {
        x: 8,
        y: 5,
        w: 1,
        h: 1,
        type: 1
    }, {
        x: 10,
        y: 4,
        w: 1,
        h: 1,
        type: 9
    }, {
        x: 11,
        y: 4,
        w: 1,
        h: 1,
        type: 10
    }, {
        x: 12,
        y: 3,
        w: 1,
        h: 1,
        type: 9
    }, {
        x: 13,
        y: 3,
        w: 1,
        h: 1,
        type: 11
    }, {
        x: 11,
        y: 7,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 13,
        y: 4,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 12,
        y: 4,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 11,
        y: 5,
        w: 1,
        h: 2,
        type: 4
    }, {
        x: 12,
        y: 6,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 12,
        y: 5,
        w: 1,
        h: 1,
        type: 5
    }, {
        x: 7,
        y: 2,
        w: 1,
        h: 1,
        type: 15
    }, {
        x: 8,
        y: 2,
        w: 1,
        h: 1,
        type: 16
    }, {
        x: 6,
        y: 2,
        w: 1,
        h: 1,
        type: 14
    }, {
        x: 16,
        y: 3,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 17,
        y: 3,
        w: 1,
        h: 1,
        type: 5
    }, {
        x: 16,
        y: 4,
        w: 1,
        h: 3,
        type: 3
    }, {
        x: 17,
        y: 4,
        w: 1,
        h: 3,
        type: 5
    }, {
        x: 17,
        y: 7,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 16,
        y: 7,
        w: 1,
        h: 1,
        type: 6
    }, {
        x: 16,
        y: 2,
        w: 1,
        h: 1,
        type: 0
    }, {
        x: 17,
        y: 2,
        w: 1,
        h: 1,
        type: 2
    }, {
        x: 22,
        y: 3,
        w: 1,
        h: 1,
        type: 14
    }, {
        x: 23,
        y: 3,
        w: 3,
        h: 1,
        type: 15
    }, {
        x: 26,
        y: 3,
        w: 1,
        h: 1,
        type: 13
    }, {
        x: 27,
        y: 4,
        w: 1,
        h: 2,
        type: 5
    }, {
        x: 27,
        y: 3,
        w: 1,
        h: 1,
        type: 11
    }, {
        x: 26,
        y: 6,
        w: 1,
        h: 1,
        type: 6
    }, {
        x: 26,
        y: 4,
        w: 1,
        h: 2,
        type: 3
    }, {
        x: 27,
        y: 6,
        w: 1,
        h: 1,
        type: 7
    }, {
        x: 28,
        y: 6,
        w: 1,
        h: 1,
        type: 12
    }, {
        x: 29,
        y: 6,
        w: 1,
        h: 1,
        type: 13
    }, {
        x: 30,
        y: 6,
        w: 1,
        h: 1,
        type: 12
    }, {
        x: 31,
        y: 6,
        w: 1,
        h: 1,
        type: 13
    }, {
        x: 32,
        y: 6,
        w: 1,
        h: 1,
        type: 11
    }, {
        x: 29,
        y: 7,
        w: 3,
        h: 1,
        type: 7
    }, {
        x: 28,
        y: 7,
        w: 1,
        h: 1,
        type: 6
    }, {
        x: 32,
        y: 7,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 34,
        y: 4,
        w: 2,
        h: 1,
        type: 10
    }, {
        x: 33,
        y: 4,
        w: 1,
        h: 1,
        type: 9
    }, {
        x: 36,
        y: 4,
        w: 1,
        h: 1,
        type: 11
    }, {
        x: 34,
        y: 5,
        w: 2,
        h: 1,
        type: 7
    }, {
        x: 33,
        y: 5,
        w: 1,
        h: 1,
        type: 6
    }, {
        x: 36,
        y: 5,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 42,
        y: 4,
        w: 1,
        h: 1,
        type: 14
    }, {
        x: 43,
        y: 4,
        w: 3,
        h: 1,
        type: 15
    }, {
        x: 46,
        y: 4,
        w: 1,
        h: 1,
        type: 16
    }, ];

    var player = {
        x: 3 * ratio,
        y: 1 * ratio,
        atk: 1,
        xVel: 0,
        yVel: 0,
        w: 1 * ratio,
        h: 1 * ratio,
        sheet: id("sheet"),
        L: 0,
        R: 0,
        hp: 100,
        grounded: false,
        stun: false,
        speed: 0.06 * ratio,
        precision: 10,
        hitbox: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        atkHitbox: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        col: {
            L: 0,
            R: 0,
            T: 0,
            B: 0
        },
        left: false,
        sprite: {
            x: 0,
            y: 0,
            w: 16,
            h: 16,
        },
        actionX: [[0], [16], [0, 0, 0, 0], [16, 16, 16, 16], [96], [96], [32, 32, 32, 32], [80, 80, 80, 80]],
        actionY: [[0], [0], [0, 16, 32, 48], [0, 16, 32, 48], [16], [48], [0, 16, 32, 48], [0, 16, 32, 48]],
        action: 0,
        attack: 0,
        dash: false,
        dashIn: 0,
        dashCd: 0,
        attackDMG: 7,
        jump: function () {
            if (player.grounded) {
                player.grounded = false;
                player.yVel = -0.27 * ratio;
            }
        },
        attacking: function (hitbox) {
            for (i = 0; i < monsters.length; i++) {
                if (collided(hitbox, monsters[i].hitbox) && monsters[i].hp > 0) {
                    var DMG = Math.round(Math.random() * (player.attackDMG / 2) + player.attackDMG / 2);
                    var missChance = Math.round(Math.random() * (player.precision));
                    if (missChance === 1) {
                        DMG = "miss";
                    } else {
                        if (!parseInt(Math.random() * 3)) {
                            visualFxs.push(new DmgFx(monsters[i], 0));
                        }
                        var randomFx = parseInt(Math.random() * 2 + 1);
                        visualFxs.push(new DmgFx(monsters[i], randomFx));
                        monsters[i].action = 4;
                        monsters[i].hit = true;
                        monsters[i].hp -= DMG;
                        monsters[i].grounded = false;
                        if (monsters[i].type != "Dummy") {
                            monsters[i].yVel = -0.05 * ratio;
                        }
                        if (monsters[i].hp <= 0) {
                            monsters[i].yVel = -0.15 * ratio;
                            monsters[i].frameCounter = 0;
                            monsters[i].frame = 0;
                        }
                    }
                    dmgTexts.push(new DmgText(monsters[i], DMG));
                }
            }
        },
        attackEvent: function () {
            if (player.grounded && !player.attack) {
                player.attack = true;
                frame = 0;
            } else if (!player.attack && !player.dashCd) {
                player.dashCd = true;
                player.dash = true;
                player.dashIn = mapX / ratio;
            }

        },
        respawnEvent: function () {
            this.y = 1 * ratio;
            this.yVel = 0;
            this.xVel = 0;
            this.left = false;
            mapX = 0;
        }
    };
    var monsters = [];
    var random2 = Math.random() * 800 + 100;
    var series = 0; //a unique identificative number for each monster
    class Monster {
        constructor(x, y) {
            this.serial = series;
            this.x = parseFloat(x * ratio);
            this.y = parseFloat(y * ratio);
            this.w = 1 * ratio;
            this.h = 1 * ratio;
            this.sheet = id("sheet");
            this.xVel = 0;
            this.yVel = 0;
            this.speed = 0 * ratio;
            this.grounded = false;
            this.frameCounter = 0;
            this.frame = 0;
            this.hit = false;
            this.hp = 3;
            this.type = null;
            this.attack = false;
            this.hitbox = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            this.atkHitbox = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            this.col = {
                L: 0,
                R: 0,
                T: 0,
                B: 0
            };
            this.left = false;
            this.sprite = {
                x: 0,
                y: 0,
                w: 16,
                h: 16,
            };
            this.actionX = [];
            this.actionY = [];
            this.action = 0;
            //setTimeout(randomMovement, 1000, this.serial);

            series++;
        }
        move() {
            randomMovement(this.serial);
        }
    }
    //shows the number of monsters
    setInterval(function () {
        id("monsternumber").innerHTML = monsters.length;
    }, 500);

    function randomMovement(serial) {
        //console.log(monsters[i].serial+" "+ serial);
        var targetMonster = null;
        for (i = 0; i < monsters.length; i++) {
            if (monsters[i].serial == serial) {
                targetMonster = i;
            }
        }
        if (targetMonster !== null) {
            var random = Math.random() * 800 + 100;
            var random2 = parseInt(Math.random() * 3);
            switch (random2) {
                case 0:
                    if (!monsters[targetMonster].col.L) {
                        monsters[targetMonster].L = true;
                        monsters[targetMonster].R = false;
                    }
                    break;
                case 1:
                    if (!monsters[targetMonster].col.R) {
                        monsters[targetMonster].L = false;
                        monsters[targetMonster].R = true;
                    }
                    break;
                case 2:
                    monsters[targetMonster].L = false;
                    monsters[targetMonster].R = false;
                    break;
            }
            setTimeout(randomMovement, random, serial);
        } else {
            return 0;
        }
    }


    class Slime extends Monster {
        constructor(x, y) {
            super(x, y);
            this.speed = 0.01 * ratio;
            this.hp = 16;
            this.type = "Slime";
            this.actionX = [[192], [208], [192, 192, 192], [208, 208, 208], [224, 224, 224], [224, 224, 224, 224, 224]];
            this.actionY = [[0], [0], [0, 16, 32], [0, 16, 32], [0, 0, 0], [0, 16, 32, 48, 64]];
        }
    }
    class Lizard extends Monster {
        constructor(x, y) {
            super(x, y);
            this.speed = 0.02 * ratio;
            this.hp = 12;
            this.type = "Lizard";
            this.actionX = [[240], [256], [240, 240, 240], [256, 256, 256], [272, 272, 272], [272, 272, 272, 272, 272]];
            this.actionY = [[0], [0], [0, 16, 32, 48], [0, 16, 32, 48], [0, 0, 0], [0, 16, 32, 48, 64]];
        }
    }
    class Bear extends Monster {
        constructor(x, y) {
            super(x, y);
            this.speed = 0.02 * ratio;
            this.hp = 60;
            this.type = "Bear";
            this.actionX = [[0], [32], [0, 0, 0], [32, 32, 32], [160, 160, 160], [160, 160, 160, 160, 160, 160], [64, 64, 64, 64, 64, 64], [128, 128, 128, 128, 128, 128]];
            this.actionY = [[0], [0], [0, 32, 64], [0, 32, 64], [0, 32, 64], [0, 32, 64, 96, 128, 160], [0, 32, 64, 96, 128, 160], [0, 32, 64, 96, 128, 160]];
            this.sprite.w = 32;
            this.sprite.h = 32;
            this.sheet = id("bearsheet");
            this.w = 2 * ratio;
            this.h = 2 * ratio;
            this.canAttack = true;
            this.attackDMG = 20;
            this.precision = 5;
        }
        attackEvent(bear) {
            if (collided(player.hitbox, bear.atkHitbox)) {
                player.y -= 0.05 * ratio;
                player.yVel = -0.05 * ratio;
                player.dashCd = true;
                var playerHB = player.hitbox;
                playerHB.x *= ratio;
                playerHB.w *= ratio;
                playerHB.h *= ratio;
                playerHB.y *= ratio;
                playerHB.x -= mapX;
                var DMG = Math.round(Math.random() * (bear.attackDMG / 2) + bear.attackDMG / 2);
                var missChance = Math.round(Math.random() * (bear.precision));
                if (missChance === 1) {
                    DMG = "miss";
                } else {
                    if (!parseInt(Math.random() * 3)) {
                        visualFxs.push(new DmgFx(playerHB, 0));
                    }
                    var randomFx = parseInt(Math.random() * 2 + 1);
                    visualFxs.push(new DmgFx(playerHB, randomFx));
                }
                dmgTexts.push(new DmgText(playerHB, DMG));
            }
        }
        searchPlayer(bear) {
            if (collided(player.hitbox, bear.atkHitbox)) {
                bear.attack = true;
            }
        }
        attackSprite(m) {
            if (m.action == 6) {
                c.drawImage(m.sheet, m.actionX[m.action][m.frame] + 32, m.actionY[m.action][m.frame], m.sprite.w / 2, m.sprite.h, m.x + m.w + mapX, m.y, m.w / 2, m.h);
            } else if (m.action == 7) {
                c.drawImage(m.sheet, m.actionX[m.action][m.frame] - 16, m.actionY[m.action][m.frame], m.sprite.w / 2, m.sprite.h, m.x - m.w / 2 + mapX, m.y, m.w / 2, m.h);
            }
        }
    }
    class Dummy extends Monster {
        constructor(x, y) {
            super(x, y);
            this.speed = 0;
            this.hp = 1200;
            this.type = "Dummy";
            this.actionX = [[192], [192], [192], [192], [192, 192, 192], [192]];
            this.actionY = [[48], [48], [48], [48], [64, 64, 64], [48]];
        }
        move() {}
    }
    class Zombie extends Monster {
        constructor(x, y) {
            super(x, y);
            this.speed = 0.005 * ratio;
            this.hp = 20;
            this.type = "Zombie";
            this.actionX = [[288], [304], [288, 288, 288], [304, 304, 304], [320, 320, 320], [320, 320, 320, 320, 320]];
            this.actionY = [[0], [0], [0, 16, 32, 48], [0, 16, 32, 48], [0, 0, 0], [0, 16, 32, 48, 64]];
        }
    }
    class Superzombie extends Zombie {
        constructor(x, y) {
            super(x, y);
            this.speed = 0.002 * ratio;
            this.hp = 60;
            this.w = 2 * ratio;
            this.h = 2 * ratio;
        }
    }
    create("Bear", 4, 1);
    create("Slime", 5, 0);
    create("Dummy", 8, 4);
    create("Dummy", 7, 1);
    create("Dummy", 8, 1);

    function create(type, x, y) {
        switch (type) {
            case "Slime":
                //console.log("creating a Slime");
                monsters.push(new Slime(x, y));
                monsters[monsters.length - 1].move();
                break;
            case "Lizard":
                //console.log("creating a Lizard");
                monsters.push(new Lizard(x, y));
                monsters[monsters.length - 1].move();
                break;
            case "Zombie":
                monsters.push(new Zombie(x, y));
                //console.log("creating a Zombie");
                monsters[monsters.length - 1].move();
                break;
            case "Dummy":
                monsters.push(new Dummy(x, y));
                break;
            case "Superzombie":
                monsters.push(new Superzombie(x, y));
                //console.log("creating a Superzombie");
                monsters[monsters.length - 1].move();
                break;
            case "Bear":
                monsters.push(new Bear(x, y));
                //console.log("creating a Superzombie");
                monsters[monsters.length - 1].move();
                break;
        }
    }
    /*
    0:idle right
    1:idle left
    2:walk right
    3:walk left
    4:hit
    5:death
    */
    //player object
    var dmgTexts = [];
    class DmgText {
        constructor(m, text) {
            this.x = m.x + m.w / 2 + Math.floor(Math.random() * 16 - 8);
            this.y = m.y - 5 + Math.floor(Math.random() * 16 - 8);
            this.text = text;
            this.size = Math.round(0.4 * ratio);
            this.color = "#ac3232";
            this.span = 40;
        }
    }
    var dmgSprites = {
        x: [[0, 0, 0, 0], [16, 16, 16, 16], [32, 32, 32, 32]],
        y: [[80, 96, 112, 128], [80, 96, 112, 128], [80, 96, 112, 128]],
        w: [16, 16, 32],
        h: [16, 16, 16],
    };
    var visualFxs = [];
    class DmgFx {
        constructor(m, s) {
            this.x = m.x + m.w / 2;
            this.y = m.y - 5;
            if (s === undefined) {
                this.sprite = parseInt(Math.random() * 3);
            } else {
                this.sprite = s;
            }
            var randRot = parseInt(Math.random() * 4) * 90;
            this.rotation = randRot;
            this.sheet = id("sheet");
            this.repeat = false;
            this.frameCounter = 0;
            this.frame = 0;
            this.type = "dmg";
        }
    }
    class Grass {
        constructor(x, y) {
            this.x = x * ratio;
            this.y = (y + 0.02) * ratio;
            this.sprite = 0;
            this.rotation = false;
            this.sheet = id("sheet");
            this.repeat = true;
            this.frameCounter = 0;
            this.frame = 0;
            this.type = "grass";
        }
    }
    var cloudSprites = {
        x: [[112], [112], [112], [112]],
        y: [[0], [16], [32], [48]],
        w: [16, 16, 16, 16],
        h: [16, 16, 16, 16],
    };
    var grassSprite = {
        x: [[160, 160, 160, 160]],
        y: [[64, 80, 96, 112]],
        w: [[16]],
        h: [[16]],
    };
    class Cloud {
        constructor(x, y, s) {
            this.x = x * ratio;
            this.y = y * ratio;
            this.sprite = parseInt(Math.random() * 4);
            this.sheet = id("sheet");
            this.type = "cloud";
            this.movX = -s / 1000 * ratio;
            this.movY = 0;
        }
    }
    for (i = 0; i < 30; i++) {
        var ran1 = parseInt(Math.random() * 100 + (mapX / ratio));
        var ran2 = Math.random() * 4 - 2;
        var ran3 = parseInt(Math.random() * 20 + 1);
        visualFxs.push(new Cloud(ran1, ran2, ran3));
    }

    visualFxs.push(new Grass(3, 2));
    visualFxs.push(new Grass(7, 1));
    visualFxs.push(new Grass(2, 2));
    visualFxs.push(new Grass(5, 6));
    visualFxs.push(new Grass(8, 4));

    function drawFxs(fx) {
        //animation computing
        if (fx.type == "cloud") {
            var spritePos = cloudSprites;
            if (fx.x < -5 * ratio) {
                fx.x = (100 + (mapX / ratio)) * ratio
            }
        }
        if (fx.type == "dmg") {
            var spritePos = dmgSprites;
        }
        if (fx.type == "grass") {
            var spritePos = grassSprite;
        }
        if (fx.frameCounter !== undefined) {
            fx.frameCounter++;
            var slowness = 5;
            fx.type == "grass" ? slowness = 10 : 0;
            if (fx.frameCounter > slowness) {
                fx.frame++;
                fx.frameCounter = 0;
            }
            if (fx.frame > spritePos.x[fx.sprite].length - 1) {
                if (fx.repeat) {
                    fx.frame = 0;
                } else {
                    visualFxs.splice(i, 1);
                }
            }
        }
        if (fx.movX || fx.movY) {
            fx.x += fx.movX;
            fx.y += fx.movY;
        }
        //draw on canvascontext.translate(x, y);
        var fxW = spritePos.w[fx.sprite] / tileSize * ratio;
        var fxH = spritePos.h[fx.sprite] / tileSize * ratio;
        var fxX = fx.x + mapX;
        var fxY = fx.y + fxH / 2;

        //c.translate(fxX+fxW/2, fxY+fxH/2);
        if (fx.rotation != undefined) {
            c.save();
            c.translate(fxX, fxY);
            c.rotate(fx.rotation * Math.PI / 180);
            c.drawImage(
                fx.sheet,
                spritePos.x[fx.sprite][fx.frame],
                spritePos.y[fx.sprite][fx.frame],
                spritePos.w[fx.sprite],
                spritePos.h[fx.sprite],
                -(fxW / 2),
                -(fxH / 2),
                fxW,
                fxH);
            c.restore();
        } else {
            c.drawImage(
                fx.sheet,
                spritePos.x[fx.sprite],
                spritePos.y[fx.sprite],
                spritePos.w[fx.sprite],
                spritePos.h[fx.sprite],
                fxX,
                fxY,
                fxW,
                fxH);
        }
        //c.translate(-(fxX+fxW/2), -(fxY+fxH/2));
    }



    function renderTexts() {
        var removeList = [];
        c.textAlign = "center";
        c.font = fontSize + " 'Press Start 2P'";
        for (i = 0; i < dmgTexts.length; i++) {
            c.font = Math.round(dmgTexts[i].size) + "px" + " 'Press Start 2P'";
            dmgTexts[i].size /= 1.01;
            c.fillStyle = "black";
            c.fillText(dmgTexts[i].text, dmgTexts[i].x + mapX + Math.round(textSize / 10), dmgTexts[i].y + 10 + Math.round(dmgTexts[i].size / 10));
            c.fillStyle = dmgTexts[i].color;
            c.fillText(dmgTexts[i].text, dmgTexts[i].x + mapX, dmgTexts[i].y + 10);
            dmgTexts[i].y -= 0.3;
            dmgTexts[i].span--;
            if (dmgTexts[i].span <= 0) {
                removeList.push(i);
            }
        }
        for (i = removeList.length - 1; i >= 0; i--) {
            dmgTexts.splice(removeList[i], 1);
        }
    }
    /*
                        c.fillStyle="black";
                        c.fillText(player.attackDMG,m.x + mapX, m.y);
                        */
    function collided(square1, square2) {
        if (square1.x < square2.x + (mapX / ratio) + square2.w) {
            if (square1.x + square1.w > square2.x + (mapX / ratio)) {
                if (square1.y < square2.y + square2.h) {
                    if (square1.y + square1.h > square2.y) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /*
    actions:
    0:idle right
    1:idle left
    2:walk right
    3:walk left
    4:jump right
    5:jump left
    6:attack right
    7:attack left
    */


    var frameCounter = 0;
    var frame = 0;

    ///////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// MAIN LOOP //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    function loop() {
        frameCounter++;
        fps++;
        paused = 0;
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "#0099dd";
        c.fillRect(0, 0, canvas.width, canvas.height);
        //calculate character
        //draw environment
        checkCollisions();
        calculateCharacter(player);
        for (i = 0; i < monsters.length; i++) {
            monsters[i].frameCounter++;
            calculateMonsters(monsters[i]);
        }
        drawEnvironment();
        //draw character
        for (i = monsters.length - 1; i >= 0; i--) {
            drawMonsters(monsters[i]);
        }
        drawCharacter(player);
        for (i = visualFxs.length - 1; i >= 0; i--) {
            drawFxs(visualFxs[i]);
        }
        renderTexts();
        controller()
        requestAnimationFrame(loop)
    }
    ///////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// MAIN LOOP //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

    function checkCollisions() {
        player.grounded = false;
        player.col.L = false;
        player.col.R = false;
        player.col.T = false;
        player.col.B = false;
        for (i = 0; i < monsters.length; i++) {
            monsters[i].grounded = false;
            monsters[i].col.L = false;
            monsters[i].col.R = false;
            monsters[i].col.T = false;
            monsters[i].col.B = false;
        }
        for (i = 0; i < tile.length; i++) {
            colCheck(player, tile[i]);
            for (m = 0; m < monsters.length; m++) {
                colCheck(monsters[m], tile[i]);
            }
        }
    }


    //TODO: DRAW MONSTERS - MAKE THEM WORK LIKE player - GIVE THEM AI

    function calculateCharacter(p) {
        //controls calculation
        if (p.dash) {
            p.left ? p.xVel = -p.speed * 8 : p.xVel = p.speed * 8;
            p.yVel = 0;
            player.attacking(p.hitbox);
            if (Math.abs(p.dashIn - mapX / ratio) > 4) {
                p.dash = false;
            }
        }
        if (p.col.L) {
            mapX -= p.col.L * ratio;
            p.dash = false;

        }
        if (p.col.R) {
            mapX += p.col.R * ratio // - (0.02 * tileSize);
            p.dash = false;

        }
        if (p.col.T) {
            p.y += p.col.T * ratio // + (0.02 * tileSize);
            p.yVel = 0;
            p.dash = false;

        }
        if (p.col.B) {
            p.y -= p.col.B * ratio - 1;
            p.grounded = true;
            player.dashCd = false;
            p.dash = false;
        }
        if (!p.dash) {
            if (p.L && !p.col.L && !p.R) {
                p.xVel = -p.speed;
                p.left = true;
            } else if (p.R && !p.col.R && !p.L) {
                p.xVel = p.speed;
                p.left = false;
            } else if ((!p.L && !p.R || p.L && p.R) && !p.dash) {
                p.xVel = 0;
            }
            id("left").innerHTML = "player.left= " + p.left;
            if (!p.grounded) {
                p.yVel += gForce;
            } else if (p.yVel > 0) {
                p.yVel = 0;
            }
        }
        player.y += player.yVel;
        mapX -= p.xVel;
        if (player.y > canvas.height) {
            player.respawnEvent();
        }
        //physics calculations
        p.hitbox.x = (p.x + p.w / 5) / ratio;
        p.hitbox.y = p.y / ratio;
        p.hitbox.w = (p.w - p.w / 2.5) / ratio;
        p.hitbox.h = p.h / ratio;
        var dir = (player.left) ? -1 : 1;
        p.atkHitbox.x = p.x / ratio + dir;
        p.atkHitbox.y = p.y / ratio;
        p.atkHitbox.w = p.w / ratio;
        p.atkHitbox.h = p.h / ratio;

        //draw on canvas
    }

    function calculateMonsters(m) {
        if (m.attack) {
            m.L = false;
            m.R = false;
        }
        if (m.col.L) {
            m.x += m.col.L * ratio;
            m.L = false;

        }
        if (m.col.R) {
            m.x -= m.col.R * ratio;
            m.R = false;

        }
        if (m.col.T) {
            m.y += m.col.T * ratio;
            m.yVel = 0;

        }
        if (m.col.B) {
            m.y -= m.col.B * ratio - 1;
            m.grounded = true;

        }
        //controls calculation
        if (m.L && !m.col.L && !m.R && !m.hit) {
            m.xVel = -m.speed * ratio / 20;
            m.left = true;
        } else if (m.R && !m.col.R && !m.L && !m.hit) {
            m.xVel = m.speed * ratio / 20;
            m.left = false;
        } else if (!m.L && !m.R || m.L && m.R) {
            m.xVel = 0;
        }
        if (!m.grounded) {
            m.yVel += gForce;
        } else if (m.yVel > 0) {
            m.yVel = 0;
        }
        m.y += m.yVel;
        m.x += m.xVel;
        m.hitbox.x = (m.x + m.w / 10) / ratio;
        m.hitbox.y = m.y / ratio;
        m.hitbox.w = (m.w - m.w / 5) / ratio;
        m.hitbox.h = m.h / ratio;
        if (m.canAttack) {
            var dir = (m.left) ? -1 : 1;
            m.atkHitbox.x = m.hitbox.x + dir;
            m.atkHitbox.y = m.hitbox.y;
            m.atkHitbox.w = m.hitbox.w;
            m.atkHitbox.h = m.hitbox.h;
            m.searchPlayer(m);
            //console.log("attacking");
        }
    }
    var bg_1 = id("bg1");
    var bg_2 = id("bg2");

    function drawEnvironment() {
        for (i = 0; i < 5; i++) {
            c.drawImage(bg_2, -10 * ratio + (bg_2.width / tileSize * ratio * i) + mapX / 16, -1 * ratio, bg_2.width / tileSize * ratio, bg_2.height / tileSize * ratio);
            c.drawImage(bg_1, -10 * ratio + (bg_1.width / tileSize * ratio * i) + mapX / 8, -1 * ratio, bg_1.width / tileSize * ratio, bg_1.height / tileSize * ratio);
        }
        for (i = 0; i < tile.length; i++) {
            for (j = 0; j < tile[i].h; j++) {
                for (k = 0; k < tile[i].w; k++) {
                    //skips out of bounds tiles
                    if (tile[i].x + k > 9 - mapX / ratio ||
                        tile[i].x + k < -1 - mapX / ratio) {
                        continue;
                    }
                    //c.fillRect((tile[i].x + k) * (ratio)+mapX, (tile[i].y + j) * (ratio), ratio, ratio);
                    c.drawImage(player.sheet, tiles[tile[i].type][0] * 16, tiles[tile[i].type][1] * 16, 16, 16, (tile[i].x + k) * ratio + mapX, (tile[i].y + j) * ratio, ratio, ratio);
                }
            }
        }
    }

    function drawCharacter(p) {
        //animation computing
        var slowness = 6;
        if (p.attack || p.dash) {
            slowness = 4;
            if (!p.left) {
                p.action = 6; //atk right
            } else {
                p.action = 7; //atk left
            }
        } else {
            if (!p.grounded) {
                if (!p.left) {
                    p.action = 4; //jmp right
                } else {
                    p.action = 5; //jmp left
                }
            } else if (p.xVel === 0) {
                if (!p.left) {
                    p.action = 0; //idle right
                } else {
                    p.action = 1; //idle left
                }
            } else if (p.xVel !== 0) {
                if (!p.left) {
                    p.action = 2; //walk right
                } else {
                    p.action = 3; //walk left
                }
            }
        }

        if (frameCounter > slowness) {
            frame++;
            frameCounter = 0;
        }
        //
        if (p.attack && frame == 3 && frameCounter == 0) {
            player.attacking(player.atkHitbox);
        }
        if (frame > p.actionX[p.action].length - 1) {
            frame = 0;
            if (p.attack) {
                p.attack = 0
            }
        }
        //draw on canvas
        if (p.dash) {
            c.globalCompositeOperation = "difference";
            c.globalAlpha = 0.4;
            c.drawImage(p.sheet, p.actionX[p.action][frame], p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x - p.xVel, p.y, p.w, p.h);
            c.globalAlpha = 0.6;
            c.drawImage(p.sheet, p.actionX[p.action][frame], p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x - p.xVel / 1.5, p.y, p.w, p.h);
            c.globalAlpha = 0.8;
            c.drawImage(p.sheet, p.actionX[p.action][frame], p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x, p.y, p.w, p.h);
            c.globalAlpha = 1;
            c.globalCompositeOperation = "source-over";
        } else
            c.drawImage(p.sheet, p.actionX[p.action][frame], p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x, p.y, p.w, p.h);
        //the attack animation takes up 2 tiles in width, so I decided to print the other tile separately
        if (p.attack) {
            if (p.action == 6) {
                c.drawImage(p.sheet, p.actionX[p.action][frame] + 16, p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x + p.w, p.y, p.w, p.h);
            } else if (p.action == 7) {
                c.drawImage(p.sheet, p.actionX[p.action][frame] - 16, p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x - p.w, p.y, p.w, p.h);
            }
        }
    }


    /*
    0:idle right
    1:idle left
    2:walk right
    3:walk left
    4:hit
    5:death
    */
    function drawMonsters(m) {
        //animation computing
        m.frameCounter++
        if (!m.hit) {
            if (!m.grounded) {
                if (!m.left) {
                    m.action = 4; //idle right
                } else {
                    m.action = 4; //idle left
                }
            } else if (m.xVel === 0) {
                if (!m.left) {
                    m.action = 0; //idle right
                } else {
                    m.action = 1; //idle left
                }
            } else if (m.xVel !== 0) {
                if (!m.left) {
                    m.action = 2; //walk right
                } else {
                    m.action = 3; //walk left
                }
            }
        } else {
            m.action = 4;
            if (m.hp <= 0) {
                m.action = 5;
            }
        }
        if (m.attack && m.hp > 0) {
            !m.left ? m.action = 6 : m.action = 7;
        }
        if (m.frameCounter > 10) {
            m.frame++;
            m.frameCounter = 0;
        }
        if (m.frame > m.actionX[m.action].length - 1) {
            m.frame = 0;
            if (m.attack && m.hp > 0) {
                m.attackEvent(m);
                m.attack = false;
            }
            if (m.action == 4) {
                m.hit = false;
            }
            if (m.action == 5) {
                monsters.splice(i, 1);
                return 0;
            }
        }
        //draw on canvas
        c.drawImage(m.sheet, m.actionX[m.action][m.frame], m.actionY[m.action][m.frame], m.sprite.w, m.sprite.h, m.x + mapX, m.y, m.w, m.h);
        if (m.attack) {
            m.attackSprite(m);
        }
    }



    // Keyboard controls
    window.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 65: //left key down
                player.L = true;
                break;
            case 68: //right key down
                player.R = true;
                break;
            case 70: //attack key down
                player.attackEvent();
                break;
            case 71: //g key down
                console.log(player);
                break;
            case 72: //h key down
                console.log(monsters[0].atkHitbox, player.hitbox);
                break;
            case 87: //jump key down
                player.jump();
                break;
            case 49: // 1
                create("Slime", 5, 0);
                break;
            case 50: // 1
                create("Lizard", 5, 0);
                break;
            case 51: // 1
                create("Zombie", 5, 0);
                break;
            case 52: // 1
                create("Superzombie", 5, 0);
                break;
            case 53: // 1
                create("Bear", 5, 0);
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
        }
    });



    //collision detector

    function colCheck(shapeA, shapeB) {
        // get the vectors to check against
        var offFocus = 0;
        if (shapeA !== player) {
            offFocus = mapX / ratio;
        }
        var vX = (shapeA.hitbox.x + offFocus + (shapeA.hitbox.w / 2)) - (shapeB.x + (mapX / ratio) + (shapeB.w / 2)),
            vY = (shapeA.hitbox.y + (shapeA.hitbox.h / 2)) - (shapeB.y + (shapeB.h / 2)),
            // add the half widths and half heights of the objects
            hWidths = (shapeA.hitbox.w / 2) + (shapeB.w / 2),
            hHeights = (shapeA.hitbox.h / 2) + (shapeB.h / 2),
            colDir = null;

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    if (shapeA.col.T < oY && oY > 1 / ratio) {
                        shapeA.col.T = oY;
                    }
                } else {
                    colDir = "b";
                    shapeA.grounded = true;
                    if (shapeA.col.B < oY && oY > 1 / ratio) {
                        shapeA.col.B = oY;
                    }
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                    if (shapeA.col.L < oX && oX > 1 / ratio) {
                        shapeA.col.L = oX;
                    }
                } else {
                    colDir = "r";
                    if (shapeA.col.R < oX && oX > 1 / ratio) {
                        shapeA.col.R = oX;
                    }
                }
            }
        }

        return colDir;

    }
    // TOUCH CONTROLS START
    var controls = {
        dir: 0, //-2 +2
        direction: "none",
        fPos: [0, 0],
        lPos: [0, 0],
        mousedown: false,
        mouseup: false,
    };

    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    function controller() {
        if (controls.mousedown) {
            controls.direction = "none";
            c.globalAlpha = 0.7;
            c.drawImage(id("ctrl"), 0, 0, 32, 32, controls.fPos[0] - 32, controls.fPos[1] - 32, 64, 64);
            c.beginPath();
            c.moveTo(controls.fPos[0], controls.fPos[1]);
            c.lineTo(controls.lPos[0], controls.lPos[1]);
            c.stroke();
            c.closePath();
            c.drawImage(id("ctrl"), 32, 0, 32, 32, controls.lPos[0] - 32, controls.lPos[1] - 32, 64, 64);
            c.globalAlpha = 1;
            controls.dir = 0;
            if (controls.fPos[0] > controls.lPos[0]) {
                controls.direction = "L";
                player.L = true;
                player.R = false;
            } else if (controls.lPos[0] > controls.fPos[0]) {
                controls.direction = "R";
                controls.dir = 1;
                player.R = true;
                player.L = false;
            }
            if (controls.lPos[1] < controls.fPos[1] - 60) {
                player.jump();
            }
        } else if (controls.dir !== 0) {
            controls.dir = 0;
        }
    }
    window.addEventListener("mousedown", function (evt) {
        // id("drag").style.display="none";
        controls.mousedown = true;
        controls.fPos = [evt.clientX - getOffset(canvas).left, evt.clientY - getOffset(canvas).top];
        controls.lPos = [evt.clientX - getOffset(canvas).left, evt.clientY - getOffset(canvas).top];
    });

    window.addEventListener("mousemove", function (evt) {
        controls.lPos = [evt.clientX - getOffset(canvas).left, evt.clientY - getOffset(canvas).top];
    });

    window.addEventListener("mouseup", function () {
        player.R = false;
        player.L = false;
        if (controls.fPos[0] == controls.lPos[0]) {
            player.attackEvent();
        }
        controls.mousedown = false;
        controls.direction = "none";
        //id("dir").innerHTML = controls.direction;
    });

    // touch controls
    window.addEventListener("touchstart", function (evt) {
        //id("drag").style.display="none";
        var touches = evt.touches[0];
        controls.mousedown = true;
        controls.fPos = [touches.clientX - getOffset(canvas).left, touches.clientY - getOffset(canvas).top];
        controls.lPos = [touches.clientX - getOffset(canvas).left, touches.clientY - getOffset(canvas).top];
    });

    window.addEventListener("touchmove", function (evt) {
        var touches = evt.touches[0];
        controls.lPos = [touches.clientX - getOffset(canvas).left, touches.clientY - getOffset(canvas).top];
    });

    window.addEventListener("touchend", function () {
        controls.mousedown = false;
        controls.direction = "none";
        player.R = false;
        player.L = false;
        if (controls.fPos[0] == controls.lPos[0]) {
            player.attackEvent();
        }
        //id("dir").innerHTML = controls.direction;
    });
    // TOUCH CONTROLS END
    requestAnimationFrame(loop)
}
// simplify the document.getElementById() to just id()
function id(arg) {
    return document.getElementById(arg);
}

//starts the program
