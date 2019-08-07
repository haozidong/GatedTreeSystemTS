/**
 * The controller of a gated tree system.
 * */
export interface IGatedTreeController {
    /**
     * Get the number of balls will be available.
     * */
    readonly NumberOfBalls: number;

    /**
     * Predict which container put under the bottom level of branches will not get a ball.
     * 
     * @returns A number representing the container which will not get a ball.
     * */
    PredictEmptyContainer(): number;

    /**
     * Run all the balls through the system one by one.
     * */
    RunBalls(): void;

    /**
     * Check and return which branch/container did not get a ball.
     * 
     * @returns A number representing the container which did not get a ball.
     * */
    CheckEmptyContainer(): number;

    /**
     * Reset the tree.
     * */
    Reset(): void;
}