// simplify the document.getElementById() to just id()
function id(arg) {
    return document.getElementById(arg);
}
var canvas = id("canvas");
var c = canvas.getContext("2d");
//  The size of the tiles in the spritesheet
var mapTester = true;
var tileSize = 16;
var tilesWidth = 20;
var tilesHeight = 15;

// Pixel perfection
var biggestPossible = 1;
var ratioWidth = Math.floor(window.innerWidth / (tileSize * tilesWidth));
var ratioHeight = Math.floor(window.innerHeight / (tileSize * tilesHeight))
if (ratioWidth !== ratioHeight) {
    biggestPossible = ratioWidth < ratioHeight ? ratioWidth : ratioHeight;
} else {
    biggestPossible = ratioHeight;
}
if (biggestPossible < 1) {
    biggestPossible = 1;
}
canvas.width = tileSize * tilesWidth * biggestPossible;
canvas.height = tileSize * tilesHeight * biggestPossible;

//UI
id("menu").style.width = canvas.width + "px";
id("menu").style.height = canvas.height + "px";

console.log(canvas.height)
c.imageSmoothingEnabled = false;

//CAMERA
var watchDown = false;
var cameraType = 0;
var shake = 0;
var shakeArr = [-2, +5, -5, +2];


var visualFxs = [];

var bgTiles = [];

//MONSTERS
var monsters = [];
var series = 0; //a unique identificative number for each monster

//TEXTS
var textsRemoveList = [];
var texts = [];

//UI
var gamePaused = mapTester ? false : true;
var biome = 0;
var map = [{
    x: 2,
    y: 7,
    w: 12,
    h: 2,
    type: 4
}, {
    x: 11,
    y: 6,
    w: 3,
    h: 1,
    type: 1
}];
spawnPoint = {
    x: 3,
    y: 5
};
Audio.prototype.playy = function () {
    var aud = this;
    if (aud.paused) {
        aud.play().catch(function (e) {});
    } else {
        aud.pause();
        aud.currentTime = 0;
        aud.play().catch(function (e) {});
    }
}

//biomes/background
var bgColor = "#0099dd";
var mapHeight = 0;
var mapWidth = 0;
//Canvas-related variables
var ratio = canvas.width / (tilesWidth);
var textSize = Math.round(0.3 * ratio);
var fontSize = textSize + "px";
var paused = 1;
var fps = false;
var gForce = 0.016 * ratio;
var mapX = 0;
var mapY = 0;
var tiles = [
        [4, 4], [5, 4], [6, 4], //grass top
        [4, 5], [5, 5], [6, 5], //grass middle
        [4, 6], [5, 6], [6, 6], //grass bottom
        [7, 4], [8, 4], [9, 4], //rock top
        [7, 5], [8, 5], //rock to grass
        [7, 6], [8, 6], [9, 6], //grass short
        [11, 4], //bouncy ball
        [10, 4], //animated grass
        [12, 5], //speeder
        [5, 7], [6, 7], [7, 7], //stone top
        [5, 8], [6, 8], [7, 8], //stone middle
        [5, 9], [6, 9], [7, 9], //stone bottom
        [5, 10], [6, 10], [7, 10], //stone 2 top
        [5, 11], [6, 11], [7, 11], //stone 2 middle
        [5, 12], [6, 12], [7, 12], //stone 2 bottom
        [8, 12], [9, 12], [10, 12], //stone 3
        [9, 8], //stone single
        [13, 5], [13, 6], [13, 7], [13, 8], //traps rock
        [14, 5], [14, 6], [14, 7], [14, 8], //traps stone
        [12, 0], //slime spawn
        [12, 8], //speeder 2
        [10, 8], [10, 9], [10, 10], [10, 11], // banner
        [8, 10], [9, 10], [8, 11], [9, 11], // chandelier
        [8, 9], // skeleton
        [9, 7], // background rock
        [8, 7], [8, 8], // throne
        [13, 12], // crystal
        [16, 6], // door
        [7, 14], // book
    ]

setInterval(function () {
    id("FPS").innerHTML = fps + " FPS";
    fps = 0;
}, 1000);
var audio = {
    jump: new Audio("PixelSamurai/soundFxs/jump.mp3"),
    bounce1: new Audio("PixelSamurai/soundFxs/bounce1.mp3"),
    bounce2: new Audio("PixelSamurai/soundFxs/bounce2.mp3"),
    bounce3: new Audio("PixelSamurai/soundFxs/bounce3.mp3"),
    bounce4: new Audio("PixelSamurai/soundFxs/bounce4.mp3"),
    speed1: new Audio("PixelSamurai/soundFxs/speed1.mp3"),
    speed2: new Audio("PixelSamurai/soundFxs/speed2.mp3"),
    dash: new Audio("PixelSamurai/soundFxs/dash.mp3"),
    death: new Audio("PixelSamurai/soundFxs/death.mp3"),
    crystal: new Audio("PixelSamurai/soundFxs/crystal.mp3"),
    walking: new Audio("PixelSamurai/soundFxs/walking.mp3"),
    attack: new Audio("PixelSamurai/soundFxs/sword-attack.mp3"),
    hit: new Audio("PixelSamurai/soundFxs/sword-hit.mp3"),
    ambient_1: new Audio("PixelSamurai/soundFxs/ambient/outside.mp3"),
    ambient_2: new Audio("PixelSamurai/soundFxs/ambient/castle.mp3"),
    haydn_1: new Audio("PixelSamurai/soundFxs/music/Haydn-1.mp3"),
    haydn_2: new Audio("PixelSamurai/soundFxs/music/Haydn-2.mp3"),
    bach_1: new Audio("PixelSamurai/soundFxs/music/Bach-1.mp3"),
    bach_2: new Audio("PixelSamurai/soundFxs/music/Bach-2.mp3"),
}

audio.walking.playbackRate = 1.4;
audio.speed1.playbackRate = 0.7;

audio.bounce1.volume = 0.4;
audio.bounce2.volume = 0.4;
audio.bounce3.volume = 0.4;
audio.bounce4.volume = 0.4;
audio.speed1.volume = 0.8;
audio.speed2.volume = 0.5;
audio.jump.volume = 0.5;
audio.dash.volume = 0.3;
audio.attack.volume = 0.5;
audio.hit.volume = 0.5;
audio.death.volume = 0.5;
audio.crystal.volume = 1;
audio.walking.volume = 1;
audio.ambient_1.volume = 0.1;
audio.ambient_2.volume = 0;

audio.ambient_1.loop = true;
audio.ambient_2.loop = true;

audio.haydn_1.volume = 0.2;
audio.haydn_2.volume = 0.2;
audio.bach_1.volume = 0.3;
audio.bach_2.volume = 0.3;


var biomes = [{
    background: true,
    ambient: audio.ambient_1,
    music: [audio.haydn_1, audio.haydn_2],
    bgColor: "#0099dd",
    other: function () {
        for (let j = 0; j < 30; j++) {
            let ww = (mapWidth < 100) ? 100 : mapWidth;
            let hh = (mapHeight < 50) ? 50 : mapHeight;
            var ran1 = parseInt(Math.random() * ww + (player.x / ratio));
            var ran2 = Math.random() * hh / 4 - hh / 8;
            var ran3 = parseInt(Math.random() * 20 + 1);
            visualFxs.push(new Cloud(ran1, ran2, ran3));
        }
    }
}, {
    background: false,
    ambient: audio.ambient_2,
    music: [audio.bach_1, audio.bach_2],
    bgColor: "#222034",
    other: function () {}
}]

// UI

if (mapTester) {
    id("menu").style.visibility = "hidden";
    canvas.style.visibility = "visible";
}
id("play").onclick = function () {
    requestAnimationFrame(loop);
    id("menu").style.visibility = "hidden";
    id("controls").style.visibility = "visible";
    canvas.style.visibility = "visible";
}
id("ctrlButton").onclick = function () {
    id("pause-screen").style.display = "none";
    id("pause-screen").style.visibility = "hidden";
    id("controls").style.visibility = "visible";
    canvas.style.visibility = "visible";
}
var options = {
    audio: true,
    music: true,
}
id("music").onclick = function () {
    if (options.music) {
        options.music = false;
        this.src = "ui/music-off.png";
        audio.haydn_1.volume = 0;
        audio.haydn_2.volume = 0;
        audio.bach_1.volume = 0;
        audio.bach_2.volume = 0;
    } else {
        options.music = true;
        this.src = "ui/music-on.png"
        audio.haydn_1.volume = 0.2;
        audio.haydn_2.volume = 0.2;
        audio.bach_1.volume = 0.3;
        audio.bach_2.volume = 0.3;
    }
}
id("audio").onclick = function () {
    if (options.audio) {
        options.audio = false;
        this.src = "ui/sound-off.png";
        for (let i = 0; i < voices.ghost.length; i++) {
            voices.ghost[i].volume = 0;
        }
        audio.bounce1.volume = 0;
        audio.bounce2.volume = 0;
        audio.bounce3.volume = 0;
        audio.bounce4.volume = 0;
        audio.speed1.volume = 0;
        audio.speed2.volume = 0;
        audio.jump.volume = 0;
        audio.dash.volume = 0;
        audio.attack.volume = 0;
        audio.hit.volume = 0;
        audio.death.volume = 0;
        audio.crystal.volume = 0;
        audio.walking.volume = 0;
        audio.ambient_1.volume = 0;
        audio.ambient_2.volume = 0;

    } else {
        options.audio = true;
        this.src = "ui/sound-on.png";
        for (let i = 0; i < voices.ghost.length; i++) {
            voices.ghost[i].volume = 0.4;
        }
        audio.bounce1.volume = 0.4;
        audio.bounce2.volume = 0.4;
        audio.bounce3.volume = 0.4;
        audio.bounce4.volume = 0.4;
        audio.speed1.volume = 0.8;
        audio.speed2.volume = 0.5;
        audio.jump.volume = 0.5;
        audio.dash.volume = 0.3;
        audio.attack.volume = 0.5;
        audio.hit.volume = 0.5;
        audio.death.volume = 0.5;
        audio.crystal.volume = 1;
        audio.walking.volume = 1;
        audio.ambient_1.volume = 0.1;
        audio.ambient_2.volume = 0.0;

    }
}
//UI end
var voices = {
    ghost: [
        new Audio("PixelSamurai/soundFxs/voices/ghost/1.mp3"),
        new Audio("PixelSamurai/soundFxs/voices/ghost/2.mp3"),
        new Audio("PixelSamurai/soundFxs/voices/ghost/3.mp3"),
        new Audio("PixelSamurai/soundFxs/voices/ghost/4.mp3"),
           ],
}
for (let i = 0; i < voices.ghost.length; i++) {
    voices.ghost[i].volume = 0.4;
}

