import {Text} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GameEndSceneView extends BasicSceneView {
	private _status: boolean;

	constructor(sceneSize: TNJDimensions) {
		super(sceneSize);
		this.content.interactive = true;
	}

	public drawTemplate(status: boolean): void {
		this._status = status;
		this.addContentItems();
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "end-scene";
		this.nodeScene.id = "end-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
	}

	private addContentItems(): void {
		const style = {
			fontFamily : "serif",
			fontSize   : 50,
			fontWeight : "bold",
			fill       : "#ffffff"
		};
		const title = new Text("Game Over", style);
		title.anchor.set(0.5);
		title.position.set(this.app.screen.width / 2, this.app.screen.height / 3);
		const titleText = this._status ? "You win!" : "You lose!";
		const titleSecond = new Text(titleText, style);
		titleSecond.anchor.set(0.5);
		titleSecond.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
		this.content.addChild(title, titleSecond);
	}
}
