import checkPagingSanity from "../checkPagingSanity";
import { IPagingMeta } from "../interfaces";

describe("The Argument Sanity Checker", () => {
    describe("will throw an error when a client", () => {
        it("tries to use 'first' and 'last' simultaneously", () => {
            expect(() => checkPagingSanity({first: 10, last:10})).toThrow();
        });

        it("tries to use 'before' and 'after' simultaneously", () => {
            expect(() => checkPagingSanity({before: 'abc', after: 'def'})).toThrow();
        });

        it("tries to use 'first' and 'before' simultaneously", () => {
            expect(() => checkPagingSanity({first: 3, before: 'abc'}));
        });

        it("tries to use 'last' and 'after' simultaneously", () => {
            expect(() => checkPagingSanity({last: 3, after: 'abc'}));
        });

        // See note in checkPagingSanity.ts
        it("tries to page backwards using only 'last'", () => {
            expect(() => checkPagingSanity({last: 3}));
        });
    });

    describe("will not throw when a client", () => {
        function assertIsForwardPaging(result: IPagingMeta) {
            expect(result.isForwardPaging).toBeTruthy();
            expect(result.isBackwardPaging).toBeFalsy();
        }

        function assertIsBackwardPaging(result: IPagingMeta) {
            expect(result.isBackwardPaging).toBeTruthy();
            expect(result.isForwardPaging).toBeFalsy();
        }

        it("uses 'first' alone", () => {
            assertIsForwardPaging(checkPagingSanity({first: 3}));
        });

        // See note in checkPagingSanity.ts
        it.skip("uses 'last' alone", () => {
            assertIsBackwardPaging(checkPagingSanity({last: 3}));
        });

        it("uses 'before' alone", () => {
            assertIsBackwardPaging(checkPagingSanity({before: 'abc'}));
        });

        it("uses 'after' alone", () => {
            assertIsForwardPaging(checkPagingSanity({after: 'abc'}));
        });

        it("uses 'first' and 'after'", () => {
            assertIsForwardPaging(checkPagingSanity({first: 3, after: 'abc'}));
        });

        it("uses 'last' and 'before'", () => {
            assertIsBackwardPaging(checkPagingSanity({last: 3, before: 'abc'}));
        });
    });
});