// simplify the document.getElementById() to just id()
function id(arg) {
    return document.getElementById(arg);
}
var map = [{
    x: 1,
    y: 6,
    w: 1,
    h: 1,
    type: 0
}, {
    x: 2,
    y: 6,
    w: 9,
    h: 1,
    type: 1
}, {
    x: 1,
    y: 7,
    w: 1,
    h: 2,
    type: 3
}, {
    x: 1,
    y: 9,
    w: 1,
    h: 1,
    type: 6
}, {
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
}, {
    x: 14,
    y: 6,
    w: 1,
    h: 1,
    type: 2
}, {
    x: 14,
    y: 7,
    w: 1,
    h: 1,
    type: 5
}, {
    x: 15,
    y: 8,
    w: 2,
    h: 1,
    type: 10
}, {
    x: 17,
    y: 8,
    w: 1,
    h: 1,
    type: 12
}, {
    x: 18,
    y: 8,
    w: 4,
    h: 1,
    type: 1
}, {
    x: 24,
    y: 8,
    w: 1,
    h: 1,
    type: 16
}, {
    x: 22,
    y: 8,
    w: 2,
    h: 1,
    type: 15
}, {
    x: 21,
    y: 9,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 20,
    y: 10,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 19,
    y: 11,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 18,
    y: 12,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 17,
    y: 13,
    w: 1,
    h: 3,
    type: 5
}, {
    x: 18,
    y: 16,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 19,
    y: 17,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 20,
    y: 18,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 21,
    y: 19,
    w: 13,
    h: 1,
    type: 10
}, {
    x: 14,
    y: 8,
    w: 1,
    h: 1,
    type: 4
}, {
    x: 2,
    y: 9,
    w: 19,
    h: 1,
    type: 4
}, {
    x: 3,
    y: 10,
    w: 17,
    h: 1,
    type: 4
}, {
    x: 4,
    y: 11,
    w: 15,
    h: 1,
    type: 4
}, {
    x: 16,
    y: 12,
    w: 2,
    h: 1,
    type: 4
}, {
    x: 16,
    y: 13,
    w: 1,
    h: 3,
    type: 4
}, {
    x: 16,
    y: 16,
    w: 2,
    h: 1,
    type: 4
}, {
    x: 16,
    y: 17,
    w: 3,
    h: 1,
    type: 4
}, {
    x: 16,
    y: 18,
    w: 4,
    h: 1,
    type: 4
}, {
    x: 16,
    y: 19,
    w: 5,
    h: 1,
    type: 4
}, {
    x: 15,
    y: 13,
    w: 1,
    h: 7,
    type: 3
}, {
    x: 2,
    y: 10,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 3,
    y: 11,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 4,
    y: 12,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 5,
    y: 12,
    w: 10,
    h: 1,
    type: 7
}, {
    x: 15,
    y: 12,
    w: 1,
    h: 1,
    type: 4
}, {
    x: 18,
    y: 20,
    w: 17,
    h: 1,
    type: 4
}, {
    x: 18,
    y: 21,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 15,
    y: 20,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 16,
    y: 20,
    w: 2,
    h: 1,
    type: 7
}, {
    x: 19,
    y: 21,
    w: 16,
    h: 1,
    type: 7
}, {
    x: 35,
    y: 21,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 36,
    y: 20,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 37,
    y: 19,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 27,
    y: 8,
    w: 1,
    h: 1,
    type: 14
}, {
    x: 28,
    y: 8,
    w: 1,
    h: 1,
    type: 15
}, {
    x: 29,
    y: 9,
    w: 1,
    h: 3,
    type: 3
}, {
    x: 29,
    y: 12,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 31,
    y: 13,
    w: 1,
    h: 1,
    type: 7
}, {
    x: 30,
    y: 13,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 32,
    y: 14,
    w: 1,
    h: 2,
    type: 3
}, {
    x: 32,
    y: 16,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 33,
    y: 16,
    w: 5,
    h: 1,
    type: 7
}, {
    x: 35,
    y: 20,
    w: 1,
    h: 1,
    type: 4
}, {
    x: 34,
    y: 19,
    w: 3,
    h: 1,
    type: 10
}, {
    x: 38,
    y: 16,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 38,
    y: 5,
    w: 1,
    h: 11,
    type: 5
}, {
    x: 38,
    y: 4,
    w: 1,
    h: 1,
    type: 5
}, {
    x: 37,
    y: 4,
    w: 1,
    h: 4,
    type: 3
}, {
    x: 29,
    y: 8,
    w: 1,
    h: 1,
    type: 13
}, {
    x: 30,
    y: 8,
    w: 1,
    h: 1,
    type: 13
}, {
    x: 31,
    y: 8,
    w: 6,
    h: 1,
    type: 10
}, {
    x: 37,
    y: 8,
    w: 1,
    h: 8,
    type: 4
}, {
    x: 33,
    y: 14,
    w: 4,
    h: 2,
    type: 4
}, {
    x: 32,
    y: 13,
    w: 5,
    h: 1,
    type: 4
}, {
    x: 30,
    y: 9,
    w: 7,
    h: 4,
    type: 4
}, {
    x: 37,
    y: 3,
    w: 1,
    h: 1,
    type: 0
}, {
    x: 38,
    y: 3,
    w: 1,
    h: 1,
    type: 2
}, {
    x: 39,
    y: 19,
    w: 1,
    h: 1,
    type: 14
}, {
    x: 2,
    y: 5,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 7,
    y: 5,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 13,
    y: 5,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 18,
    y: 7,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 22,
    y: 7,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 28,
    y: 7,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 30,
    y: 7,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 38,
    y: 2,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 41,
    y: 18,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 48,
    y: 5,
    w: 1,
    h: 1,
    type: 9
}, {
    x: 48,
    y: 6,
    w: 1,
    h: 24,
    type: 3
}, {
    x: 49,
    y: 6,
    w: 1,
    h: 24,
    type: 5
}, {
    x: 49,
    y: 5,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 53,
    y: 9,
    w: 1,
    h: 1,
    type: 9
}, {
    x: 54,
    y: 9,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 53,
    y: 10,
    w: 1,
    h: 20,
    type: 3
}, {
    x: 54,
    y: 10,
    w: 1,
    h: 20,
    type: 5
}, {
    x: 58,
    y: 7,
    w: 1,
    h: 1,
    type: 14
}, {
    x: 59,
    y: 7,
    w: 1,
    h: 1,
    type: 16
}, {
    x: 64,
    y: 7,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 46,
    y: 16,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 44,
    y: 13,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 46,
    y: 10,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 44,
    y: 7,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 40,
    y: 19,
    w: 4,
    h: 1,
    type: 15
}, {
    x: 44,
    y: 19,
    w: 1,
    h: 1,
    type: 16
}, {
    x: 48,
    y: 30,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 53,
    y: 30,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 49,
    y: 30,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 54,
    y: 30,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 69,
    y: 8,
    w: 1,
    h: 1,
    type: 0
}, {
    x: 69,
    y: 9,
    w: 1,
    h: 25,
    type: 3
}, {
    x: 70,
    y: 9,
    w: 1,
    h: 25,
    type: 5
}, {
    x: 70,
    y: 8,
    w: 1,
    h: 1,
    type: 2
}, {
    x: 69,
    y: 34,
    w: 1,
    h: 1,
    type: 3
}, {
    x: 72,
    y: 2,
    w: 1,
    h: 1,
    type: 9
}, {
    x: 73,
    y: 2,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 72,
    y: 3,
    w: 1,
    h: 28,
    type: 3
}, {
    x: 72,
    y: 31,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 73,
    y: 31,
    w: 4,
    h: 1,
    type: 7
}, {
    x: 73,
    y: 3,
    w: 1,
    h: 27,
    type: 5
}, {
    x: 73,
    y: 30,
    w: 1,
    h: 1,
    type: 4
}, {
    x: 77,
    y: 30,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 77,
    y: 31,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 69,
    y: 35,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 70,
    y: 34,
    w: 1,
    h: 1,
    type: 4
}, {
    x: 70,
    y: 35,
    w: 9,
    h: 1,
    type: 7
}, {
    x: 79,
    y: 34,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 79,
    y: 35,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 78,
    y: 31,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 76,
    y: 27,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 85,
    y: 29,
    w: 1,
    h: 1,
    type: 9
}, {
    x: 85,
    y: 30,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 86,
    y: 29,
    w: 1,
    h: 1,
    type: 12
}, {
    x: 87,
    y: 29,
    w: 4,
    h: 1,
    type: 1
}, {
    x: 86,
    y: 30,
    w: 5,
    h: 1,
    type: 7
}, {
    x: 91,
    y: 29,
    w: 1,
    h: 1,
    type: 2
}, {
    x: 91,
    y: 30,
    w: 1,
    h: 1,
    type: 8
}, {
    x: 87,
    y: 16,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 15,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 14,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 13,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 12,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 11,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 10,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 9,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 8,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 89,
    y: 7,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 95,
    y: 3,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 98,
    y: 3,
    w: 1,
    h: 1,
    type: 14
}, {
    x: 99,
    y: 3,
    w: 2,
    h: 1,
    type: 15
}, {
    x: 101,
    y: 3,
    w: 1,
    h: 1,
    type: 16
}, {
    x: 99,
    y: 2,
    w: 2,
    h: 1,
    type: 18
}, {
    x: 104,
    y: 4,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 104,
    y: 2,
    w: 1,
    h: 2,
    type: 3
}, {
    x: 104,
    y: 1,
    w: 1,
    h: 1,
    type: 9
}, {
    x: 105,
    y: 1,
    w: 1,
    h: 1,
    type: 10
}, {
    x: 106,
    y: 1,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 105,
    y: 4,
    w: 2,
    h: 1,
    type: 7
}, {
    x: 109,
    y: 4,
    w: 2,
    h: 1,
    type: 7
}, {
    x: 108,
    y: 4,
    w: 1,
    h: 1,
    type: 6
}, {
    x: 108,
    y: 2,
    w: 1,
    h: 2,
    type: 3
}, {
    x: 108,
    y: 1,
    w: 1,
    h: 1,
    type: 9
}, {
    x: 109,
    y: 1,
    w: 1,
    h: 1,
    type: 10
}, {
    x: 110,
    y: 1,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 106,
    y: 3,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 110,
    y: 3,
    w: 1,
    h: 1,
    type: 11
}, {
    x: 90,
    y: 19,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 18,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 17,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 93,
    y: 5,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 26,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 25,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 24,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 23,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 22,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 21,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 90,
    y: 20,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 87,
    y: 28,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 89,
    y: 28,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 69,
    y: 7,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 58,
    y: 6,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 25,
    y: 17,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 71,
    y: 34,
    w: 1,
    h: 1,
    type: 17
}, {
    x: 72,
    y: 34,
    w: 7,
    h: 1,
    type: 10
}, {
    x: 74,
    y: 30,
    w: 2,
    h: 1,
    type: 1
}, {
    x: 76,
    y: 30,
    w: 1,
    h: 1,
    type: 13
}, {
    x: 75,
    y: 29,
    w: 1,
    h: 1,
    type: 18
}, {
    x: 26,
    y: 17,
    w: 1,
    h: 1,
    type: 17
}, ];
spawnPoint = {
    x: 9,
    y: 5
};
spawnPoint = {
    x: 9,
    y: 5
};
Audio.prototype.playy = function () {
    var aud = this;
    if (aud.paused) {
        aud.play();
    } else {
        aud.pause();
        aud.currentTime = 0;
        aud.play();
    }
}
//canvas-related variables
var canvas = id("canvas");
var c = canvas.getContext("2d");
//canvas.width = (window.innerHeight < window.innerWidth) ? window.innerHeight / 1.1 : window.innerWidth / 1.1;
canvas.width = window.innerWidth * (window.innerHeight / window.innerWidth) / 1.1;
canvas.width -= canvas.width % 16;
canvas.height = canvas.width / 4 * 3;
c.imageSmoothingEnabled = false;
var tileSize = 16;
var tilesWidth = 20;
var tilesHeight = tilesWidth * (canvas.height / canvas.width);
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
        [11, 4], //bouncy
        [10, 4], //animated grass
        [12, 5], //speeder
    ];

