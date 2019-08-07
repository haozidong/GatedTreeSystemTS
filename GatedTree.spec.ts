import 'mocha';
import { assert } from 'chai';
import { mock } from './node_modules/ts-mockito/lib/ts-mockito';
import { when } from './node_modules/ts-mockito/lib/ts-mockito';
import { instance } from './node_modules/ts-mockito/lib/ts-mockito';

import { GatePosition } from "./GatePosition";
import { IGatedNode } from './IGatedNode';
import { IGatedNodeCreator } from "./IGatedNodeCreator";
import { GatedTree } from "./GatedTree";

describe('Test cases for GatedTree', () => {
    it('Can create', () => {
        let mockGatedNode: IGatedNode = mock<IGatedNode>();

        let mockGatedNodeCreator: IGatedNodeCreator = mock<IGatedNodeCreator>();
        when(mockGatedNodeCreator.NewGatedNode()).thenReturn(instance(mockGatedNode));

        let creator: IGatedNodeCreator = instance(mockGatedNodeCreator);

        let depth = 4;
        let numberOfNodes = Math.pow(2, depth) - 1;

        let tree = new GatedTree(depth, creator);

        assert.equal(tree.Depth, depth);
        assert.equal(tree.NumberOfNodes, numberOfNodes);
        assert.isNotNull(tree.Nodes);

        assert.equal(tree.Nodes.length, numberOfNodes);
        tree.Nodes.forEach(node => assert.isNotNull(node));
    });

    it("Can not create with invalid arguments", () => {
        let mockGatedNode: IGatedNode = mock<IGatedNode>();

        let mockGatedNodeCreator: IGatedNodeCreator = mock<IGatedNodeCreator>();
        when(mockGatedNodeCreator.NewGatedNode()).thenReturn(instance(mockGatedNode));

        let creator: IGatedNodeCreator = instance(mockGatedNodeCreator);

        let depth = GatedTree.MIN_DEPTH - 1;

        assert.throw(() => new GatedTree(depth, creator));

        depth = GatedTree.MAX_DEPTH + 1;

        assert.throw(() => new GatedTree(depth, creator));

        depth = 4;

        assert.throw(() => new GatedTree(depth, null));
    });

    it("Can resest", () => {
        let numberOfResets = 0;

        let mockGatedNode: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode.Reset(GatePosition.Left)).thenCall(() => numberOfResets++);
        when(mockGatedNode.Reset(GatePosition.Right)).thenCall(() => numberOfResets++);

        let mockGatedNodeCreator: IGatedNodeCreator = mock<IGatedNodeCreator>();
        when(mockGatedNodeCreator.NewGatedNode()).thenReturn(instance(mockGatedNode));

        let creator: IGatedNodeCreator = instance(mockGatedNodeCreator);

        let depth = 2;
        let numberOfNodes = Math.pow(2, depth) - 1;

        let tree = new GatedTree(depth, creator);
        tree.Reset();

        assert.equal(numberOfNodes, numberOfResets);
    });

    it("Can run one ball", () => {
        let numberOfPasses = 0;

        let mockGatedNode: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode.RunOneBall()).thenCall(() => numberOfPasses++);

        let mockGatedNodeCreator: IGatedNodeCreator = mock<IGatedNodeCreator>();
        when(mockGatedNodeCreator.NewGatedNode()).thenReturn(instance(mockGatedNode));

        let creator: IGatedNodeCreator = instance(mockGatedNodeCreator);

        let depth = 2;
        let tree = new GatedTree(depth, creator);

        //each ball will pass two nodes
        tree.RunOneBall();
        assert.equal(numberOfPasses, 2);

        tree.RunOneBall();
        assert.equal(numberOfPasses, 4);

        tree.RunOneBall();
        assert.equal(numberOfPasses, 6);
    });

    it("Can to string", () => {
        let nodeString = "NODE";

        let mockGatedNode: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode.toString()).thenReturn(nodeString);

        let mockGatedNodeCreator: IGatedNodeCreator = mock<IGatedNodeCreator>();
        when(mockGatedNodeCreator.NewGatedNode()).thenReturn(instance(mockGatedNode));

        let creator: IGatedNodeCreator = instance(mockGatedNodeCreator);

        let depth = 2;
        let tree = new GatedTree(depth, creator);

        let treeString = nodeString + GatedTree.LEVEL_SEPARATER + nodeString + GatedTree.NODE_SEPARATER + nodeString;
        assert.equal(tree.toString(), treeString);
    });
});