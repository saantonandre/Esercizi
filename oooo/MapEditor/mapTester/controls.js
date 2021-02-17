var debug = {
    on: true,
    log: function (arg) {
        if (this.on) {
            console.log(arg);
        }
    }
}
// Controls class
class Controls {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.e = false;
        this.lClickDown = false;
        this.rClickDown = false;
        this.test = "test";
        this.currentPos = 0;
        this.lastDir = 0;
        this.initListeners(this);
    }
    // Event Listeners (to change controls' values)
    initListeners(x) {
        /*
        document.oncontextmenu = function () {
            player.onSkate = !player.onSkate;
            return false;
        }
        */
        document.addEventListener("mousedown", function (evt) {
            switch (evt.which) {
                case 1:
                    debug.log("Left MouseDown");
                    x.lClickDown = true;
                    break;
                case 3:
                    debug.log("Right MouseDown");
                    x.rClickDown = true;
                    break;
            }

        })
        document.addEventListener("mouseup", function (evt) {
            switch (evt.which) {
                case 1:
                    debug.log("Left MouseUp");
                    x.lClickDown = true;
                    break;
                case 3:
                    debug.log("Right MouseUp");
                    x.rClickDown = true;
                    break;
            }

        })
        document.addEventListener("keydown", function (evt) {

            switch (evt.keyCode) {
                case 87: //up
                case 32:
                case 38:
                    debug.log("Up key");
                    if (!x.up) {
                        x.up = true;
                        x.lastDir = 1;
                    }
                    break;
                case 83: //down
                case 40: //down
                    debug.log("Down key");
                    if (!x.down) {
                        x.down = true;
                        x.lastDir = 3;
                    }
                    break;
                case 65: //left
                case 37: //left
                    debug.log("Left key");
                    if (!x.left) {
                        x.left = true;
                        x.lastDir = 0;
                    }
                    break;
                case 68: //right
                case 39: //right
                    debug.log("Right key");
                    if (!x.right) {
                        x.right = true;
                        x.lastDir = 2;
                    }
                    break;
                case 69: //e
                    debug.log("E key");
                    if (!x.e) {
                        x.e = true;
                    }
                    break;
            }
        })
        document.addEventListener("keyup", function (evt) {
            switch (evt.keyCode) {
                case 87: //up
                case 32:
                case 38:
                    x.up = false;
                    break;
                case 83: //down
                case 40: //down
                    x.down = false;
                    break;
                case 65: //left
                case 37: //left
                    x.left = false;
                    break;
                case 68: //right
                case 39: //right
                    x.right = false;
                    break;
                case 69: //e
                    x.e = false;
            }
        })

        id("left").addEventListener("touchstart", function () {
            debug.log("Left key");
            if (!x.left) {
                x.left = true;
                x.lastDir = 0;
            }
        });

        id("right").addEventListener("touchstart", function () {
            debug.log("Right key");
            if (!x.right) {
                x.right = true;
                x.lastDir = 2;
            }
        });

        id("up").addEventListener("touchstart", function () {
            debug.log("Up key");
            if (!x.up) {
                x.up = true;
                x.lastDir = 1;
            }
        });
        id("down").addEventListener("touchstart", function () {
            debug.log("E key");
            if (!x.e) {
                x.e = true;
            }
        });
        id("left").addEventListener("touchend", function () {
            x.left = false;
        });
        id("right").addEventListener("touchend", function () {
            x.right = false;
        });
        id("up").addEventListener("touchend", function () {
            x.up = false;
        });
        id("down").addEventListener("touchend", function () {
            x.e = false;
        });
    }
}
var controls = new Controls();