setInterval(function () {
    id("FPS").innerHTML = fps + " FPS";
    fps = 0;
}, 1000);
var audio = {
    jump: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/jump.mp3"),
    bounce1: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/bounce1.mp3"),
    bounce2: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/bounce2.mp3"),
    bounce3: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/bounce3.mp3"),
    bounce4: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/bounce4.mp3"),
    speed1: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/speed1.mp3"),
    speed2: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/speed2.mp3"),
    dash: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/dash.mp3"),
    walking: new Audio("https://saantonandre.github.io/PixelSamurai/soundFxs/walking.mp3"),
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
audio.dash.volume = 0.5;
audio.walking.volume = 1;
//environment
var player = {
    x: 2 * ratio,
    y: 2 * ratio,
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
    speed: 0.1 * ratio,
    precision: 100,
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
            audio.jump.playy();
            player.grounded = false;
            player.dashCd = false;
            player.yVel = -0.27 * ratio;
            var dir = 0;
            if (player.xVel !== 0) {
                dir = player.left ? 2 : 1;
            }
            visualFxs.push(new JumpFx(player.x / ratio, player.y / ratio, dir));

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
            audio.dash.playy();
            player.dashCd = true;
            player.dash = true;
            player.dashIn = player.x / ratio;
        }

    },
    respawnEvent: function () {
        this.y = 1 * ratio;
        this.yVel = 0;
        this.xVel = 0;
        this.yVelExt = 0;
        this.xVelExt = 0;
        this.left = false;

        if (typeof spawnPoint !== "undefined") {
            this.x = spawnPoint.x * ratio;
            this.y = spawnPoint.y * ratio;
            mapX = 0;
            mapY = 0;
        } else {
            mapX = 0;
            mapY = 0;
            this.x = 3 * ratio;
            this.y = 3 * ratio;
        }
    }
};

