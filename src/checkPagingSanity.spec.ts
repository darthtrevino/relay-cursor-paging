import checkPagingSanity from "./checkPagingSanity";
import { IPagingMeta } from "./interfaces";
import { expect } from "chai";

describe("The Argument Sanity Checker", () => {
    describe("will throw an error when a client", () => {
        it("tries to use 'first' and 'last' simultaneously", () => {
            expect(() => checkPagingSanity({first: 10, last:10})).to.throw();    
        });
        
        it("tries to use 'before' and 'after' simultaneously", () => {
            expect(() => checkPagingSanity({before: 'abc', after: 'def'})).to.throw();
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
            expect(result.isForwardPaging).to.be.true;
            expect(result.isBackwardPaging).to.be.false;
        }
        
        function assertIsBackwardPaging(result: IPagingMeta) {
            expect(result.isBackwardPaging).to.be.true;
            expect(result.isForwardPaging).to.be.false;
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