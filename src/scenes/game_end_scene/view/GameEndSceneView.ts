import {Application} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GameEndSceneView extends BasicSceneView {
	public template: string = "GameEndScene";

	constructor() {
		super();
		this.content.interactive = true;
	}

	public drawTemplate(sceneSize: TNJDimensions): void {
		this.app = new Application({
			width       : sceneSize.width,
			height      : sceneSize.height,
			transparent : true
		});
		this.app.stage.addChild(this.background);
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "end-scene";
		this.nodeScene.id = "end-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
	}
}