if (typeof spawnPoint !== "undefined") {
    // player.x=spawnPoint.x*ratio;
    // player.y=spawnPoint.y*ratio;
    mapX = -spawnPoint.x * ratio + player.x;
}
var shake = 0;
var shakeArr = [-2, +5, -5, +2];

var monsters = [];
var series = 0; //a unique identificative number for each monster
class Monster {
    constructor(x, y) {
        this.serial = series++;
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
        this.maxHp = this.hp;
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
        this.jump = function () {
            if (this.grounded) {
                this.grounded = false;
                this.yVel = -0.18 * ratio;
                let dir = 0;
                if (this.xVel !== 0) {
                    dir = this.left ? 2 : 1;
                }
                visualFxs.push(new JumpFx(this.x / ratio, this.y / ratio, dir));

            }
        };
        //setTimeout(randomMovement, 1000, this.serial);

    }
    move(arg) {
        leftRightMovement(arg);
    };
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
            btRight: {
                x: monst.x / ratio + monst.w / ratio - 0.2,
                y: monst.y / ratio + monst.h / ratio + 1.5
            },
            left: {
                x: monst.x / ratio - 0.5,
                y: monst.y / ratio + monst.h / ratio / 2
            }, // provisional
            right: {
                x: monst.x / ratio + monst.w / ratio + 0.5,
                y: monst.y / ratio + monst.h / ratio / 2
            } // provisional
        }
        c.fillStyle = "red";
        c.fillRect(points.upLeft.x * ratio + mapX, points.upLeft.y * ratio + mapY, 4, 4);
        c.fillRect(points.left.x * ratio + mapX, points.left.y * ratio + mapY, 4, 4);
        c.fillRect(points.right.x * ratio + mapX, points.right.y * ratio + mapY, 4, 4);
        c.fillRect(points.btLeft.x * ratio + mapX, points.btLeft.y * ratio + mapY, 4, 4);
        c.fillRect(points.btRight.x * ratio + mapX, points.btRight.y * ratio + mapY, 4, 4);
        c.fillRect(points.upRight.x * ratio + mapX, points.upRight.y * ratio + mapY, 4, 4);
        let cols = {
            upLeft: false,
            upRight: false,
            btLeft: false,
            btRight: false,
            left: false,
            right: false
        }
        var bottomLeftCol = monst.x;
        var bottomRightColX = monst.x;
        for (j = 0; j < map.length; j++) {
            if (pointSquareCol(points.btLeft, map[j])) {
                cols.btLeft = true;
            }
            if (pointSquareCol(points.left, map[j])) {
                cols.left = true;
            }
            if (pointSquareCol(points.btRight, map[j])) {
                cols.btRight = true;
            }
            if (pointSquareCol(points.right, map[j])) {
                cols.right = true;
            }
            if (pointSquareCol(points.upRight, map[j])) {
                cols.upRight = true;
            }
            if (pointSquareCol(points.upLeft, map[j])) {
                cols.upLeft = true;
            }
        };
        console.log(cols);
        let dir = monst.left ? 0 : 1;
        if (monst.left) {
            if ((cols.left && cols.upLeft) || !cols.btLeft) {
                dir = 1;
            } else if (cols.left && !cols.upLeft) {
                monsters[targetMonster].jump();
            }

        } else {
            if ((cols.Right && cols.upRight) || !cols.btRight) {
                dir = 0;
            } else if (cols.right && !cols.upRight) {
                monsters[targetMonster].jump();
            }
        }
        switch (dir) {
            case 0:
                monsters[targetMonster].left = true;
                if (!monsters[targetMonster].col.L) {
                    monsters[targetMonster].L = true;
                    monsters[targetMonster].R = false;
                }
                break;
            case 1:
                monsters[targetMonster].left = false;
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
    }
}

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
        if (collided(player.hitbox, bear.atkHitbox)) {
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
            c.drawImage(m.sheet, m.actionX[m.action][m.frame] + 32, m.actionY[m.action][m.frame], m.sprite.w / 2, m.sprite.h, m.x + m.w + mapX, m.y + mapY, m.w / 2, m.h);
        } else if (m.action == 7) {
            c.drawImage(m.sheet, m.actionX[m.action][m.frame] - 16, m.actionY[m.action][m.frame], m.sprite.w / 2, m.sprite.h, m.x - m.w / 2 + mapX, m.y + mapY, m.w / 2, m.h);
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

function create(type, x, y) {
    switch (type) {
        case "Slime":
            //console.log("creating a Slime");
            monsters.push(new Slime(x, y));
            break;
        case "Lizard":
            //console.log("creating a Lizard");
            monsters.push(new Lizard(x, y));
            break;
        case "Zombie":
            monsters.push(new Zombie(x, y));
            //console.log("creating a Zombie");
            break;
        case "Dummy":
            monsters.push(new Dummy(x, y));
            break;
        case "Superzombie":
            monsters.push(new Superzombie(x, y));
            //console.log("creating a Superzombie");
            break;
        case "Bear":
            monsters.push(new Bear(x, y));
            //console.log("creating a Superzombie");
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
    y: [[64, 80, 96, 112], [64, 80, 96, 112], [64, 80, 96, 112]],
    w: [16, 16, 32],
    h: [16, 16, 16],
};
var jmpSprites = {
    x: [[0, 0, 0, 0, 0], [16, 16, 16, 16, 16], [32, 32, 32, 32, 32]],
    y: [[128, 144, 160, 176, 192], [128, 144, 160, 176, 192], [128, 144, 160, 176, 192]],
    w: [16, 16, 16],
    h: [16, 16, 16],
};
var visualFxs = [];
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
        this.slowness = 4;
        this.frame = 0;
        this.type = "jump";
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
        this.rotation = 0;
        this.slowness = 5;
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
/*
visualFxs.push(new Grass(3, 2));
visualFxs.push(new Grass(7, 1));
visualFxs.push(new Grass(2, 2));
visualFxs.push(new Grass(5, 6));
visualFxs.push(new Grass(8, 4));
create("Bear", 4, 1);
create("Slime", 5, 0);
create("Dummy", 8, 4);
create("Dummy", 7, 1);
create("Dummy", 8, 1);
*/

if (typeof imported !== "undefined") {
    imported();
}

function drawFxs(fx) {
    //animation computing
    switch (fx.type) {
        case "cloud":
            var spritePos = cloudSprites;
            if (fx.x < mapX - 30 * ratio) {
                fx.x = mapX + 30 * ratio;
            }

            break;
        case "dmg":
            var spritePos = dmgSprites;
            break;
        case "grass":
            var spritePos = grassSprite;
            break;
        case "jump":
            var spritePos = jmpSprites;
            break;
    }
    var fxX = fx.x + mapX;
    var fxY = fx.y + mapY;
    var fxW = spritePos.w[fx.sprite] / tileSize * ratio;
    var fxH = spritePos.h[fx.sprite] / tileSize * ratio;
    if (fx.frameCounter !== undefined) {
        fx.frameCounter++;
        if (fx.frameCounter > fx.slowness) {
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

    //c.translate(fxX+fxW/2, fxY+fxH/2);
    if (fx.rotation > 0) {
        fxY -= fxH / 2;
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
            spritePos.x[fx.sprite][fx.frame],
            spritePos.y[fx.sprite][fx.frame],
            spritePos.w[fx.sprite],
            spritePos.h[fx.sprite],
            fxX,
            fxY,
            fxW,
            fxH);
    }
    //c.translate(-(fxX+fxW/2), -(fxY+fxH/2));
}

var specialTiles = [];
class Bouncy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
        this.sheet = id("sheet");
        this.sprite = [[11, 4], [11, 5], [11, 6], [11, 7]];
        this.repeat = false;
        this.running = false;
        this.frameCounter = 0;
        this.slowness = 3;
        this.frame = 0;
        this.type = "bouncy";
    }
}
class Speeder {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 1;
        this.sheet = id("sheet");
        this.sprite = [[12, 5], [12, 6], [12, 7], [12, 8]];
        this.repeat = true;
        this.running = true;
        this.frameCounter = 0;
        this.slowness = 3;
        this.frame = 0;
        this.type = "speeder";
    }
}

