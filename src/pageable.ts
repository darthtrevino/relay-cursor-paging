import { GraphQLInt, GraphQLString, GraphQLScalarType } from "graphql";

export default function pageable(args = {}) {
    return {
        ...args,
        // Forward Paging Arguments
        after: { type: GraphQLString },
        first: { type: GraphQLInt },

        // Backward Paging Arguments
        before: { type: GraphQLString },
        last: { type: GraphQLInt },
    };
}