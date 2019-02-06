const { expect } = require('chai');
const sinon = require('sinon');

// prepare a "browser"
const canvas = {}
const document = { getElementById: (id) => canvas };

// code.js is not a node module, cannot require it.
// see https://stackoverflow.com/a/5809968/104143
var fs = require('fs');
var code = eval(fs.readFileSync('./code.js') + '');

describe('Game of Tron', function () {

    var clock;

    before(function () {
        // see https://sinonjs.org/releases/v3.2.1/fake-timers/
        clock = sinon.useFakeTimers();
    });

    after(function () {
        clock.restore();
    });

    it('should load', function () {
        expect(code.ol).not.to.be.undefined;
    });

});
