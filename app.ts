import { IGatedNodeCreator, GatedNodeCreator, IGatedTree, GatedTree, IGatedTreeController, GatedTreeController } from "./GatedTreeSystem";

try {
    //Set depth default as 4;
    let depth = 4;

    console.log("Try to initialize a new system with depth as:", depth);

    let nodeCreator: IGatedNodeCreator = new GatedNodeCreator();
    let tree: IGatedTree = new GatedTree(depth, nodeCreator);
    let controller: IGatedTreeController = new GatedTreeController(tree);

    console.log("Ready!");

    console.log("The initial state of the system (node will be printed as \"gate direction (0, 0)\", for gate direction, \/ means left, and \\ means right):");
    console.log(tree.toString());

    console.log("Let's predict which contianer will not receive a ball, the contianer should be:");
    let predicatedEmptyContainer = controller.PredictEmptyContainer();
    console.log(predicatedEmptyContainer);

    console.log("Now pass all the balls through the system:");
    controller.RunBalls();
    console.log("Done!");

    console.log("The contianer that did not receive a ball is:");
    let actualEmptyContainer = controller.CheckEmptyContainer();
    console.log(actualEmptyContainer);

    console.log("Prediction matches outcome?");
    console.log(actualEmptyContainer == predicatedEmptyContainer);

    console.log("The state of the system after all balls passed through (node will be printed as \"gate direction (balls passed to left, balls passed to right)\"):");
    console.log(tree.toString());
}
catch (e)
{
    console.log(e);
}