[![Build Status](https://travis-ci.org/darthtrevino/relay-cursor-paging.svg?branch=master)](https://travis-ci.org/darthtrevino/relay-cursor-paging)

# relay-cursor-paging
### Relay Cursor-Based Pagination Support for Databases

#### API:
**getPagingParameters(args)**: Emits an object with `limit` and `criteria` fields based on Relay's pagination fields (e.g. `first`, `after`, `last`, and `before`).

**pageable(argSpec)**: Emits an augmented Argument Specification with `first`, `after`, `before`, and `last` arguments.

```js
import { pageable, getPagingParameters } from "relay-cursor-paging";
const { connectionFromPromisedArraySlice } = require("graphql-relay");

const myType = new GraphQLObjectType({
    fields: () => {  
        relatedThings: {      
            type: thingConnection,
            args: pageable({}), // Adds first, after, last, and before arguments
            resolve: (root, args) => {
                const { limit, offset } = getPagingParameters(args);                
                const criteria = makeCriteria(args, limit, offset);
                                                            
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
