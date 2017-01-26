"use strict";
var checkPagingSanity_1 = require("../checkPagingSanity");
describe("The Argument Sanity Checker", function () {
    describe("will throw an error when a client", function () {
        it("tries to use 'first' and 'last' simultaneously", function () {
            expect(function () { return checkPagingSanity_1.default({ first: 10, last: 10 }); }).toThrow();
        });
        it("tries to use 'before' and 'after' simultaneously", function () {
            expect(function () { return checkPagingSanity_1.default({ before: 'abc', after: 'def' }); }).toThrow();
        });
        it("tries to use 'first' and 'before' simultaneously", function () {
            expect(function () { return checkPagingSanity_1.default({ first: 3, before: 'abc' }); });
        });
        it("tries to use 'last' and 'after' simultaneously", function () {
            expect(function () { return checkPagingSanity_1.default({ last: 3, after: 'abc' }); });
        });
        // See note in checkPagingSanity.ts
        it("tries to page backwards using only 'last'", function () {
            expect(function () { return checkPagingSanity_1.default({ last: 3 }); });
        });
    });
    describe("will not throw when a client", function () {
        function assertIsForwardPaging(result) {
            expect(result.isForwardPaging).toBeTruthy();
            expect(result.isBackwardPaging).toBeFalsy();
        }
        function assertIsBackwardPaging(result) {
            expect(result.isBackwardPaging).toBeTruthy();
            expect(result.isForwardPaging).toBeFalsy();
        }
        it("uses 'first' alone", function () {
            assertIsForwardPaging(checkPagingSanity_1.default({ first: 3 }));
        });
        // See note in checkPagingSanity.ts
        it.skip("uses 'last' alone", function () {
            assertIsBackwardPaging(checkPagingSanity_1.default({ last: 3 }));
        });
        it("uses 'before' alone", function () {
            assertIsBackwardPaging(checkPagingSanity_1.default({ before: 'abc' }));
        });
        it("uses 'after' alone", function () {
            assertIsForwardPaging(checkPagingSanity_1.default({ after: 'abc' }));
        });
        it("uses 'first' and 'after'", function () {
            assertIsForwardPaging(checkPagingSanity_1.default({ first: 3, after: 'abc' }));
        });
        it("uses 'last' and 'before'", function () {
            assertIsBackwardPaging(checkPagingSanity_1.default({ last: 3, before: 'abc' }));
        });
    });
});
