function getGraphicsFor(elementId) {
    var c = document.getElementById(elementId);
    return c.getContext("2d");
}

function Dimension(width, height) {
    this.width = width;
    this.height = height;

    this.center = function() {
        return { x: width / 2, y: height / 2 };
    };
}

function PixelGrid(graphics, dimension) {
    function clear() {
        graphics.fillRect(0, 0, dimension.width, dimension.height);
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

function Game(grid, trail, dimension, speed) {
    var x = dimension.center().x;
    var y = dimension.center().y;
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
            var hitsWall = (x <= 0) || (x >= dimension.width) || (y < 0) || (y >= dimension.height);
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
    var dimension = new Dimension(size, size);
    var grid = new PixelGrid(graphics, dimension);
    var trail = new Marker2D(dimension.width);
    game = new Game(grid, trail, dimension, 9);
    game.startGameLoop();
}

function keyPressed(event) {
    if (game) {
        game.lastKeyEvent = event;
    }
}

window.onload = startGame;
window.onkeydown = keyPressed;
