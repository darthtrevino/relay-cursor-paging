/**
 * An interface for Relay's cursor-based paging arguments
 * 
 * TODO: This interface, or something like it, probably belongs in a Relay core project
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