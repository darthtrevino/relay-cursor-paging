/**
 * An interface for Relay's cursor-based paging arguments
 *
 * TODO: This interface, or something like it, probably belongs in a Relay core project
 */
export interface ICursorPageable {
    before?: string;
    last?: number;
    after?: string;
    first?: number;
}
export interface IPagingMeta {
    isForwardPaging: boolean;
    isBackwardPaging: boolean;
}
export interface IPagingParameters {
    offset?: number;
    limit?: number;
}
