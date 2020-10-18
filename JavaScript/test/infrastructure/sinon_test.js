/* globals describe, it */
"use strict";

const { expect } = require('chai');
const sinon = require('sinon');

class Foo {
    parse(value) {
        return true;
    }
}

describe('Sinon infrastructure', () => {

    // see "https://sinonjs.org/"

    it('should assert with Sinon', () => {
        // arrange
        sinon.stub(Foo.prototype, 'parse').callsFake((value) => false);
        const foo = new Foo();
        // act
        foo.parse("abc");
        // assert
        expect(foo.parse.alwaysCalledWithExactly("abc")).to.equal(true);
    });

});
