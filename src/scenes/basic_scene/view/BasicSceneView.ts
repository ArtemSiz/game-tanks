import {Application, Container, Point} from "pixi.js";

export class BasicSceneView {
	public nodeScene!: HTMLElement;
	private _app!: Application;
	protected _root!: Container;
	private _content!: Container;
	private _display: Container;
	private _background!: Container;
	private _scenes: { [id: string]: any };

	constructor() {
		this._root = new Container();
		this._root.name = "root";
		this._root.position = new Point(0, 0);
		this._scenes = {};
		this._display = new Container();
		this.initBackground();
		this.initContent();
	}

	// TODO researching
	public addScene(scene: any): void {
		scene.display.visible = false;
		this._scenes[scene.name] = scene;
		this._content.addChild(scene.display);
	}

	protected initBackground(): void {
		this._background = new Container();
		this.display.addChild(this._background);
	}

	protected initContent(): void {
		this._content = new Container();
		this._content.name = "content";
		this.display.addChild(this._content);
	}

	public get app(): Application {
		return this._app;
	}

	public set app(application: Application) {
		this._app = application;
	}

	public get background(): Container {
		return this._background;
	}

	public get content(): Container {
		return this._content;
	}

	public get display(): Container {
		return this._display;
	}
}
