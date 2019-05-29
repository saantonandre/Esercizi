window.onload = function () {
    var l = {
        x: [canvas.width / 2, 0],
        y: [canvas.height / 2, 0],
    };
    document.addEventListener("mousemove", function (e) {
        line.x[1] = e.clientX;
        line.y[1] = e.clientY;
    });
    requestAnimationFrame(loop);

    function loop() {
        line(l.x[0], l.y[0], l.x[1], l.y[1], );
        requestAnimationFrame(loop);
    }

    function line(xs, ys, xe, ye, color) {

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        var difx = xs - xe;
        var dify = ys - ye;
        if (difx < 0) {
            difx = 0 - difx;
        }
        if (dify < 0) {
            dify = 0 - dify;
        }
        if (difx > dify) {
            for (let b = 0; b < difx; b = b + 4) {
                ctx.fillStyle = color;
                ctx.fillRect(b, (0 - (ys / 4 - xe / 4) - (b * ye / 4)) / (ys / 4 - xe / 4), 4, 4);
            }
        } else {
            for (let b = 0; b < dify; b = b + 4) {
                ctx.fillStyle = color;
                ctx.fillRect(((xeb) - (ysxe) - (b * ye)) / ye, b, 4, 4);
            }
        }

    }
}
