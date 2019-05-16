// simplifies the document.getElementById() to just id()
function id(arg) {
    return document.getElementById(arg);
}
var canvas = id("canvas");
var c = canvas.getContext("2d");
//  The size of the tiles in the spritesheet
var mapTester = true;
if (window.opener) {
    //console.log(window.opener.mapCode);
    if (window.opener.mapCode) {
        eval(window.opener.mapCode);
    } else {
        eval(window.opener.map);
    }
} else {
    mapTester = false;
}
var ghostBtn = id("ghost");
var ghostSpeech = false;
var currentLevel = 0;

var stats = {
    blocks: 0,
    col1: 0,
    col2: 0,
    col3: 0,
    colPoints: 0
}
var tileSize = 16;
var tilesWidth, tilesHeight, ratioWidth, ratioHeight, biggestPossible, ratio;

var rWidth = Math.floor(window.innerWidth / (tileSize * 20));
var rHeight = Math.floor(window.innerHeight / (tileSize * 15));
if (rWidth !== rHeight) {
    biggestPossible = rWidth < rHeight ? rWidth : rHeight;
} else {
    biggestPossible = rHeight;
}
id("menu").style.width = (tileSize * 20 * biggestPossible) + "px";
id("menu").style.height = (tileSize * 15 * biggestPossible) + "px";

function adjustScreen(device) {
    switch (device) {
        case "mobile":
            tilesWidth = window.innerWidth / 32 | 0;
            tilesHeight = window.innerHeight / 32 | 0;
            break;
        case "pc":
            tilesWidth = 20;
            tilesHeight = 15;
            break;
    }
    biggestPossible = 1;
    ratioWidth = Math.floor(window.innerWidth / (tileSize * tilesWidth));
    ratioHeight = Math.floor(window.innerHeight / (tileSize * tilesHeight))
    if (ratioWidth !== ratioHeight) {
        biggestPossible = ratioWidth < ratioHeight ? ratioWidth : ratioHeight;
    } else {
        biggestPossible = ratioHeight;
    }
    if (biggestPossible < 1) {
        biggestPossible = 1;
    }
    canvas.width = tileSize * tilesWidth * biggestPossible | 0;
    canvas.height = tileSize * tilesHeight * biggestPossible | 0;
    canvas.width -= canvas.width % 16;
    canvas.heigth -= canvas.heigth % 16;
    ratio = canvas.width / (tilesWidth) | 0;
    ratio = canvas.width / (tilesWidth);
    //UI
    id("menu").style.width = canvas.width + "px";
    id("menu").style.height = canvas.height + "px";

    c.imageSmoothingEnabled = false;
}
// Pixel perfection

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
var paused = 1;
var fps = false;
var gForce = 0.016;
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
        [15, 5], [15, 9], // trap on/off
        [8, 13], // stone pile
        [5, 17], // dialogue
        [1, 18], // falling stone
        [0, 20], // breakable stone
        [8, 0], // clock
    ]

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
    spikes1: new Audio("PixelSamurai/soundFxs/spikes1.mp3"),
    spikes2: new Audio("PixelSamurai/soundFxs/spikes2.mp3"),
    tremble: new Audio("PixelSamurai/soundFxs/tremble.mp3"),
    fall: new Audio("PixelSamurai/soundFxs/fall.mp3"),
    haydn_1: new Audio("PixelSamurai/soundFxs/music/Haydn-1.mp3"),
    haydn_2: new Audio("PixelSamurai/soundFxs/music/Haydn-2.mp3"),
    bach_3: new Audio("PixelSamurai/soundFxs/music/Bach-1.mp3"),
    bach_2: new Audio("PixelSamurai/soundFxs/music/Bach-2.mp3"),
    bach_1: new Audio("PixelSamurai/soundFxs/music/Bach-3.mp3"),
    bach_4: new Audio("PixelSamurai/soundFxs/music/Bach-4.mp3"),
    bach_5: new Audio("PixelSamurai/soundFxs/music/Bach-5.mp3"),
    bach_6: new Audio("PixelSamurai/soundFxs/music/Bach-6.mp3"),
    bach_7: new Audio("PixelSamurai/soundFxs/music/Bach-7.mp3"),
}

setInterval(function () {
    id("FPS").innerHTML = fps + " FPS";
    fps = 0;
}, 1000);

audio.walking.playbackRate = 1.3;
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
audio.tremble.volume = 0.1;
audio.fall.volume = 0.1;
audio.ambient_1.volume = 0.1;
audio.ambient_2.volume = 0;

audio.spikes2.playbackRate = 1.8;

audio.ambient_1.loop = true;
audio.ambient_2.loop = true;

audio.haydn_1.volume = 0.2;
audio.haydn_2.volume = 0.2;
audio.bach_1.volume = 0.3;
audio.bach_2.volume = 0.3;
audio.bach_3.volume = 0.3;
audio.bach_4.volume = 0.3;
audio.bach_5.volume = 0.3;
audio.bach_6.volume = 0.3;
audio.bach_7.volume = 0.3;