var player = {
    x: 2 * ratio,
    y: 2 * ratio,
    reading: false,
    currentBook: "",
    atk: 1,
    xVel: 0,
    yVel: 0,
    xVelExt: 0, // external velocity
    yVelExt: 0, // external velocity
    maxVelocity: 0.3 * ratio,
    w: 1 * ratio,
    h: 1 * ratio,
    sheet: id("sheet"),
    L: 0,
    R: 0,
    hp: 100,
    grounded: false,
    stun: false,
    speed: 0.12 * ratio,
    precision: 100,
    lastTile: spawnPoint,
    frameCounter: 0,
    frame: 0,
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
    actionX: [[0], [1], [0, 0, 0, 0], [1, 1, 1, 1], [6], [6], [2, 2, 2, 2], [5, 5, 5, 5], [11, 11, 11, 12, 12, 12]],
    actionY: [[0], [0], [0, 1, 2, 3], [0, 1, 2, 3], [1], [3], [0, 1, 2, 3], [0, 1, 2, 3], [12, 13, 14, 12, 13, 14]],
    action: 0,
    attack: 0,
    dash: false,
    dashIn: 0,
    dashCd: 0,
    attackDMG: 7,
    dance: false,
    jumping: false,
    jumpMaxReached: false,
    jumpCounter: 10,
    jump: function () {
        if (this.grounded && !this.dead) {
            audio.jump.playy();
            this.jumping = true;
            this.grounded = false;
            this.dashCd = false;
            this.yVel = -0.02 * ratio;
            var dir = 0;
            if (this.xVel !== 0) {
                dir = this.left ? 2 : 1;
            }
            visualFxs.push(new JumpFx(this.x / ratio, this.y / ratio, dir));

        }
    },
    attacking: function (hitbox) {
        var hitSomething = 0;
        for (i = 0; i < monsters.length; i++) {
            if (collided(hitbox, monsters[i]) && monsters[i].hp > 0) {
                var DMG = Math.round(Math.random() * (player.attackDMG / 2) + player.attackDMG / 2);
                hitSomething = 1;
                shake = 4;
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
                texts.push(new DmgText(monsters[i], DMG));
            }
        }
        if (hitSomething) {
            audio.hit.playy();
        }
    },
    attackEvent: function () {
        if (this.grounded && !this.attack && !this.dead) {
            audio.attack.playy();
            this.attack = true;
            this.frame = 0;
        } else if (!this.attack && !this.dashCd && !this.dead) {
            var dir = this.left ? 4 : 3;
            visualFxs.push(new JumpFx(this.x / ratio, this.y / ratio, dir));
            audio.dash.playy();
            this.dashCd = true;
            this.dash = true;
            this.dashIn = this.x / ratio;
        }

    },
    respawnEvent: function () {
        this.dead = false;
        this.y = 1 * ratio;
        this.yVel = 0;
        this.xVel = 0;
        this.yVelExt = 0;
        this.xVelExt = 0;
        this.left = false;
        this.dash = false;
        this.dashCd = false;
        if (typeof spawnPoint !== "undefined") {
            this.x = spawnPoint.x * ratio;
            this.y = spawnPoint.y * ratio;
            mapX = -player.x + (tilesWidth / 6) * ratio - 2 * ratio;
            mapY = -player.y + (tilesHeight / 2) * ratio;
        } else {
            mapX = 0;
            mapY = 0;
            this.x = 3 * ratio;
            this.y = 3 * ratio;
        }
    }
};

class Monster {
    constructor(x, y) {
        this.serial = series++;
        this.x = parseFloat(x * ratio);
        this.y = parseFloat(y * ratio);
        this.w = 1 * ratio;
        this.h = 1 * ratio;
        this.sheet = id("sheet");
        this.jumpForce = 0.22 * ratio;
        this.maxVelocity = 0.3 * ratio;
        this.xVel = 0;
        this.yVel = 0;
        this.speed = 0 * ratio;
        this.grounded = false;
        this.frameCounter = 0;
        this.frame = 0;
        this.hit = false;
        this.hp = 3;
        this.maxHp = this.hp;
        this.type = null;
        this.attack = false;
        this.dead = false;
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

    }
    move(arg) {
        leftRightMovement(arg);
    };
    jump() {
        if (this.grounded) {
            this.grounded = false;
            this.yVel = -this.jumpForce;
            let dir = 0;
            if (this.xVel !== 0) {
                dir = this.left ? 2 : 1;
            }
            visualFxs.push(new JumpFx(this.x / ratio, this.y / ratio, dir));

        }
    }
}

//shows the number of monsters
setInterval(function () {
    id("monsternumber").innerHTML = monsters.length;
}, 500);

