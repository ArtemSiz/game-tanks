import {Container, Sprite} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GamePreloaderSceneView extends BasicSceneView {

	constructor(sceneSize: TNJDimensions) {
		super(sceneSize);
		this.content.interactive = false;
	}

	public drawTemplate(): void {
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "preloader-scene";
		this.nodeScene.id = "preloader-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
	}

	public alignComponentCenterX(component: Container | Sprite): void {
		component.x = (this.screenSize.width - component.width) / 2;
	}

	public alignComponentCenterY(component: Container | Sprite): void {
		component.y = (this.screenSize.height - component.height) / 2;
	}
}
