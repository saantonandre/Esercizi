window.onload = function () {
    function id(arg) {
        return document.getElementById(arg);
    }
    var canvas = id("canvas");
    var c = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var map = [];
    var hitBoxToggle = false;
    var hitBoxes = [];
    id("toggle").onclick = function () {
        if (hitBoxToggle) {
            hitBoxToggle = false;
            id("toggle").innerHTML = "toggle: hitboxes";
        } else {
            hitBoxToggle = true;
            id("toggle").innerHTML = "toggle: displayed";
        }
    }
    var square = {
        x: 0, // xPos of the actual square
        y: 0, // yPos of the actual square
        w: 0, // width of the actual square
        h: 0 // height of the actual square
    };

    requestAnimationFrame(loop);


    // MAIN LOOP
    function loop() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        renderGrid();
        renderMap();
        renderSquare();
        requestAnimationFrame(loop);
    }

    function renderSquare() {
        if (hitBoxToggle)
            c.strokeStyle = "#ff0000";
        else {
            c.strokeStyle = "#000000";
        }
        c.beginPath()
        c.rect(square.x, square.y, square.w, square.h);
        c.closePath();
        c.stroke();
    }

    function renderMap() {
        for (var i = 0; i < map.length; i++) {
            c.fillStyle = "#000000";
            c.beginPath()
            c.fillRect(map[i].x * cellSize, map[i].y * cellSize, map[i].w * cellSize, map[i].h * cellSize);
            c.closePath();
            c.stroke();
        }
        // these will get shown above visual boxes

        c.globalAlpha = 0.6;
        for (var i = 0; i < hitBoxes.length; i++) {
            c.fillStyle = "#00ff00";
            c.beginPath()
            c.fillRect(hitBoxes[i].x * cellSize, hitBoxes[i].y * cellSize, hitBoxes[i].w * cellSize, hitBoxes[i].h * cellSize);
            c.closePath();
            c.stroke();
        }
        c.globalAlpha = 1;
    }
    var cellSize = 15;

    function renderGrid() {
        c.strokeStyle = "#888888";
        for (var i = 0; i < canvas.width; i += cellSize) {
            c.beginPath()
            c.moveTo(i, 0);
            c.lineTo(i, canvas.height);
            c.closePath();
            c.stroke();
        }
        for (var i = 0; i < canvas.height; i += cellSize) {
            c.beginPath()
            c.moveTo(0, i);
            c.lineTo(canvas.width, i);
            c.closePath();
            c.stroke();
        }
    }
    // the square you're making on click (hold)
    var mouseDown = false;
    canvas.addEventListener("mousedown", function (event) {
        if (!mouseDown) {
            square.x = round(event.clientX) * cellSize;
            square.y = round(event.clientY) * cellSize;
            square.w = 0;
            square.h = 0;
            mouseDown = true;
        }
    })
    canvas.addEventListener("mouseup", function () {
        mouseDown = false;
        roundSquare();
        if (square.w && square.h) {
            if (square.w < 0) {
                square.w *= -1;
                square.x -= square.w;
            }
            if (square.h < 0) {
                square.h *= -1;
                square.y -= square.h;
            }
            if (hitBoxToggle) {
                hitBoxes.push({
                    x: square.x,
                    y: square.y,
                    w: square.w,
                    h: square.h
                });
            } else {
                map.push({
                    x: square.x,
                    y: square.y,
                    w: square.w,
                    h: square.h
                });
            }
        }
    })

    id("exportMap").onclick = function () {
        var mapCode = "";
        mapCode += "map = [";
        for (i = 0; i < map.length; i++) {
            mapCode += "{x : " + map[i].x + ",";
            mapCode += "y : " + map[i].y + ",";
            mapCode += "w : " + map[i].w + ",";
            mapCode += "h : " + map[i].h + "},";
        }
        mapCode += "]; ";
        mapCode += "hitBoxes = [";
        for (i = 0; i < hitBoxes.length; i++) {
            mapCode += "{x : " + hitBoxes[i].x + ",";
            mapCode += "y : " + hitBoxes[i].y + ",";
            mapCode += "w : " + hitBoxes[i].w + ",";
            mapCode += "h : " + hitBoxes[i].h + "},";
        }
        mapCode += "]";
        prompt("Coy this text", mapCode);
    };

    id("import").onclick = function () {
        var x = prompt("Insert map code here", "");
        eval(x);
    }

    function round(arg) {
        var rounded = parseInt(arg);
        var remainder = rounded % cellSize;
        if (remainder !== 0) {
            if (remainder > cellSize / 2)
                rounded = rounded - remainder + cellSize;
            else
                rounded = rounded - remainder;
        }
        return rounded / cellSize;
    }
    id("zoomer").addEventListener("change", function () {
        cellSize = parseInt(zoomer.value);
    })

    function roundSquare() {

        square.x = round(square.x);
        square.y = round(square.y);
        square.w = round(square.w);
        square.h = round(square.h);
    }
    canvas.addEventListener("click", function (event) {});
    canvas.addEventListener("mousemove", function (event) {
        if (mouseDown) {
            square.w = round(event.clientX - square.x) * cellSize;
            square.h = round(event.clientY - square.y) * cellSize;
        }
    });

};
