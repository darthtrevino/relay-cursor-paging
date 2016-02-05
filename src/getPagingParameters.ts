const {
    fromGlobalId, 
    toGlobalId
} = require("graphql-relay");
import checkPagingSanity from "./checkPagingSanity";
import { 
    ICursorPageable,
    IPagingParameters
 } from "./interfaces";

/**
 * Augments a Sequelize criteria object with Relay's cursor-based pagination. 
 * This function will create a new criteria object with updated 'limit' and 'offset' parameters.
 * 
 * Note:  The criteria object must have an order field specified before it is used to retrieve results. 
 * This is left to clients.  
 * 
 * TODO: Handle the case when a user uses 'last' alone.
 */
export default function getPagingParameters(args: ICursorPageable): IPagingParameters {
    const {isForwardPaging, isBackwardPaging} = checkPagingSanity(args);
    const {first, last, after, before} = args;
    
    const getId = cursor => parseInt(fromGlobalId(cursor).id, 10);
    const nextId = (cursor) => getId(cursor) + 1 
    
    if (isForwardPaging) {    
        return { 
            limit: first,
            offset: after ? nextId(after) : 0
        };
    } else if (isBackwardPaging) {
        let limit = last;
        let offset = getId(before) - last;
        
        // Check to see if our before-page is underflowing past the 0th item
        if (offset < 0) {
            // Adjust the limit with the underflow value
            limit = Math.max(last + offset, 0);
            offset = 0; 
        }
        
        return { offset, limit };
    }
}