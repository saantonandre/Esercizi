// TODO
// add slowmo
// add screenshake
// add transition
window.onload = function () {
    initialize();
}
//prepares the game to launch
function initialize() {
    setInterval(fpsCounter, 1000);
    resizeCanvas();
    if (!mapTester) {
        importLevelsArray(levels);
    }
    loop();
}


var meta = new Meta();
var map = new Map();
var player = new Player();

map.cameraFocus = player;

var controls = new Controls();
var cursor = new Cursor();
// Canvas variables
var canvas = id("canvas");
var c = canvas.getContext("2d");
// Resizes the canvas based on the affordable space
function resizeCanvas() {
    canvas.width = meta.tilesWidth * meta.tilesize * meta.ratio;
    canvas.height = meta.tilesHeight * meta.tilesize * meta.ratio;
    canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";
    canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + "px";
    c.imageSmoothingEnabled = false;
}

//Called on an interval, updates the fps counter
function fpsCounter() {
    id("fps").innerHTML = meta.fps;
    meta.fps = 0;
}

// To trigger the screenshakes: screenShake.duration = x;
var screenShake = {
    duration: 0,
    compute: function () {
        if (this.duration > 0) {
            this.duration -= 1 * meta.deltaTime;
            map.x += (Math.random() * 10 - 5) / meta.ratio / meta.tilesize;
            map.y += (Math.random() * 10 - 5) / meta.ratio / meta.tilesize;
        } else {
            this.duration = 0;
        }
    }
}
// To trigger the slowMo: slowMo.duration = x;
var slowMo = {
    duration: 0,
    compute: function () {
        if (this.duration === 1) {
            meta.perfectFrameTime = 1000 / meta.targetFrames;
            this.duration--;
        } else if (this.duration > 1) {
            meta.perfectFrameTime = 1000 / meta.targetFrames * this.duration;
            this.duration--;
        }
    }
}




// Main loop of the game
function loop() {
    //updates fps
    meta.updateDeltaTime();
    meta.fps++;
    //clears the screen
    c.fillStyle = "darkgray"
    c.fillRect(
        0,
        0,
        canvas.width,
        canvas.height)
    //calls the current loop type
    switch (meta.loopType) {
        case 0:
            gameLoop();
            break;
        case 1:
            transitionLoop();
            break;
        case 2:
            menuLoop();
            break;
    }

    cursor.compute();
    cursor.render();
    requestAnimationFrame(loop);
    //updates delta time
}

function gameLoop() {
    //computing
    map.computeCamera();
    map.computeEntities();
    map.computeVfxs();
    screenShake.compute();
    slowMo.compute();
    player.compute();
    //drawing
    map.renderTiles();
    map.renderEntities();
    map.renderVfxs();
    player.render()
}

function transitionLoop() {

}

function menuLoop() {

}


function loadLevel() {
    player.xVel = 0;
    player.yVel = 0;
    player.currentBomb = 0;
    safeEval(map.levels[map.currentLevel])
    initializeMap();
}

//provisional renderer, draws entities as squares
function renderEntity(e) {
    if (isOutOfScreen(e)) {
        return;
    }
    c.strokeStyle = "black";
    c.beginPath();
    c.rect(
        (e.x + map.x) * meta.tilesize * meta.ratio | 0,
        (e.y + map.y) * meta.tilesize * meta.ratio | 0,
        e.w * meta.tilesize * meta.ratio | 0,
        e.h * meta.tilesize * meta.ratio | 0
    );
    c.closePath()
    c.stroke();
}
