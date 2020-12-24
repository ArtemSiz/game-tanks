import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameMainSceneModel} from "../../model/GameMainSceneModel";
import {GameMainSceneView} from "../../view/GameMainSceneView";

export class GameMainSceneUpdateFrameCommand extends AbstractCommand<GameMainSceneModel, GameMainSceneView> {
	public execute(): void {

	}

}