function leftRightMovement(serial) {

    //console.log(monsters[i].serial+" "+ serial);

    let ser = serial;
    let targetMonster = null;
    for (j = 0; j < monsters.length; j++) {
        if (monsters[j].serial === ser) {
            targetMonster = j;
            break;
        }
    }
    if (targetMonster !== null) {
        let monst = monsters[targetMonster];
        let points = {
            upLeft: {
                x: monst.x / ratio - 0.5,
                y: monst.y / ratio + monst.h / ratio - 1 - 0.5
            },
            upRight: {
                x: monst.x / ratio + monst.w / ratio + 0.5,
                y: monst.y / ratio + monst.h / ratio - 1 - 0.5
            },
            btLeft: {
                x: monst.x / ratio + 0.2,
                y: monst.y / ratio + monst.h / ratio + 1.5
            },
            btLeft2: {
                x: monst.x / ratio + 0.2,
                y: monst.y / ratio + 1 + monst.h / ratio / 2
            },
            btRight: {
                x: monst.x / ratio + monst.w / ratio - 0.2,
                y: monst.y / ratio + monst.h / ratio + 1.5
            },
            btRight2: {
                x: monst.x / ratio + monst.w / ratio - 0.2,
                y: monst.y / ratio + 1 + monst.h / ratio / 2
            },
            left: {
                x: monst.x / ratio - 0.2,
                y: monst.y / ratio + monst.h / ratio / 1.1
            }, // provisional
            right: {
                x: monst.x / ratio + monst.w / ratio + 0.5,
                y: monst.y / ratio + monst.h / ratio / 1.1
            } // provisional
        }
        let cols = {
            upLeft: false,
            upRight: false,
            btLeft: false,
            btRight: false,
            btLeft2: false,
            btRight2: false,
            left: false,
            right: false
        }
        var bottomLeftCol = monst.x;
        var bottomRightColX = monst.x;

        for (let j = 0; j < map.length; j++) {
            if (monst.left) {
                if (pointSquareCol(points.upLeft, map[j])) {
                    cols.upLeft = true;
                }
                if (pointSquareCol(points.left, map[j])) {
                    cols.left = true;
                }
                if (pointSquareCol(points.btLeft, map[j])) {
                    cols.btLeft = true;
                }
                if (pointSquareCol(points.btLeft2, map[j])) {
                    cols.btLeft2 = true;
                }
            } else {
                if (pointSquareCol(points.btRight, map[j])) {
                    cols.btRight = true;
                }
                if (pointSquareCol(points.right, map[j])) {
                    cols.right = true;
                }
                if (pointSquareCol(points.upRight, map[j])) {
                    cols.upRight = true;
                }
                if (pointSquareCol(points.btRight2, map[j])) {
                    cols.btRight2 = true;
                }

            }
        };
        for (let j = 0; j < specialTiles.length; j++) {
            if (monst.left) {
                if (pointSquareCol(points.upLeft, specialTiles[j])) {
                    cols.upLeft = true;
                }
                if (pointSquareCol(points.left, specialTiles[j])) {
                    cols.left = true;
                }
                if (pointSquareCol(points.btLeft, specialTiles[j])) {
                    cols.btLeft = true;
                }
                if (pointSquareCol(points.btLeft2, specialTiles[j])) {
                    cols.btLeft2 = true;
                }
            } else {
                if (pointSquareCol(points.btRight, specialTiles[j])) {
                    cols.btRight = true;
                }
                if (pointSquareCol(points.right, specialTiles[j])) {
                    cols.right = true;
                }
                if (pointSquareCol(points.upRight, specialTiles[j])) {
                    cols.upRight = true;
                }
                if (pointSquareCol(points.btRight2, specialTiles[j])) {
                    cols.btRight2 = true;
                }

            }
        };
        let dir = monst.left ? 0 : 1;
        if (monst.left) {
            if (cols.left && !cols.upLeft) {
                monsters[targetMonster].jump();
            } else if ((cols.left && cols.upLeft) || (!cols.btLeft && !cols.btLeft2)) {
                if (monst.grounded) {
                    dir = 1;
                }

            }

        } else {
            if (cols.right && !cols.upRight) {
                monsters[targetMonster].jump();
            } else if ((cols.right && cols.upRight) || (!cols.btRight && !cols.btRight2)) {
                if (monst.grounded) {
                    dir = 0;
                }
            }
        }
        switch (dir) {
            case 0:
                monsters[targetMonster].left = true;
                monsters[targetMonster].L = true;
                monsters[targetMonster].R = false;
                break;
            case 1:
                monsters[targetMonster].left = false;
                monsters[targetMonster].L = false;
                monsters[targetMonster].R = true;
                break;
            case 2:
                monsters[targetMonster].L = false;
                monsters[targetMonster].R = false;
                break;
        }
    }
}
class Slime extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.02 * ratio;
        this.hp = 16;
        this.maxHp = this.hp;
        this.type = "Slime";
        this.actionX = [[192], [208], [192, 192, 192], [208, 208, 208], [224, 224, 224], [224, 224, 224, 224, 224]];
        this.actionY = [[0], [0], [0, 16, 32], [0, 16, 32], [0, 0, 0], [0, 16, 32, 48, 64]];
    }
}
class Lizard extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.04 * ratio;
        this.hp = 12;
        this.maxHp = this.hp;
        this.type = "Lizard";
        this.actionX = [[240], [256], [240, 240, 240], [256, 256, 256], [272, 272, 272], [272, 272, 272, 272, 272]];
        this.actionY = [[0], [0], [0, 16, 32, 48], [0, 16, 32, 48], [0, 0, 0], [0, 16, 32, 48, 64]];
    }
}
class Bear extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.04 * ratio;
        this.hp = 60;
        this.maxHp = this.hp;
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
        if (collided(player, bear.atkHitbox)) {
            player.yVelExt += -0.3 * ratio;
            player.xVelExt += bear.left ? -0.3 * ratio : 0.3 * ratio;
            player.left = bear.left;
            player.dashCd = true;
            var playerHB = player.hitbox;
            playerHB.x *= ratio;
            playerHB.w *= ratio;
            playerHB.h *= ratio;
            playerHB.y *= ratio;
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
            texts.push(new DmgText(playerHB, DMG));
        }
    }
    searchPlayer(bear) {
        if (collided(player, bear.atkHitbox)) {
            bear.attack = true;
        }
    }
    attackSprite(m) {
        if (m.action == 6) {
            c.drawImage(
                m.sheet,
                m.actionX[m.action][m.frame] + 32,
                m.actionY[m.action][m.frame],
                m.sprite.w / 2, m.sprite.h,
                (m.x + m.w + mapX) | 0,
                (m.y + mapY) | 0, (m.w / 2) | 0,
                (m.h) | 0);
        } else if (m.action == 7) {
            c.drawImage(
                m.sheet,
                m.actionX[m.action][m.frame] - 16,
                m.actionY[m.action][m.frame],
                m.sprite.w / 2,
                m.sprite.h,
                (m.x - m.w / 2 + mapX) | 0,
                (m.y + mapY) | 0,
                (m.w / 2) | 0,
                (m.h) | 0);
        }
    }
}
class Dummy extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0;
        this.hp = 1200;
        this.maxHp = this.hp;
        this.type = "Dummy";
        this.actionX = [[192], [192], [192], [192], [192, 192, 192], [192]];
        this.actionY = [[48], [48], [48], [48], [64, 64, 64], [48]];
    }
    move() {}
}
class Zombie extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.02 * ratio;
        this.hp = 20;
        this.maxHp = this.hp;
        this.type = "Zombie";
        this.actionX = [[288], [304], [288, 288, 288], [304, 304, 304], [320, 320, 320], [320, 320, 320, 320, 320]];
        this.actionY = [[0], [0], [0, 16, 32, 48], [0, 16, 32, 48], [0, 0, 0], [0, 16, 32, 48, 64]];
    }
}
class Superzombie extends Zombie {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.04 * ratio;
        this.hp = 60;
        this.maxHp = this.hp;
        this.w = 2 * ratio;
        this.h = 2 * ratio;
    }
}
class DmgText {
    constructor(m, text) {
        this.x = m.x + m.w / 2 + Math.floor(Math.random() * 16 - 8);
        this.y = m.y - 5 + Math.floor(Math.random() * 16 - 8);
        this.text = text;
        this.size = Math.round(0.4 * ratio);
        this.color = "#ac3232";
        this.lifeSpan = 40; //duration (in frames) of the text appearence
        this.color2 = "black"
    }
    draw(i) {
        c.font = Math.round(this.size) + "px" + " 'Press Start 2P'";
        this.size /= 1.01;
        c.fillStyle = this.color2;
        c.fillText(this.text, this.x + mapX + Math.round(textSize / 10), this.y + 10 + Math.round(this.size / 10) + mapY);
        c.fillStyle = this.color;
        c.fillText(this.text, this.x + mapX, this.y + 10 + mapY);
        this.y -= 0.3;
        this.lifeSpan--;
        if (this.lifeSpan <= 0) {
            textsRemoveList.push(i);
        }
    }
}
class DialogueText {
    constructor(speaker, text, destroy) {
        this.speaker = speaker;
        this.x = this.speaker.x;
        this.y = this.speaker.y;
        this.wholeText = text;
        this.text = "";
        this.size = Math.round(0.4 * ratio);
        this.sizeI = this.size;
        this.color = "white";
        this.lifeSpan = 0;
        this.color2 = "black";
        this.wait = 4;
        this.waitCounter = 0;
        this.destroy = (destroy !== undefined) ? destroy : true;
        this.kill = false;
        this.ongoing = true;
        this.voice = voices.ghost[0];
    }
    draw(i) {
        this.x = this.speaker.x + (this.speaker.w / 2);
        this.y = this.speaker.y - this.size;
        c.font = Math.round(this.size) + "px" + " 'VT323'";
        /*
        if (this.size > this.sizeI / 1.5) {
            this.size /= 1.01;
        }
        */
        c.fillStyle = this.color2;
        c.fillText(this.text, this.x + mapX + Math.round(textSize / 10), this.y + 10 + Math.round(this.size / 10) + mapY);
        c.fillStyle = this.color;
        c.fillText(this.text, this.x + mapX, this.y + 10 + mapY);
        if (this.lifeSpan >= this.wholeText.length) {
            this.ongoing = false;
            if (this.destroy) {
                var that = this;
                setTimeout(function () {
                    that.kill = true
                }, 2000);
            }
        } else {
            if (this.voice.paused) {
                this.voice = voices.ghost[(Math.random() * voices.ghost.length) | 0];
                this.voice.playy();
            }
            this.waitCounter++;
            if (this.waitCounter >= this.wait) {
                this.lifeSpan++;
                this.text += this.wholeText[this.lifeSpan - 1];
                this.waitCounter = 0;
            }
        }
        if (this.kill === true) {
            textsRemoveList.push(i);
        }
    }
}
class DmgFx {
    constructor(m, s) {
        this.x = m.x;
        this.y = m.y + m.h / 2;
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
        this.slowness = 3;
        this.frame = 0;
        this.type = "dmg";
        this.spritePos = {
            x: [[0, 0, 0, 0], [16, 16, 16, 16], [32, 32, 32, 32]],
            y: [[64, 80, 96, 112], [64, 80, 96, 112], [64, 80, 96, 112]],
            w: [16, 16, 32],
            h: [16, 16, 16],
        };
    }
}
class JumpFx {
    constructor(x, y, dir) {
        this.x = x * ratio;
        this.y = y * ratio;
        // dir 0 = jump straight, dir 1 = jump right, dir 2 = jump left
        this.sprite = dir;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = false;
        this.frameCounter = 0;
        this.slowness = (dir > 2) ? 1 : 4;
        this.frame = 0;
        this.type = "jump";
        this.spritePos = {
            x: [[0, 0, 0, 0, 0], [16, 16, 16, 16, 16], [32, 32, 32, 32, 32], [48, 48, 48, 48, 48], [64, 64, 64, 64, 64]],
            y: [[128, 144, 160, 176, 192], [128, 144, 160, 176, 192], [128, 144, 160, 176, 192], [128, 144, 160, 176, 192], [128, 144, 160, 176, 192]],
            w: [16, 16, 16, 16, 16],
            h: [16, 16, 16, 16, 16],
        };
    }
}
class DeathFx {
    constructor(x, y) {
        this.x = (x - 0.5) * ratio;
        this.y = (y - 0.5) * ratio;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = false;
        this.frameCounter = 0;
        this.slowness = 3;
        this.frame = 0;
        this.type = "death";
        this.spritePos = {
            x: [[304, 304, 304, 304, 304, 304]],
            y: [[80, 112, 144, 176, 208, 240]],
            w: [32],
            h: [32],
        };
    }
}
class RingFx {
    constructor(x, y, dir) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.sprite = dir;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = false;
        this.frameCounter = 0;
        this.slowness = 5;
        this.frame = 0;
        this.type = "ring";
        this.spritePos = {
            x: [[0, 0, 0, 0, 0], [16, 16, 16, 16, 16], [32, 32, 32, 32, 32]],
            y: [[208, 224, 240, 256, 272], [208, 224, 240, 256, 272], [208, 224, 240, 256, 272]],
            w: [16, 16, 16],
            h: [16, 16, 16],
        };
    }
}
class Grass {
    constructor(x, y) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 10;
        this.frame = 0;
        this.type = "grass";
        this.spritePos = {
            x: [[160, 160, 160, 160]],
            y: [[64, 80, 96, 112]],
            w: [16],
            h: [16],
        };
    }
}
class Crystal {
    constructor(x, y) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 10;
        this.frame = 0;
        this.type = "crystal";
        this.hitbox = {
            x: x + 0.3,
            y: y + 0.3,
            w: 0.4,
            h: 0.4
        };
        this.spritePos = {
            x: [[208, 208, 208, 208], [224, 224, 224, 224, 224, 224], [240]],
            y: [[192, 208, 224, 240], [192, 208, 224, 240, 256, 272], [192]],
            w: [16, 16, 16],
            h: [16, 16, 16],
        };
    }
    action() {
        if (this.sprite == 1) {
            if (this.frame == this.spritePos.x[1].length - 1) {
                if (this.frameCounter == this.slowness) {
                    this.sprite = 2;
                    var that = this;
                    setTimeout(function () {
                        that.sprite = 0;
                        that.slowness = 10;
                    }, 3000)
                }
            }
        }
        if (this.sprite == 0 && (player.dash) && collided(player, this.hitbox)) {
            audio.crystal.playy();
            player.dashCd = false;
            this.sprite = 1;
            this.frameCounter = 0;
            this.frame = 0;
            this.slowness = 6;
            var thisX = this.x / ratio;
            var thisY = this.y / ratio;
        }

    }
}
class Door {
    constructor(x, y, place) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.sprite = 0;
        this.place = place;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 10;
        this.frame = 0;
        this.type = "door";
        this.hitbox = {
            x: x + 0.3,
            y: y + 0.3,
            w: 0.4,
            h: 0.4
        };
        this.spritePos = {
            x: [[256], [272, 272], [272, 272, 272, 272, 272]],
            y: [[96], [80, 112], [144, 160, 176, 192, 208]],
            w: [16, 32, 32],
            h: [16, 32, 16],
        };
    }
    action() {
        if (this.sprite == 0) {
            if (player.attack) {
                if (collided(player.atkHitbox, this)) {
                    this.sprite = 1;
                    console.log("pushing a portal");
                    audio.hit.playy();
                    shake = 4;
                    visualFxs.push(new Portal(this.x / ratio, this.y / ratio, this.place));
                    console.log(visualFxs)
                    this.x -= 0.5 * ratio;
                    this.y -= 1 * ratio;
                }
            }
        } else if (this.sprite === 1 && this.frame == this.spritePos.x[1].length - 1) {
            if (this.frameCounter == this.slowness) {
                this.sprite = 2;
                this.y += 1 * ratio;
                this.frame = 0;
                this.frameCounter = 0;
            }
        } else if (this.sprite === 2) {
            this.repeat = false;
        }
    }
}
class Portal {
    constructor(x, y, place) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.active = false;
        this.sprite = 0;
        this.place = place;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 5;
        this.frame = 0;
        this.type = "portal";
        this.load = 0;
        this.hitbox = {
            x: x + 0.3,
            y: y + 0.3,
            w: 0.4,
            h: 0.4
        };
        this.spritePos = {
            x: [[256, 256, 256, 256]],
            y: [[112, 128, 144, 160]],
            w: [16],
            h: [16],
        };
    }
    action() {
        if (collided(this, player) && this.place) {
            var point = {
                x: this.hitbox.x + this.hitbox.w / 2,
                y: this.hitbox.y + this.hitbox.h / 2,
            }
            if (pointSquareCol(point, player)) {
                this.load++;
                blackScreen=this.load+1;
                if (this.load > 100) {
                    eval(maps[parseInt(this.place)])
                    adaptBiome();
                    initializeMap();
                    mapX = -player.x + (tilesWidth / 2 - 2) * ratio;
                    mapY = -player.y + (tilesHeight / 2) * ratio;
                    blackScreen = 100;

                }
            } else {
                if (this.load > 0) {
                    blackScreen = this.load
                    this.load = 0;
                }
            }
        }
    }
}
class Book {
    constructor(x, y, tut) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 6;
        this.frame = 0;
        this.type = "door";
        this.tut = tut;
        this.hitbox = {
            x: x + 0.1,
            y: y + 0.7,
            w: 0.8,
            h: 0.3
        };
        this.spritePos = {
            x: [[112], [112, 112, 112, 128], [128, 128, 128, 128], [128, 112, 112, 112]], // grounded -- transition up -- waving -- transition down
            y: [[224], [240, 256, 272, 224], [240, 256, 272, 256], [224, 272, 256, 240]],
            w: [16, 16, 16, 16],
            h: [16, 16, 16, 16],
        };
    }
    action() {
        switch (this.sprite) {
            case 0:
                if (collided(player, this)) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 1;
                }
                break;
            case 1:
                if (this.frame == this.spritePos.x[1].length - 1) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 2;
                }
                break;
            case 2:
                if (!collided(player, this)) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 3;
                } else {
                    player.reading = true;
                    if (this.tut != undefined) {
                        player.currentBook = this.tut;
                    }
                    c.drawImage(
                        id("sheet"),
                        48,
                        208,
                        80,
                        16,
                        ((canvas.width / 2) - (5 * ratio / 2)) | 0,
                        ((canvas.height / 1.2) - (1 * ratio / 2)) | 0,
                        5 * ratio | 0,
                        1 * ratio | 0);
                }
                break;
            case 3:
                if (this.frame == this.spritePos.x[1].length - 1) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 0;
                }
                break;
        }
    }
}

