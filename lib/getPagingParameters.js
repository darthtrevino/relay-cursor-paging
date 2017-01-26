"use strict";
var graphql_relay_1 = require("graphql-relay");
var checkPagingSanity_1 = require("./checkPagingSanity");
/**
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 *
 * TODO: Handle the case when a user uses 'last' alone.
 */
function getPagingParameters(args) {
    var _a = checkPagingSanity_1.default(args), isForwardPaging = _a.isForwardPaging, isBackwardPaging = _a.isBackwardPaging;
    var first = args.first, last = args.last, after = args.after, before = args.before;
    var getId = function (cursor) { return parseInt(graphql_relay_1.fromGlobalId(cursor).id, 10); };
    var nextId = function (cursor) { return getId(cursor) + 1; };
    if (isForwardPaging) {
        return {
            limit: first,
            offset: after ? nextId(after) : 0
        };
    }
    else if (isBackwardPaging) {
        var limit = last;
        var offset = getId(before) - last;
        // Check to see if our before-page is underflowing past the 0th item
        if (offset < 0) {
            // Adjust the limit with the underflow value
            limit = Math.max(last + offset, 0);
            offset = 0;
        }
        return { offset: offset, limit: limit };
    }
    else {
        return {};
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPagingParameters;
