import { assert } from 'chai';
import 'mocha';

import { GatedNode } from "./GatedNode";
import { GatePosition } from "./GatePosition";

describe('Test cases for GatedNode', () => {

    it('Can reset', () => {
        const node = new GatedNode(GatePosition.Left);
        node.Reset(GatePosition.Right);

        assert.equal(node.GatePosition, GatePosition.Right);
        assert.equal(node.BallsPassedToLeft, 0);
        assert.equal(node.BallsPassedToRight, 0);
    });

    it('Can run one ball', () => {
        const node = new GatedNode(GatePosition.Left);
        node.RunOneBall();

        assert.equal(node.GatePosition, GatePosition.Right);
        assert.equal(node.BallsPassedToLeft, 1);
        assert.equal(node.BallsPassedToRight, 0);
    });

    it('Can switch gate', () => {
        const node = new GatedNode(GatePosition.Left);
        node.SwitchGate();

        assert.equal(node.GatePosition, GatePosition.Right);
    });

    it('Can to string', () => {
        const node = new GatedNode(GatePosition.Left);

        let nodeString = node.toString();
        let expected = GatedNode.NODE_FORMAT.format(GatedNode.LEFT_GATE, "0", "0");

        assert.equal(expected, nodeString);

        node.RunOneBall();

        nodeString = node.toString();
        expected = GatedNode.NODE_FORMAT.format(GatedNode.RIGHT_GATE, "1", "0");

        assert.equal(expected, nodeString);

        node.RunOneBall();

        nodeString = node.toString();
        expected = GatedNode.NODE_FORMAT.format(GatedNode.LEFT_GATE, "1", "1");

        assert.equal(expected, nodeString);
    });
});