function renderSpecialTiles() {
    for (i = 0; i < specialTiles.length; i++) {
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
        let collision = colCheck(player, specialTiles[i]);
        if (collision !== null) {
            if (specialTiles[i].type === "bouncy") {
                var bouncynessX = 0.3;
                var bouncynessY = 0.3;
                var bounceOrNot = player.dash ? 0.35 * ratio : 0;
                player.xVel = 0;
                player.yVel = 0;
            }
            specialTiles[i].running = true;
            var dir = player.left ? 1 : -1;
            switch (collision) {

                case "b":
                    if (specialTiles[i].type === "bouncy") {
                        player.grounded = false;
                        player.yVel = -bouncynessY * ratio;
                        player.dash = false;
                        player.dashCd = false;
                        audio.bounce1.playy()
                    } else if (specialTiles[i].type === "speeder") {
                        audio.speed1.playy();
                        player.xVelExt += 0.07 * ratio;
                        player.grounded = true;
                    }
                    break;
                case "l":
                    if (specialTiles[i].type === "bouncy") {
                            audio.bounce2.playy()
                        player.grounded = false;
                        player.dash = false;
                        player.dashCd = false;
                        player.xVelExt = bounceOrNot;
                        player.yVel = -bouncynessY * ratio;
                    }
                    break;
                case "r":
                    if (specialTiles[i].type === "bouncy") {
                        audio.bounce3.playy()
                        player.grounded = false;
                        player.dash = false;
                        player.dashCd = false;
                        player.xVelExt = -bounceOrNot;
                        player.yVel = -bouncynessY * ratio;
                        console.log(player)
                    }
                    break;
                case "t":
                    if (specialTiles[i].type === "bouncy") {
                        audio.bounce1.playy()
                        if (player.yVel < 0) {
                            player.yVel = 0;
                        }
                    }
                    break;
            }
        }
        c.drawImage(
            specialTiles[i].sheet,
            specialTiles[i].sprite[specialTiles[i].frame][0] * 16,
            specialTiles[i].sprite[specialTiles[i].frame][1] * 16,
            16,
            16,
            specialTiles[i].x * ratio + mapX,
            specialTiles[i].y * ratio + mapY,
            specialTiles[i].w * ratio,
            specialTiles[i].h * ratio);
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
            monsters[i].x + mapX + monsters[i].w / 2 - (ratio / 2),
            monsters[i].y + mapY - 2 / 16 * ratio - (ratio / tileSize),
            ratio,
            2 / 16 * ratio
        )
        c.drawImage(
            id("hp-bar"),
            0,
            2,
            barW,
            2,
            monsters[i].x + mapX + monsters[i].w / 2 - (ratio / 2),
            monsters[i].y + mapY - 2 / 16 * ratio - (ratio / tileSize),
            ratio * hpRatio,
            2 / 16 * ratio
        )
    }
}
//document.onclick=()=>alert(monsters[0].x+" "+monsters[0].y)
function renderTexts() {
    var removeList = [];
    c.textAlign = "center";
    c.font = fontSize + " 'Press Start 2P'";
    for (i = 0; i < dmgTexts.length; i++) {
        c.font = Math.round(dmgTexts[i].size) + "px" + " 'Press Start 2P'";
        dmgTexts[i].size /= 1.01;
        c.fillStyle = "black";
        c.fillText(dmgTexts[i].text, dmgTexts[i].x + mapX + Math.round(textSize / 10), dmgTexts[i].y + 10 + Math.round(dmgTexts[i].size / 10) + mapY);
        c.fillStyle = dmgTexts[i].color;
        c.fillText(dmgTexts[i].text, dmgTexts[i].x + mapX, dmgTexts[i].y + 10 + mapY);
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

function collided(square1, square2) {
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

function pointSquareCol(point, square) {
    if (point.x > square.x && point.x < square.x + square.w) {
        if (point.y > square.y && point.y < square.y + square.h) {
            return true;
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
    if (shake) {
        shake--;
        mapY += shakeArr[shake];
    }
    paused = 0;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "#0099dd";
    c.fillRect(0, 0, canvas.width, canvas.height);
    //calculate character
    //draw environment
    moveCamera();
    calculateCharacter(player);
    checkCollisions();
    for (i = 0; i < monsters.length; i++) {
        monsters[i].frameCounter++;
        calculateMonsters(monsters[i]);
    }

    drawEnvironment();
    renderSpecialTiles();
    adjustCollided(player);
    //draw character
    for (i = monsters.length - 1; i >= 0; i--) {
        drawMonsters(monsters[i]);
    }
    drawCharacter(player);
    for (i = visualFxs.length - 1; i >= 0; i--) {
        drawFxs(visualFxs[i]);
    }
    renderHpBars();
    renderTexts();
    if (darken.go) {
        c.globalAlpha = darken.alpha / 1.5;
        c.fillStyle = "#000000";
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.globalAlpha = 1;
        if (darken.alpha < 1) {
            darken.alpha += 0.001;
        }
    }
    requestAnimationFrame(loop)
}
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MAIN LOOP //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var watchDown = false;

function moveCamera() {
    /*
    mapX=-player.x+2*ratio;
    mapY=-player.y+3*ratio;
    */
    let cameraDir = player.left ? tilesWidth / 2 : tilesWidth / 6;
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
    /*
    let cameraDir = player.left ? 6 : 2;
    if (mapX < -player.x + cameraDir * ratio) {
        // means camera moves forward
        mapX += (-player.x + cameraDir * ratio - mapX) / 6;
    } else if (mapX > -player.x + cameraDir * ratio) {
        // means camera moves backward
        mapX += (-player.x + cameraDir * ratio - mapX) / 6;
    }
    if (mapY < -player.y + 2 * ratio) {
        // means camera moves downward
        mapY += (-player.y + 2 * ratio - mapY) / 6;
    } else if (mapY > -player.y + 4 * ratio) {
        // means camera moves upward
        mapY += (-player.y + 2 * ratio - mapY) / 6;
    }
    */
}

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
    for (i = 0; i < map.length; i++) {
        colCheck(player, map[i]);
        for (m = 0; m < monsters.length; m++) {
            colCheck(monsters[m], map[i]);
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
    if (p.dash) {
        p.xVel = p.left ? -p.speed * 5 : p.speed * 5;
        p.yVel = 0;
        p.yVelExt = 0;
        p.xVelExt = 0;

        p.attacking(p.hitbox);
        if (Math.abs(p.dashIn - p.x / ratio) > 4) {
            p.dash = false;
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
        p.xVelExt *= 0.98;
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
    //AI
    m.move(m.serial);
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
        m.xVel = -m.speed;
        m.left = true;
    } else if (m.R && !m.col.R && !m.L && !m.hit) {
        m.xVel = m.speed;
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
var darken = {
    go: false,
    alpha: 0
}

function drawEnvironment() {
    for (i = 0; i < 5; i++) {
        c.drawImage(
            bg_2,
            -tilesWidth * ratio + (bg_2.width / tileSize * ratio * i) + mapX / 16,
            tilesHeight / 2 * ratio + mapY / 16,
            bg_2.width / tileSize * ratio,
            bg_2.height / tileSize * ratio
        );
    }
    for (i = 0; i < 5; i++) {
        c.drawImage(
            bg_1,
            -tilesWidth * ratio + (bg_1.width / tileSize * ratio * i) + mapX / 8,
            tilesHeight / 2 * ratio + mapY / 8,
            bg_1.width / tileSize * ratio,
            bg_1.height / tileSize * ratio
        );
    }
    if (darken.go) {
        c.globalAlpha = darken.alpha;
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.globalAlpha = 1;
    }
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[i].h; j++) {
            for (k = 0; k < map[i].w; k++) {
                //skips out of bounds tiles
                if (map[i].x + k > tilesWidth - mapX / ratio ||
                    map[i].x + k < -tilesWidth - mapX / ratio) {
                    continue;
                }
                if (map[i].y + j > tilesHeight - mapY / ratio ||
                    map[i].y + j < -tilesHeight - mapY / ratio) {
                    continue;
                }
                //c.fillRect((map[i].x + k) * (ratio)+mapX, (map[i].y + j) * (ratio), ratio, ratio);
                c.drawImage(player.sheet, tiles[map[i].type][0] * 16, tiles[map[i].type][1] * 16, 16, 16, (map[i].x + k) * ratio + mapX, (map[i].y + j) * ratio + mapY, ratio, ratio);
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
    if (p.xVel !== 0 && p.grounded && !(p.attack || p.dash)) {
        audio.walking.play();
    } else {
        audio.walking.pause();
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
            p.attack = false
        }
    }
    //draw on canvas
    if (p.dash) {
        c.globalCompositeOperation = "difference";
        c.globalAlpha = 0.4;
        c.drawImage(p.sheet, p.actionX[p.action][0], p.actionY[p.action][0], p.sprite.w, p.sprite.h, p.x + mapX - p.xVel * 2, p.y + mapY, p.w, p.h);
        c.globalAlpha = 0.6;
        c.drawImage(p.sheet, p.actionX[p.action][0], p.actionY[p.action][0], p.sprite.w, p.sprite.h, p.x + mapX - p.xVel, p.y + mapY, p.w, p.h);
        c.globalAlpha = 0.8;
        c.drawImage(p.sheet, p.actionX[p.action][0], p.actionY[p.action][0], p.sprite.w, p.sprite.h, p.x + mapX, p.y + mapY, p.w, p.h);
        c.globalAlpha = 1;
        c.globalCompositeOperation = "source-over";
    } else
        c.drawImage(p.sheet, p.actionX[p.action][frame], p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x + mapX, p.y + mapY, p.w, p.h);
    //the attack animation takes up 2 tiles in width, so I decided to print the other map separately
    if (p.attack) {
        if (p.action == 6) {
            c.drawImage(p.sheet, p.actionX[p.action][frame] + 16, p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x + mapX + p.w, p.y + mapY, p.w, p.h);
        } else if (p.action == 7) {
            c.drawImage(p.sheet, p.actionX[p.action][frame] - 16, p.actionY[p.action][frame], p.sprite.w, p.sprite.h, p.x + mapX - p.w, p.y + mapY, p.w, p.h);
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
    c.drawImage(m.sheet, m.actionX[m.action][m.frame], m.actionY[m.action][m.frame], m.sprite.w, m.sprite.h, m.x + mapX, m.y + mapY, m.w, m.h);
    if (m.attack) {
        m.attackSprite(m);
    }
}



//collision detector
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var offFocus = mapX / ratio;
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
var touchDevice = false;
//Mouse controls
window.onclick = function () {
    if (!touchDevice) {
        player.attackEvent();
    }
}
window.oncontextmenu = function () {
    return false;
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
        case 83: //down key down
            watchDown = true;
            break;
        case 70: //attack key down
            player.attackEvent();
            break;
        case 71: //g key down
            //console.log(player);
            darken.go = true;
            darken.alpha = 0.0;
            break;
        case 72: //h key down
            //console.log(monsters[0].atkHitbox, player.hitbox);
            darken.go = false;
            darken.alpha = 0.0;
            break;
        case 87: //jump key down
            player.jump();
            break;
        case 49: // 1
            create("Slime", 5 - mapX / ratio, -mapY / ratio);
            break;
        case 50: // 2
            create("Lizard", 5 - mapX / ratio, -mapY / ratio);
            break;
        case 51: // 3
            create("Zombie", 5 - mapX / ratio, -mapY / ratio);
            break;
        case 52: // 4
            create("Superzombie", 5 - mapX / ratio, -mapY / ratio);
            break;
        case 53: // 5
            create("Bear", 5 - mapX / ratio, -mapY / ratio);
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
        case 83: //down key down
            watchDown = false;
            break;
    }
});


// TOUCH CONTROLS START

function showControls() {
    id("arrowCont").style.display = "block";
}
window.addEventListener("touchstart", function () {
    touchDevice = true;
    showControls()
})

function showcontrols() {
    id("arrowCont").style.display = "block";
}
id("left").addEventListener("touchstart", function () {
    player.L = true;
    id("left").style.transform = "scale(1.5)";
    id("left").style.opacity = "1";
});

id("right").addEventListener("touchstart", function () {
    player.R = true;
    id("right").style.transform = "scale(1.5)";
    id("right").style.opacity = "1";
});
id("left").addEventListener("touchend", function () {
    player.L = false;
    id("left").style.transform = "";
    id("left").style.opacity = "0.5";
});
id("right").addEventListener("touchend", function () {
    player.R = false;
    id("right").style.transform = "";
    id("right").style.opacity = "0.5";
});

id("up").addEventListener("touchstart", function () {
    player.jump();
    id("up").style.transform = "scale(1.5)";
    id("up").style.opacity = "1";
});
id("down").addEventListener("touchstart", function () {
    player.attackEvent();
    id("down").style.transform = "scale(1.5)";
    id("down").style.opacity = "1";
});
id("up").addEventListener("touchend", function () {
    id("up").style.transform = "";
    id("up").style.opacity = "0.5";
});
id("down").addEventListener("touchend", function () {
    id("down").style.transform = "";
    id("down").style.opacity = "0.5";
});
// TOUCH CONTROLS END

if (window.opener) {
    console.log(window.opener.mapCode);
    if (window.opener.mapCode) {
        eval(window.opener.mapCode);
    } else {
        eval(window.opener.map);
    }
}

var mapHeight = 0;

function initializeMap() {
    var spTiles = [];
    for (i = map.length - 1; i >= 0; i--) {
        if (map[i].type === 17 ||
            map[i].type === 18 ||
            map[i].type === 19) {
            spTiles.push(i);
        }
    }
    for (i = 0; i < spTiles.length; i++) {
        for (j = 0; j < map[spTiles[i]].h; j++) {
            for (k = 0; k < map[spTiles[i]].w; k++) {
                switch (map[spTiles[i]].type) {
                    case 17:
                        specialTiles.push(new Bouncy(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 18:
                        visualFxs.push(new Grass(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                    case 19:
                        specialTiles.push(new Speeder(map[spTiles[i]].x + k, map[spTiles[i]].y + j));
                        break;
                }
            }
        }
        map.splice(spTiles[i], 1);
    }
    player.x = spawnPoint.x * ratio;
    player.y = spawnPoint.y * ratio;

    for (i = map.length - 1; i >= 0; i--) {
        if (map[i].y + map[i].h > mapHeight) {
            mapHeight = map[i].y + map[i].h;
        }
    }
}
initializeMap();
window.onload = function () {
    requestAnimationFrame(loop);
}

//starts the program
