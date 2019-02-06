/* globals describe, it */
"use strict";

const assert = require('assert');
const chai = require('chai');
const should = chai.should();

describe('Mocha infrastructure', () => {

    it('should assert plain Node', () => {
        // Node.js’ built-in assert
        assert.equal(2, 1 + 1);
    });

    it('should assert with Chai', () => {
        (1 + 1).should.equal(2);
    });

});
