import getPagingParameters from "./getPagingParameters";
const {
    fromGlobalId, 
    toGlobalId
} = require("graphql-relay");
import { expect } from "chai";

describe("getPagingParameters", () => {
    
    describe("when 'first' is present", () => {
        it("will add a limit field to the criteria object", () => {
            const criteria = getPagingParameters({first: 10});
            expect(criteria.limit).to.equal(10);    
        });
        
        describe("and 'after' is present", () => {
            it("will add limit and offset fields to the criteria object", () => {
                const criteria = getPagingParameters({first: 10, after: toGlobalId("Connection", 100)});
                expect(criteria.offset).to.equal(101);
                expect(criteria.limit).to.equal(10);        
            });            
        });
    });
    
    describe("when 'last' is present", () => {
       describe("and 'before' is present", () => {
          it("will add limit and offset fields to the criteria object", () => {
                const criteria = getPagingParameters({last: 10, before: toGlobalId("Connection", 100)});
                expect(criteria.offset).to.equal(90);
                expect(criteria.limit).to.equal(10);
          });
          it("will check for underflowing offsets", () => {
                const criteria = getPagingParameters({last: 2, before: toGlobalId("Connection", 1)});
                expect(criteria.offset).to.equal(0);
                expect(criteria.limit).to.equal(1);
          });
       });
    });
});