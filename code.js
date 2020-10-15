var lastKeyEvent = 0;
var c = document.getElementById("gc");

var graphics;
var tronTrail = {};
var score = 0;
var width = 150;
var tronPos;
var threadHandle;

function keyPressed(event) {
    lastKeyEvent = event;
}

function startGame() {
    graphics = c.getContext('2d');
    tronTrail = {};
    score = 0;
    tronPos = asPos(width / 2, width / 2);
    graphics.fillRect(0, 0, width, tronPos);
    threadHandle = setInterval(advanceGame, 9);
}

function asPos(x, y) {
    return width * y + x;
}

function advanceGame() {
    if (lastKeyEvent) {
        var x = tronPos % width;
        var y = Math.floor(tronPos / width);

        var hitsWall = (x <= 0) || (x >= width) || (y < 0) || (y >= width);;
        if (hitsWall) {
            collision();
            return
        }

        switch (lastKeyEvent.which & 3) {
            case 0:
                x += 1;
                break;
            case 1:
                y -= 1;
                break;
            case 2:
                x -= 1;
                break;
            case 3:
                y += 1;
                break;
        }

        tronPos = asPos(x, y);

        if ((tronTrail[tronPos] ^= 1)) {

            drawTron();
            score = score + 1;

        } else {
            collision();
        }
    }
}

function drawTron() {
    var x = tronPos % width;
    var y = tronPos / width;
    graphics.clearRect(x, y, 1, 1, 0); // 0 is ok because only 1 test
}

function collision() {
    // We replace the page's content with "game over" and the score.
    document.body.innerHTML = 'game over: ' + score;
    clearInterval(threadHandle);
}

window.onload = startGame;
window.onkeydown = keyPressed;

