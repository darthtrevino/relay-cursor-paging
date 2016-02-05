[![Build Status](https://travis-ci.org/darthtrevino/relay-sequelize-pagination.svg?branch=master)](https://travis-ci.org/darthtrevino/relay-sequelize-pagination)

# relay-sequelize-pagination
### Relay Cursor-Based Pagination Support for Sequelize

This microlibrary exports a function that will mutate the `limit` and `criteria` fields of a Sequelize `FindOptions` object with values based on Relay's pagination fields (e.g. `first`, `after`, `last`, and `before`).

```js
const {getPagingParameters, pageable} = require("relay-sequelize-pagination");

const myType = new GraphQLObjectType({
    fields: () => {  
        relatedThings: {      
            type: thingConnection,
            args: pageable({}),
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
