import 'mocha';
import { assert } from 'chai';
import { mock } from './node_modules/ts-mockito/lib/ts-mockito';
import { when } from './node_modules/ts-mockito/lib/ts-mockito';
import { instance } from './node_modules/ts-mockito/lib/ts-mockito';

import { GatePosition } from "./GatePosition";
import { IGatedNode } from './IGatedNode';
import { IGatedTree } from './IGatedTree';
import { GatedTreeController } from './GatedTreeController';

describe('Test cases for GatedTreeController', () => {
    it("Can not create with invalid arguments", () => {
        assert.throw(() => new GatedTreeController(null));
    });

    it("Can predict empty contianer", () => {
        let mockGatedNode: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode.GatePosition).thenReturn(GatePosition.Left);

        let mockGatedTree: IGatedTree = mock<IGatedTree>();
        when(mockGatedTree.Depth).thenReturn(2);
        when(mockGatedTree.NumberOfNodes).thenReturn(3);
        when(mockGatedTree.Nodes).thenReturn([instance(mockGatedNode), instance(mockGatedNode), instance(mockGatedNode)]);
        let tree: IGatedTree = instance(mockGatedTree);

        let controller = new GatedTreeController(tree);
        let emptyContainer = controller.PredictEmptyContainer();

        assert.equal(emptyContainer, 4);
    });

    it("Can run balls", () => {
        let numberOfRuns = 0;

        let mockGatedTree: IGatedTree = mock<IGatedTree>();
        when(mockGatedTree.Depth).thenReturn(2);
        when(mockGatedTree.NumberOfNodes).thenReturn(3);
        when(mockGatedTree.RunOneBall()).thenCall(() => numberOfRuns++);
        let tree: IGatedTree = instance(mockGatedTree);

        let controller = new GatedTreeController(tree);
        controller.RunBalls();

        assert.equal(numberOfRuns, 3);
    });

    it("Can reset", () => {
        let resetCalled = false;

        let mockGatedTree: IGatedTree = mock<IGatedTree>();
        when(mockGatedTree.Depth).thenReturn(2);
        when(mockGatedTree.NumberOfNodes).thenReturn(3);
        when(mockGatedTree.Reset()).thenCall(() => resetCalled = true);
        let tree: IGatedTree = instance(mockGatedTree);

        let controller = new GatedTreeController(tree);
        controller.Reset();

        assert.equal(resetCalled, true);
    });

    it("Can check empty contianer", () => {
        let mockGatedNode1: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode1.GatePosition).thenReturn(GatePosition.Right);
        when(mockGatedNode1.BallsPassedToLeft).thenReturn(2);
        when(mockGatedNode1.GatePosition).thenReturn(1);

        let mockGatedNode2: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode2.GatePosition).thenReturn(GatePosition.Left);
        when(mockGatedNode2.BallsPassedToLeft).thenReturn(1);
        when(mockGatedNode2.GatePosition).thenReturn(1);

        let mockGatedNode3: IGatedNode = mock<IGatedNode>();
        when(mockGatedNode3.GatePosition).thenReturn(GatePosition.Left);
        when(mockGatedNode3.BallsPassedToLeft).thenReturn(0);
        when(mockGatedNode3.GatePosition).thenReturn(1);

        let mockGatedTree: IGatedTree = mock<IGatedTree>();
        when(mockGatedTree.Depth).thenReturn(2);
        when(mockGatedTree.NumberOfNodes).thenReturn(3);
        when(mockGatedTree.Nodes).thenReturn([instance(mockGatedNode1), instance(mockGatedNode2), instance(mockGatedNode3)]);
        let tree: IGatedTree = instance(mockGatedTree);

        let controller = new GatedTreeController(tree);
        let emptyContainer = controller.CheckEmptyContainer();

        assert.equal(emptyContainer, 3);
    });
});