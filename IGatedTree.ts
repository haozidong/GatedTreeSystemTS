import { IGatedNode } from "./IGatedNode";

/**
 * This is the interface for a gated tree in our system.
 * 
 * @public
 * */
export interface IGatedTree {
    /**
     * Reset the whole tree.
     * */
    Reset(): void;

    /**
     * Run one ball through this gated tree.
     * */
    RunOneBall(): void;

    /**
     * Get the depth of this tree.
     * */
    readonly Depth: number;

    /**
     * Get the number of nodes of this tree.
     * */
    readonly NumberOfNodes: number;

    /**
     * Get all the nodes of this tree.
     * */
    readonly Nodes: IGatedNode[];
}
