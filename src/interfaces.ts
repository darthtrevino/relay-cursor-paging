/**
 * An interface for Relay's cursor-based paging arguments
 * TODO: Whenever graphql-relay gets typescript metadata, this should exist in there.
 */
export interface ICursorPageable {
    // Backward Paging Arguments
    before?: string;
    last?: number;
    
    // Forward Paging Arguments
    after?: string;
    first?: number;
}

export interface IPagingMeta { 
    isForwardPaging: boolean;
    isBackwardPaging: boolean;
}