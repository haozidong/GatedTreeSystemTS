import { GatePosition } from "./GatePosition";
import { IGatedTree } from "./IGatedTree";
import { IGatedTreeController } from "./IGatedTreeController";

/**
 * The controller of a gated tree system.
 * */
export class GatedTreeController implements IGatedTreeController {
    /**
     * The gated tree object.
     * */
    private tree: IGatedTree;

    /**
     * Number of balls will be available.
     * 
     * @remarks
     * As specified in the rules, it will be number of branches of the tree at bottom level minus one.
     * As the tree is a full binary tree, it will also equals to the number of nodes in the tree.
     * For example, for a tree with depth as 4,
     *   the number of nodes at bottom level would be 'power(2, depth - 1)' equals 8,
     *   the number of branches at bottom level would be 'power(2, depth)' equals 16,
     *   the number of nodes in the tree would be 'power(2, depth) - 1' equals 15,
     *   and the number of balls would be 15
     * */
    private numberOfBalls: number;

    /**
     * Construct an instance of GatedTreeController.
     * 
     * @param tree The gated tree object.
     */
    public constructor(tree: IGatedTree) {
        if (tree == null)
            throw new Error("Parameter tree: IGatedTree cannot be null.");

        this.tree = tree;
        this.numberOfBalls = tree.NumberOfNodes;
    }

    /**
     * Get the number of balls will be available.
     * */
    public get NumberOfBalls(): number { return this.numberOfBalls; }

    /**
     * Predict which container put under the bottom level of branches will not get a ball.
     * 
     * @remarks
     * Prediction must be ran before RunBalls or after Reset
     * The predication is based on bellow rules:
     * 1. It is a full binary tree;
     * 2. The number of balls is one ball less than the total bottom level branches;
     * 3. After a ball passed through a node, the gate of the node will switch.
     * We index the branch/container from left to right with number sequence start from 1 for easy understanding.
     * So for a tree with depth as 4, the indices would be:
     * 1, 2, 3, ..., 16
     * 
     * @returns A number representing the container which will not get a ball.
     * */
    public PredictEmptyContainer(): number {
        //The index of the node we will check next step.
        let nodeIndex = 0;
        //The node we will check next step
        let node = this.tree.Nodes[nodeIndex];

        for (var level = 0; level < this.tree.Depth - 1; level++) {
            //If the gate is open to left, then the left child tree will get enough balls.
            //So we only need to consider the right child tree, vice versa.
            nodeIndex = node.GatePosition == GatePosition.Left ?
                2 * nodeIndex + 2 :
                2 * nodeIndex + 1;

            node = this.tree.Nodes[nodeIndex];
        }

        //Now the keyNode is the node at bottom level which not get enough ball, it will only get one ball.
        //So now we can know which branch of this node no ball will pass through it.
        //If its gate is open to left, then the right branch will not get a ball.

        //Translate the index to a lidex at the level instead of the whole tree.
        nodeIndex = GatedTreeController.TranslateToLevelIndex(nodeIndex, this.tree.Depth);

        //Then let's check which branch/containter will not get a ball
        //Node index is start from 0, while returned human readable start from 1.
        return node.GatePosition == GatePosition.Left ?
            nodeIndex * 2 + 2 :
            nodeIndex * 2 + 1;
    }

    /**
     * Run all the balls through the system one by one.
     * */
    public RunBalls(): void {
        for (var ball = 0; ball < this.numberOfBalls; ball++) {
            this.tree.RunOneBall();
        }
    }

    /**
     * Check and return which branch/container did not get a ball.
     * 
     * @remarks
     * Based on bellow rules of the system:
     * 1. It is a full binary tree;
     * 2. The number of balls is one ball less than the total bottom level branches;
     * 3. After a ball passed through a node, the gate of the node will switch.
     * After all the balls ran through the system, from the root from the tree, 
     *   we just need to check left or right branch did not get enough balls,
     *   And follow that branch until reached the root level.
     * 
     * @returns A number representing the container which did not get a ball.
     * */
    public CheckEmptyContainer(): number {
        let nodeIndex = 0;
        let node = this.tree.Nodes[nodeIndex];

        while (nodeIndex < this.tree.NumberOfNodes) {
            //Which side did not get enough balls?
            let nextNodeIndex = node.BallsPassedToLeft < node.BallsPassedToRight ?
                2 * nodeIndex + 1 :
                2 * nodeIndex + 2;

            if (nextNodeIndex >= this.tree.NumberOfNodes)
                break;

            nodeIndex = nextNodeIndex;
            node = this.tree.Nodes[nodeIndex];
        }

        //Translate the index to a lidex at the level instead of the whole tree.
        nodeIndex = GatedTreeController.TranslateToLevelIndex(nodeIndex, this.tree.Depth);

        //Node index is start from 0, while returned human readable start from 1.
        return node.BallsPassedToLeft == 0 ?
            nodeIndex * 2 + 1 :
            nodeIndex * 2 + 2;
    }

    /**
     * Reset the tree.
     * */
    public Reset(): void { this.tree.Reset(); }

    /**
     * Translate the index to a lidex at the level from a node index in the whole tree.
     * 
     * @remarks
     * For a tree with depth as 4, if the whole tree index of the node is 12, and level is 4,
     *   then the level index would be 5 for index start from 0;
     * 
     * @param index A node index in the whole tree.
     * @param level The level of the node.
     * 
     * @returns The index of the node in the whole tree.
     */
    private static TranslateToLevelIndex(index: number, level: number): number {
        let numberOfNodesOfUpperLevels = Math.pow(2, level - 1) - 1;
        return index - numberOfNodesOfUpperLevels;
    }
}