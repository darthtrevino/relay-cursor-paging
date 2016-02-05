const { GraphQLInt, GraphQLString } = require("graphql");
import * as _ from "lodash";

export default function pageable(args = {}) {
    return _.extend({}, args, {
        // Forward Paging Arguments
        after: { type: GraphQLString },
        first: { type: GraphQLInt },

        // Backward Paging Arguments
        before: { type: GraphQLString },
        last: { type: GraphQLInt },
    });
}