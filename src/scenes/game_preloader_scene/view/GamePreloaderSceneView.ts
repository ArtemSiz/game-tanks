import {Application} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {Util} from "../../../util/Util";
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
			transparent : true,
			backgroundColor: Util.colors.bgColor
		});
		this.app.stage.addChild(this.background);
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "preloader-scene";
		this.nodeScene.id = "preloader-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
	}
}
