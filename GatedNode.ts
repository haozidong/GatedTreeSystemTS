import { GatePosition } from "./GatePosition"
import { IGatedNode } from "./IGatedNode"

import './StringFormat';

/**
    * This class represents a gated node.
    * 
    * @remarks
    * Each node has a gate to control which direction balls will pass through to: left or right.
    * If the gate is open to left, a ball will pass this node to its left child.
    * If the gate is open to right, a ball will pass the node to its right child
    * 
    * @public
    * */
export class GatedNode implements IGatedNode
{
    /**
        * The format string for a gated node.
        * */
    public static readonly NODE_FORMAT: string = "{0} ({1},{2})";

    /**
        * The string representation of gate postion left.
        * */
    public static readonly LEFT_GATE: string = "/";

    /**
        * The string representation of gate postion right.
        * */
    public static readonly RIGHT_GATE: string = "\\";

    /**
        * This field records position of the gate, default to left.
        * */
    private gatePosition: GatePosition = GatePosition.Left;

    /**
        * This field records how many balls passed through this node to its left branch.
        * */
    private ballsPassedToLeft : number = 0;

    /**
        * This field records how many balls passed through this node to its right branch.
        * */
    private ballsPassedToRight: number = 0;

    /**
        * Construct a new node, with its initial gate position.
        * 
        * @param gatePosition The initial gate position.
        */
    public constructor(gatePosition: GatePosition) { this.gatePosition = gatePosition; }

    /**
        * Get the gate position of this node.
        * */
    public get GatePosition(): GatePosition { return this.gatePosition };

    /**
        * Get the number of balls passed through this node to its left branch.
        * */
    public get BallsPassedToLeft(): number { return this.ballsPassedToLeft };

    /**
        * Get the number of balls passed through this node to its right branch.
        * */
    public get BallsPassedToRight(): number { return this.ballsPassedToRight };

    /**
        * Reset this node with a gate position.
        * 
        * @remarks
        * This will set the gate of this node to the specified position.
        * At the same time, clear the recorded number of balls passed throgh this node.
        * 
        * @param gatePosition The gate position to set.
        */
    public Reset(gatePosition: GatePosition): void
    {
        this.gatePosition = gatePosition;
        this.ballsPassedToLeft = 0;
        this.ballsPassedToRight = 0;
    }

    /**
        * Pass a ball throught this node.
        * 
        * @remarks
        * After a ball passed, the gate of this node will switch to opposite position.
        * */
    public RunOneBall(): void
    {
        if (this.gatePosition == GatePosition.Left)
            this.ballsPassedToLeft++;
        else
            this.ballsPassedToRight++;

        this.SwitchGate();
    }

    /**
        * Print the node as a string in format "Position (BallsPassedToLeft, BallsPassedToRight)".
        * 
        * @remarks
        * Position will be printed as "/" for left, "\" for right.
        * 
        * @returns A string representation of the node.
        * */
    public toString(): string {
        return GatedNode.NODE_FORMAT.format(
            this.gatePosition == GatePosition.Left ? GatedNode.LEFT_GATE : GatedNode.RIGHT_GATE,
            this.ballsPassedToLeft.toString(),
            this.ballsPassedToRight.toString());
    }

    /**
        * Switch the gate from left to right, or from right to left.
        * */
    public SwitchGate(): void
    {
        this.gatePosition = this.gatePosition == GatePosition.Left ? GatePosition.Right : GatePosition.Left;
    }
}