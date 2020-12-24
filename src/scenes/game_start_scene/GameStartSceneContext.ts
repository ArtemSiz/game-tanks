import {ECommandName} from "../../enum/ECommandName";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GameStartSceneDrawTemplateCommand} from "./controller/commands/GameStartSceneDrawTemplateCommand";
import {GameStartScenePressStartButtonCommand} from "./controller/commands/GameStartScenePressStartButtonCommand";
import {GameStartSceneController} from "./controller/GameStartSceneController";
import {GameStartSceneModel} from "./model/GameStartSceneModel";
import {GameStartSceneView} from "./view/GameStartSceneView";

export class GameStartSceneContext
	extends AbstractContext<GameStartSceneModel, GameStartSceneView, GameStartSceneController> {
	private _model: GameStartSceneModel;
	private _view: GameStartSceneView;
	private _controller: GameStartSceneController;

	public initialize() {
		this.createModel();
		this.createView();
		this.createController();
		this.registerCommands();
		this.startLoading();
	}

	public startLoading(): void {
		this._controller.executeCommand(ECommandName.START_SCENE_DRAW_TEMPLATE);
		this._controller.executeCommand(ECommandName.PRESS_START_BUTTON);
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
		this._view = new GameStartSceneView(this._model.sceneSize);
	}

	private createController(): void {
		this._controller = new GameStartSceneController(this);
	}

	private registerCommands(): void {
		this._controller!.registerCommand(ECommandName.START_SCENE_DRAW_TEMPLATE, GameStartSceneDrawTemplateCommand);
		this._controller!.registerCommand(ECommandName.PRESS_START_BUTTON, GameStartScenePressStartButtonCommand);
	}
}
