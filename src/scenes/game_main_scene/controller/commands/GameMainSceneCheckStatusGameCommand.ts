import {isNil} from "lodash";
import {scenesStateMachine} from "../../../../ScenesStateMachine";
import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameMainSceneModel} from "../../model/GameMainSceneModel";
import {GameMainSceneView} from "../../view/GameMainSceneView";

export class GameMainSceneCheckStatusGameCommand extends AbstractCommand<GameMainSceneModel, GameMainSceneView> {
	public execute(): void {
		this.model.onGameOver.add((res: {isWin: boolean}) => {
			scenesStateMachine.change();
			const currentContext = scenesStateMachine.currentContext;
			currentContext.initialize(res.isWin, this.model.soundManager);
			// TODO need to research, hide main-scene
			const mainScene = document.getElementById("main-scene");
			if (!isNil(mainScene)) mainScene.style.display = "none";
			scenesStateMachine.tickerStop();
		});

	}
}
