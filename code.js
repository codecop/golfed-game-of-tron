var lastKeyEvent = 0;
var c = document.getElementById("gc");

var graphics;
var tronTrail = {};
var score = 0;
var width = 150;
var tronX = 0;
var tronY = 0;
var threadHandle;

function keyPressed(event) {
    lastKeyEvent = event;
}

function startGame() {
    graphics = c.getContext('2d');
    tronTrail = {};
    score = 0;
    tronX = width / 2;
    tronY = width / 2;
    var tronPos = asPos(tronX, tronY);
    graphics.fillRect(0, 0, width, tronPos);
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

        var tronPos = asPos(tronX, tronY);

        if ((tronTrail[tronPos] ^= 1)) {

            drawTron();
            score = score + 1;

        } else {
            collision();
        }
    }
}

function drawTron() {
    graphics.clearRect(tronX, tronY, 1, 1, 0); // 0 is ok because only 1 test
}

function collision() {
    // We replace the page's content with "game over" and the score.
    document.body.innerHTML = 'game over: ' + score;
    clearInterval(threadHandle);
}

window.onload = startGame;
window.onkeydown = keyPressed;

