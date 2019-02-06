/* globals describe, it */
"use strict";

const assert = require('assert');

async function one() {
    return Promise.resolve(1);
}

describe("Babel infrastructure", () => {

    it("transpiles Promise chaining", (done) => {
        one().then((resolve, reject) => {
            assert.equal(1, resolve);
            done();
        });
    });

    it("transpiles Promise finally", (done) => {
        one().then((resolve, reject) => {
            assert.equal(1, resolve);
        }).finally(on => {
            done();
        });
    });

});
