import { assert } from 'chai';
import 'mocha';

import { GatePosition } from "./GatePosition";
import { GatePositionHelper } from "./GatePositionHelper";

describe('Test cases for GatePositionHelper', () => {
    it('Can get random gate position', () => {
        let list = new Array();

        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());
        list.push(GatePositionHelper.GetRandomGatePosition());

        assert.include(list, GatePosition.Left);
        assert.include(list, GatePosition.Right);
    });
});