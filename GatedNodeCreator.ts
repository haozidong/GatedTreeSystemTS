import { GatePositionHelper } from "./GatePositionHelper";
import { IGatedNode } from "./IGatedNode";
import { GatedNode } from "./GatedNode";
import { IGatedNodeCreator } from "./IGatedNodeCreator";

/**
 * Factory class of IGatedNode.
 * 
 * @remarks
 * This class will create GatedNode as IGatedNode with a random gate position.
 * 
 * @public
 * */
export class GatedNodeCreator implements IGatedNodeCreator {
    /**
     * Create a new instance of GatedNode as IGatedNode with a random GatePosition.
     * 
     * @returns A new instance of GatedNode with random GatePosition.
     * */
    public NewGatedNode(): IGatedNode {
        return new GatedNode(GatePositionHelper.GetRandomGatePosition());
    }
}