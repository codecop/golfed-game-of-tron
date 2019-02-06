const { expect } = require('chai');
const sinon = require('sinon');

// prepare a "browser"
const context = {};
const canvas = { getContext: () => context };
const document = {
    body: { innerHTML: '' },
    getElementById: () => canvas,
};

// declare undeclared variables.
var z, g, s, n, x, i;

// code.js is not a node module, cannot require it.
// see "https://stackoverflow.com/a/5809968/104143"
var fs = require('fs');
var code = eval(fs.readFileSync('./code.js') + '');

describe('Game of Tron', function () {

    it('should load', function () {
        expect(code.ol).not.to.be.undefined;
    });

    describe('started', function () {

        var clock;

        beforeEach(function () {
            // see "https://sinonjs.org/releases/v3.2.1/fake-timers/"
            clock = sinon.useFakeTimers();

            context.fillRect = sinon.spy()
            context.clearRect = sinon.spy()
            code.ok(void (0));

            code.ol();
        });

        afterEach(function () {
            clock.restore();
        });

        it('should draw the fillRect on start', function () {
            sinon.assert.calledOnce(context.fillRect);
            sinon.assert.calledWith(context.fillRect, 0, 0, 150, 11325);
        });

        it('should do nothing until key is pressed', function () {
            clock.tick(9);
            sinon.assert.notCalled(context.clearRect);
        });

        it('should go up', function () {
            code.ok({ which: 73 }); // i = up
            clock.tick(9);
            sinon.assert.calledWith(context.clearRect, 75, 74.5, 1, 1, 0);
        });

        it('should go left', function () {
            code.ok({ which: 74 }); // j = left
            clock.tick(9);
            sinon.assert.calledWith(context.clearRect, 74, 75.49333333333334, 1, 1, 0);
        });

        it('should go down', function () {
            code.ok({ which: 75 }); // k = down
            clock.tick(9);
            sinon.assert.calledWith(context.clearRect, 75, 76.5, 1, 1, 0);
        });

        it('should go right', function () {
            code.ok({ which: 76 }); // l
            clock.tick(9);
            sinon.assert.calledWith(context.clearRect, 76, 75.50666666666666, 1, 1, 0);
        });
    });

});
