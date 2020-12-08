import {Application, IResourceDictionary, Sprite} from "pixi.js";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {Util} from "../../../util/Util";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";

export class GameMainSceneView extends BasicSceneView {
	public template: string = "GameMainScene";

	constructor() {
		super();
		this.content.interactive = true;
	}

	public drawTemplate(sceneSize: TNJDimensions, resources: IResourceDictionary): void {
		this.app = new Application({
			width       : sceneSize.width,
			height      : sceneSize.height,
			transparent : true,
			backgroundColor: Util.colors.bgColor
		});
		this.app.stage.addChild(this.background);
		// TODO it is temporary
		const sheet = resources["spritesheet"].spritesheet;
		// tslint:disable-next-line:no-console
		const eagle = Sprite.from(sheet!.textures["eagle.png"]);
		this.content.addChild(eagle);
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "main-scene";
		this.nodeScene.id = "main-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
	}
}
