window.onload = function () {
    function id(arg) {
        return document.getElementById(arg);
    }
    var canvas = id("canvas");
    var c = canvas.getContext("2d");
    var map = [];
    var hitBoxes = [];
    var cellQuantity = id("mapSize").value;
    var cellSize = 15;
    canvas.width = cellQuantity * cellSize;
    canvas.height = cellQuantity * cellSize;
    id("mapSizeBtn").onclick = function () {
        cellQuantity = id("mapSize").value;
        changeMapSize();
    }
    var hitBoxToggle = false;
    id("toggle").onclick = function () {
        toggleBoxes();
    }
    id("test").onclick = function () {
        window.open("MapTester/index.html");
    }

    function toggleBoxes() {
        if (hitBoxToggle) {
            hitBoxToggle = false;
            id("toggle").innerHTML = "drawing: displayed";
        } else {
            hitBoxToggle = true;
            id("toggle").innerHTML = "drawing: hitboxes";
        }
    }
    var square = {
        x: 0, // xPos of the actual square
        y: 0, // yPos of the actual square
        w: 0, // width of the actual square
        h: 0 // height of the actual square
    };
    var mapSize = id("mapsize");
    var infoDisp = false;
    mapSize
    requestAnimationFrame(loop);
    // MAIN LOOP
    function loop() {

        c.clearRect(0, 0, canvas.width, canvas.height);
        renderGrid();
        renderMap();
        if (mouseDown) {
            renderSquare();
        }
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
    var camera = {
        L: false,
        R: false,
        T: false,
        B: false,
        zoomIn: false,
        zoomOut: false,
        speed: 4
    }
    var sX = 0;
    var sY = 0;
    //Make the DIV element draggagle:
    dragElement(id("cont"));

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(event) {
            event = event || window.event;
            // get the mouse cursor position at startup:
            pos3 = event.clientX;
            pos4 = event.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(event) {
            event = event || window.event;
            event.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    var spawnPoint = {
        x: 0,
        y: 0
    };
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
        mapCode += "]; ";
        mapCode += "spawnPoint = {x : " + spawnPoint.x + ",y : " + spawnPoint.y + "};";
        prompt("Copy this text", mapCode);
    };

    id("import").onclick = function () {
        var x = prompt("Insert map code here", "");
        eval(x);
    }


    function cameraMove() {
        if (camera.L) {
            sX -= camera.speed;
        }
        if (camera.R) {
            sX += camera.speed;
        }
        if (camera.T) {
            sY -= camera.speed;
        }
        if (camera.B) {
            sY += camera.speed;
        }
        if (sX < 0) {
            sX = 0;
        }
        if (sX > canvas.width - window.innerWidth) {
            sX = canvas.width - window.innerWidth;
        }
        if (sY < 0) {
            sY = 0;
        }
        if (sY > canvas.height - window.innerHeight) {
            sY = canvas.height - window.innerHeight;
        }
        if (camera.zoomOut) {
            id("zoomer").value--;
            zoomChange();
        } else if (camera.zoomIn) {
            id("zoomer").value++;
            zoomChange();
        }
        scroll(sX, sY);
    }

    function renderMap() {
        if (camera.L || camera.R || camera.T || camera.B || camera.zoomIn || camera.zoomOut) {
            cameraMove();
        }
        c.globalAlpha = 0.6;
        for (var i = 0; i < map.length; i++) {
            c.fillStyle = "#00ff00";
            c.beginPath()
            c.fillRect(map[i].x * cellSize, map[i].y * cellSize, map[i].w * cellSize, map[i].h * cellSize);
            c.closePath();
            c.stroke();
        }
        c.globalAlpha = 1;
        // these will get shown above visual boxes

        for (var i = 0; i < hitBoxes.length; i++) {
            c.fillStyle = "#000000";
            c.beginPath()
            c.fillRect(hitBoxes[i].x * cellSize, hitBoxes[i].y * cellSize, hitBoxes[i].w * cellSize, hitBoxes[i].h * cellSize);
            c.closePath();
            c.stroke();
        }

        //draws spawnpoint
        c.fillStyle = "#0000cc";
        c.beginPath()
        c.fillRect(spawnPoint.x * cellSize, spawnPoint.y * cellSize, 1 * cellSize, 1 * cellSize);
        c.closePath();
        c.stroke();
    }

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



    id("spawn").onclick = function () {
        id("spawn").style.color = "#0000cc";
        id("canvas").style.cursor = "pointer";
        canvas.onclick = function hey() {
            spawnPoint.x = square.x;
            spawnPoint.y = square.y;
            id("spawn").style.color = "#000000";
            id("canvas").style.cursor = "crosshair";
            canvas.onclick = null;
        }
    }




    function infoText() {
        var sqx = square.x / cellSize;
        var sqy = square.y / cellSize;
        if (sqx > -1 && sqx < 1) {
            sqx = 0;
        }
        if (sqy > -1 && sqy < 1) {
            sqy = 0;
        }
        id("info").innerHTML = "x: " + sqx + ", y: " + sqy + "<br> w: " + square.w / cellSize + ", h: " + square.h / cellSize;
    }


    // the square you're making on click (hold)
    var mouseDown = false;
    canvas.addEventListener("mousedown", function (event) {
        var xx = window.pageXOffset;
        var yy = window.pageYOffset;

        // info div
        id("info").style.display = "block";
        id("info").style.left = event.clientX + 30 + "px";
        id("info").style.top = event.clientY - 30 + "px";
        infoText();

        if (!mouseDown) {
            square.x = round(event.clientX + xx) * cellSize;
            square.y = round(event.clientY + yy) * cellSize;
            square.w = 0;
            square.h = 0;
            mouseDown = true;
        }
    })

    canvas.addEventListener("mousemove", function (event) {
        var xx = window.pageXOffset;
        var yy = window.pageYOffset;
        if (mouseDown) {
            id("info").style.display = "block";
            id("info").style.left = event.clientX + 30 + "px";
            id("info").style.top = event.clientY - 30 + "px";
            infoText();
        }

        if (mouseDown) {
            square.w = round(event.clientX + xx - square.x) * cellSize;
            square.h = round(event.clientY + yy - square.y) * cellSize;
        }
    });


    canvas.addEventListener("mouseup", function () {

        id("info").style.display = "none";
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

    id("zoomer").addEventListener("change", zoomChange);

    function zoomChange() {
        cellSize = parseInt(id("zoomer").value);
        changeMapSize();
    }

    function changeMapSize() {
        canvas.width = cellQuantity * cellSize;
        canvas.height = cellQuantity * cellSize;
    }

    function roundSquare() {

        square.x = round(square.x);
        square.y = round(square.y);
        square.w = round(square.w);
        square.h = round(square.h);
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
        if (rounded / cellSize > 0 && rounded / cellSize < 1) {
            return 0;
        } else {
            return rounded / cellSize;
        }
    }

    document.addEventListener("contextmenu", function (event) {

        var xx = window.pageXOffset;
        var yy = window.pageYOffset;
        event.preventDefault();
        var x = event.clientX + xx;
        var y = event.clientY + yy;
        removeElements(map, x, y);
        removeElements(hitBoxes, x, y);
    });

    function removeElements(arg, x, y) {
        var removeList = [];
        for (i = 0; i < arg.length; i++) {
            if (x > arg[i].x * cellSize && x < arg[i].x * cellSize + arg[i].w * cellSize) {
                if (y > arg[i].y * cellSize && y < arg[i].y * cellSize + arg[i].h * cellSize) {
                    removeList.push(i);
                }
            }
        }
        removeList.sort(function (a, b) {
            return b - a;
        });
        for (i = 0; i < removeList.length; i++) {
            arg.splice(removeList[i], 1);
        }
    }




    window.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 65: //left key down
                camera.L = true;
                break;
            case 68: //right key down
                camera.R = true;
                break;
            case 87: //top key down
                camera.T = true;
                break;
            case 83: //bot key down
                camera.B = true;
                break;
            case 69: //bot key up
                camera.zoomIn = true;
                break;
            case 81: //bot key up
                camera.zoomOut = true;
                break;
        }
    });
    window.addEventListener("keyup", function (event) {
        var key = event.keyCode;
        switch (key) {
            case 65: //left key up
                camera.L = false;
                break;
            case 68: //right key up
                camera.R = false;
                break;
            case 87: //top key up
                camera.T = false;
                break;
            case 83: //bot key up
                camera.B = false;
                break;
            case 69: //bot key up
                camera.zoomIn = false;
                break;
            case 81: //bot key up
                camera.zoomOut = false;
                break;
            case 82:
                toggleBoxes();
                break;
        }
    });
};
