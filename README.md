[![Build Status](https://travis-ci.org/darthtrevino/relay-sequelize-pagination.svg?branch=master)](https://travis-ci.org/darthtrevino/relay-sequelize-pagination)

# relay-sequelize-pagination
## Relay Cursor-Based Pagination Support for Sequelize

```js
import { addCursorPagingCriteria } from "relay-sequelize-pagination";

resolve: (root, args) => {
    const criteria = makeCriteriaForMyDomain(args); // An 'order' property should be added to the criteria here or in your repository.
    addCursorPagingCriteria(criteria, args);
                                   
    return connectionFromPromisedArraySlice(
        myRepository.findAll(criteria),
        args, 
        {
            sliceStart: criteria.offset, 
            arrayLength: Number.MAX_VALUE // or the result of a count query
        }
    );
}
```