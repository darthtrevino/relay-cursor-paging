"use strict";
var getPagingParameters_1 = require("../getPagingParameters");
var graphql_relay_1 = require("graphql-relay");
describe("getPagingParameters", function () {
    describe("when 'first' is present", function () {
        it("will add a limit field to the criteria object", function () {
            var criteria = getPagingParameters_1.default({ first: 10 });
            expect(criteria.limit).toEqual(10);
        });
        describe("and 'after' is present", function () {
            it("will add limit and offset fields to the criteria object", function () {
                var criteria = getPagingParameters_1.default({ first: 10, after: graphql_relay_1.toGlobalId("Connection", '100') });
                expect(criteria.offset).toEqual(101);
                expect(criteria.limit).toEqual(10);
            });
        });
    });
    describe("when 'last' is present", function () {
        describe("and 'before' is present", function () {
            it("will add limit and offset fields to the criteria object", function () {
                var criteria = getPagingParameters_1.default({ last: 10, before: graphql_relay_1.toGlobalId("Connection", '100') });
                expect(criteria.offset).toEqual(90);
                expect(criteria.limit).toEqual(10);
            });
            it("will check for underflowing offsets", function () {
                var criteria = getPagingParameters_1.default({ last: 2, before: graphql_relay_1.toGlobalId("Connection", '1') });
                expect(criteria.offset).toEqual(0);
                expect(criteria.limit).toEqual(1);
            });
        });
    });
    describe("when no paging argument are present", function () {
        it("emits an empty object", function () {
            var criteria = getPagingParameters_1.default({});
            expect(criteria).toEqual({});
        });
    });
});