var biomes = [{
    background: true,
    ambient: audio.ambient_1,
    music: [audio.haydn_1, audio.haydn_2],
    bgColor: "#0099dd",
    other: function () {
        for (let j = 0; j < 30; j++) {
            let ww = (mapWidth < 100) ? 100 : mapWidth;
            let hh = (mapHeight < 50) ? 50 : mapHeight;
            var ran1 = parseInt(Math.random() * ww + (player.x));
            var ran2 = Math.random() * hh / 4 - hh / 8;
            var ran3 = parseInt(Math.random() * 20 + 1);
            visualFxs.push(new Cloud(ran1, ran2, ran3));
        }
    }
}, {
    background: false,
    ambient: audio.ambient_2,
    music: [audio.bach_1, audio.bach_2, audio.bach_3, audio.bach_4, audio.bach_5, audio.bach_6, audio.bach_7],
    bgColor: "#222034",
    other: function () {}
}]

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
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
        this.reading = false;
        this.currentBook = "";
        this.atk = 1;
        this.xVel = 0;
        this.yVel = 0;
        this.xVelExt = 0; // external velocity
        this.yVelExt = 0; // external velocity
        this.maxVelocity = 0.3;
        this.sheet = id("sheet");
        this.L = 0;
        this.R = 0;
        this.hp = 100;
        this.grounded = false;
        this.stun = false;
        this.speed = 0.12;
        this.precision = 100;
        this.lastTile = spawnPoint;
        this.frameCounter = 0;
        this.jumpTransition = true;
        this.goingDown = false;
        this.frame = 0;
        this.yVelDirChange = 0;
        this.prevPos = [];
        this.respawning = 0;
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
        this.dmgHitbox = {
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
        this.colPoint = {
            L: 0,
            R: 0,
            B: 0
        }
        this.left = false;
        this.sprite = {
            x: 0,
            y: 0,
            w: 1,
            h: 1,
        };
        // 19/20 = dash right-left
        this.actionX = [[0], [1], [15, 15, 15, 15, 15, 15, 15, 15], [16, 16, 16, 16, 16, 16, 16, 16], [6], [6], [2, 2, 2, 2], [5, 5, 5, 5], [11, 11, 11, 12, 12, 12],
               [9], [12], [9, 10], [11, 12], [9], [12], [9, 10], [11, 12], [10], [10], [6], [6], [17, 17, 17, 17, 17, 17]]; //9-jump
        this.actionY = [[0], [0], [13, 14, 15, 16, 17, 18, 19, 20], [13, 14, 15, 16, 17, 18, 19, 20], [1], [3], [0, 1, 2, 3], [0, 1, 2, 3], [12, 13, 14, 12, 13, 14],
              [15, 15, 15], [15], [16, 16], [16, 16], [17, 17, 17], [17], [18, 18], [18, 18], [15], [17], [0], [2], [15, 16, 17, 18, 19, 20]];
        this.action = 0;
        this.attack = 0;
        this.dash = false;
        this.dashIn = 0;
        this.dashCd = 0;
        this.attackDMG = 7;
        this.dance = false;
        this.jumping = false;
        this.jumpCounter = 10;
        this.slowness = 6;
        this.windup = false;
    }
    jump() {
        if (this.grounded && !this.dead) {
            audio.jump.playy();
            this.frame = 0;
            this.jumping = true;
            this.grounded = false;
            this.dashCd = false;
            this.yVel = -0.02;
            var dir = 0;
            if (this.xVel !== 0) {
                dir = this.left ? 2 : 1;
            }
            visualFxs.push(new JumpFx(this.x, this.y, dir));

        }
    };
    attacking(hitbox) {
        var hitSomething = 0;
        for (i = 0; i < monsters.length; i++) {
            if (collided(hitbox, monsters[i]) && monsters[i].hp > 0) {
                var DMG = Math.round(Math.random() * (this.attackDMG / 2) + this.attackDMG / 2);
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
                if (monsters[i].hp <= 0) {
                    monsters[i].frameCounter = 0;
                    monsters[i].frame = 0;
                }
                texts.push(new DmgText(monsters[i], DMG));
            }
        }
        if (hitSomething) {
            audio.hit.playy();
        }
    };
    attackEvent() {
        if (this.grounded && !this.attack && !this.dead) {
            audio.attack.playy();
            this.attack = true;
            this.frame = 0;
        } else if (!this.attack && !this.windup && !this.dashCd && !this.dead) {
            this.windup = true;
            this.frameCounter = 0;
            this.frame = 0;
        }

    };
    respawnEvent() {
        this.respawning = true;
        this.dead = false;
        this.y = 1;
        this.yVel = 0;
        this.xVel = 0;
        this.yVelExt = 0;
        this.xVelExt = 0;
        this.left = false;
        this.dash = false;
        this.dashCd = false;
        if (typeof spawnPoint !== "undefined") {
            this.x = spawnPoint.x;
            this.y = spawnPoint.y;
            mapX = -player.x + (tilesWidth / 6) - 2;
            mapY = -player.y + (tilesHeight / 2);
        } else {
            mapX = 0;
            mapY = 0;
            this.x = 3;
            this.y = 3;
        }
    }
    compute() {
        this.frameCounter++;
        if (this.jumpCounter >= 10) {
            this.jumpMaxReached = true;
        }
        if (this.grounded) {
            this.jumpTransition = true;
            this.jumping = false;
            this.jumpMaxReached = false;
            this.jumpCounter = 0;
        }
        if (!this.jumpMaxReached && this.jumping && this.yVel < 0) {
            this.yVel -= (0.075 / (this.jumpCounter / 2 + 1));
            this.jumpCounter++;
        }
        if ((this.xVelExt + this.xVel > this.maxVelocity || this.xVelExt + this.xVel < -this.maxVelocity ||
                this.yVelExt + this.yVel > this.maxVelocity || this.yVelExt + this.yVel < -this.maxVelocity * 2) && fps % 2) {
            this.prevPos.push({
                x: this.x,
                y: this.y,
                action: this.action,
                frame: this.frame,
                opacity: 0.4
            });
        }
        if (this.dash) {
            if (fps % 2)
                this.prevPos.push({
                    x: this.x,
                    y: this.y,
                    action: this.action,
                    frame: this.frame,
                    opacity: 0.4
                });
            this.jumping = false;
            this.xVel = this.left ? -this.speed * 5 : this.speed * 5;
            this.yVel = 0;
            this.yVelExt = 0;
            this.xVelExt = 0;

            this.attacking(this.hitbox);
            if (Math.abs((this.dashIn - this.x + this.xVel)) > 3) {
                this.dash = false;
                this.xVel = 0;
            }
        }
        if (!this.dash) {
            if (this.L && !this.col.L && !this.R) {
                if (this.xVel > 0) {
                    this.xVel = 0;
                }
                if (this.xVelExt > 0 && !this.grounded) {
                    this.xVelExt -= this.speed / 10;
                } else if (this.xVel > -this.speed) {
                    this.xVel -= this.speed / 10;
                } else {
                    this.xVel = -this.speed;
                }
                this.left = true;
            } else if (this.R && !this.col.R && !this.L) {
                if (this.xVel < 0) {
                    this.xVel = 0;
                }
                if (this.xVelExt < 0 && !this.grounded) {
                    this.xVelExt += this.speed / 10;
                } else if (this.xVel < this.speed) {
                    this.xVel += this.speed / 10;
                } else {
                    this.xVel = this.speed;
                }
                this.left = false;
            } else if ((!this.L && !this.R || this.L && this.R)) {
                this.xVel = 0;
            }
            if (!this.grounded) {
                this.yVel += gForce;
                if (this.yVel > this.maxVelocity) {
                    this.yVel = this.maxVelocity;
                }
            } else if (this.yVel > 0) {
                this.yVel = 0;
                this.yVelExt = 0;
            }
        }
        this.x += this.xVel;
        this.y += this.yVel;

        // external velocity calculations
        this.x += this.xVelExt;
        this.y += this.yVelExt;
        if (this.xVelExt !== 0 && this.grounded) {
            this.xVelExt *= 0.75;
        } else if (this.xVelExt !== 0) {
            if (this.xVelExt > 0.0001) {
                this.xVelExt -= 0.0001;
            } else if (this.xVelExt < -0.0001) {
                this.xVelExt += 0.0001;
            }
        }
        if (this.xVelExt < 0.0001 && this.xVelExt > -0.0001) {
            this.xVelExt = 0;
        }
        this.yVelExt *= 0.9;
        if (this.yVelExt < 0.0001 && this.yVelExt > -0.0001) {
            this.yVelExt = 0;
        }

        if (this.y > (mapHeight + 2)) {
            this.respawnEvent();
        }
        //physics calculations
        this.hitbox.x = (this.x + this.w / 3.5);
        this.hitbox.y = this.y + 0.1;
        this.hitbox.w = (this.w - this.w / 1.75);
        this.hitbox.h = this.h - 0.1;

        this.dmgHitbox.x = this.hitbox.x;
        this.dmgHitbox.y = this.hitbox.y + 0.3;
        this.dmgHitbox.w = this.hitbox.w;
        this.dmgHitbox.h = this.hitbox.h - 0.6;
        let dir = (this.left) ? -1 : 1;
        this.atkHitbox.x = this.x + dir;
        this.atkHitbox.y = this.y;
        this.atkHitbox.w = this.w;
        this.atkHitbox.h = this.h;

    }
    draw() {
        if (this.yVel > 0 && this.yVelDirChange < 0) {
            this.jumpTransition = true;
            if (!this.attack) {
                this.frame = 0;
            }
        }
        this.yVelDirChange = this.yVel;
        if (this.attack || this.dash) {
            this.dance = false;
            this.slowness = 4;
            if (this.dash) {
                this.frameCounter = 0;
                this.frame = 0;
                if (!this.left) {
                    this.action = 19; //atk right
                } else {
                    this.action = 20; //atk left
                }
            } else {
                if (!this.left) {
                    this.action = 6; //atk right
                } else {
                    this.action = 7; //atk left
                }
            }
        } else {


            this.slowness = 3;
            if (!this.grounded) {
                this.dance = false;
                this.slowness = 4;
                if (!this.left) {
                    if (this.yVel > 0) { //falling
                        if (this.jumpTransition) {
                            this.action = 11;
                        } else {
                            this.action = 12;
                        }
                        if (this.yVel == this.maxVelocity) {
                            this.action = 12;
                        }
                    } else {
                        if (this.jumpTransition) { //going up
                            this.action = 9;
                        } else {
                            this.action = 10;
                        }
                    }
                    if (this.xVelExt >= 0.1 || this.xVelExt <= -0.1) {
                        this.action = 17;
                    }
                } else {
                    if (this.yVel > 0) { //falling
                        if (this.jumpTransition) {
                            this.action = 15;
                        } else {
                            this.action = 16;
                        }
                        if (this.yVel == this.maxVelocity) {
                            this.action = 16;
                        }
                    } else {
                        if (this.jumpTransition) { //going up
                            this.action = 13;
                        } else {
                            this.action = 14;
                        }
                    }
                    if (this.xVelExt >= 0.1 || this.xVelExt <= -0.1) {
                        this.action = 18;
                    }
                }
            } else if (this.xVel === 0) {
                if (!this.left) {
                    this.action = 0; //idle right
                } else {
                    this.action = 1; //idle left
                }
                if (this.dance) {
                    this.action = 8; //dance
                    this.slowness = 6;
                }

            } else if (this.xVel !== 0) {
                this.dance = false;
                if (!this.left) {
                    this.action = 2; //walk right
                } else {
                    this.action = 3; //walk left
                }
            }
        }
        if (this.windup) {
            this.slowness = 1;
        }
        if (this.frameCounter > this.slowness) {
            this.frame++;
            this.frameCounter = 0;
        }
        //
        if (this.attack && this.frame == 3 && this.frameCounter === 0) {
            this.attacking(this.atkHitbox);
        }
        if (this.windup) {
            this.slowness = 3;
            if (this.frame >= 6) {
                this.windup = false;
                let dir = this.left ? 4 : 3;
                visualFxs.push(new JumpFx(this.x, this.y, dir));
                audio.dash.playy();
                this.dashCd = true;
                this.dash = true;
                shake = 3;
                this.dashIn = this.x;

                this.frameCounter = 0;
                this.frame = 0;
                if (!this.left) {
                    this.action = 19; //atk right
                } else {
                    this.action = 20; //atk left
                }
            } else {
                this.action = 21;
                this.xVel *= 0.5;
                this.xVelExt *= 0.5;
                this.yVel *= 0.5;
                this.yVel -= gForce;
                this.yVelExt *= 0.5;
            }
        }
        if (this.frame > this.actionX[this.action].length - 1) {
            this.frame = 0;
            if (this.attack) {
                this.attack = false;
            }
            if (this.action == 9 || this.action == 11 || this.action == 13 || this.action == 15) { //jump transitions
                this.jumpTransition = false;
                this.frame = 0;
            }
        }
        if (this.xVel !== 0 && this.grounded && !(this.attack || this.dash)) {
            audio.walking.play();
        } else {
            audio.walking.pause();
        }

        //draw on canvas
        if (this.prevPos.length > 0) {
            for (let i = this.prevPos.length - 1; i >= 0; i--) {
                this.prevPos[i].opacity -= 0.02;
                if (this.prevPos[i].opacity <= 0) {
                    this.prevPos.splice(i, 1);
                    continue;
                }
                c.globalAlpha = this.prevPos[i].opacity;
                c.drawImage(
                    this.sheet,
                    this.actionX[this.prevPos[i].action][this.prevPos[i].frame] * 16,
                    this.actionY[this.prevPos[i].action][this.prevPos[i].frame] * 16,
                    this.sprite.w * 16,
                    this.sprite.h * 16,
                    (this.prevPos[i].x + mapX) * ratio | 0,
                    (this.prevPos[i].y + mapY) * ratio | 0,
                    (this.w) * ratio | 0,
                    (this.h) * ratio | 0);

            }
            c.globalAlpha = 1;
        }
        c.drawImage(
            this.sheet,
            this.actionX[this.action][this.frame] * 16,
            this.actionY[this.action][this.frame] * 16,
            this.sprite.w * 16,
            this.sprite.h * 16,
            (this.x + mapX) * ratio | 0,
            (this.y + mapY) * ratio | 0,
            (this.w) * ratio | 0,
            (this.h) * ratio | 0);
        //the attack animation takes up 2 tiles in width, so I decided to print the other map separately
        if (this.attack) {
            if (this.action == 6) {
                c.drawImage(
                    this.sheet,
                    this.actionX[this.action][this.frame] * 16 + 16,
                    this.actionY[this.action][this.frame] * 16,
                    this.sprite.w * 16,
                    this.sprite.h * 16,
                    (this.x + mapX + this.w) * ratio | 0,
                    (this.y + mapY) * ratio | 0,
                    (this.w) * ratio | 0,
                    (this.h) * ratio | 0);
            } else if (this.action == 7) {
                c.drawImage(
                    this.sheet,
                    this.actionX[this.action][this.frame] * 16 - 16,
                    this.actionY[this.action][this.frame] * 16,
                    this.sprite.w * 16,
                    this.sprite.h * 16,
                    (this.x + mapX - this.w) * ratio | 0,
                    (this.y + mapY) * ratio | 0,
                    (this.w) * ratio | 0,
                    (this.h) * ratio | 0);
            }
        }
        this.respawning = false;
    }
}
let player = new Player(0, 0);
class Monster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
        this.sheet = id("sheet");
        this.jumpForce = 0.22;
        this.maxVelocity = 0.3;
        this.xVel = 0;
        this.yVel = 0;
        this.speed = 0;
        this.grounded = false;
        this.frameCounter = 0;
        this.frame = 0;
        this.hit = false;
        this.hp = 3;
        this.maxHp = this.hp;
        this.type = null;
        this.attack = false;
        this.dead = false;
        this.serial = series++;
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
            w: 1,
            h: 1,
        };
        this.actionX = [];
        this.actionY = [];
        this.action = 0;
        //setTimeout(randomMovement, 1000, this.serial);

    };
    move() {

        let points = {
            upLeft: {
                x: this.x - 0.5,
                y: this.y + this.h - 1 - 0.5
            },
            upRight: {
                x: this.x + this.w + 0.5,
                y: this.y + this.h - 1 - 0.5
            },
            btLeft: {
                x: this.x + 0.2,
                y: this.y + this.h + 1.5
            },
            btLeft2: {
                x: this.x + 0.2,
                y: this.y + 1 + this.h / 2
            },
            btRight: {
                x: this.x + this.w - 0.2,
                y: this.y + this.h + 1.5
            },
            btRight2: {
                x: this.x + this.w - 0.2,
                y: this.y + 1 + this.h / 2
            },
            left: {
                x: this.x - 0.2,
                y: this.y + this.h / 1.1
            }, // provisional
            right: {
                x: this.x + this.w + 0.5,
                y: this.y + this.h / 1.1
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
        var bottomLeftCol = this.x;
        var bottomRightColX = this.x;

        for (let j = 0; j < map.length; j++) {
            if (this.left) {
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
        }
        for (let j = 0; j < specialTiles.length; j++) {
            if (this.left) {
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
        }
        if (stats.colPoints) {
            cols.upLeft ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.upLeft.x + mapX) * ratio | 0,
                (points.upLeft.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.upRight ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.upRight.x + mapX) * ratio | 0,
                (points.upRight.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.btLeft ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.btLeft.x + mapX) * ratio | 0,
                (points.btLeft.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.btRight ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.btRight.x + mapX) * ratio | 0,
                (points.btRight.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.btLeft2 ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.btLeft2.x + mapX) * ratio | 0,
                (points.btLeft2.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.btRight2 ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.btRight2.x + mapX) * ratio | 0,
                (points.btRight2.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.left ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.left.x + mapX) * ratio | 0,
                (points.left.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
            cols.right ? c.fillStyle = "red" : c.fillStyle = "white";
            c.fillRect(
                (points.right.x + mapX) * ratio | 0,
                (points.right.y + mapY) * ratio | 0,
                (0.1) * ratio | 0,
                (0.1) * ratio | 0
            );
        }
        let dir = this.left ? 0 : 1;
        if (this.left) {
            if (cols.left && !cols.upLeft) {
                this.jump();
            } else if ((cols.left && cols.upLeft) || (!cols.btLeft && !cols.btLeft2)) {
                if (this.grounded) {
                    dir = 1;
                }

            }

        } else {
            if (cols.right && !cols.upRight) {
                this.jump();
            } else if ((cols.right && cols.upRight) || (!cols.btRight && !cols.btRight2)) {
                if (this.grounded) {
                    dir = 0;
                }
            }
        }
        switch (dir) {
            case 0:
                this.left = true;
                this.L = true;
                this.R = false;
                break;
            case 1:
                this.left = false;
                this.L = false;
                this.R = true;
                break;
            case 2:
                this.L = false;
                this.R = false;
                break;
        }
    }
    jump() {
        if (this.grounded) {
            this.grounded = false;
            this.yVel = -this.jumpForce;
            let dir = 0;
            if (this.xVel !== 0) {
                dir = this.left ? 2 : 1;
            }
            visualFxs.push(new JumpFx(this.x, this.y, dir));

        }
    };
    compute() {
        //leftRightMovement(this.serial);
        if (!(fps % 15) && this.grounded && !this.hit) {
            //^AI is refreshed every 1/4 seconds
            this.move();
        }
        if (this.attack) {
            this.L = false;
            this.R = false;
        }
        if (this.col.L) {
            this.x += this.col.L;

        }
        if (this.col.R) {
            this.x -= this.col.R;

        }
        if (this.col.T) {
            this.y += this.col.T;
            this.yVel = 0;

        }
        if (this.col.B) {
            this.y -= this.col.B - 0.01;
            this.grounded = true;

        }
        //controls calculation
        if (this.L && !this.col.L && !this.R && !this.hit) {
            this.xVel = -this.speed;
            this.left = true;
        } else if (this.R && !this.col.R && !this.L && !this.hit) {
            this.xVel = this.speed;
            this.left = false;
        } else if ((!this.L && !this.R) || (this.L && this.R) || this.hit) {
            this.xVel = 0;
        }
        if (!this.grounded) {
            this.yVel += gForce;
            if (this.yVel > this.maxVelocity) {
                this.yVel = this.maxVelocity;
            }
        } else if (this.yVel > 0) {
            this.yVel = 0;
        }
        this.y += this.yVel;
        this.x += this.xVel;
        this.hitbox.x = (this.x + this.w / 10);
        this.hitbox.y = this.y;
        this.hitbox.w = (this.w - this.w / 5);
        this.hitbox.h = this.h;
        if (this.canAttack) {
            var dir = (this.left) ? -1 : 1;
            this.atkHitbox.x = this.hitbox.x + dir;
            this.atkHitbox.y = this.hitbox.y;
            this.atkHitbox.w = this.hitbox.w;
            this.atkHitbox.h = this.hitbox.h;
            this.searchPlayer(this);
            //console.log("attacking");
        }
    };
    draw(i) {
        this.frameCounter++
        if (!this.hit) {
            if (!this.grounded) {
                if (!this.left) {
                    this.action = 4; //idle right
                } else {
                    this.action = 4; //idle left
                }
            } else if (this.xVel === 0) {
                if (!this.left) {
                    this.action = 0; //idle right
                } else {
                    this.action = 1; //idle left
                }
            } else if (this.xVel !== 0) {
                if (!this.left) {
                    this.action = 2; //walk right
                } else {
                    this.action = 3; //walk left
                }
            }
        } else {
            this.action = 4;
            if (this.hp <= 0) {
                this.action = 5;
            }
        }
        if (this.attack && this.hp > 0) {
            !this.left ? this.action = 6 : this.action = 7;
        }
        if (this.frameCounter > 10) {
            this.frame++;
            this.frameCounter = 0;
        }
        if (this.frame > this.actionX[this.action].length - 1) {
            this.frame = 0;
            if (this.attack && this.hp > 0) {
                this.attackEvent(this);
                this.attack = false;
            }
            if (this.action == 4) {
                this.hit = false;
            }
            if (this.action == 5) {
                monsters.splice(i, 1);
                return 0;
            }
        }
        //draw on canvas
        c.drawImage(
            this.sheet,
            this.actionX[this.action][this.frame] * 16,
            this.actionY[this.action][this.frame] * 16,
            this.sprite.w * 16,
            this.sprite.h * 16,
            (this.x + mapX) * ratio | 0,
            (this.y + mapY) * ratio | 0,
            (this.w) * ratio | 0,
            (this.h) * ratio | 0);
        if (this.attack) {
            this.attackSprite(this);
        }
    }
}

function leftRightMovement(serial) {

    //console.log(monsters[i].serial+" "+ serial);

}
//CHANGE
class Slime extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.03;
        this.hp = 16;
        this.maxHp = this.hp;
        this.type = "Slime";
        this.actionX = [[12], [13], [12, 12, 12], [13, 13, 13], [14, 14, 14], [14, 14, 14, 14, 14]];
        this.actionY = [[0], [0], [0, 1, 2], [0, 1, 2], [0, 0, 0], [0, 1, 2, 3, 4]];
    }
}
class Lizard extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.04;
        this.hp = 12;
        this.maxHp = this.hp;
        this.type = "Lizard";
        this.actionX = [[15], [16], [15, 15, 15], [16, 16, 16], [17, 17, 17], [17, 17, 17, 17, 17]];
        this.actionY = [[0], [0], [0, 1, 2, 3], [0, 1, 2, 3], [0, 0, 0], [0, 1, 2, 3, 4]];
    }
}
class Bear extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.04;
        this.hp = 60;
        this.maxHp = this.hp;
        this.type = "Bear";
        this.actionX = [[0], [2], [0, 0, 0], [2, 2, 2], [16, 16, 16], [16, 16, 16, 16, 16, 16], [4, 4, 4, 4, 4, 4], [8, 8, 8, 8, 8, 8]];
        this.actionY = [[0], [0], [0, 2, 4], [0, 2, 4], [0, 2, 4], [0, 2, 4, 6, 8, 10], [0, 2, 4, 6, 8, 10], [0, 2, 4, 6, 8, 10]];
        this.sprite.w = 2;
        this.sprite.h = 2;
        this.sheet = id("bearsheet");
        this.w = 2;
        this.h = 2;
        this.canAttack = true;
    }
    attackEvent(bear) {
        if (collided(player, bear.atkHitbox)) {
            player.yVelExt += -0.3;
            player.xVelExt += bear.left ? -0.3 : 0.3;
            player.left = bear.left;
            player.dashCd = true;
            if (!parseInt(Math.random() * 3)) {
                visualFxs.push(new DmgFx(player, 0));
            }
            var randomFx = parseInt(Math.random() * 2 + 1);
            visualFxs.push(new DmgFx(player, randomFx));
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
                m.actionX[m.action][m.frame] * 16 + 32,
                m.actionY[m.action][m.frame] * 16,
                m.sprite.w / 2, m.sprite.h,
                (m.x + m.w + mapX) * ratio | 0,
                (m.y + mapY) * ratio | 0,
                (m.w / 2) * ratio | 0,
                (m.h) * ratio | 0);
        } else if (m.action == 7) {
            c.drawImage(
                m.sheet,
                m.actionX[m.action][m.frame] * 16 - 16,
                m.actionY[m.action][m.frame] * 16,
                m.sprite.w / 2,
                m.sprite.h,
                (m.x - m.w / 2 + mapX) * ratio | 0,
                (m.y + mapY) * ratio | 0,
                (m.w / 2) * ratio | 0,
                (m.h) * ratio | 0);
        }
    }
}
//CHANGE
class Dummy extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0;
        this.hp = 1200;
        this.maxHp = this.hp;
        this.type = "Dummy";
        this.actionX = [[12], [12], [12], [12], [12, 12, 12], [12]];
        this.actionY = [[3], [3], [3], [3], [4, 4, 4], [3]];
    }
    move() {}
}
class Zombie extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.02;
        this.hp = 20;
        this.maxHp = this.hp;
        this.type = "Zombie";
        this.actionX = [[18], [19], [18, 18, 18], [19, 19, 19], [20, 20, 20], [20, 20, 20, 20, 20]];
        this.actionY = [[0], [0], [0, 1, 2, 3], [0, 1, 2, 3], [0, 0, 0], [0, 1, 2, 3, 4]];
    }
}
class Superzombie extends Zombie {
    constructor(x, y) {
        super(x, y);
        this.speed = 0.04;
        this.hp = 60;
        this.maxHp = this.hp;
        this.w = 2;
        this.h = 2;
    }
}

