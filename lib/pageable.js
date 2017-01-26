"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var graphql_1 = require("graphql");
function pageable(args) {
    if (args === void 0) { args = {}; }
    return __assign({}, args, { 
        // Forward Paging Arguments
        after: { type: graphql_1.GraphQLString }, first: { type: graphql_1.GraphQLInt }, 
        // Backward Paging Arguments
        before: { type: graphql_1.GraphQLString }, last: { type: graphql_1.GraphQLInt } });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pageable;
