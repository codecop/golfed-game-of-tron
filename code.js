var lastKeyEvent = 0;
var c = document.getElementById("gc");

var graphics;
var grid = {};
var score = 0;
var width = 150;
var x;
var i;

function keyPressed(event) {
    lastKeyEvent = event;
}

function startGame() {
    graphics = c.getContext('2d');
    grid = {};
    score = 0;
    x = width * 75 + 75; // Tron's position, and is set to 11325 (11325=150*75+75=center of the grid).
    graphics.fillRect(0, 0, width, x);
    i = setInterval(interval, 9);
}

function interval() {
    if (lastKeyEvent) {
        if (0 < x % width &&
            x < width * width &&
            (grid[x += [1, -width, -1, width][lastKeyEvent.which & 3]] ^= 1)) { // Updates x based on the value of e (remember, onkeyup saves the event in the e variable).

            // draw a white pixel at the Tron's position
            graphics.clearRect(x % width, x / width, 1, 1, score++);

        } else {

            // We replace the page's content with "game over" and the score when a collision occurs.
            document.body.innerHTML = 'game over: ' + score;
            clearInterval(i);
        }
    }

}

window.onload = startGame;
window.onkeydown = keyPressed;
