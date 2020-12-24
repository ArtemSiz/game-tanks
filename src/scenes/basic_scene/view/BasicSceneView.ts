import {Application, Container} from "pixi.js";
import {ISize} from "../../../interface/ISize";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {Util} from "../../../util/Util";

export class BasicSceneView {
	public nodeScene: HTMLElement;
	private _app: Application;
	private _content: Container;
	private _display: Container;
	private _scenes: { [id: string]: any };

	constructor(sceneSize: TNJDimensions) {
		this.initApp(sceneSize);
		this._scenes = {};
		this._display = new Container();
		this.initContent();
	}

	public get app(): Application {
		return this._app;
	}

	public get content(): Container {
		return this._content;
	}

	public get display(): Container {
		return this._display;
	}

	public get screenSize(): ISize {
		return {
			height: this._app.screen.height,
			width: this._app.screen.width
		};
	}

	private initApp(sceneSize: TNJDimensions): void {
		this._app = new Application({
			width       : sceneSize.width,
			height      : sceneSize.height,
			transparent : true,
			backgroundColor: Util.colors.bgColor
		});
	}

	private initContent(): void {
		this._content = new Container();
		this._content.name = "content";
		this.display.addChild(this._content);
	}
}
