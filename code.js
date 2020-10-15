function getGraphicsFor(elementId) {
    var c = document.getElementById(elementId);
    return c.getContext("2d");
}

function Dimension(width, height) {
    this.width = width;
    this.height = height;

    this.center = function() {
        return new Point(width / 2, height / 2);
    };

    this.isOutside = function(point) {
        return !this.isInside(point);
    };

    this.isInside = function(point) {
        return (point.x > 0) &&
            (point.x < width) &&
            (point.y >= 0) &&
            (point.y < height);
    };
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function PixelGrid(graphics, dimension) {
    function clear() {
        graphics.fillRect(0, 0, dimension.width, dimension.height);
    }

    this.putPixel = function(point) {
        graphics.clearRect(point.x, point.y, 1, 1, 0);
    };

    clear();
}

function Marker2D(maxX) {
    var occupied = [];

    function toIndex(point) {
        return maxX * point.y + point.x;
    }

    this.isFree = function(point) {
        var index = toIndex(point);
        return occupied[index] === undefined
    };

    this.mark = function(point) {
        var index = toIndex(point);
        occupied[index] = 1;
    };
}

function Game(grid, trail, dimension, speed) {
    var p = dimension.center();
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
            var hitsWall = dimension.isOutside(p);
            if (hitsWall) {
                this.collision();
                return
            }

            var x = p.x;
            var y = p.y;
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
            p = new Point(x, y);

            if (trail.isFree(p)) {
                this.tronMoves();
            } else {
                this.collision();
            }
        }
    };

    this.tronMoves = function() {
        grid.putPixel(p);
        trail.mark(p);
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
