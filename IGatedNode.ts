import { GatePosition } from "./GatePosition"

/**
    * This is the interface for a gated node.
    * 
    * @public
    * */
export interface IGatedNode {
    /**
        * Get the gate position of this node.
        * */
    readonly GatePosition: GatePosition;

    /**
        * Get the number of balls passed through this node to its left branch.
        * */
    readonly BallsPassedToLeft: number;

    /**
        * Get the number of balls passed through this node to its right branch.
        * */
    readonly BallsPassedToRight: number;

    /**
        * Pass a ball throught this node.
        * 
        * @remarks
        * After a ball passed, the gate of this node will switch to opposite position.
        * */
    RunOneBall(): void;

    /**
        * Reset this node with a gate position.
        * 
        * @param gatePosition The position of the gate.
        */
    Reset(gatePosition: GatePosition): void;

    /**
        * Switch the gate from left to right, or from right to left.
        * */
    SwitchGate(): void;
}