class GhostGirl {
    constructor(x, y) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.w = 1 * ratio;
        this.h = 1 * ratio;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 6;
        this.frame = 0;
        this.type = "ghostgirl";
        this.spritePos = {
            x: [[48, 48, 48, 48], [64, 64, 64, 64], [80, 80, 80], [96, 96, 96]],
            y: [[224, 240, 256, 272], [224, 240, 256, 272], [224, 240, 256, 240, 256, 240, 256], [224, 240, 256, 240, 256, 240, 256]],
            w: [16, 16, 16, 16, 16, 16, 16],
            h: [16, 16, 16, 16, 16, 16, 16],
        };
        this.events = [
            {
                fired: false,
                text: "goin for a walk?",
                point: {
                    x: 17.5,
                    y: 7.5
                }
                },
            {
                fired: false,
                text: "guess I'll have to escort you",
                point: {
                    x: 50.5,
                    y: 8.5
                }
                },
            {
                fired: false,
                text: "just some magical yoga balls",
                point: {
                    x: 23.5,
                    y: 20.5
                }
                },
            {
                fired: false,
                text: "you could dash against this ball... just saying",
                point: {
                    x: 10.5,
                    y: 29.5
                }
                },
            {
                fired: false,
                text: "weee!",
                point: {
                    x: 34.5,
                    y: 36.5
                }
                },
            {
                fired: false,
                text: "this is a mana crystal, I believe it could reset your dash",
                point: {
                    x: 14.5,
                    y: 34.5
                }
                },
            ];
    }
    action() {
        for (let i = 0; i < this.events.length; i++) {
            if (pointSquareCol(this.events[i].point, player.hitbox) && this.events[i].fired === false) {
                this.events[i].fired = true;
                this.talk(this.events[i].text);
            }
        }
        if (this.x + this.w < player.x - 1) {
            if (player.dead) {
                if (this.sprite == 0 || this.sprite == 1) {
                    this.frameCounter = 0;
                    this.frame = 0;
                }
                this.sprite = 2;
                if (voices.ghost[1].paused) {
                    voices.ghost[1].play();
                }
            } else {
                this.sprite = 0;
            }
            if (Math.abs(this.x - player.x) / 6 > 1 / 100 * ratio) {
                this.x += Math.abs(this.x - player.x) / 50;
            }
        } else if (this.x > player.x + player.w + 1) {
            if (player.dead) {
                if (this.srite == 0 || this.srite == 1) {
                    this.frameCounter = 0;
                    this.frame = 0;
                }
                this.sprite = 3;
                if (voices.ghost[1].paused) {
                    voices.ghost[1].play();
                }
            } else {
                this.sprite = 1;
            }
            if (Math.abs(this.x - player.x) / 6 > 1 / 100 * ratio) {
                this.x -= Math.abs(this.x - player.x) / 50;
            }
        }
        if (this.y + this.h < player.y - 1) {
            if (Math.abs(this.y - player.y) / 6 > 1 / 100 * ratio) {
                this.y += Math.abs(this.y - player.y) / 50;
            }
        } else if (this.y > player.y + player.h + 1) {
            if (Math.abs(this.y - player.y) / 6 > 1 / 100 * ratio) {
                this.y -= Math.abs(this.y - player.y) / 50;
            }
        }
    }
    talk(dialogue) {
        var that = this;
        texts.push(new DialogueText(that, dialogue));
    }
}
class Cloud {
    constructor(x, y, s) {
        this.x = x * ratio;
        this.y = y * ratio;
        this.sprite = Math.floor(Math.random() * 4);
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 5;
        this.frame = 0;
        this.type = "cloud";
        this.movX = -s / 1000 * ratio;
        this.movY = 0;
        this.spritePos = {
            x: [[112], [112], [112], [112]],
            y: [[0], [16], [32], [48]],
            w: [16, 16, 16, 16],
            h: [16, 16, 16, 16],
        };
    }
    action() {
        if (this.x < -20 * ratio) {
            let ww = (mapWidth < 100) ? 100 : mapWidth;
            this.x = (ww + 20) * ratio;
        }
    }
}

if (typeof imported !== "undefined") {
    imported();
}

