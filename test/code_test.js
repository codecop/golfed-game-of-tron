const assert = require('assert');
const sinon = require('sinon');

// prepare a "browser"
const context = {};
const canvas = { getContext: () => context, };
const document = {
    body: { innerHTML: '', },
    getElementById: () => canvas,
};
const window = {
    document: document,
};

// declare undeclared variables.
var z, g, s, n, x, i;

// code.js is not a node module, cannot require it.
// see "https://stackoverflow.com/a/5809968/104143"
var fs = require('fs');
eval(fs.readFileSync('./code.js') + '');

describe('Game of Tron', function () {

    it('should be loaded', function () {
        if (!window.onload) {
            assert.fail('onload not set');
        }
        if (!window.onkeydown) {
            assert.fail('onkeydown not set');
        }
    });

    describe('started', function () {

        var clock;

        beforeEach(function () {
            // see "https://sinonjs.org/releases/v3.2.1/fake-timers/"
            clock = sinon.useFakeTimers();

            context.fillRect = sinon.spy();
            context.clearRect = sinon.spy();
            window.onkeydown(void (0));

            window.onload();
        });

        it('should draw the fillRect on start', function () {
            sinon.assert.calledOnce(context.fillRect);
            sinon.assert.calledWith(context.fillRect, 0, 0, 150, 11325);
        });

        it('should do nothing until key is pressed', function () {
            clock.tick(9);
            sinon.assert.notCalled(context.clearRect);
        });

        describe('playing', function () {

            it('should go up', function () {
                window.onkeydown({ which: 73 }); // i = up
                clock.tick(9);
                sinon.assert.calledWith(context.clearRect, 75, 74.5, 1, 1, 0);
            });

            it('should go left', function () {
                window.onkeydown({ which: 74 }); // j = left
                clock.tick(9);
                sinon.assert.calledWith(context.clearRect, 74, 75.49333333333334, 1, 1, 0);
            });

            it('should go down', function () {
                window.onkeydown({ which: 75 }); // k = down
                clock.tick(9);
                sinon.assert.calledWith(context.clearRect, 75, 76.5, 1, 1, 0);
            });

            it('should go right', function () {
                window.onkeydown({ which: 76 }); // l = right
                clock.tick(9);
                sinon.assert.calledWith(context.clearRect, 76, 75.50666666666666, 1, 1, 0);
            });

        });

        describe('end of game', function () {

            beforeEach(function () {
                document.body.innerHTML = '';
            });

            it('should die on hitting upper wall', function () {
                window.onkeydown({ which: 73 });
                clock.tick(9 * 77);
                assert.equal('game over: 76', document.body.innerHTML);
            });

            it('should die on hitting itself', function () {
                window.onkeydown({ which: 73 });
                clock.tick(9);
                window.onkeydown({ which: 74 });
                clock.tick(9);
                window.onkeydown({ which: 75 });
                clock.tick(9);
                window.onkeydown({ which: 76 });
                clock.tick(9);

                window.onkeydown({ which: 73 });
                clock.tick(9);
                assert.equal('game over: 4', document.body.innerHTML);
            });

        });

        describe('end of game (score 75)', function () {

            beforeEach(function () {
                document.body.innerHTML = '';
            });

            it('should die on hitting left wall', function () {
                window.onkeydown({ which: 74 });
                clock.tick(9 * 77);
            });

            it('should die on hitting lower wall', function () {
                window.onkeydown({ which: 75 });
                clock.tick(9 * 77);
            });

            it('should die on hitting right wall', function () {
                window.onkeydown({ which: 76 });
                clock.tick(9 * 77);
            });

            afterEach(function () {
                assert.equal('game over: 75', document.body.innerHTML);
            });

        });

        afterEach(function () {
            clock.restore();
        });

    });

});
