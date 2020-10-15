/**
 * Get the 2D context of the given element.
 * @param {string} elementId
 * @returns {CanvasRenderingContext2D}
 */
function getGraphicsFor(elementId) {
    var c = document.getElementById(elementId);
    return c.getContext("2d");
}

/**
 * Represents a point in the 2D game area. Sub domain Math.
 * @param {number} x
 * @param {number} y
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Represents the dimension of the 2D game area. Sub domain Math.
 * @param {number} width
 * @param {number} height
 */
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

/**
 * Represents a grid of pixels in given dimension. Sub domain Computer Graphics.
 * @param {CanvasRenderingContext2D} graphics
 * @param {Dimension} dimension
 */
function PixelGrid(graphics, dimension) {
    function clear() {
        graphics.fillRect(0, 0, dimension.width, dimension.height);
    }

    /**
     * @param {Point} point
     */
    this.putPixel = function(point) {
        graphics.clearRect(point.x, point.y, 1, 1, 0);
    };

    clear();
}
/**
 * Structure to mark positions in 2D space.
 * @param {number} maxX
 */
function Marker2D(maxX) {
    var occupied = [];

    /**
     * @param {Point} point
    */
    function toIndex(point) {
        return maxX * point.y + point.x;
    }

    /**
     * @param {Point} point
     */
    this.isFree = function(point) {
        var index = toIndex(point);
        return occupied[index] === undefined
    };

    /**
     * @param {Point} point
     */
    this.mark = function(point) {
        var index = toIndex(point);
        occupied[index] = 1;
    };
}

/**
 * The game of Tron.
 * @param {PixelGrid} grid
 * @param {Marker2D} trail
 * @param {Dimension} dimension
 * @param {number} speed
 */
function Game(grid, trail, dimension, speed) {
    var position = dimension.center();
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
            var hitsWall = dimension.isOutside(position);
            if (hitsWall) {
                this.collision();
                return
            }

            var x = position.x;
            var y = position.y;
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
            position = new Point(x, y);

            if (trail.isFree(position)) {
                this.tronMoves();
            } else {
                this.collision();
            }
        }
    };

    this.tronMoves = function() {
        grid.putPixel(position);
        trail.mark(position);
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
    var dimension = new Dimension(150, 150);
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