function drawFxs(fx) {
    //animation computing
    if (fx.action !== undefined) {
        fx.action();
    }
    var fxX = fx.x + mapX;
    var fxY = fx.y + mapY;
    var fxW = fx.spritePos.w[fx.sprite] / tileSize * ratio;
    var fxH = fx.spritePos.h[fx.sprite] / tileSize * ratio;
    if (fx.frameCounter !== undefined) {
        fx.frameCounter++;
        if (fx.frameCounter > fx.slowness) {
            fx.frame++;
            fx.frameCounter = 0;
        }
        if (fx.frame > fx.spritePos.x[fx.sprite].length - 1) {
            if (fx.repeat) {
                fx.frame = 0;
            } else {
                visualFxs.splice(i, 1);
            }
        }
    }
    //draw on canvascontext.translate(x, y);
    if (fx.movX || fx.movY) {
        fx.x += fx.movX;
        fx.y += fx.movY;
    }

    //c.translate(fxX+fxW/2, fxY+fxH/2);
    if (fx.rotation > 0) {
        fxY -= fxH / 2;
        c.save();
        c.translate(fxX, fxY);
        c.rotate(fx.rotation * Math.PI / 180);
        c.drawImage(
            fx.sheet,
            fx.spritePos.x[fx.sprite][fx.frame],
            fx.spritePos.y[fx.sprite][fx.frame],
            fx.spritePos.w[fx.sprite],
            fx.spritePos.h[fx.sprite],
            (-fxW / 2),
            (-fxH / 2),
            fxW | 0,
            fxH | 0);
        c.restore();
    } else {
        c.drawImage(
            fx.sheet,
            fx.spritePos.x[fx.sprite][fx.frame],
            fx.spritePos.y[fx.sprite][fx.frame],
            fx.spritePos.w[fx.sprite],
            fx.spritePos.h[fx.sprite],
            fxX | 0,
            fxY | 0,
            fxW | 0,
            fxH | 0);
    }

    //c.translate(-(fxX+fxW/2), -(fxY+fxH/2));
}

var specialTiles = [];
class SpecialTile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
        this.sheet = id("sheet");
        this.sprite = [];
        this.repeat = false;
        this.running = false;
        this.frameCounter = 0;
        this.slowness = 3;
        this.frame = 0;
        this.type = "";
    }
}
class Bouncy extends SpecialTile {
    constructor(x, y) {
        super(x, y);
        this.sprite = biome ? [[11, 8], [11, 9], [11, 10], [11, 11]] : [[11, 4], [11, 5], [11, 6], [11, 7]];
        this.repeat = false;
        this.running = false;
        this.slowness = 3;
        this.type = "bouncy";
        this.hitbox = {
            x: x + 0.1,
            y: y + 0.1,
            w: 0.8,
            h: 0.8
        };
    }
    action(collider, colDir) {
        this.running = true;
        var bouncynessX = 0.3;
        var bouncynessY = 0.3;
        var bounceOrNot = collider.dash ? 0.35 * ratio : 0;
        collider.xVel = 0;
        collider.yVel = 0;
        collider.grounded = false;
        this.running = true;
        var dir = player.left ? 1 : -1;
        switch (colDir) {
            case "b":
                collider.grounded = false;
                collider.yVel = -bouncynessY * ratio;
                collider.dash = false;
                collider.dashCd = false;
                visualFxs.push(new RingFx(collider.x / ratio, collider.y / ratio, 2));
                audio.bounce1.playy()
                break;
            case "l":
                //ring VFX
                if (bounceOrNot !== 0) {
                    visualFxs.push(new RingFx(collider.x / ratio, collider.y / ratio, 0));
                } else {
                    visualFxs.push(new RingFx(collider.x / ratio, collider.y / ratio, 2));
                }
                audio.bounce2.playy()
                collider.grounded = false;
                collider.dash = false;
                collider.dashCd = false;
                collider.xVelExt = bounceOrNot;
                collider.yVel = -bouncynessY * ratio;
                break;
            case "r":
                if (bounceOrNot !== 0) {
                    visualFxs.push(new RingFx(collider.x / ratio, collider.y / ratio, 1));
                } else {
                    visualFxs.push(new RingFx(collider.x / ratio, collider.y / ratio, 2));
                }
                audio.bounce3.playy()
                collider.grounded = false;
                collider.dash = false;
                collider.dashCd = false;
                collider.xVelExt = -bounceOrNot;
                collider.yVel = -bouncynessY * ratio;
                break;
                break;
            case "t":
                if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                audio.bounce1.playy()
                break;
        };
    }
}
class Speeder extends SpecialTile {
    constructor(x, y, dir) {
        super(x, y);
        this.repeat = true;
        this.running = true;
        this.dir = dir;
        this.slowness = 3;
        this.sprite = (this.dir === 0) ? [[12, 5], [12, 6], [12, 7]] : [[12, 8], [12, 9], [12, 10]];
        this.type = "speeder";
    }
    action(collider, colDir) {
        this.running = true;
        var dir = player.left ? 1 : -1;
        switch (colDir) {
            case "b":
                audio.speed1.playy();
                if (this.dir === 0) {
                    collider.xVelExt += 0.05 * ratio;
                } else if (this.dir === 1) {
                    collider.xVelExt -= 0.05 * ratio;
                }
                collider.grounded = true;
                break;
            case "t":
                if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                break;
        };
    }
}
class Spikes extends SpecialTile {
    constructor(x, y, tile) {
        super(x, y);
        this.sprite = [tiles[tile]];
        this.repeat = false;
        this.running = false;
        this.slowness = 3;
        this.type = "spikes";
        this.hitbox = {
            x: x + 0.2,
            y: y + 0.2,
            w: 0.6,
            h: 0.6
        };
    }
    action(collider, colDir) {
        this.running = true;
        var dir = collider.left ? 1 : -1;
        switch (colDir) {
            case "b":
            case "l":
            case "r":
            case "t":
                if (!collider.dead) {
                    visualFxs.push(new DeathFx(collider.x / ratio, collider.y / ratio));
                    audio.death.playy();
                    collider.dead = true;
                    setTimeout(function () {
                        collider.respawnEvent();
                    }, 1500);
                }
                if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                break;
        };
    }
}
class MovingPlat extends SpecialTile {
    constructor(x, y, sprite, xVel, yVel, range) {
        super(x, y);
        this.sprite = sprite;
        this.xVel = xVel / ratio;
        this.yVel = yVel / ratio;
        this.xI = x;
        this.yI = y;
        this.dir = 1;
        this.range = range;
        this.repeat = false;
        this.running = false;
        this.slowness = 3;
        this.type = "movingPlat";
    }
    move() {
        if (this.dir) {
            this.x += this.xVel;
            this.y += this.yVel;
            if (this.x >= this.xI + this.range && this.xVel !== 0 || this.y > this.yI + this.range && this.yVel !== 0) {
                this.xVel *= -1;
                this.yVel *= -1;
                this.dir = 0;
            }
        } else {
            this.x += this.xVel;
            this.y += this.yVel;
            if (this.x <= this.xI && this.xVel !== 0 || this.y <= this.yI && this.yVel !== 0) {
                this.xVel *= -1;
                this.yVel *= -1;
                this.dir = 1;
            }
        }
    }
    action(collider, colDir) {
        this.running = true;
        var dir = player.left ? 1 : -1;
        switch (colDir) {
            case "b":
                collider.xVelExt = this.xVel * ratio;
                if (this.yVel < 0) {
                    collider.yVelExt = this.yVel * ratio;
                } else if (this.yVel * ratio < collider.maxVelocity) {
                    collider.grounded = true;
                    collider.yVelExt = this.yVel * ratio;
                }
                break;
            case "l":
                //collider.xVel = 0;
                if (this.xVel > 0) {
                    collider.xVelExt = this.xVel * ratio;
                }
                break;
            case "r":
                //collider.xVel = 0;
                if (this.xVel > 0) {
                    collider.xVelExt = this.xVel * ratio;
                }
                break;
            case "t":
                if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                break;
        };
    }
}
//x, y,sprite, xVel, yVel, range
//specialTiles.push(new MovingPlat(25, 5, [[7, 6]], 0, 4, 14))
//specialTiles.push(new MovingPlat(26, 5, [[9, 6]], 0, 4, 14))

function renderSpecialTiles() {
    for (i = 0; i < specialTiles.length; i++) {
        if (isOutOfScreen(specialTiles[i])) {
            continue;
        }
        if (specialTiles[i].move !== undefined) {
            specialTiles[i].move();
        }
        if (specialTiles[i].running) {
            specialTiles[i].frameCounter++;
            if (specialTiles[i].frameCounter > specialTiles[i].slowness) {
                specialTiles[i].frame++;
                specialTiles[i].frameCounter = 0;
            }
            if (specialTiles[i].frame > specialTiles[i].sprite.length - 1) {
                specialTiles[i].frame = 0;
                if (!specialTiles[i].repeat) {
                    specialTiles[i].running = false;
                }
            }
        }
        var collision = null;
        if (collided(player, specialTiles[i])) {
            collision = colCheck(player, specialTiles[i]);
        }
        if (collision !== null) {
            if (specialTiles[i].action !== undefined) {
                specialTiles[i].action(player, collision);
            }
        }
        c.drawImage(
            specialTiles[i].sheet,
            specialTiles[i].sprite[specialTiles[i].frame][0] * 16,
            specialTiles[i].sprite[specialTiles[i].frame][1] * 16,
            16,
            16,
            (specialTiles[i].x * ratio + mapX) | 0,
            (specialTiles[i].y * ratio + mapY) | 0,
            (specialTiles[i].w * ratio) | 0,
            (specialTiles[i].h * ratio) | 0);
    }
}

