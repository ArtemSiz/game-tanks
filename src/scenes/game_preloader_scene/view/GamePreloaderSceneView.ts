import {Application} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GamePreloaderSceneView extends BasicSceneView {

	constructor() {
		super();
		this.content.interactive = false;
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
		this._node.className = "preloader-scene";
		this._node.id = "preloader-scene";
		this._node.appendChild(this.app.view);
		document.body.append(this._node);
	}
}
