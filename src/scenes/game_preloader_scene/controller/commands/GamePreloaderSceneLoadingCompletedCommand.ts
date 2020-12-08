import {isNil} from "lodash";
import {scenesStateMachine} from "../../../../ScenesStateMachine";
import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GamePreloaderSceneModel} from "../../model/GamePreloaderSceneModel";
import {GamePreloaderSceneView} from "../../view/GamePreloaderSceneView";

export class GamePreloaderSceneLoadingCompletedCommand
	extends AbstractCommand<GamePreloaderSceneModel, GamePreloaderSceneView> {
	public execute(): void {
		this.goToMainScene();
	}

	private goToMainScene(): void {
		scenesStateMachine.change();
		const currentScene = scenesStateMachine.currentScene;
		currentScene.initialize();
		// TODO need to research, hide preloader-scene
		const startScene = document.getElementById("preloader-scene");
		if (!isNil(startScene)) startScene.style.display = "none";
	}

}
