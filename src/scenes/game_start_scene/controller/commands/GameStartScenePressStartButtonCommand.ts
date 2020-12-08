import {isNil} from "lodash";
import {scenesStateMachine} from "../../../../ScenesStateMachine";
import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameStartSceneModel} from "../../model/GameStartSceneModel";
import {GameStartSceneView} from "../../view/GameStartSceneView";

export class GameStartScenePressStartButtonCommand extends AbstractCommand<GameStartSceneModel, GameStartSceneView> {
	public execute(): void {
		this.view.buttonStart.on("pointerdown", this.goToPreloaderScene);
	}

	private goToPreloaderScene(): void {
		scenesStateMachine.change();
		const currentScene = scenesStateMachine.currentScene;
		currentScene.initialize();
		// TODO need to research, hide start-scene
		const startScene = document.getElementById("start-scene");
		if (!isNil(startScene)) startScene.style.display = "none";
	}
}
