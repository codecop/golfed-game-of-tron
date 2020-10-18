/* globals describe, it */
"use strict";

const assert = require('assert');

describe('Mocha infrastructure', () => {

    it('should assert plain Node', () => {
        // Node.js’ built-in assert
        assert.equal(2, 1 + 1);
    });

});
