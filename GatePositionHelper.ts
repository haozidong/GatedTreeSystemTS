import { GatePosition } from "./GatePosition"

/**
 * A helper class for GatePosition.
 * 
 * @public
 * */
export class GatePositionHelper {
    /**
     * A random integer number generater.
     * 
     * @param max The max generater returns.
     */
    private static GetRandomInteger(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * Generate a radom GatePosition
     * */
    public static GetRandomGatePosition(): GatePosition {
        return GatePositionHelper.GetRandomInteger(2) == 0 ? GatePosition.Left : GatePosition.Right;
    }
}