function renderHpBars() {
    for (i = 0; i < monsters.length; i++) {
        let hpRatio = monsters[i].hp / monsters[i].maxHp;
        let barW = Math.round(16 * hpRatio);
        c.drawImage(
            id("hp-bar"),
            0,
            0,
            16,
            2,
            (monsters[i].x + mapX + monsters[i].w / 2 - (ratio / 2)) | 0,
            (monsters[i].y + mapY - 2 / 16 * ratio - (ratio / tileSize)) | 0,
            (ratio) | 0,
            (2 / 16 * ratio) | 0
        )
        c.drawImage(
            id("hp-bar"),
            0,
            2,
            barW,
            2,
            (monsters[i].x + mapX + monsters[i].w / 2 - (ratio / 2)) | 0,
            (monsters[i].y + mapY - 2 / 16 * ratio - (ratio / tileSize)) | 0,
            (ratio * hpRatio) | 0,
            (2 / 16 * ratio) | 0
        )
    }
}
//document.onclick=()=>alert(monsters[0].x+" "+monsters[0].y)
function renderTexts() {
    textsRemoveList = [];
    c.textAlign = "center";
    c.font = fontSize + " 'Press Start 2P'";
    for (let i = 0; i < texts.length; i++) {
        texts[i].draw();
    }
    for (let i = textsRemoveList.length - 1; i >= 0; i--) {
        texts.splice(textsRemoveList[i], 1);
    }
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


///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MAIN LOOP //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var blackScreen = 0;

function loop() {
    fps++;
    if (shake) {
        shake--;
        mapY += shakeArr[shake];
    }
    paused = 0;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = bgColor;
    c.fillRect(0, 0, canvas.width, canvas.height);
    //calculate character
    //draw environment
    moveCamera();
    if (!player.dead) {
        calculateCharacter(player);
    } else if (!audio.walking.paused) {
        audio.walking.pause();
    }
    checkCollisions();
    for (i = 0; i < monsters.length; i++) {
        if (isOutOfScreen(monsters[i])) {
            continue;
        }
        monsters[i].frameCounter++;
        calculateMonsters(monsters[i]);
    }

    drawEnvironment();
    renderSpecialTiles();
    if (!player.dead) {
        adjustCollided(player);
    }
    //draw character
    for (i = monsters.length - 1; i >= 0; i--) {
        if (isOutOfScreen(monsters[i])) {
            continue;
        }
        drawMonsters(monsters[i]);
    }
    player.reading = false;
    for (i = visualFxs.length - 1; i >= 0; i--) {
        if (isOutOfScreen(visualFxs[i])) {
            continue;
        }
        drawFxs(visualFxs[i]);
    }
    //happens when teleporting
    if (blackScreen) {
        c.globalAlpha = blackScreen / 100;
        c.fillStyle = "#000000";
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.globalAlpha = 1;
        blackScreen--;
    }
    if (!player.dead) {
        drawCharacter(player);
    }
    renderHpBars();
    renderTexts();
    if (!gamePaused) {
        requestAnimationFrame(loop)
    }
}
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MAIN LOOP //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var camBoxes = [];

function moveCamera() {
    //locked camera
    if (camBoxes.length > 0) {
        var camObject = 0;
        for (let i = 0; i < camBoxes.length; i++) {
            if (collided(player, camBoxes[i])) {
                cameraType = camBoxes[i].type;
                camObject = camBoxes[i];
            }
        }

    }
    if (cameraType === 2) {
        mapX = -camObject.x * ratio;
        mapY = -camObject.y * ratio;
    }
    if (cameraType === 0) {
        var cameraDir = tilesWidth / 2 - 2;
    } else if (cameraType === 1) {
        var cameraDir = player.left ? tilesWidth / 2 : tilesWidth / 6;
    }
    //let cameraDir = player.left ? tilesWidth / 2 : tilesWidth / 6;
    if (mapX < -player.x + cameraDir * ratio) {
        // means camera moves forward
        if (Math.abs((-player.x + cameraDir * ratio - mapX) / 6) > 1 / 100 * ratio) {
            mapX += (-player.x + cameraDir * ratio - mapX) / 6;
        }
    } else if (mapX > -player.x + cameraDir * ratio) {
        // means camera moves backward
        if (Math.abs((-player.x + cameraDir * ratio - mapX) / 6) > 1 / 100 * ratio) {
            mapX += (-player.x + cameraDir * ratio - mapX) / 6;
        }
    }
    let lookDown = watchDown ? tilesHeight / 4 * ratio : 0;
    if (mapY < -(player.y + lookDown) + tilesHeight / 2 * ratio) {
        // means camera moves downward
        if (Math.abs((-(player.y + lookDown) + tilesHeight / 2 * ratio - mapY) / 6) > 1 / 100 * ratio) {
            mapY += (-(player.y + lookDown) + tilesHeight / 2 * ratio - mapY) / 6;
        }
    } else if (mapY > -(player.y + lookDown) + tilesHeight / 2 * ratio) {
        // means camera moves upward
        if (Math.abs((-(player.y + lookDown) + tilesHeight / 2 * ratio - mapY) / 6) > 1 / 100 * ratio) {
            mapY += (-(player.y + lookDown) + tilesHeight / 2 * ratio - mapY) / 6;
        }
    }
}

function isOutOfScreen(Entity) {
    var entity = (typeof Entity.hitbox !== "undefined") ? Entity.hitbox : Entity;
    if (entity.x + entity.w > tilesWidth - mapX / ratio &&
        entity.x + entity.w < -tilesWidth - mapX / ratio) {
        return true;
    }
    if (entity.y + entity.h > tilesHeight - mapY / ratio &&
        entity.y + entity.h < -tilesHeight - mapY / ratio) {
        return true;
    }
    return false;
}

function checkCollisions() {
    player.grounded = false;
    player.col.L = false;
    player.col.R = false;
    player.col.T = false;
    player.col.B = false;
    for (let i = 0; i < monsters.length; i++) {
        if (isOutOfScreen(monsters[i])) {
            continue;
        }
        monsters[i].grounded = false;
        monsters[i].col.L = false;
        monsters[i].col.R = false;
        monsters[i].col.T = false;
        monsters[i].col.B = false;
        if (collided(player, monsters[i])) {
            colCheck(player, monsters[i]);
        }
    }
    for (let i = 0; i < map.length; i++) {
        if (isOutOfScreen(map[i])) {
            continue;
        }
        if (collided(player, map[i])) {
            let collision = colCheck(player, map[i]);
        }
        for (m = 0; m < monsters.length; m++) {
            if (collided(monsters[m], map[i])) {
                colCheck(monsters[m], map[i]);
            }
        }
    };

    for (let i = 0; i < specialTiles.length; i++) {
        if (isOutOfScreen(specialTiles[i])) {
            continue;
        }
        for (let m = 0; m < monsters.length; m++) {
            if (collided(monsters[m], specialTiles[i])) {
                colCheck(monsters[m], specialTiles[i]);
            }
        }
    }
}

function adjustCollided(p) {
    if (p.col.L) {
        p.x += p.col.L * ratio;
        if (p.dash) {
            p.dash = false;
            p.dashCd = true;
        }
        if (p.xVelExt < 0) {
            p.xVelExt = 0;
        }
        if (p.xVel < 0) {
            p.xVel = 0;
        }

    }
    if (p.col.R) {
        p.x -= p.col.R * ratio // - (0.02 * tileSize);
        if (p.dash) {
            p.dash = false;
            p.dashCd = true;
        }
        if (p.xVelExt > 0) {
            p.xVelExt = 0;
        }
        if (p.xVel > 0) {
            p.xVel = 0;
        }

    }
    if (p.col.T) {
        p.y += p.col.T * ratio // + (0.02 * tileSize);
        if (p.yVel < 0) {
            p.yVel = 0;
        }
        if (p.dash) {
            p.dash = false;
            p.dashCd = true;
        }

    }
    if (p.col.B) {
        p.y -= p.col.B * ratio - 1;
        p.grounded = true;
        if (p.dashCd || p.dash) {
            p.dashCd = false;
            p.dash = false;
        }
    }
}

function calculateCharacter(p) {
    //controls calculation
    p.frameCounter++;
    if (p.jumpCounter >= 10) {
        p.jumpMaxReached = true;
    }
    if (p.grounded) {
        p.jumping = false;
        p.jumpMaxReached = false;
        p.jumpCounter = 0;
    }
    if (!p.jumpMaxReached && p.jumping && p.yVel < 0) {
        p.yVel -= (0.1 / (p.jumpCounter + 1)) * ratio;
        p.jumpCounter++;
    }
    if (p.dash) {
        p.jumping = false;
        p.xVel = p.left ? -p.speed * 5 : p.speed * 5;
        p.yVel = 0;
        p.yVelExt = 0;
        p.xVelExt = 0;

        p.attacking(p.hitbox);
        if (Math.abs(p.dashIn - p.x / ratio) > 4) {
            p.dash = false;
            p.xVel = 0;
        }
    }
    if (!p.dash) {
        if (p.L && !p.col.L && !p.R) {
            if (p.xVel > -p.speed) {
                p.xVel -= p.speed / 10;
            } else {
                p.xVel = -p.speed;
            }
            p.left = true;
        } else if (p.R && !p.col.R && !p.L) {
            if (p.xVel < p.speed) {
                p.xVel += p.speed / 10;
            } else {
                p.xVel = p.speed;
            }
            p.left = false;
        } else if ((!p.L && !p.R || p.L && p.R)) {
            p.xVel = 0;
        }
        if (!p.grounded) {
            p.yVel += gForce;
            if (p.yVel > p.maxVelocity) {
                p.yVel = p.maxVelocity;
            }
        } else if (p.yVel > 0) {
            p.yVel = 0;
            p.yVelExt = 0;
        }
    }
    p.x += p.xVel;
    p.y += p.yVel;

    // external velocity calculations
    p.x += p.xVelExt;
    p.y += p.yVelExt;
    if (p.xVelExt !== 0 && p.grounded) {
        p.xVelExt *= 0.8;
    } else if (p.xVelExt !== 0) {
        if (p.xVelExt > 0.05) {
            p.xVelExt -= 0.05;
        } else if (p.xVelExt < -0.05) {
            p.xVelExt += 0.05;
        }
    }
    if (p.xVelExt < 0.001 * ratio && p.xVelExt > -0.001 * ratio) {
        p.xVelExt = 0;
    }
    p.yVelExt *= 0.9;
    if (p.yVelExt < 0.001 * ratio && p.yVelExt > -0.001 * ratio) {
        p.yVelExt = 0;
    }

    if (p.y > (mapHeight + 2) * ratio) {
        p.respawnEvent();
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
    //leftRightMovement(m.serial);
    if (!(fps % 15) && m.grounded && !m.hit) {
        //^AI is refreshed every 1/4 seconds
        m.move(m.serial);
    }
    if (m.attack) {
        m.L = false;
        m.R = false;
    }
    if (m.col.L) {
        m.x += m.col.L * ratio;

    }
    if (m.col.R) {
        m.x -= m.col.R * ratio;

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
        m.xVel = -m.speed;
        m.left = true;
    } else if (m.R && !m.col.R && !m.L && !m.hit) {
        m.xVel = m.speed;
        m.left = false;
    } else if ((!m.L && !m.R) || (m.L && m.R) || m.hit) {
        m.xVel = 0;
    }
    if (!m.grounded) {
        m.yVel += gForce;
        if (m.yVel > m.maxVelocity) {
            m.yVel = m.maxVelocity;
        }
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
var backgrounds = [id("bg1"), id("cloud1"), id("cloud2"), id("bg2"), id("bg3"), id("bg4")]
var background = false;
var cloudsX = [0, 0];

function drawBackground() {
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[1],
            (-tilesWidth * 2 * ratio + (backgrounds[1].width / tileSize * ratio * j) + mapX / 20 - cloudsX[0]) | 0,
            (mapY / 20) | 0,
            (backgrounds[1].width / tileSize * ratio) | 0,
            (backgrounds[1].height / tileSize * ratio) | 0
        );
    }
    cloudsX[0] += (backgrounds[1].width / tileSize * ratio) / 4000;
    if (cloudsX[0] >= backgrounds[1].width / tileSize * ratio) {
        cloudsX[0] = 0;
    }

    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[2],
            (-tilesWidth * 2 * ratio + (backgrounds[2].width / tileSize * ratio * j) + mapX / 18 - cloudsX[1]) | 0,
            (mapY / 18) | 0,
            (backgrounds[2].width / tileSize * ratio) | 0,
            (backgrounds[2].height / tileSize * ratio) | 0
        );
    }
    cloudsX[1] += (backgrounds[2].width / tileSize * ratio) / 6000;
    if (cloudsX[1] >= backgrounds[1].width / tileSize * ratio) {
        cloudsX[1] = 0;
    }
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[3],
            (-tilesWidth * 2 * ratio + (backgrounds[3].width / tileSize * ratio * j) + mapX / 10) | 0,
            (mapY / 10) | 0,
            (backgrounds[3].width / tileSize * ratio) | 0,
            (backgrounds[3].height / tileSize * ratio) | 0
        );
    }

    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[4],
            (-tilesWidth * 2 * ratio + (backgrounds[4].width / tileSize * ratio * j) + mapX / 8) | 0,
            (mapY / 8) | 0,
            (backgrounds[4].width / tileSize * ratio) | 0,
            (backgrounds[4].height / tileSize * ratio) | 0
        );
    }
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[5],
            (-tilesWidth * 2 * ratio + (backgrounds[5].width / tileSize * ratio * j) + mapX / 6) | 0,
            (mapY / 6) | 0,
            (backgrounds[5].width / tileSize * ratio) | 0,
            (backgrounds[5].height / tileSize * ratio) | 0
        );
    }
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[5],
            (-tilesWidth * 2 * ratio + (backgrounds[5].width / tileSize * ratio * j) + mapX / 5) | 0,
            ((backgrounds[5].height / tileSize * ratio) / 5 + mapY / 5) | 0,
            (backgrounds[5].width / tileSize * ratio) | 0,
            (backgrounds[5].height / tileSize * ratio) | 0
        );
    }
    for (let j = 0; j < 5; j++) {
        c.fillStyle = "#323c39";
        c.fillRect(
            (-tilesWidth * 2 * ratio + (backgrounds[5].width / tileSize * ratio * j) + mapX / 5) | 0,
            (mapY / 5 + backgrounds[5].height / tileSize * ratio) | 0,
            (backgrounds[5].width / tileSize * ratio) | 0,
            (backgrounds[5].height / tileSize * ratio) | 0
        );
    }
}

