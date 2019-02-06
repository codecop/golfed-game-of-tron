const { expect } = require('chai');
const sinon = require('sinon');

// prepare a "browser"
const context = { fillRect: () => false };
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

    var clock;

    before(function () {
        // see "https://sinonjs.org/releases/v3.2.1/fake-timers/"
        clock = sinon.useFakeTimers();
        context.fillRect = sinon.spy()
    });

    after(function () {
        clock.restore();
    });

    it('should load', function () {
        expect(code.ol).not.to.be.undefined;
    });

    it('should draw the fillRect on start', function () {
        code.ol();

        sinon.assert.calledOnce(context.fillRect);
        sinon.assert.calledWith(context.fillRect, 0, 0, 150, 11325);
    });

});
