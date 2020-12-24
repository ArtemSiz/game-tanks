import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GamePreloaderSceneModel} from "../../model/GamePreloaderSceneModel";
import {GamePreloaderSceneView} from "../../view/GamePreloaderSceneView";

export class GamePreloaderSceneDrawTemplateCommand
	extends AbstractCommand<GamePreloaderSceneModel, GamePreloaderSceneView> {

	public execute(): void {
		this.view.drawTemplate();
	}
}
