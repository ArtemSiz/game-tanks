import {ECommandName} from "../../enum/ECommandName";
import {GameMainSceneDrawTemplateCommand} from "../game_main_scene/controller/commands/GameMainSceneDrawTemplateCommand";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GameStartSceneDrawTemplateCommand} from "./controller/commands/GameStartSceneDrawTemplateCommand";
import {GameStartSceneController} from "./controller/GameStartSceneController";
import {GameStartSceneModel} from "./model/GameStartSceneModel";
import {GameStartSceneView} from "./view/GameStartSceneView";

export class GameStartSceneContext
	extends AbstractContext<GameStartSceneModel, GameStartSceneView, GameStartSceneController> {
	private _model!: GameStartSceneModel;
	private _view!: GameStartSceneView;
	private _controller!: GameStartSceneController;

	public initialize() {
		// tslint:disable-next-line:no-console
		console.log("init GameStartSceneContext");
		this.createModel();
		this.createView();
		this.createController();
		this.registerCommands();
		this.startLoading();
	}

	public startLoading(): void {
		this._controller.executeCommand(ECommandName.DRAW_TEMPLATE);
	}

	public getModel(): GameStartSceneModel {
		return this._model;
	}

	public getView(): GameStartSceneView {
		return this._view;
	}

	public getController(): GameStartSceneController {
		return this._controller;
	}

	private createModel(): void {
		this._model = new GameStartSceneModel();
	}

	private createView(): void {
		this._view = new GameStartSceneView();
	}

	private createController(): void {
		this._controller = new GameStartSceneController(this);
	}

	private registerCommands(): void {
		this._controller!.registerCommand(ECommandName.DRAW_TEMPLATE, GameStartSceneDrawTemplateCommand);
	}
}
