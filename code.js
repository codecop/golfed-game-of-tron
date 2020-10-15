var lastKeyEvent = 0;
var c = document.getElementById("gc");

var graphics;
var grid = {};
var score = 0;
var width = 150;
var tronPos;
var threadHandle;

function keyPressed(event) {
    lastKeyEvent = event;
}

function startGame() {
    graphics = c.getContext('2d');
    grid = {};
    score = 0;
    tronPos = width * (width/2) + (width/2); // Tron's position, and is set to 11325 (11325=150*75+75=center of the grid).
    graphics.fillRect(0, 0, width, tronPos);
    threadHandle = setInterval(advanceGame, 9);
}

function advanceGame() {
    if (lastKeyEvent) {
        var x = tronPos % width;
        var y = tronPos / width;
        if (x <= 0) {
            // left wall (and right wall)
            collision();
            return
        }
        if (x < 0) {
            // upper wall
            collision();
            return
        }
        if (y >= width) {
            // lower wall
            collision();
            return
        }

        tronPos += [1, -width, -1, width][lastKeyEvent.which & 3];
        if ((grid[tronPos] ^= 1)) {
            // Updates x based on the value of e .

            var x = tronPos % width;
            var y = tronPos / width;

            // draw a white pixel at the Tron's position
            graphics.clearRect(x, y, 1, 1, score++);

            return;
        }

        collision();
    }
}

function collision() {
    // We replace the page's content with "game over" and the score.
    document.body.innerHTML = 'game over: ' + score;
    clearInterval(threadHandle);
}

window.onload = startGame;
window.onkeydown = keyPressed;

