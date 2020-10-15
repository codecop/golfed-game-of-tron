var lastKeyEvent = 0;
var ui;
var trail;
var score = 0;
var width = 150;
var tronX = 0;
var tronY = 0;
var threadHandle;

function keyPressed(event) {
    lastKeyEvent = event;
}

function DrawingArea() {
    var c = document.getElementById("gc");
    var graphics = c.getContext('2d');

    this.clear = function(width, height) {
        graphics.fillRect(0, 0, width, height);
    };

    this.putPixel = function(x, y) {
        graphics.clearRect(x, y, 1, 1, 0);
    };
}

function TronTrail(width) {
    var tronTrail = [];

    function asPos(x, y) {
        return width * y + x;
    }

    this.isFree = function(x, y) {
        var tronPos = asPos(x, y);
        return tronTrail[tronPos] === undefined
    };

    this.mark = function(x, y) {
        var tronPos = asPos(x, y);
        tronTrail[tronPos] = 1;
    };
}

function startGame() {
    ui = new DrawingArea();
    trail = new TronTrail(width);

    score = 0;
    tronX = width / 2;
    tronY = width / 2;

    ui.clear(width, width);

    threadHandle = setInterval(advanceGame, 9);
}

function asPos(x, y) {
    return width * y + x;
}

function advanceGame() {
    if (lastKeyEvent) {
        var hitsWall = (tronX <= 0) || (tronX >= width) || (tronY < 0) || (tronY >= width);;
        if (hitsWall) {
            collision();
            return
        }

        switch (lastKeyEvent.which & 3) {
            case 0:
                tronX += 1;
                break;
            case 1:
                tronY -= 1;
                break;
            case 2:
                tronX -= 1;
                break;
            case 3:
                tronY += 1;
                break;
        }


        if (trail.isFree(tronX, tronY)) {
            trail.mark(tronX, tronY);

            drawTron();
            score = score + 1;

        } else {
            collision();
        }
    }
}

function drawTron() {
    ui.putPixel(tronX, tronY);
}

function collision() {
    // We replace the page's content with "game over" and the score.
    document.body.innerHTML = 'game over: ' + score;
    clearInterval(threadHandle);
}

window.onload = startGame;
window.onkeydown = keyPressed;

