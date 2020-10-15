function getGraphicsFor(elementId) {
    var c = document.getElementById(elementId);
    return c.getContext("2d");
}

function PixelGrid(graphics, width, height) {
    function clear() {
        graphics.fillRect(0, 0, width, height);
    }

    this.putPixel = function(x, y) {
        graphics.clearRect(x, y, 1, 1, 0);
    };

    clear();
}

function Marker2D(maxX) {
    var occupied = [];

    function toIndex(x, y) {
        return maxX * y + x;
    }

    this.isFree = function(x, y) {
        var index = toIndex(x, y);
        return occupied[index] === undefined
    };

    this.mark = function(x, y) {
        var index = toIndex(x, y);
        occupied[index] = 1;
    };
}

function Game(grid, trail, width, height, speed) {
    var x = width / 2;
    var y = height / 2;
    var score = 0;

    this.lastKeyEvent = 0;

    var threadHandle;
    this.startGameLoop = function() {
        var self = this;
        function advance() {
            self.advance();
        }
        threadHandle = setInterval(advance, speed);
    };

    this.advance = function() {
        if (this.lastKeyEvent) {
            var hitsWall = (x <= 0) || (x >= width) || (y < 0) || (y >= height);
            if (hitsWall) {
                this.collision();
                return
            }

            switch (this.lastKeyEvent.which & 3) {
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

            if (trail.isFree(x, y)) {
                this.tronMoves();
            } else {
                this.collision();
            }
        }
    };

    this.tronMoves = function() {
        grid.putPixel(x, y);
        trail.mark(x, y);
        score = score + 1;
    };

    this.collision = function() {
        // We replace the page's content with "game over" and the score.
        document.body.innerHTML = "game over: " + score;
        clearInterval(threadHandle);
    };

}

var game;

function startGame() {
    var graphics = getGraphicsFor("gc");
    var size = 150;
    var grid = new PixelGrid(graphics, size, size);
    var trail = new Marker2D(size);
    game = new Game(grid, trail, size, size, 9);
    game.startGameLoop();
}

function keyPressed(event) {
    if (game) {
        game.lastKeyEvent = event;
    }
}

window.onload = startGame;
window.onkeydown = keyPressed;
