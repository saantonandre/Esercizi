var mobile = confirm("\"Ok\" if you are on mobile ");
if (mobile) {
    window.onload = function () {
        var canvas = document.getElementById("canvas");
        var c = canvas.getContext("2d");
        var controls = document.getElementById("div2");
        controls.innerHTML = "<div id=\"leftKey\"></div><div id=\"rightKey\"></div><div id=\"upKey\"></div><div id=\"shoot\"></div>";
        var leftKey = document.getElementById("leftKey");
        var rightKey = document.getElementById("rightKey");
        var upKey = document.getElementById("upKey");
        var shootKey = document.getElementById("shoot");
        var g = 0;
        var yd = 0;
        var d = 3;
        var x = 100;
        var y = 280;
        var gunX = 8;
        var isJumping = false;
        var bt = x;
        var badx = 400;
        var bul = [];
        var direction = [];


        class player {
            constructor(x, y, gunX) {
                //cap
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + 0, y + 0 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + 0, y + 10 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + 10, y + 10 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + -10, y + 10 - 60, 10, 10);
                //head
                this.fillStyle = c.fillStyle = "#ffcdd2";
                this.fillRect = c.fillRect(x + 0, y + 20 - 60, 10, 10);
                //shirt
                this.fillStyle = c.fillStyle = "#b39ddb";
                this.fillRect = c.fillRect(x + 0, y + 30 - 60, 10, 10);
                //gun
                this.fillStyle = c.fillStyle = "#555";
                this.fillRect = c.fillRect(x + gunX, y + 31 - 60, 12, 6);
                //pants
                this.fillStyle = c.fillStyle = "#ff9900";
                this.fillRect = c.fillRect(x + 0, y + 40 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff9900";
                this.fillRect = c.fillRect(x + 0, y + 50 - 60, 10, 10);
                this.stroke = c.stroke();
            }
        }

        class bg {
            constructor() {
                //sky
                this.fillStyle = c.fillStyle = "#3ab57a";
                this.fillRect = c.fillRect(0, 0, 600, 300);
                //rocks
                this.fillStyle = c.fillStyle = "#a37630";
                this.fillRect = c.fillRect(0, 100, 600, 200);
                this.fillStyle = c.fillStyle = "#b27418";
                this.fillRect = c.fillRect(0, 125, 600, 175);
                //sand
                this.fillStyle = c.fillStyle = "#ccdc39";
                this.fillRect = c.fillRect(0, 150, 600, 150);
                //sun
                this.fillStyle = c.fillStyle = "#eeff00";
                this.fillRect = c.fillRect(130, 0, 40, 40);
                //cactus
                this.fillStyle = c.fillStyle = "#2ba818";
                this.fillRect = c.fillRect(130, 170, 10, 60);
                this.fillRect = c.fillRect(140, 190, 20, 10);
                this.fillRect = c.fillRect(150, 180, 10, 10);

                this.fillRect = c.fillRect(330, 170, 10, 60);
                this.fillRect = c.fillRect(310, 190, 20, 10);
                this.fillRect = c.fillRect(310, 180, 10, 10);


                this.fillRect = c.fillRect(460, 170, 10, 60);
                this.fillRect = c.fillRect(470, 190, 20, 10);
                this.fillRect = c.fillRect(480, 180, 10, 10);
                this.fillRect = c.fillRect(440, 190, 20, 10);
                this.fillRect = c.fillRect(440, 200, 10, 10);

                this.fillRect = c.fillRect(520, 140, 10, 40);

                this.fillRect = c.fillRect(80, 140, 10, 50);
                this.stroke = c.stroke();
            }
        }

        class bullet {
            constructor(x) {
                this.fillStyle = c.fillStyle = "yellow";
                this.fillRect = c.fillRect(x, 262, 5, 5);
                this.stroke = c.stroke();
            }
        }

        class bad {
            constructor(x) {
                this.fillStyle = c.fillStyle = "black";
                this.fillRect = c.fillRect(x, 220, 20, 60);
                this.stroke = c.stroke();
            }
        }

        function shoot() {
            if (!isJumping) {
                this.x = x;
                this.to = gunX == 8; //bool
                if (this.to) {
                    this.dir = 6;
                } else {
                    this.dir = -6;
                }
                bul.push(this.x);
                direction.push(this.dir);
            }
        }

        function shootK() {
            shoot();
        }
        var whichOne;

        var mouseDown = 0;
        document.body.ontouchstart = function () {
            ++mouseDown;
        }
        document.body.ontouchend = function () {
            --mouseDown;
        }
        requestAnimationFrame(loop);

        leftKey.addEventListener("touchstart", function () {
            whichOne = "L"
        });
        rightKey.addEventListener("touchstart", function () {
            whichOne = "R"
        });
        upKey.addEventListener("touchstart", function () {
            whichOne = "U"
        });
        shootKey.addEventListener("touchstart", function () {
            whichOne = "S"
        });

        function loop() {
            c.clearRect(0, 0, 300, 300);

            //render
            var big = new bg();
            if (badx > x)
                badx -= 0.3;
            else
                badx += 0.3;

            for (i = 0; i < bul.length; i++) {
                var obj = new bullet(bul[i] += direction[i]);
                if (bul[i] > badx && bul[i] < badx + 40 && direction[i] > 0)
                    badx += 0.1;
                if (bul[i] > badx && bul[i] < badx + 40 && direction[i] < 0)
                    badx -= 0.1;
            }
            if (mouseDown) {
                switch (whichOne) {
                    case "L":
                        x -= d;
                        gunX = -8;
                        break;
                    case "R":
                        x += d;
                        gunX = 8;
                        break;
                    case "U":
                        if (!isJumping)
                            isJumping = true;
                        break;
                    case "S":
                        shootK();
                        break;
                }
            }

            var boy = new player(x, y, gunX);

            if (isJumping) {
                yd = 10;
            }

            var cattivo = new bad(badx);

            y += g;
            y -= yd;
            if (isJumping)
                g++;
            else g = 0;
            if (y > 280) {
                yd = 0;
                y = 280;
                isJumping = false;
            }


            requestAnimationFrame(loop);
        }

    }
} else {
    window.onload = function () {
        var canvas = document.getElementById("canvas");
        var c = canvas.getContext("2d");

        var g = 0;
        var yd = 0;
        var d = 3;
        var x = 100;
        var y = 280;
        var gunX = 8;
        var isJumping = false;
        var bt = x;
        var badx = 400;
        var bul = [];
        var direction = [];


        class player {
            constructor(x, y, gunX) {
                //cap
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + 0, y + 0 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + 0, y + 10 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + 10, y + 10 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff5622";
                this.fillRect = c.fillRect(x + -10, y + 10 - 60, 10, 10);
                //head
                this.fillStyle = c.fillStyle = "#ffcdd2";
                this.fillRect = c.fillRect(x + 0, y + 20 - 60, 10, 10);
                //shirt
                this.fillStyle = c.fillStyle = "#b39ddb";
                this.fillRect = c.fillRect(x + 0, y + 30 - 60, 10, 10);
                //gun
                this.fillStyle = c.fillStyle = "#555";
                this.fillRect = c.fillRect(x + gunX, y + 31 - 60, 12, 6);
                //pants
                this.fillStyle = c.fillStyle = "#ff9900";
                this.fillRect = c.fillRect(x + 0, y + 40 - 60, 10, 10);
                this.fillStyle = c.fillStyle = "#ff9900";
                this.fillRect = c.fillRect(x + 0, y + 50 - 60, 10, 10);
                this.stroke = c.stroke();
            }
        }

        class bg {
            constructor() {
                //sky
                this.fillStyle = c.fillStyle = "#3ab57a";
                this.fillRect = c.fillRect(0, 0, 600, 300);
                //rocks
                this.fillStyle = c.fillStyle = "#c2780a";
                this.fillRect = c.fillRect(0, 100, 600, 200);
                //sand
                this.fillStyle = c.fillStyle = "#ccdc39";
                this.fillRect = c.fillRect(0, 150, 600, 150);
                //sun
                this.fillStyle = c.fillStyle = "#eeff00";
                this.fillRect = c.fillRect(130, 0, 40, 40);
                //cactus
                this.fillStyle = c.fillStyle = "#2ba818";
                this.fillRect = c.fillRect(130, 170, 10, 60);
                this.fillRect = c.fillRect(140, 190, 20, 10);
                this.fillRect = c.fillRect(150, 180, 10, 10);

                this.fillRect = c.fillRect(330, 170, 10, 60);
                this.fillRect = c.fillRect(310, 190, 20, 10);
                this.fillRect = c.fillRect(310, 180, 10, 10);


                this.fillRect = c.fillRect(460, 170, 10, 60);
                this.fillRect = c.fillRect(470, 190, 20, 10);
                this.fillRect = c.fillRect(480, 180, 10, 10);
                this.fillRect = c.fillRect(440, 190, 20, 10);
                this.fillRect = c.fillRect(440, 200, 10, 10);

                this.fillRect = c.fillRect(520, 140, 10, 40);

                this.fillRect = c.fillRect(80, 140, 10, 50);
                this.stroke = c.stroke();
            }
        }

        class bullet {
            constructor(x) {
                this.fillStyle = c.fillStyle = "yellow";
                this.fillRect = c.fillRect(x, 252, 5, 5);
                this.stroke = c.stroke();
            }
        }

        class bad {
            constructor(x) {
                this.fillStyle = c.fillStyle = "black";
                this.fillRect = c.fillRect(x, 220, 20, 60);
                this.stroke = c.stroke();
            }
        }

        function shoot() {
            if (!isJumping) {
                this.x = x;
                this.to = gunX == 8; //bool
                if (this.to)
                    this.dir = 6;
                else
                    this.dir = -6;
                bul.push(this.x);
                direction.push(this.dir);
            }
        }

        function keyCheck() {
            var KeyID = event.keyCode;
            switch (KeyID) {

                case 65:
                    x -= d;
                    gunX = -8;
                    break;

                case 68:
                    x += d;
                    gunX = 8;
                    break;

                case 87:
                    if (!isJumping)
                        isJumping = true;
                    break;

                case 17:
                    shoot();
                    break;
            }
        }

        requestAnimationFrame(loop);

        function loop() {
            c.clearRect(0, 0, 300, 300);

            //render
            var big = new bg();

            badx -= 0.3;

            for (i = 0; i < bul.length; i++) {
                var obj = new bullet(bul[i] += direction[i]);
                if (bul[i] > badx && bul[i] < badx + 40)
                    badx += 1;
            }


            var boy = new player(x, y, gunX);

            if (isJumping) {
                yd = 10;
            }

            var cattivo = new bad(badx);

            document.onkeydown = keyCheck;

            y += g;
            y -= yd;
            if (isJumping)
                g++;
            else g = 0;
            if (y > 280) {
                yd = 0;
                y = 280;
                isJumping = false;
            }


            requestAnimationFrame(loop);
        }

    }
}
