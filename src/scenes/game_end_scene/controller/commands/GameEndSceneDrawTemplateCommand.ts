import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameEndSceneModel} from "../../model/GameEndSceneModel";
import {GameEndSceneView} from "../../view/GameEndSceneView";

export class GameEndSceneDrawTemplateCommand extends AbstractCommand<GameEndSceneModel, GameEndSceneView> {
	public execute(): void {
		this.view.drawTemplate(this.model.sceneSize);
	}
}