// Texts & Dialogues
class DmgText {
    constructor(m, text) {
        this.x = m.x + m.w / 2 + Math.random() * 0.5 - 0.25;
        this.y = m.y + Math.random() * 0.5 - 0.25;
        this.text = text;
        this.size = 0.4;
        this.color = "#ac3232";
        this.lifeSpan = 40; //duration (in frames) of the text appearence
        this.color2 = "black"
    }
    draw(i) {
        c.font = Math.round(this.size * ratio) + "px" + " 'Press Start 2P'";
        this.size /= 1.01;
        c.fillStyle = this.color2;
        c.fillText(this.text, (this.x + mapX) * ratio, (this.y + mapY) * ratio);
        c.fillStyle = this.color;
        c.fillText(this.text, (this.x + mapX) * ratio, (this.y + mapY) * ratio);
        this.y -= 0.015;
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
        this.size = 0.4;
        this.sizeI = this.size;
        this.color = "white";
        this.lifeSpan = 0;
        this.color2 = "black";
        this.wait = 3;
        this.waitCounter = 0;
        this.destroy = (destroy !== undefined) ? destroy : true;
        this.kill = false;
        this.ongoing = true;
        this.voice = voices.ghost[0];
    }
    draw(i) {
        this.x = this.speaker.x + (this.speaker.w / 2);
        this.y = this.speaker.y - this.size;
        c.font = Math.round(this.size * ratio) + "px" + " 'VT323'";
        c.fillStyle = this.color2;
        c.fillText(
            this.text,
            (this.x + Math.round(this.size / 10) + mapX) * ratio,
            (this.y + Math.round(this.size / 10) + mapY) * ratio);
        c.fillStyle = this.color;
        c.fillText(
            this.text,
            (this.x + mapX) * ratio,
            (this.y + mapY) * ratio);
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
                let volume = (15 - Math.abs(player.hitbox.x + player.hitbox.w / 2 - (this.x + 0.5))) / 30;

                if (volume > 0) {
                    volume = volume.toFixed(3);
                    console.log(volume)
                    this.voice.volume = volume;
                    this.voice.playy();
                }
            }
            this.waitCounter++;
            if (this.waitCounter >= this.wait) {
                this.lifeSpan++;
                this.text += this.wholeText[this.lifeSpan - 1];
                this.waitCounter = 0;
            }
        }
        if (this.kill === true) {
            this.speaker.talking = false;
            textsRemoveList.push(i);
        }
    }
}
//CHANGE
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
            x: [[0, 0, 0, 0], [1, 1, 1, 1], [2, 2, 2, 2]],
            y: [[4, 5, 6, 7], [4, 5, 6, 7], [4, 5, 6, 7]],
            w: [1, 1, 2],
            h: [1, 1, 1],
        };
    }
}
class JumpFx {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
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
            x: [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2], [3, 3, 3, 3, 3], [4, 4, 4, 4, 4]],
            y: [[8, 9, 10, 11, 12], [8, 9, 10, 11, 12], [8, 9, 10, 11, 12], [8, 9, 10, 11, 12], [8, 9, 10, 11, 12]],
            w: [1, 1, 1, 1, 1],
            h: [1, 1, 1, 1, 1],
        };
    }
}
class DeathFx {
    constructor(x, y) {
        this.x = x - 0.5;
        this.y = y - 0.5;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = false;
        this.frameCounter = 0;
        this.slowness = 3;
        this.frame = 0;
        this.type = "death";
        this.spritePos = {
            x: [[19, 19, 19, 19, 19, 19]],
            y: [[5, 7, 9, 11, 13, 15]],
            w: [2],
            h: [2],
        };
    }
}
class RingFx {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.sprite = dir;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = false;
        this.frameCounter = 0;
        this.slowness = 5;
        this.frame = 0;
        this.type = "ring";
        this.spritePos = {
            x: [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2]],
            y: [[13, 14, 15, 16, 17], [13, 14, 15, 16, 17], [13, 14, 15, 16, 17]],
            w: [1, 1, 1],
            h: [1, 1, 1],
        };
    }
}
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 10;
        this.frame = 0;
        this.type = "grass";
        this.spritePos = {
            x: [[10, 10, 10, 10]],
            y: [[4, 5, 6, 7]],
            w: [1],
            h: [1],
        };
    }
}
class Crystal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
            x: [[13, 13, 13, 13], [14, 14, 14, 14, 14, 14], [15]],
            y: [[12, 13, 14, 15], [12, 13, 14, 15, 16, 17], [12]],
            w: [1, 1, 1],
            h: [1, 1, 1],
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
                    }, 1500)
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
            var thisX = this.x;
            var thisY = this.y;
        }

    }
}
class Door {
    constructor(x, y, place) {
        this.x = x;
        this.y = y;
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
            x: x,
            y: y,
            w: 1,
            h: 1
        };
        this.spritePos = {
            x: [[16], [17, 17], [17, 17, 17, 17, 17]],
            y: [[6], [5, 7], [9, 10, 11, 12, 13]],
            w: [1, 2, 2],
            h: [1, 2, 1],
        };
    }
    action() {
        if (this.sprite == 0) {
            if (player.attack) {
                if (collided(player.atkHitbox, this)) {
                    this.sprite = 1;
                    audio.hit.playy();
                    shake = 4;
                    visualFxs.push(new Portal(this.x, this.y, this.place));
                    this.x -= 0.5;
                    this.y -= 1;
                }
            }
        } else if (this.sprite === 1 && this.frame == this.spritePos.x[1].length - 1) {
            if (this.frameCounter == this.slowness) {
                this.sprite = 2;
                this.y += 1;
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
        this.x = x;
        this.y = y;
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
            x: [[16, 16, 16, 16]],
            y: [[7, 8, 9, 10]],
            w: [1],
            h: [1],
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
                blackScreen = this.load * 2 + 1;
                if (this.load > 50) {
                    eval(maps[parseInt(this.place)])
                    window.localStorage["LvL"] = parseInt(this.place);
                    currentLevel++;
                    adaptBiome();
                    initializeMap();
                    mapX = -player.x + (tilesWidth / 2 - 2);
                    mapY = -player.y + (tilesHeight / 2);
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
        this.x = x;
        this.y = y;
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
            x: [[7], [7, 7, 7, 8], [8, 8, 8, 8], [8, 7, 7, 7]], // grounded -- transition up -- waving -- transition down
            y: [[14], [15, 16, 17, 14], [15, 16, 17, 16], [14, 17, 16, 15]],
            w: [1, 1, 1, 1],
            h: [1, 1, 1, 1],
        };
    }
    action() {
        switch (this.sprite) {
            case 0:
                if (collided(player, this)) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 1;
                    this.slowness = 3;
                }
                break;
            case 1:
                if (this.frame == this.spritePos.x[1].length - 1) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 2;
                    this.slowness = 6;
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
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
        this.sprite = 0;
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.talking = false;
        this.slowness = 6;
        this.frame = 0;
        this.type = "ghostgirl";
        this.spritePos = {
            x: [[3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5], [6, 6, 6]],
            y: [[14, 15, 16, 17], [14, 15, 16, 17], [14, 15, 16, 17, 16, 15, 16], [14, 15, 16, 15, 16, 15, 16]],
            w: [1, 1, 1, 1, 1, 1, 1],
            h: [1, 1, 1, 1, 1, 1, 1],
        };
        this.events = [];
    }
    action() {
        if (ghostSpeech) {
            for (let i = this.events.length - 1; i >= 0; i--) {
                if (!this.talking && collided(this.events[i], player.hitbox)) {
                    this.talking = true;
                    this.talk(this.events[i].text);
                    this.events.splice(i, 1);
                    console.log(this.events.length)
                }
            }
        }
        if (this.x + this.w <= player.x - 1) {
            if (player.respawning || player.dead) {
                if (this.sprite == 0 || this.sprite == 1) {
                    this.frameCounter = 0;
                    this.frame = 0;
                }
                this.sprite = 2;
                if (voices.ghost[1].paused) {
                    let volume = (15 - Math.abs(player.hitbox.x + player.hitbox.w / 2 - this.x + this.w / 2)) / 30;
                    if (volume > 0) {
                        voices.ghost[1].play();
                    }
                }
            } else {
                this.sprite = 0;
            }
            if (Math.abs(this.x - player.x) / 6 > 1 / 100) {
                this.x += Math.abs(this.x - player.x) / 50;
            }
        } else if (this.x > player.x + player.w + 1) {
            if (player.respawning || player.dead) {
                if (this.srite == 0 || this.srite == 1) {
                    this.frameCounter = 0;
                    this.frame = 0;
                }
                this.sprite = 3;
                if (voices.ghost[1].paused) {
                    let volume = (15 - Math.abs(player.hitbox.x + player.hitbox.w / 2 - this.x + this.w / 2)) / 30;
                    if (volume > 0) {
                        voices.ghost[1].play();
                    }
                }
            } else {
                this.sprite = 1;
            }
            if (Math.abs(this.x - player.x) / 6 > 1 / 100) {
                this.x -= Math.abs(this.x - player.x) / 100;
            }
        }
        if (this.y + this.h < player.y - 1) {
            if (Math.abs(this.y - player.y) / 6 > 1 / 100) {
                this.y += Math.abs(this.y - player.y) / 100;
            }
        } else if (this.y > player.y + player.h + 1) {
            if (Math.abs(this.y - player.y) / 6 > 1 / 100) {
                this.y -= Math.abs(this.y - player.y) / 100;
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
        this.x = x;
        this.y = y;
        this.sprite = Math.floor(Math.random() * 4);
        this.rotation = 0;
        this.sheet = id("sheet");
        this.repeat = true;
        this.frameCounter = 0;
        this.slowness = 5;
        this.frame = 0;
        this.type = "cloud";
        this.movX = -s / 1000;
        this.movY = 0;
        this.spritePos = {
            x: [[7], [7], [7], [7]],
            y: [[0], [1], [2], [3]],
            w: [1, 1, 1, 1],
            h: [1, 1, 1, 1],
        };
    }
    action() {
        if (this.x < -20) {
            let ww = (mapWidth < 100) ? 100 : mapWidth;
            this.x = (ww + 20);
        }
    }
}

if (typeof imported !== "undefined") {
    imported();
}

function drawFxs(fx, i) {
    //animation computing
    if (fx.action != null) {
        fx.action();
    }
    var fxX = fx.x + mapX;
    var fxY = fx.y + mapY;
    var fxW = fx.spritePos.w[fx.sprite];
    var fxH = fx.spritePos.h[fx.sprite];
    if (fx.frameCounter != null) {
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
    stats.blocks++;
    if (fx.rotation > 0) {
        fxY -= fxH / 2;
        c.save();
        c.translate(fxX * ratio, fxY * ratio);
        c.rotate(fx.rotation * Math.PI / 180);
        c.drawImage(
            fx.sheet,
            fx.spritePos.x[fx.sprite][fx.frame] * 16,
            fx.spritePos.y[fx.sprite][fx.frame] * 16,
            fx.spritePos.w[fx.sprite] * 16,
            fx.spritePos.h[fx.sprite] * 16,
            (-fxW / 2) * ratio | 0,
            (-fxH / 2) * ratio | 0,
            fxW * ratio | 0,
            fxH * ratio | 0);
        c.restore();
    } else {
        c.drawImage(
            fx.sheet,
            fx.spritePos.x[fx.sprite][fx.frame] * 16,
            fx.spritePos.y[fx.sprite][fx.frame] * 16,
            fx.spritePos.w[fx.sprite] * 16,
            fx.spritePos.h[fx.sprite] * 16,
            fxX * ratio | 0,
            fxY * ratio | 0,
            fxW * ratio | 0,
            fxH * ratio | 0);
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
        this.spritePos = [[]];
        this.repeat = false;
        this.running = false;
        this.frameCounter = 0;
        this.frame = 0;
        this.slowness = 3;
        this.type = "";
    }
}
class Bouncy extends SpecialTile {
    constructor(x, y) {
        super(x, y);
        this.sprite = biome == 1 ? 1 : 0;
        this.spritePos = {
            x: [[11, 11, 11, 11], [11, 11, 11, 11]],
            y: [[4, 5, 6, 7], [8, 9, 10, 11]],
            w: [1, 1],
            h: [1, 1],
        };
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
        var bouncynessX = 0.32;
        var bouncynessY = 0.32;
        var bounceOrNot = collider.dash ? 0.35 : 0;
        collider.xVel = 0;
        collider.yVel = 0;
        collider.grounded = false;
        this.running = true;
        var dir = player.left ? 1 : -1;
        switch (colDir) {
            case "b":
                collider.grounded = false;
                collider.yVel = -bouncynessY;
                collider.dash = false;
                collider.dashCd = false;
                visualFxs.push(new RingFx(collider.x, collider.y, 2));
                audio.bounce1.playy()
                break;
            case "l":
                //ring VFX
                if (bounceOrNot !== 0) {
                    visualFxs.push(new RingFx(collider.x, collider.y, 0));
                } else {
                    visualFxs.push(new RingFx(collider.x, collider.y, 2));
                }
                audio.bounce2.playy()
                collider.grounded = false;
                collider.dash = false;
                collider.dashCd = false;
                collider.xVelExt = bounceOrNot;
                collider.yVel = -bouncynessY;
                break;
            case "r":
                if (bounceOrNot !== 0) {
                    visualFxs.push(new RingFx(collider.x, collider.y, 1));
                } else {
                    visualFxs.push(new RingFx(collider.x, collider.y, 2));
                }
                audio.bounce3.playy()
                collider.grounded = false;
                collider.dash = false;
                collider.dashCd = false;
                collider.xVelExt = -bounceOrNot;
                collider.yVel = -bouncynessY;
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
class FallingStone extends SpecialTile {
    constructor(x, y) {
        super(x, y);
        this.sprite = 0;
        this.spritePos = {
            x: [[1], [1, 1], [2, 3, 4, 5, 6, 7, 8], [10]], //0
            y: [[18], [18, 19], [18, 18, 18, 18, 18, 18, 18], [0]], //18
            w: [1, 1, 1, 1],
            h: [1, 1, 2, 1],
        };
        this.repeat = true;
        this.running = false;
        this.slowness = 3;
        this.type = "falling";
        this.touched = 0;
        this.timer = 0;
        this.w = 1;
        this.h = 1;
        this.hitbox = {
            x: x,
            y: y,
            w: 1,
            h: 0.5
        };
    }
    action(collider, colDir) {
        switch (colDir) {
            case "b":
                collider.grounded = true;
                if (!this.touched) {
                    this.sprite = 1;
                    this.touched = true;
                    this.running = true;
                    audio.tremble.playy();
                }
                break;
            case "t":
                if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                break;
        };
    }
    move() {
        if (this.touched) {
            c.drawImage(
                id("sheet"),
                0,
                288,
                16,
                16,
                (this.x + mapX) * ratio | 0,
                (this.y + mapY) * ratio | 0,
                ratio,
                ratio
            );
            if (this.sprite == 1) {
                this.timer++;
                if (this.timer >= 30) {
                    audio.fall.playy();
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 2;
                    this.counter = 0;
                    this.slowness = 4;
                    this.running = true;
                    this.hitbox = {
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0
                    };
                    this.h = 2;
                }
                //sleep or delete
            }
            if (this.sprite == 2) {
                //sleep or delete
                if (this.frame >= this.spritePos.x[2].length - 1) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.slowness = 3;
                    this.sprite = 3;
                    this.timer = 0;
                    this.h = 1;
                }
                this.running = true;
            }
            if (this.sprite == 3) {
                //sleep or delete
                this.timer++;
                let testHitbox = {
                    x: this.x,
                    y: this.y,
                    w: 1,
                    h: 0.5
                }
                if (this.timer >= 120 && !collided(testHitbox, player)) {
                    this.touched = false;
                    this.sprite = 0;
                    this.timer = 0;
                    this.hitbox = {
                        x: this.x,
                        y: this.y,
                        w: 1,
                        h: 0.5
                    };
                }
            }
        }
    }
}
class Clock extends SpecialTile {
    constructor(x, y) {
        super(x, y);
        this.sprite = 0;
        this.spritePos = {
            x: [[8, 9, 10, 11], [8, 9, 10, 11]], //0
            y: [[0, 0, 0, 0], [1, 1, 1, 1]], //18
            w: [1, 1],
            h: [1, 1],
        };
        this.repeat = true;
        this.running = true;
        this.slowness = 60;
        this.type = "clock";
        this.touched = false;
        this.xVel = 0;
        this.yVel = 0;
        this.speed = 0.15;
        this.w = 1;
        this.h = 1;
        this.stop = false;
        this.initialPos = {
            x: x,
            y: y
        }
        this.hitbox = {
            x: x,
            y: y,
            w: 1,
            h: 1
        };
    }
    action(collider, colDir) {
        switch (colDir) {
            case "b":
                this.touched = true;
                collider.grounded = true;
                if(!this.stop){
                switch (this.frame) {
                    case 0:
                        collider.yVelExt = this.speed;
                        break;
                    case 1:
                        collider.xVelExt = this.speed;
                        break;
                    case 2:
                        collider.yVelExt = -this.speed;
                        break;
                    case 3:
                        collider.xVelExt = -this.speed;
                        break;
                }
                }
                break;
            case "t":
                if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                break;
        };
    }
    canMove() {
        let nextMovX = 0,
            nextMovY = 0;
        switch (this.frame) {
            case 0:
                nextMovY = this.speed;
                break;
            case 1:
                nextMovX = this.speed;
                break;
            case 2:
                nextMovY = -this.speed;
                break;
            case 3:
                nextMovX = -this.speed;
                break;
        }
        let nextHitbox = {
            x: this.x + nextMovX,
            y: this.y + nextMovY,
            w: 1,
            h: 1
        }
        for (let j = 0; j < map.length; j++) {
            if (collided(nextHitbox, map[j])) {
                return false;
            }
        }
        return true;

    }
    move() {
        if (player.respawning) {
            this.x = this.initialPos.x;
            this.y = this.initialPos.y;
            this.hitbox.x = this.initialPos.x;
            this.hitbox.y = this.initialPos.y;
            this.frameCounter = 0;
            this.frame = 0;
        }
        this.xVel = 0;
        this.yVel = 0;
        if (this.touched) {
            this.frameCounter--;
            this.sprite = 1;
            if (this.canMove()) {
                this.stop = false;
                switch (this.frame) {
                    case 0:
                        this.yVel = this.speed;
                        break;
                    case 1:
                        this.xVel = this.speed;
                        break;
                    case 2:
                        this.yVel = -this.speed;
                        break;
                    case 3:
                        this.xVel = -this.speed;
                        break;
                }
                this.x += this.xVel;
                this.y += this.yVel;
                this.hitbox.x += this.xVel;
                this.hitbox.y += this.yVel;
            } else {
                this.stop = true;
            }
        } else {
            this.sprite = 0;
        }
        this.touched = false;
    }
}
class BreakableStone extends SpecialTile {
    constructor(x, y) {
        super(x, y);
        this.sprite = 0;
        this.spritePos = {
            x: [[0], [1, 3, 5, 7, 9, 11], [11, 9, 7, 5, 3, 1]], //0
            y: [[20], [20, 20, 20, 20, 20, 20], [22, 22, 22, 22, 22, 22]],
            w: [1, 2, 2],
            h: [1, 2, 2],
        };
        this.repeat = true;
        this.running = false;
        this.slowness = 4;
        this.initialPos = {
            x: x,
            y: y
        };
        this.type = "breakable";
        this.w = 1;
        this.h = 1;
        this.hitbox = {
            x: x,
            y: y,
            w: 1,
            h: 1
        };
    }
    action(collider, colDir) {
        switch (colDir) {
            case "b":
                if (collider.dash) {
                    if (collider.left) {
                        this.x -= 1;
                        this.sprite = 2;
                    } else {
                        this.sprite = 1;
                    }
                    this.running = true;
                    this.y -= 0.5;
                    this.w = 2;
                    this.h = 2;
                    this.hitbox.w = 0;
                    this.hitbox.h = 0;
                    this.hitbox.x = 0;
                    this.hitbox.y = 0;
                    collider.col.B = 0;
                    audio.fall.playy();
                    shake = 4;
                } else {
                    collider.grounded = true;
                }
                break;
            case "t":
                if (collider.dash) {
                    if (collider.left) {
                        this.x -= 1;
                        this.sprite = 2;
                    } else {
                        this.sprite = 1;
                    }
                    this.running = true;
                    collider.col.T = 0;
                    this.y -= 0.5;
                    this.w = 2;
                    this.h = 2;
                    this.hitbox.w = 0;
                    this.hitbox.h = 0;
                    this.hitbox.x = 0;
                    this.hitbox.y = 0;
                    audio.fall.playy();
                    shake = 4;
                } else if (collider.yVel < 0) {
                    collider.yVel = 0;
                }
                break;
            case "l":
                if (collider.dash) {
                    this.sprite = 2;
                    this.running = true;
                    collider.col.L = 0;
                    this.y -= 0.5;
                    this.x -= 1;
                    this.w = 2;
                    this.h = 2;
                    this.hitbox.w = 0;
                    this.hitbox.h = 0;
                    this.hitbox.x = 0;
                    this.hitbox.y = 0;
                    audio.fall.playy();
                    shake = 4;
                }
                break;
            case "r":
                if (collider.dash) {
                    this.sprite = 1;
                    this.running = true;
                    collider.col.R = 0;
                    this.y -= 0.5;
                    this.w = 2;
                    this.h = 2;
                    this.hitbox.w = 0;
                    this.hitbox.h = 0;
                    this.hitbox.x = 0;
                    this.hitbox.y = 0;
                    audio.fall.playy();
                    shake = 4;
                }
                break;
        };
    }
    move() {
        if (player.respawning) {
            this.x = this.initialPos.x;
            this.y = this.initialPos.y;
            this.w = 1;
            this.h = 1;
            this.hitbox = {
                x: this.x,
                y: this.y,
                w: 1,
                h: 1
            }
            this.sprite = 0;
        }
        if (this.sprite == 1 || this.sprite == 2) {
            if (this.frame >= this.spritePos.x[this.sprite].length - 1) {
                this.x = 0;
                this.y = 0;
                this.w = 0;
                this.h = 0;
            }
        }
    }
}
class Speeder extends SpecialTile {
    constructor(x, y, dir) {
        super(x, y);
        this.repeat = true;
        this.running = true;
        this.sprite = dir;
        this.dir = dir;
        this.slowness = 3;
        this.spritePos = {
            x: [[12, 12, 12], [12, 12, 12]],
            y: [[5, 6, 7], [8, 9, 10]],
            w: [1, 1],
            h: [1, 1],
        };
        this.type = "speeder";
    }
    action(collider, colDir) {
        var dir = player.left ? 1 : -1;
        switch (colDir) {
            case "b":
                audio.speed1.playy();
                if (this.dir === 0) {
                    collider.xVelExt += 0.05;
                } else if (this.dir === 1) {
                    collider.xVelExt -= 0.05;
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
        this.sprite = 0;
        this.spritePos = {
            x: [[tiles[tile][0]]],
            y: [[tiles[tile][1]]],
            w: [1],
            h: [1]
        };
        this.repeat = false;
        this.running = false;
        this.slowness = 3;
        this.type = "spikes";
        this.hitbox = {
            x: x,
            y: y,
            w: 1,
            h: 1
        };
        this.dmgHitbox = {
            x: x,
            y: y,
            w: 1,
            h: 1
        };
        switch (tiles[tile][1]) {
            case 5: //up
                this.hitbox = {
                    x: x,
                    y: y + 0.6,
                    w: 1,
                    h: 0.4
                };
                this.dmgHitbox = {
                    x: x + 0.15,
                    y: y,
                    w: 0.7,
                    h: 0.6
                };
                break;
            case 6: //right
                this.hitbox = {
                    x: x,
                    y: y,
                    w: 0.4,
                    h: 1
                };
                this.dmgHitbox = {
                    x: x + 0.4,
                    y: y + 0.15,
                    w: 0.6,
                    h: 0.7
                };
                break;
            case 7: //down
                this.hitbox = {
                    x: x,
                    y: y,
                    w: 1,
                    h: 0.4
                };
                this.dmgHitbox = {
                    x: x + 0.15,
                    y: y + 0.4,
                    w: 0.7,
                    h: 0.6
                };
                break;
            case 8: //left
                this.hitbox = {
                    x: x + 0.6,
                    y: y,
                    w: 0.4,
                    h: 1
                };
                this.dmgHitbox = {
                    x: x,
                    y: y + 0.15,
                    w: 0.6,
                    h: 0.7
                };
                break;

        }
    }
    action(collider, colDir) {
        var dir = collider.left ? 1 : -1;
        switch (colDir) {
            case "b":
            case "l":
            case "r":
            case "t":
                break;
        };
    }
    move() {
        if (!isOutOfScreen(this) && collided(this.dmgHitbox, player.dmgHitbox)) {
            if (!player.dead) {
                visualFxs.push(new DeathFx(player.x, player.y));
                audio.death.playy();
                player.dead = true;
                setTimeout(function () {
                    player.respawnEvent();
                }, 1500);
            }
            if (player.yVel < 0) {
                player.yVel = 0;
            }
        }
    }
}
class TimedSpikes extends SpecialTile {
    constructor(x, y, active, timing) {
        super(x, y);
        this.sprite = active ? 1 : 3;
        this.initialSprite = active ? 1 : 3;
        this.spritePos = {
            x: [[15], [15, 15, 15], [15], [15, 15, 15]],
            y: [[5], [6, 7, 8], [9], [8, 7, 6]],
            w: [1, 1, 1, 1],
            h: [1, 1, 1, 1],
        };
        this.repeat = true;
        this.running = true;
        this.active = active;
        this.initialActive = active;
        this.timing = 100;
        this.time = timing ? timing : 0;
        this.initialTime = timing ? timing : 0;
        this.slowness = 2;
        this.type = "timedSpikes";
        this.hitbox = {
            x: x,
            y: y + 0.5,
            w: 1,
            h: 0.5
        };
        this.dmgHitbox = {
            x: x + 0.1,
            y: y,
            w: 0.8,
            h: 0.5
        };
    }
    action(collider, colDir) {
        switch (colDir) {
            case "b":
            case "l":
            case "r":
            case "t":
                break;
        };
    }
    move() {
        if (player.respawning) {
            this.time = this.initialTime;
            this.sprite = this.initialSprite;
            this.active = this.initialActive;
            this.frameCounter = 0;
            this.frame = 0;
        }
        this.time++;
        if (this.time > this.timing) {
            this.time = 0;
            this.active = !this.active;
            this.sprite = this.active ? 1 : 3;
            this.frameCounter = 0;
            this.frame = 0;
            if (options.audio == true && !isOutOfScreen(this)) {
                let volume = (15 - Math.abs(player.hitbox.x + player.hitbox.w / 2 - this.x + this.w / 2)) / 30;
                if (volume > 0) {
                    if (this.active) {
                        audio.spikes1.volume = volume;
                        audio.spikes1.playy();
                    } else {
                        audio.spikes2.volume = volume;
                        audio.spikes2.playy();
                    }
                }
            }
        }
        switch (this.sprite) {
            case 0:
                break;
            case 1:
                if (this.frame >= this.spritePos.x[1].length - 1) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 2;
                }
                break;
            case 2:
                if (collided(player, this.dmgHitbox)) {
                    if (!player.dead) {
                        visualFxs.push(new DeathFx(player.x, player.y));
                        audio.death.playy();
                        player.dead = true;
                        setTimeout(function () {
                            player.respawnEvent();
                        }, 1500);
                    }
                    if (player.yVel < 0) {
                        player.yVel = 0;
                    }
                }
                break;
            case 3:
                if (this.frame >= this.spritePos.x[1].length - 1) {
                    this.frame = 0;
                    this.frameCounter = 0;
                    this.sprite = 0;
                }
                break;
        }
    }
}
class MovingPlat extends SpecialTile {
    constructor(x, y, sprite, xVel, yVel, range) {
        super(x, y);
        this.sprite = 0;
        this.spritePos = {
            x: [sprite[0]],
            y: [sprite[1]],
            w: [1],
            h: [1]
        };
        this.xVel = xVel;
        this.yVel = yVel;
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
                collider.xVelExt = this.xVel;
                if (this.yVel < 0) {
                    collider.yVelExt = this.yVel;
                } else if (this.yVel < collider.maxVelocity) {
                    collider.grounded = true;
                    collider.yVelExt = this.yVel;
                }
                break;
            case "l":
                //collider.xVel = 0;
                if (this.xVel > 0) {
                    collider.xVelExt = this.xVel;
                }
                break;
            case "r":
                //collider.xVel = 0;
                if (this.xVel > 0) {
                    collider.xVelExt = this.xVel;
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

function renderSpecialTiles() {
    for (i = 0; i < specialTiles.length; i++) {
        if (isOutOfScreen(specialTiles[i]) && specialTiles[i].move == null) {
            continue;
        }
        if (specialTiles[i].move !== undefined) {
            specialTiles[i].move();
        }
        if (specialTiles[i].frameCounter !== undefined && specialTiles[i].running) {
            specialTiles[i].frameCounter++;
            if (specialTiles[i].frameCounter > specialTiles[i].slowness) {
                specialTiles[i].frame++;
                specialTiles[i].frameCounter = 0;
            }
            if (specialTiles[i].frame > specialTiles[i].spritePos.x[specialTiles[i].sprite].length - 1) {
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
        stats.blocks++;
        c.drawImage(
            specialTiles[i].sheet,
            specialTiles[i].spritePos.x[specialTiles[i].sprite][specialTiles[i].frame] * 16,
            specialTiles[i].spritePos.y[specialTiles[i].sprite][specialTiles[i].frame] * 16,
            specialTiles[i].spritePos.w[specialTiles[i].sprite] * 16,
            specialTiles[i].spritePos.h[specialTiles[i].sprite] * 16,
            (specialTiles[i].x + mapX) * ratio | 0,
            (specialTiles[i].y + mapY) * ratio | 0,
            (specialTiles[i].w) * ratio | 0,
            (specialTiles[i].h) * ratio | 0);
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
            (monsters[i].x + mapX + monsters[i].w / 2) * ratio - (ratio / 2) | 0,
            (monsters[i].y + mapY - 2 / 16) * ratio - (ratio / tileSize) | 0,
            (ratio) | 0,
            (2 / 16 * ratio) | 0
        )
        c.drawImage(
            id("hp-bar"),
            0,
            2,
            barW,
            2,
            (monsters[i].x + mapX + monsters[i].w / 2) * ratio - (ratio / 2) | 0,
            (monsters[i].y + mapY - 2 / 16) * ratio - (ratio / tileSize) | 0,
            (ratio * hpRatio) | 0,
            (2 / 16 * ratio) | 0
        )
    }
}
//document.onclick=()=>alert(monsters[0].x+" "+monsters[0].y)
function renderTexts() {
    textsRemoveList = [];
    c.textAlign = "center";
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
        mapY += shakeArr[shake] / 20;
    }
    paused = 0;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = bgColor;
    c.fillRect(0, 0, canvas.width, canvas.height);
    //calculate character
    //draw environment
    moveCamera();
    if (!player.dead) {
        player.compute();
    } else if (!audio.walking.paused) {
        audio.walking.pause();
    }
    checkCollisions();
    for (i = 0; i < monsters.length; i++) {
        monsters[i].frameCounter++;
        monsters[i].compute();
    }

    drawEnvironment();
    renderSpecialTiles();
    if (!player.dead) {
        adjustCollided(player);
    }
    //draw character
    for (let i = monsters.length - 1; i >= 0; i--) {
        if (isOutOfScreen(monsters[i])) {
            continue;
        }
        monsters[i].draw(i);
    }
    player.reading = false;
    for (let i = visualFxs.length - 1; i >= 0; i--) {
        if (visualFxs[i] == null) {
            continue
        }
        if (visualFxs[i].type !== "ghostgirl" && isOutOfScreen(visualFxs[i])) {
            continue;
        }
        drawFxs(visualFxs[i], i);
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
        player.draw();
    }
    renderHpBars();
    renderTexts();
    displayStats();
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
        mapX = -camObject.x;
        mapY = -camObject.y;
    }
    if (cameraType === 0) {
        var cameraDir = tilesWidth / 2 - 2;
    } else if (cameraType === 1) {
        var cameraDir = player.left ? tilesWidth - 3 : 2;
    }
    //let cameraDir = player.left ? tilesWidth / 2 : tilesWidth / 6;
    if (mapX < -player.x + cameraDir) {
        // means camera moves forward
        if (Math.abs((-player.x + cameraDir - mapX) / 6) > 1 / 100) {
            mapX += (-player.x + cameraDir - mapX) / 6;
        }
    } else if (mapX > -player.x + cameraDir) {
        // means camera moves backward
        if (Math.abs((-player.x + cameraDir - mapX) / 6) > 1 / 100) {
            mapX += (-player.x + cameraDir - mapX) / 6;
        }
    }
    let lookDown = watchDown ? 15 / 4 : 0; //15 is tilesHeight standard
    if (mapY < -(player.y + lookDown) + tilesHeight / 2) {
        // means camera moves downward
        if (Math.abs((-(player.y + lookDown) + tilesHeight / 2 - mapY) / 6) > 1 / 100) {
            mapY += (-(player.y + lookDown) + tilesHeight / 2 - mapY) / 6;
        }
    } else if (mapY > -(player.y + lookDown) + tilesHeight / 2) {
        // means camera moves upward
        if (Math.abs((-(player.y + lookDown) + tilesHeight / 2 - mapY) / 6) > 1 / 100) {
            mapY += (-(player.y + lookDown) + tilesHeight / 2 - mapY) / 6;
        }
    }
}

function isOutOfScreen(Entity) {
    if (Entity == null) {
        return true;
    }
    if (Entity.x > tilesWidth - mapX) {
        return true;
    }
    if (Entity.x + Entity.w < -mapX) {
        return true;
    }
    if (Entity.y > tilesHeight - mapY + 1) {
        return true;
    }
    if (Entity.y + Entity.h < -mapY) {
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
        for (m = 0; m < monsters.length; m++) {
            if (collided(monsters[m], map[i])) {
                colCheck(monsters[m], map[i]);
            }
        }
        if (isOutOfScreen(map[i])) {
            continue;
        }
        if (collided(player, map[i])) {
            let collision = colCheck(player, map[i]);
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
    p.colPoint.L = false;
    p.colPoint.R = false;
    p.colPoint.B = false;
    for (let j = 0; j < map.length; j++) {
        if (isOutOfScreen(map[j])) {
            continue;
        }
        //checks for blocks to the right
        if (pointSquareCol({
                x: p.x + p.w / 2 + 0.7,
                y: p.y + p.h / 2
            }, map[j])) {
            p.colPoint.R = true;
        }
        //checks for blocks to the left
        if (pointSquareCol({
                x: p.x + p.w / 2 - 0.7,
                y: p.y + p.h / 2
            }, map[j])) {
            p.colPoint.L = true;
        }
        //checks for blocks to the bottom
        if (pointSquareCol({
                x: p.x + p.w / 2,
                y: p.y + p.h / 2 + 0.7
            }, map[j])) {
            p.colPoint.B = true;
        }

    }
    for (let j = 0; j < specialTiles.length; j++) {
        if (isOutOfScreen(specialTiles[j])) {
            continue;
        }
        //checks for blocks to the right
        if (pointSquareCol({
                x: p.x + p.w / 2 + 0.7,
                y: p.y + p.h / 2
            }, specialTiles[j])) {
            p.colPoint.R = true;
        }
        //checks for blocks to the left
        if (pointSquareCol({
                x: p.x + p.w / 2 - 0.7,
                y: p.y + p.h / 2
            }, specialTiles[j])) {
            p.colPoint.L = true;
        }
        //checks for blocks to the bottom
        if (pointSquareCol({
                x: p.x + p.w / 2,
                y: p.y + p.h / 2 + 0.7
            }, specialTiles[j])) {
            p.colPoint.B = true;
        }

    }
    if (stats.colPoints) {
        p.colPoint.R ? c.fillStyle = "red" : c.fillStyle = "white";
        c.fillRect(
            (p.x + p.w / 2 + 0.7 + mapX) * ratio | 0,
            (p.y + p.h / 2 + mapY) * ratio | 0,
            (0.1) * ratio | 0,
            (0.1) * ratio | 0
        );
        p.colPoint.L ? c.fillStyle = "red" : c.fillStyle = "white";
        c.fillRect(
            (p.x + p.w / 2 - 0.7 + mapX) * ratio | 0,
            (p.y + p.h / 2 + mapY) * ratio | 0,
            (0.1) * ratio | 0,
            (0.1) * ratio | 0
        );
        p.colPoint.B ? c.fillStyle = "red" : c.fillStyle = "white";
        c.fillRect(
            (p.x + p.w / 2 + mapX) * ratio | 0,
            (p.y + p.h / 2 + 0.7 + mapY) * ratio | 0,
            (0.1) * ratio | 0,
            (0.1) * ratio | 0
        );
    }
    if (p.col.L && (!p.colPoint.B || p.colPoint.L)) {
        if (p.col.R) {
            p.grounded = true;
        }
        p.x += p.col.L;
        if (p.dash) {
            p.dash = false;
            p.dashCd = true;
        }
        if (p.xVelExt < 0 && p.colPoint.L) {
            p.xVelExt = 0;
        }
        if (p.xVel < 0 && p.colPoint.L) {
            p.xVel = 0;
        }

    }
    if (p.col.R && (!p.colPoint.B || p.colPoint.R)) {
        if (p.col.L) {
            p.grounded = true;
        }
        p.x -= p.col.R;
        if (p.dash) {
            p.dash = false;
            p.dashCd = true;
        }
        if (p.xVelExt > 0 && p.colPoint.R) {
            p.xVelExt = 0;
        }
        if (p.xVel > 0 && p.colPoint.R) {
            p.xVel = 0;
        }

    }
    if (p.col.T) {
        p.y += p.col.T;
        if (p.yVel < 0) {
            p.yVel = 0;
        }
        if (p.yVelExt < 0) {
            p.yVelExt = 0;
        }
        if (p.dash) {
            p.dash = false;
            p.dashCd = true;
        }

    }
    if (p.col.B) {
        p.y -= (p.col.B - 0.01);
        p.grounded = true;
        if (p.yVel > 0) {
            p.yVel = 0;
        }
        if (p.dashCd || p.dash) {
            p.dashCd = false;
            p.dash = false;
        }
    }
}


var backgrounds = [id("bg1"), id("cloud1"), id("cloud2"), id("bg2"), id("bg3"), id("bg4")]
var background = false;
var cloudsX = [0, 0];

function drawBackground() {
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[1],
            (-tilesWidth / 2 + (backgrounds[1].width / tileSize) * j + mapX / 20 - cloudsX[0]) * ratio | 0,
            (mapY / 20) * ratio | 0,
            (backgrounds[1].width / tileSize) * ratio | 0,
            (backgrounds[1].height / tileSize) * ratio | 0
        );
    }
    cloudsX[0] += (backgrounds[1].width / tileSize) / 4000;
    if (cloudsX[0] >= backgrounds[1].width / tileSize) {
        cloudsX[0] = 0;
    }
    //clouds
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[2],
            (-tilesWidth / 2 + (backgrounds[2].width / tileSize) * j + mapX / 18 - cloudsX[1]) * ratio | 0,
            (mapY / 18) * ratio | 0,
            (backgrounds[2].width / tileSize) * ratio | 0,
            (backgrounds[2].height / tileSize) * ratio | 0
        );
    }
    cloudsX[1] += (backgrounds[2].width / tileSize) / 6000;
    if (cloudsX[1] >= backgrounds[1].width / tileSize) {
        cloudsX[1] = 0;
    }
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[3],
            (-tilesWidth / 2 + (backgrounds[3].width / tileSize) * j + mapX / 10) * ratio | 0,
            (5 + mapY / 10) * ratio | 0,
            (backgrounds[3].width / tileSize * ratio) | 0,
            (backgrounds[3].height / tileSize * ratio) | 0
        );
    }

    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[4],
            (-tilesWidth / 2 + (backgrounds[4].width / tileSize * j) + mapX / 8) * ratio | 0,
            (5 + mapY / 8) * ratio | 0,
            (backgrounds[4].width / tileSize) * ratio | 0,
            (backgrounds[4].height / tileSize) * ratio | 0
        );
    }
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[5],
            (-tilesWidth / 2 * ratio + (backgrounds[5].width / tileSize * ratio * j) + (mapX * ratio) / 6) | 0,
            (5 + mapY / 8) * ratio | 0,
            (backgrounds[5].width / tileSize * ratio) | 0,
            (backgrounds[5].height / tileSize * ratio) | 0
        );
    }
    for (let j = 0; j < 5; j++) {
        c.drawImage(
            backgrounds[5],
            (-tilesWidth / 2 * ratio + (backgrounds[5].width / tileSize * ratio * j) + (mapX * ratio) / 6) | 0,
            (5 + mapY / 7) * ratio | 0,
            (backgrounds[5].width / tileSize * ratio) | 0,
            (backgrounds[5].height / tileSize * ratio) | 0
        );
    }
    for (let j = 0; j < 5; j++) {
        c.fillStyle = "#323c39";
        c.fillRect(
            (-tilesWidth / 2 * ratio + (backgrounds[5].width / tileSize * ratio * j) + (mapX * ratio) / 6) | 0,
            (5 + mapY / 7) * ratio + (backgrounds[5].height / tileSize * ratio) | 0,
            (backgrounds[5].width / tileSize * ratio) | 0,
            (backgrounds[5].height / tileSize * ratio) | 0
        );
    }
}

var checkBlock = {
    x: 0,
    y: 0,
    w: 0,
    h: 0
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
                checkBlock.x = bgTiles[i].x + k;
                checkBlock.y = bgTiles[i].y + j;
                checkBlock.w = 1;
                checkBlock.h = 1;
                if (isOutOfScreen(checkBlock)) {
                    continue;
                }
                stats.blocks++;
                c.drawImage(
                    player.sheet,
                    tiles[bgTiles[i].type][0] * 16,
                    tiles[bgTiles[i].type][1] * 16,
                    tileSize,
                    tileSize,
                    (bgTiles[i].x + k + mapX) * ratio | 0,
                    (bgTiles[i].y + j + mapY) * ratio | 0,
                    ratio | 0,
                    ratio | 0);
            }
        }
    }
    for (let i = 0; i < map.length; i++) {
        if (isOutOfScreen(map[i])) {
            continue;
        }
        for (let j = 0; j < map[i].h; j++) {
            for (let k = 0; k < map[i].w; k++) {
                checkBlock.x = map[i].x + k;
                checkBlock.y = map[i].y + j;
                checkBlock.w = 1;
                checkBlock.h = 1;
                if (isOutOfScreen(checkBlock)) {
                    continue;
                }
                stats.blocks++;
                c.drawImage(
                    player.sheet, tiles[map[i].type][0] * 16,
                    tiles[map[i].type][1] * 16,
                    tileSize,
                    tileSize,
                    (map[i].x + k + mapX) * ratio | 0,
                    (map[i].y + j + mapY) * ratio | 0,
                    ratio | 0,
                    ratio | 0);
            }
        }
    }
}



