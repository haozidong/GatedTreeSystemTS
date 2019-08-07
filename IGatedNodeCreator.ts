import { IGatedNode } from "./IGatedNode";

/**
 * The interface for Factory class of IGatedNode.
 * 
 * @public
 * */
export interface IGatedNodeCreator {
    /**
     * Create a new instance of IGatedNode.
     * 
     * @returns A new instance of GatedNode.
     * */
    NewGatedNode(): IGatedNode;
}