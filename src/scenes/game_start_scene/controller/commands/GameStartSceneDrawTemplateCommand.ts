import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameStartSceneModel} from "../../model/GameStartSceneModel";
import {GameStartSceneView} from "../../view/GameStartSceneView";

export class GameStartSceneDrawTemplateCommand extends AbstractCommand<GameStartSceneModel, GameStartSceneView> {
	public execute(): void {
		this.view.drawTemplate();
	}
}
