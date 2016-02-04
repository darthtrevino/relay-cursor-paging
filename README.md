[![Build Status](https://travis-ci.org/darthtrevino/relay-sequelize-pagination.svg?branch=master)](https://travis-ci.org/darthtrevino/relay-sequelize-pagination)

# relay-sequelize-pagination
### Relay Cursor-Based Pagination Support for Sequelize

This microlibrary exports a function that will mutate the `limit` and `criteria` fields of a Sequelize `FindOptions` object with values based on Relay's pagination fields (e.g. `first`, `after`, `last`, and `before`).

```js
const {addCursorPagingCriteria} = require("relay-sequelize-pagination").default;

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
