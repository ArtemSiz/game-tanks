import {Application} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GameStartSceneView extends BasicSceneView{
	public template: string = "GameStartScene";

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
		this._node = document.createElement("div");
		this._node.className = "start-scene";
		this._node.id = "start-scene";
		this._node.appendChild(this.app.view);
		document.body.append(this._node);
	}
}