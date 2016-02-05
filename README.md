[![Build Status](https://travis-ci.org/darthtrevino/relay-cursor-paging.svg?branch=master)](https://travis-ci.org/darthtrevino/relay-cursor-paging)

# relay-cursor-paging
### Relay Cursor-Based Pagination Support for Databases

This microlibrary exports a function that will emit an object with `limit` and `criteria` fields based on Relay's pagination fields (e.g. `first`, `after`, `last`, and `before`).
These fields can be then be used to page into your database implementation (Mongoose, Sequelize, etc..).

```js
const {getPagingParameters} = require("relay-cursor-paging");

const myType = new GraphQLObjectType({
    fields: () => {  
        relatedThings: {      
            type: thingConnection,
            args: { 
                after: { type: GraphQLString },
                first: { type: GraphQLInt },
                before: { type: GraphQLString },
                last: { type: GraphQLInt },
            },
            resolve: (root, args) => {
                const { limit, offset } = getPagingParameters(args);
                const criteria = makeCriteriaForMyDomain(args, limit, offset);                                            
                return connectionFromPromisedArraySlice(
                    thingRepository.findAll(criteria),
                    args, 
                    {
                        sliceStart: criteria.offset, 
                        arrayLength: Number.MAX_VALUE // or the result of a count query
                    }
                );
            }
        }
    }
});
```
