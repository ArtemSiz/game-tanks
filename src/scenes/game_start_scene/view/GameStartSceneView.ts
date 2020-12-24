import {Sprite, Text} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GameStartSceneView extends BasicSceneView{
	public buttonStart!: Sprite;

	constructor(sceneSize: TNJDimensions) {
		super(sceneSize);
		this.content.interactive = true;
	}

	public drawTemplate(): void {
		this.addContentItems();
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "start-scene";
		this.nodeScene.id = "start-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
	}

	private addContentItems(): void {
		const titleText = new Text("Tank Game", {
			fontFamily: "serif",
			fontSize: 50,
			fontWeight: "bold",
			fill: "#ffffff"
		});
		titleText.anchor.set(0.5);
		titleText.position.set(this.app.screen.width / 2, this.app.screen.height / 3);
		this.content.addChild(titleText);
		this.buttonStart = Sprite.from("./assets/img/button.png");
		this.buttonStart.interactive = true;
		this.buttonStart.buttonMode = true;
		this.buttonStart.anchor.set(0.5);
		this.buttonStart.position.set(this.app.screen.width / 2, this.app.screen.height / 1.5);
		this.content.addChild(this.buttonStart);
	}
}