function drawEnvironment() {
    if (background) {
        drawBackground();
    }
    for (let i = bgTiles.length - 1; i >= 0; i--) {
        if (isOutOfScreen(bgTiles[i])) {
            continue;
        }
        for (let j = 0; j < bgTiles[i].h; j++) {
            for (let k = 0; k < bgTiles[i].w; k++) {
                //skips out of bounds tiles
                if (bgTiles[i].x + k > tilesWidth - mapX / ratio &&
                    bgTiles[i].x + k < -tilesWidth - mapX / ratio) {
                    continue;
                }
                if (bgTiles[i].y + j > tilesHeight - mapY / ratio &&
                    bgTiles[i].y + j < -tilesHeight - mapY / ratio) {
                    continue;
                }
                //c.fillRect((map[i].x + k) * (ratio)+mapX, (map[i].y + j) * (ratio), ratio, ratio);
                c.drawImage(
                    player.sheet,
                    tiles[bgTiles[i].type][0] * 16,
                    tiles[bgTiles[i].type][1] * 16,
                    16,
                    16,
                    ((bgTiles[i].x + k) * ratio + mapX) | 0,
                    ((bgTiles[i].y + j) * ratio + mapY) | 0,
                    (ratio) | 0,
                    (ratio) | 0);
            }
        }
    }
    for (let i = 0; i < map.length; i++) {
        if (isOutOfScreen(map[i])) {
            continue;
        }
        for (let j = 0; j < map[i].h; j++) {
            for (let k = 0; k < map[i].w; k++) {
                c.drawImage(
                    player.sheet, tiles[map[i].type][0] * 16,
                    tiles[map[i].type][1] * 16,
                    16,
                    16,
                    ((map[i].x + k) * ratio + mapX) | 0,
                    ((map[i].y + j) * ratio + mapY) | 0,
                    (ratio) | 0,
                    (ratio) | 0);
            }
        }
    }
}

function drawCharacter(p) {
    //animation computing
    var slowness = 6;
    if (p.attack || p.dash) {
        p.dance = false;
        slowness = 4;
        if (!p.left) {
            p.action = 6; //atk right
        } else {
            p.action = 7; //atk left
        }
    } else {
        if (!p.grounded) {
            p.dance = false;
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
            if (p.dance) {
                p.action = 8; //dance
            }

        } else if (p.xVel !== 0) {
            p.dance = false;
            if (!p.left) {
                p.action = 2; //walk right
            } else {
                p.action = 3; //walk left
            }
        }
    }
    if (p.xVel !== 0 && p.grounded && !(p.attack || p.dash)) {
        audio.walking.play();
    } else {
        audio.walking.pause();
    }

    if (p.frameCounter > slowness) {
        p.frame++;
        p.frameCounter = 0;
    }
    //
    if (p.attack && p.frame == 3 && p.frameCounter == 0) {
        player.attacking(player.atkHitbox);
    }
    if (p.frame > p.actionX[p.action].length - 1) {
        p.frame = 0;
        if (p.attack) {
            p.attack = false
        }
    }
    //draw on canvas
    if (p.dash) {
        c.globalCompositeOperation = "difference";
        c.globalAlpha = 0.4;
        c.drawImage(
            p.sheet,
            p.actionX[p.action][0] * tileSize,
            p.actionY[p.action][0] * tileSize,
            p.sprite.w,
            p.sprite.h,
            (p.x + mapX - p.xVel * 2) | 0,
            (p.y + mapY) | 0,
            (p.w) | 0,
            (p.h) | 0);
        c.globalAlpha = 0.6;
        c.drawImage(
            p.sheet,
            p.actionX[p.action][0] * tileSize,
            p.actionY[p.action][0] * tileSize,
            p.sprite.w,
            p.sprite.h,
            (p.x + mapX - p.xVel) | 0,
            (p.y + mapY) | 0,
            (p.w) | 0,
            (p.h) | 0);
        c.globalAlpha = 0.8;
        c.drawImage(
            p.sheet,
            p.actionX[p.action][0] * tileSize,
            p.actionY[p.action][0] * tileSize,
            p.sprite.w,
            p.sprite.h,
            (p.x + mapX) | 0,
            (p.y + mapY) | 0,
            (p.w) | 0,
            (p.h) | 0);
        c.globalAlpha = 1;
        c.globalCompositeOperation = "source-over";
    } else {
        c.drawImage(
            p.sheet,
            p.actionX[p.action][p.frame] * tileSize,
            p.actionY[p.action][p.frame] * tileSize,
            p.sprite.w,
            p.sprite.h,
            (p.x + mapX) | 0,
            (p.y + mapY) | 0,
            (p.w) | 0,
            (p.h) | 0);
    }
    //the attack animation takes up 2 tiles in width, so I decided to print the other map separately
    if (p.attack) {
        if (p.action == 6) {
            c.drawImage(
                p.sheet,
                p.actionX[p.action][p.frame] * tileSize + 16,
                p.actionY[p.action][p.frame] * tileSize,
                p.sprite.w,
                p.sprite.h,
                (p.x + mapX + p.w) | 0,
                (p.y + mapY) | 0,
                (p.w) | 0,
                (p.h) | 0);
        } else if (p.action == 7) {
            c.drawImage(
                p.sheet,
                p.actionX[p.action][p.frame] * tileSize - 16,
                p.actionY[p.action][p.frame] * tileSize,
                p.sprite.w,
                p.sprite.h,
                (p.x + mapX - p.w) | 0,
                (p.y + mapY) | 0,
                (p.w) | 0,
                (p.h) | 0);
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
    c.drawImage(
        m.sheet,
        m.actionX[m.action][m.frame],
        m.actionY[m.action][m.frame],
        m.sprite.w,
        m.sprite.h, (m.x + mapX) | 0,
        (m.y + mapY) | 0,
        (m.w) | 0,
        (m.h) | 0);
    if (m.attack) {
        m.attackSprite(m);
    }
}



// COLLISION DETECTORS
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    if (typeof shapeA.hitbox !== "undefined") {
        var shapeAA = shapeA.hitbox;
    } else {
        var shapeAA = shapeA;
    }
    if (typeof shapeB.hitbox !== "undefined") {
        var shapeBB = shapeB.hitbox;
    } else {
        var shapeBB = shapeB;
    }
    var offFocus = mapX / ratio;
    var vX = (shapeAA.x + offFocus + (shapeAA.w / 2)) - (shapeBB.x + (mapX / ratio) + (shapeBB.w / 2)),
        vY = (shapeAA.y + (shapeAA.h / 2)) - (shapeBB.y + (shapeBB.h / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.hitbox.w / 2) + (shapeBB.w / 2),
        hHeights = (shapeA.hitbox.h / 2) + (shapeBB.h / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if (shapeA.col.T < oY && oY > 1 / ratio && !shapeB.xVel) {
                    shapeA.col.T = oY;
                }
            } else {
                colDir = "b";
                shapeA.grounded = true;
                if (shapeA.col.B < oY && oY > 1 / ratio && oY < 0.02 * ratio) {
                    shapeA.col.B = oY;
                }
                if (shapeB.xVel) {
                    shapeA.xVelExt = shapeB.xVel;
                }
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (shapeA.col.L < oX && oX > 1 / ratio && !shapeB.xVel) {
                    shapeA.col.L = oX;
                }
            } else {
                colDir = "r";
                if (shapeA.col.R < oX && oX > 1 / ratio && !shapeB.xVel) {
                    shapeA.col.R = oX;
                }
            }
        }

    }

    return colDir;

}

