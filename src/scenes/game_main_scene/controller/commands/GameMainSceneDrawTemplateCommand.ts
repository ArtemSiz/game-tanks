import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameMainSceneModel} from "../../model/GameMainSceneModel";
import {GameMainSceneView} from "../../view/GameMainSceneView";

export class GameMainSceneDrawTemplateCommand extends AbstractCommand<GameMainSceneModel, GameMainSceneView> {
	public execute(): void {
		// tslint:disable-next-line:no-console
		console.log("execute GameMainSceneDrawTemplateCommand");
		// tslint:disable-next-line:no-console
		console.log("execute model==", this.model);
		// tslint:disable-next-line:no-console
		console.log("execute view==", this.view);
		this.view.drawTemplate(this.model.sceneSize);
	}
}