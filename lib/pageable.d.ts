import { GraphQLScalarType } from "graphql";
export default function pageable(args?: {}): {
    after: {
        type: GraphQLScalarType;
    };
    first: {
        type: GraphQLScalarType;
    };
    before: {
        type: GraphQLScalarType;
    };
    last: {
        type: GraphQLScalarType;
    };
};
