import { ICursorPageable, IPagingParameters } from "./interfaces";
/**
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 *
 * TODO: Handle the case when a user uses 'last' alone.
 */
export default function getPagingParameters(args: ICursorPageable): IPagingParameters;
