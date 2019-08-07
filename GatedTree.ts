import { GatePosition } from "./GatePosition";
import { GatePositionHelper } from "./GatePositionHelper";
import { IGatedNode } from "./IGatedNode";
import { IGatedTree } from "./IGatedTree"
import { IGatedNodeCreator } from "./IGatedNodeCreator";

import './StringFormat';

/**
 * This is a full binary tree with a gate on each node.
 * 
 * @public
 * */
export class GatedTree implements IGatedTree {
    /**
     * Max depth of tree, temporarily set it as 16.
     * */
    public static readonly MAX_DEPTH: number = 16;

    /**
     * Min depth of tree. Set min depth as 2, since we can not play this system without balls
     * */
    public static readonly MIN_DEPTH: number = 2;

    /**
     * The separater between nodes when output tree as string.
     * */
    public static readonly NODE_SEPARATER: string = " ";

    /**
     * The separater between levels when output tree as string.
     * */
    public static readonly LEVEL_SEPARATER: string = "\r\n";

    /**
     * The depth of the tree
     * */
    private depth: number;

    /**
     * Number of nodes on the tree.
     * 
     * @remarks
     * Since it is a full binary tree, it would be 'power(2, depth) - 1'.
     * Here depth is the depth of the tree.
     * Altoough it can be caculated, save it here for better performance.
     * */
    private numberOfNodes: number;

    /**
    * An array to save the nodes of the tree.
    * 
    * @remarks
    * Because our tree is a full binary tree, use a simple array is enough to save it.
    * Also using an array will be easier to tranverse a level
    * Nodes will ba saved from level to level, within same level, from left to right.
    * */
    private nodes: IGatedNode[];

    /**
     * Construct a new instance of GatedTree with specified depth using the specified IGatedNodeCreator.
     * 
     * @param depth The depth of the tree, It must be bigger than <see cref="MIN_DEPTH"/> and smaller than <see cref="MAX_DEPTH">.
     * @param nodeCreator An instance of <see cref="IGatedNodeCreator"/>, factory class of <see cref="IGatedNode"/>.
     */
    public constructor(depth: number, nodeCreator: IGatedNodeCreator) {
        if (depth < GatedTree.MIN_DEPTH || depth > GatedTree.MAX_DEPTH)
            throw new Error("Value of depth must no smaller than {0} and no bigger than {1}.".format(
                GatedTree.MIN_DEPTH.toString(), GatedTree.MAX_DEPTH.toString()));

        if (nodeCreator == null)
            throw new Error("Parameter nodeCreator: IGatedNodeCreator cannot be null.");

        this.depth = depth;
        this.numberOfNodes = Math.pow(2, depth) - 1;

        this.nodes = new Array(this.numberOfNodes);

        for (var i: number = 0; i < this.numberOfNodes; i++) {
            this.nodes[i] = nodeCreator.NewGatedNode();
        }
    }

    /**
     * Get all the nodes of this tree.
     * */
    public get Nodes(): IGatedNode[] { return this.nodes; }

    /**
     * Get the depth of this tree.
     * */
    public get Depth(): number { return this.depth; }

    /**
     * Get the number of nodes on the tree.
     * */
    public get NumberOfNodes(): number { return this.numberOfNodes; }

    /** 
     * Reset the whole tree so that we can try the who system again.
     * 
     * @remarks
     * This will reset all nodes of the tree by setting a random position for each gate of node,
     *   and clearing all the recorded number of balls passed through.
     * */
    public Reset(): void {
        //Since we saved the full binary tree as an array, and reseting nodes do not need a specific order,
        //  we can just iterate the array.
        this.nodes.forEach(node => node.Reset(GatePositionHelper.GetRandomGatePosition()));
    }

    /**
     * Run one ball through this gated tree.
     * 
     * @remarks
     * Ball will pass to the left or right depends on the direction of the gate.
     * */
    public RunOneBall(): void {
        //Run from the root node.
        let nodeIndex = 0;

        while (nodeIndex < this.numberOfNodes) {
            let node = this.nodes[nodeIndex];

            let nextNodeIndex = node.GatePosition == GatePosition.Left ?
                2 * nodeIndex + 1 :
                2 * nodeIndex + 2;

            node.RunOneBall();

            nodeIndex = nextNodeIndex;
        }
    }

    /**
     * Print the who tree as a string.
     * 
     * @remarks
     * 1. Each level will be printed in one line;
     * 2. Nodes in one level will be printed one by one from left to right;
     * 3. Nodes in one level will be separtated by a space;
     * 4. For printing format of nodes, see <see cref="GatedNode.toString()"./>
     * 
     * @returns A string representation the tree.
     * */
    public toString(): string {
        let sb = "";

        //First iterate every level
        for (var level = 0; level < this.depth; level++) {
            let numberOfNodesOfUpperLevels = Math.pow(2, level) - 1;
            let numberOfNodesOfThisLevel = numberOfNodesOfUpperLevels + 1;

            let from = numberOfNodesOfUpperLevels;
            let to = numberOfNodesOfUpperLevels + numberOfNodesOfThisLevel;

            //Then iterate every node in the same level
            for (var node = from; node < to; node++) {
                sb += this.nodes[node].toString();

                if (node < to - 1)
                    sb += GatedTree.NODE_SEPARATER;
            }

            if (level < this.depth - 1)
                sb += GatedTree.LEVEL_SEPARATER;
        }

        return sb;
    }
}