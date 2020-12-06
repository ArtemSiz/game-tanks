import {ScenesStateMachine} from "./ScenesStateMachine";

const scenesStateMachine = new ScenesStateMachine();
scenesStateMachine.change();
scenesStateMachine.change();
const currentScene = scenesStateMachine.currentScene;
currentScene.initialize();

