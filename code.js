function getGraphics() {
    var c = document.getElementById("gc");
    return c.getContext('2d');
}

function DrawingGrid(graphics) {
    this.clear = function(width, height) {
        graphics.fillRect(0, 0, width, height);
    };

    this.putPixel = function(x, y) {
        graphics.clearRect(x, y, 1, 1, 0);
    };
}

function TronTrail(width) {
    var trail = [];

    function toIndex(x, y) {
        return width * y + x;
    }

    this.isFree = function(x, y) {
        var index = toIndex(x, y);
        return trail[index] === undefined
    };

    this.mark = function(x, y) {
        var index = toIndex(x, y);
        trail[index] = 1;
    };
}

function Game(ui, trail, width) {

    this.lastKeyEvent = 0;
    var score = 0;
    var tronX = width / 2;
    var tronY = width / 2;
    ui.clear(width, width);
    var threadHandle;

    this.start = function() {
        var self = this;
        function advance() {
            self.advance();
        }
        threadHandle = setInterval(advance, 9);
    };

    this.advance = function() {
        if (this.lastKeyEvent) {
            var hitsWall = (tronX <= 0) || (tronX >= width) || (tronY < 0) || (tronY >= width);;
            if (hitsWall) {
                this.collision();
                return
            }

            switch (this.lastKeyEvent.which & 3) {
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
                this.tronMoves();
            } else {
                this.collision();
            }
        }
    };

    this.tronMoves = function() {
        ui.putPixel(tronX, tronY);
        trail.mark(tronX, tronY);
        score = score + 1;
    };

    this.collision = function() {
        // We replace the page's content with "game over" and the score.
        document.body.innerHTML = 'game over: ' + score;
        clearInterval(threadHandle);
    };

}

var game;

function startGame() {
    var width = 150;
    var ui = new DrawingGrid(getGraphics());
    var trail = new TronTrail(width);;
    game = new Game(ui, trail, width);
    game.start();
}

function keyPressed(event) {
    if (game) {
        game.lastKeyEvent = event;
    }
}

window.onload = startGame;
window.onkeydown = keyPressed;