// COLLISION DETECTORS
function colCheck(shapeA, shapeB) {
    stats.col3++;
    // get the vectors to check against
    if (shapeA.hitbox != null) {
        var shapeAA = shapeA.hitbox;
    } else {
        var shapeAA = shapeA;
    }
    if (shapeB.hitbox != null) {
        var shapeBB = shapeB.hitbox;
    } else {
        var shapeBB = shapeB;
    }
    var vX = (shapeAA.x + (shapeAA.w / 2)) - (shapeBB.x + (shapeBB.w / 2)),
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
                if (shapeA.col.T < oY && !shapeB.xVel) {
                    shapeA.col.T = oY;
                }
            } else {
                colDir = "b";
                shapeA.grounded = true;
                if (shapeA.col.B < oY) {
                    shapeA.col.B = oY;
                }
                if (shapeB.xVel) {
                    shapeA.xVelExt = shapeB.xVel;
                }
                if (shapeB.xVel) {
                    if (shapeB.yVel < 0) {
                        shapeA.yVelExt = shapeB.yVel;
                    }
                    if (shapeB.yVel > 0) {
                        shapeA.yVelExt = shapeB.yVel;
                    }
                }
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (shapeA.col.L < oX) {
                    shapeA.col.L = oX;
                }
            } else {
                colDir = "r";
                if (shapeA.col.R < oX) {
                    shapeA.col.R = oX;
                }
            }
        }

    }

    return colDir;

}