function collided(a, b) {
    var square1 = a.hitbox ? a.hitbox : a;
    var square2 = b.hitbox ? b.hitbox : b;
    if (square1.x < square2.x + square2.w) {
        if (square1.x + square1.w > square2.x) {
            if (square1.y < square2.y + square2.h) {
                if (square1.y + square1.h > square2.y) {
                    return true;
                }
            }
        }
    }
    return false;
}

function pointSquareCol(point, sq) {
    var square = sq;
    if (sq.hitbox !== undefined) {
        square = sq.hitbox;
    }
    if (point.x > square.x) {
        if (point.x < square.x + square.w) {
            if (point.y > square.y) {
                if (point.y < square.y + square.h) {
                    return true;
                }
            }

        }
    }
    return false;
}
var touchDevice = false;
//Mouse controls
var jmpKeyPressed = 0;
window.onmousedown = function (e) {
    if (typeof e === 'object') {
        switch (e.button) {
            case 0:
                //console.log('Left button clicked.');
                if (!gamePaused) {
                    player.attackEvent();
                }
                break;
            case 1:
                //console.log('Middle button clicked.');
                break;
            case 2:
                //console.log('Right button clicked.');
                if (!jmpKeyPressed && !gamePaused) {
                    player.jump();
                    jmpKeyPressed = true;
                }
                break;
            default:
                console.log(`Unknown button code`);
        }
    }
}
window.onmouseup = function (e) {
    if (typeof e === 'object') {
        switch (e.button) {
            case 0:
                //console.log('Left button clicked.');
                break;
            case 1:
                //console.log('Middle button clicked.');
                break;
            case 2:
                //console.log('Right button clicked.');
                player.jumping = false;
                jmpKeyPressed = false;
                break;
            default:
                console.log(`Unknown button code`);
        }
    }
}
window.oncontextmenu = function (event) {
    event.preventDefault();
}
// Keyboard controls
window.addEventListener("keydown", function (event) {
    var key = event.keyCode;
    event.preventDefault();
    if (!gamePaused) {
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
            case 70: //attack key down (F / X)
            case 88:
                player.attackEvent();
                break;
            case 67: //camera key (C)
                cameraType++;
                if (cameraType > 1) {
                    cameraType = 0;
                }
                break;
            case 69: //dance key (E)
                player.dance = true;
                break;
            case 71: //g key down
                console.log(player);
                break;
            case 72: //h key down
                //nothing
                break;
            case 49: // 1
                monsters.push(new Slime(5 - mapX / ratio, -mapY / ratio));
                break;
            case 50: // 2
                monsters.push(new Lizard(5 - mapX / ratio, -mapY / ratio));
                break;
            case 51: // 3
                monsters.push(new Zombie(5 - mapX / ratio, -mapY / ratio));
                break;
            case 52: // 4
                monsters.push(new Superzombie(5 - mapX / ratio, -mapY / ratio));
                break;
            case 53: // 5
                monsters.push(new Bear(5 - mapX / ratio, -mapY / ratio));
                break;
            case 54: // 6
                eval(maps[0]);
                initializeMap();
                break;
            case 55: // 7
                eval(maps[10]);
                initializeMap();
                break;
        }
    } else if (key === 27 || key === 32) {

        //UI
        if (player.reading) {
            id(player.currentBook).style.visibility = "hidden";
        } else {
            id("pause-screen").style.display = "none";
            id("pause-screen").style.visibility = "hidden";
            id("controls").style.visibility = "hidden";
        }
        gamePaused = false;
        requestAnimationFrame(loop);
    }
});
window.addEventListener("keyup", function (event) {
    var key = event.keyCode;
    switch (key) {
        case 65: //left key up (A / left arrow)
        case 37:
            player.L = false;
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
            jmpKeyPressed = false;
            break;
    }
});
if (window.opener) {
    //console.log(window.opener.mapCode);
    if (window.opener.mapCode) {
        eval(window.opener.mapCode);
    } else {
        eval(window.opener.map);
    }
}

function adaptBiome() {
    background = biomes[biome].background;
    bgColor = biomes[biome].bgColor;
    biomes[biome].other();

    function playMusic() {};
    audio.walking.removeEventListener("play", playMusic);
    audio.walking.addEventListener("play", function playMusic() {
        biomes[biome].ambient.play();
        biomes[biome].music[Math.floor(Math.random() * biomes[biome].music.length)].play();
        for (let i = 0; i < biomes[biome].music.length; i++) {
            var next = ++i;
            if (next >= biomes[biome].music.length) {
                next = 0;
            }
            biomes[biome].music[i].addEventListener('ended', function () {
                biomes[biome].music[next].play();
            })

        }
    }, {
        once: true
    });
}

function initializeMap() {
    var spTiles = [];
    var removeList = [];
    specialTiles = [];
    bgTiles = [];
    visualFxs = [];
    visualFxs.push(new GhostGirl(0, 4));
    monsters = [];
    for (let j = 0; j < biomes.length; j++) {
        if (typeof biomes[j].ambient !== undefined) {
            biomes[j].ambient.pause();
            biomes[j].ambient.currentTime = 0;
        }
        for (let i = 0; i < biomes[j].music.length; i++) {
            biomes[j].music[i].pause();
            biomes[j].music[i].currentTime = 0;
        }
    }
    for (let i = map.length - 1; i >= 0; i--) {
        switch (map[i].type) {
            case 17:
            case 18:
            case 19:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 64:
            case 65:
            case 66:
                spTiles.push(i);
                removeList.push(i);
                break;
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
                bgTiles.push(map[i]);
                removeList.push(i);
                break;

        }
    }
    //[13, 5],[13, 6],[13, 7],[13, 8], //traps rock
    //[14, 5],[14, 6],[14, 7],[14, 8], //traps stone
    for (let i = 0; i < spTiles.length; i++) {
        for (let j = 0; j < map[spTiles[i]].h; j++) {
            for (let k = 0; k < map[spTiles[i]].w; k++) {
                switch (map[spTiles[i]].type) {
                    case 17:
                        specialTiles.push(new Bouncy(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 18:
                        visualFxs.push(new Grass(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 19: // speeder R
                        specialTiles.push(new Speeder(map[spTiles[i]].x + k, map[spTiles[i]].y + j, 0));
                        break;
                    case 42: // up
                    case 43: // right
                    case 44: // bottom
                    case 45: // left
                        specialTiles.push(new Spikes(map[spTiles[i]].x + k, map[spTiles[i]].y + j, map[spTiles[i]].type));
                        break;
                    case 46: // up
                    case 47: // right
                    case 48: // bottom
                    case 49: // left
                        specialTiles.push(new Spikes(map[spTiles[i]].x + k, map[spTiles[i]].y + j, map[spTiles[i]].type));
                        break;
                    case 50: // slime
                        monsters.push(new Slime(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 51: // speeder L
                        specialTiles.push(new Speeder(map[spTiles[i]].x + k, map[spTiles[i]].y + j, 1));
                        break;
                    case 64: // crystal
                        visualFxs.push(new Crystal(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 65: // door
                        visualFxs.push(new Door(map[spTiles[i]].x + k, map[spTiles[i]].y + j, map[spTiles[i]].text));
                        break;
                    case 66: // book
                        visualFxs.push(new Book(map[spTiles[i]].x + k, map[spTiles[i]].y + j, map[spTiles[i]].text));
                        break;
                }
            }
        }
    }
    for (let i = 0; i < removeList.length; i++) {
        map.splice(removeList[i], 1);
    }
    player.x = spawnPoint.x * ratio;
    player.y = spawnPoint.y * ratio;

    for (let i = map.length - 1; i >= 0; i--) {
        if (map[i].y + map[i].h > mapHeight) {
            mapHeight = map[i].y + map[i].h;
        }
    }
    for (let i = map.length - 1; i >= 0; i--) {
        if (map[i].x + map[i].w > mapWidth) {
            mapWidth = map[i].x + map[i].w;
        }
    }

    //TROLLING
    //TROLLING END
}
//UI
if (!mapTester) {
    eval(maps[0]);
}
adaptBiome();
initializeMap();

requestAnimationFrame(loop);
//starts the program