function collided(a, b) {
    stats.col2++;
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
    stats.col1++;
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
// STATS





function displayStats() {
    id("BLOCKS").innerHTML = "blocks: " + stats.blocks;
    id("COL-1").innerHTML = "PointSquareColCheck: " + stats.col1;
    id("COL-2").innerHTML = "SquareSquareColCheck: " + stats.col2;
    id("COL-3").innerHTML = "DirSquarescolCheck: " + stats.col3;
    stats.blocks = 0;
    stats.col1 = 0;
    stats.col2 = 0;
    stats.col3 = 0;
}







//Mouse controls
var jmpKeyPressed = 0;
window.onmousedown = function (e) {
    if (typeof e === 'object' && !touchDevice) {
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
    if (typeof e === 'object' && !touchDevice) {
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
// Mobile controls


var touchDevice = false;

function mobileInit(isContinue) {
    touchDevice = true;
    console.log("mobile");
    adjustScreen("mobile");
    if (isContinue) {
        eval(maps[window.localStorage['LvL'] || 0]);
        currentLevel = window.localStorage['LvL'];
    } else {
        eval(maps[0]);
    }
    adaptBiome();
    initializeMap();
    requestAnimationFrame(loop);
    id("menu").style.visibility = "hidden";
    canvas.style.visibility = "visible";
    gamePaused = false;




    id("arrowCont").style.display = "block";
    id("spacebarCont").style.display = "block";
    id("othersCont").style.display = "block";
    id("up").ontouchstart = function () {
        id("up").style.transform = "scale(1.2)";
        id("up").style.opacity = "1";

        if (!jmpKeyPressed) {
            player.jump();
            jmpKeyPressed = true;
        }
    }
    id("up").ontouchend = function () {
        id("up").style.transform = "";
        id("up").style.opacity = "0.4";

        player.jumping = false;
        if (player.jumping && player.jumpCounter < 9) {
            p.yVel = 0;
        }
        jmpKeyPressed = false;
    }

    id("left").ontouchstart = function () {
        id("left").style.transform = "scale(1.2)";
        id("left").style.opacity = "1";

        player.L = true;
    }
    id("left").ontouchend = function () {
        id("left").style.transform = "";
        id("left").style.opacity = "0.4";

        player.L = false;
    }

    id("right").ontouchstart = function () {
        id("right").style.transform = "scale(1.2)";
        id("right").style.opacity = "1";

        player.R = true;
    }
    id("right").ontouchend = function () {
        id("right").style.transform = "";
        id("right").style.opacity = "0.4";

        player.R = false;
    }
    id("atk").ontouchstart = function () {
        id("atk").style.transform = "scale(1.2)";
        id("atk").style.opacity = "1";

        player.attackEvent();
    }
    id("atk").ontouchend = function () {
        id("atk").style.transform = "";
        id("atk").style.opacity = "0.4";
    }
    id("lookDownBtn").ontouchstart = function () {
        id("lookDownBtn").style.transform = "scale(1.2)";
        id("lookDownBtn").style.opacity = "1";

        watchDown = true;
    }
    id("lookDownBtn").ontouchend = function () {
        id("lookDownBtn").style.transform = "";
        id("lookDownBtn").style.opacity = "0.4";

        watchDown = false;
    }
    id("lookFurtherBtn").ontouchstart = function () {
        id("lookFurtherBtn").style.transform = "scale(1.2)";
        id("lookFurtherBtn").style.opacity = "1";

        cameraType = 1;
    }
    id("lookFurtherBtn").ontouchend = function () {
        id("lookFurtherBtn").style.transform = "";
        id("lookFurtherBtn").style.opacity = "0.4";

        cameraType = 0;
    }

    id("spacebar").ontouchstart = function () {
        id("spacebar").style.transform = "scale(1.2)";
        id("spacebar").style.opacity = "1";
        if (gamePaused) {
            id("arrowCont").style.visibility = "visible";
            id("othersCont").style.visibility = "visible";
            if (player.reading) {
                id(player.currentBook).style.visibility = "hidden";
            } else {
                id("pause-screen").style.display = "none";
                id("pause-screen").style.visibility = "hidden";
                id("controls").style.visibility = "hidden";
            }
            gamePaused = false;
            requestAnimationFrame(loop);
        } else {
            id("arrowCont").style.visibility = "hidden";
            id("othersCont").style.visibility = "hidden";
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
        }
    }
    id("spacebar").ontouchend = function () {
        id("spacebar").style.transform = "";
        id("spacebar").style.opacity = "0.4";
    }

}
id("menu").addEventListener('touchstart', function (e) {
    e.preventDefault();
})
id("newGame").addEventListener("touchstart", function () {
    mobileInit(false);
}, {
    once: true
})

// Keyboard controls
window.addEventListener("keydown", function (event) {
    var key = event.keyCode;
    if (key !== 122) {
        event.preventDefault();
    }
    if (key === 112) {
        id("stats").style.visibility = "visible";
        stats.colPoints = true;
    }
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
                cameraType = 1;
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
if (window.opener) {
    //console.log(window.opener.mapCode);
    if (window.opener.mapCode) {
        eval(window.opener.mapCode);
    } else {
        eval(window.opener.map);
    }
} else {
    mapTester = false;
}

function adaptBiome() {
    background = biomes[biome].background;
    bgColor = biomes[biome].bgColor;
    biomes[biome].other();
}
var ghost = {};

function songPlayer() {
    pickSong = (currentLevel / 2 | 0) > biomes[biome].music.length ? (Math.random() * biomes[biome].music.length) | 0 : currentLevel / 2 | 0;
    if (biomes[biome].music[pickSong].paused) {
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
        biomes[biome].music[pickSong].loop = true;
        biomes[biome].music[pickSong].playy();
        biomes[biome].ambient.playy();
    }
}

function initializeMap() {
    songPlayer();
    var spTiles = [];
    var removeList = [];
    specialTiles = [];
    bgTiles = [];
    visualFxs = [];
    ghost = new GhostGirl(player.x - 4, player.y - 4);
    visualFxs.push(ghost);
    monsters = [];
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
            case 67:
            case 68:
            case 70:
            case 71:
            case 72:
            case 73:
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
    //constructor(x, y, active, timing) {
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
                    case 67: // timedSpikes
                        specialTiles.push(new TimedSpikes(map[spTiles[i]].x + k, map[spTiles[i]].y + j, 0, parseInt(map[spTiles[i]].text)));
                        break;
                    case 68: // timedSpikes
                        specialTiles.push(new TimedSpikes(map[spTiles[i]].x + k, map[spTiles[i]].y + j, 1, parseInt(map[spTiles[i]].text)));
                        break;
                    case 71: // falling Stone
                        specialTiles.push(new FallingStone(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 72: // breakable Stone
                        specialTiles.push(new BreakableStone(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 73: // clock
                        specialTiles.push(new Clock(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                }
            }
        }
        switch (map[spTiles[i]].type) {
            case 70: // dialogue
                ghost.events.push(map[spTiles[i]]);
                break;
        }
    }
    for (let i = 0; i < removeList.length; i++) {
        map.splice(removeList[i], 1);
    }
    player.x = spawnPoint.x;
    player.y = spawnPoint.y;

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

}
//UI
window.onresize = function () {
    if (window.innerWidth >= canvas.width * 2 && window.innerHeight >= canvas.height * 2) {
        location.reload();
    }
    if (canvas.width > 320 && (window.innerWidth < canvas.width || window.innerHeight < canvas.height)) {
        location.reload();
    }
}
if (mapTester) {
    adjustScreen("pc");
    id("menu").style.visibility = "hidden";
    canvas.style.visibility = "visible";
    ghostSpeech = true;
    adaptBiome();
    initializeMap();
    requestAnimationFrame(loop);
}
if (!mapTester) {
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.fontSize = (parseInt(id("menu").style.width) / 20 | 0) + "px";
    }
    id("twitter").style.fontSize = (parseInt(id("menu").style.width) / 20 | 0) + "px";
    id("twitter-logo").style.height = (parseInt(id("menu").style.width) / 20 | 0) + "px";
    id("newGame").onmousedown = function () {
        adjustScreen("pc");
        console.log("pc");
        eval(maps[0]);
        adaptBiome();
        initializeMap();
        requestAnimationFrame(loop);
        id("menu").style.visibility = "hidden";
        id("controls").style.visibility = "visible";
        canvas.style.visibility = "visible";
    }
    id("ghost").onclick = ghostVoiceOnOff;
    id("ghost").ontouchstart = ghostVoiceOnOff;

    function ghostVoiceOnOff() {
        if (ghostSpeech) {
            id("ghost").innerHTML = "GHOST's speech(OFF)";
            id("ghost").style.opacity = "0.5";
        } else {
            id("ghost").innerHTML = "GHOST's speech(ON)";
            id("ghost").style.opacity = "1";
        }
        ghostSpeech = !ghostSpeech;
    }
    if (window.localStorage['LvL'] != null) {
        id("continue").addEventListener("touchstart", function () {
            mobileInit(true);
        }, {
            once: true
        })
        id("continue").onmousedown = function () {
            adjustScreen("pc");
            eval(maps[window.localStorage['LvL'] || 0]);
            currentLevel = window.localStorage['LvL'];
            adaptBiome();
            initializeMap();
            requestAnimationFrame(loop);
            id("menu").style.visibility = "hidden";
            id("controls").style.visibility = "visible";
            canvas.style.visibility = "visible";
        }
        id("continue").style.opacity = "1";
    } else {
        id("continue").style.opacity = "0.5";
    };
}
var options = {
    audio: true,
    music: true,
}
id("ctrlButton").onclick = function () {
    id("pause-screen").style.display = "none";
    id("pause-screen").style.visibility = "hidden";
    id("controls").style.visibility = "visible";
    canvas.style.visibility = "visible";
}
id("music").onclick = musicBtn;
id("music").ontouchstart = musicBtn;

function musicBtn() {
    if (options.music) {
        options.music = false;
        this.src = "ui/music-off.png";
        audio.haydn_1.volume = 0;
        audio.haydn_2.volume = 0;
        audio.bach_1.volume = 0;
        audio.bach_2.volume = 0;
        audio.bach_3.volume = 0;
        audio.bach_4.volume = 0;
        audio.bach_5.volume = 0;
        audio.bach_6.volume = 0;
        audio.bach_7.volume = 0;
    } else {
        options.music = true;
        this.src = "ui/music-on.png"
        audio.haydn_1.volume = 0.2;
        audio.haydn_2.volume = 0.2;
        audio.bach_1.volume = 0.3;
        audio.bach_2.volume = 0.3;
        audio.bach_3.volume = 0.3;
        audio.bach_4.volume = 0.3;
        audio.bach_5.volume = 0.3;
        audio.bach_6.volume = 0.3;
        audio.bach_7.volume = 0.3;
    }
}
id("audio").onclick = audioBtn;
id("audio").ontouchstart = audioBtn;

function audioBtn() {
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
        audio.tremble.volume = 0;
        audio.fall.volume = 0;

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
        audio.tremble.volume = 0.1;
        audio.fall.volume = 0.1;

    }
}
//UI end
//starts the program
