import {ECommandName} from "../../enum/ECommandName";
import {GameMainSceneDrawTemplateCommand} from "../game_main_scene/controller/commands/GameMainSceneDrawTemplateCommand";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GamePreloaderSceneDrawTemplateCommand} from "./controller/commands/GamePreloaderSceneDrawTemplateCommand";
import {GamePreloaderSceneLoadAssetsCommand} from "./controller/commands/GamePreloaderSceneLoadAssetsCommand";
import {GamePreloaderSceneLoadingCompletedCommand} from "./controller/commands/GamePreloaderSceneLoadingCompletedCommand";
import {GamePreloaderSceneController} from "./controller/GamePreloaderSceneController";
import {GamePreloaderSceneModel} from "./model/GamePreloaderSceneModel";
import {GamePreloaderSceneView} from "./view/GamePreloaderSceneView";

export class GamePreloaderSceneContext extends
	AbstractContext<GamePreloaderSceneModel, GamePreloaderSceneView, GamePreloaderSceneController> {
	private _model!: GamePreloaderSceneModel;
	private _view!: GamePreloaderSceneView;
	private _controller!: GamePreloaderSceneController;

	public initialize() {
		// tslint:disable-next-line:no-console
		console.log("init GamePreloaderSceneContext");
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		this.drawTemplate();
		this.startLoading();
		this.registerEventListeners();
	}

	public drawTemplate(): void {
		this._controller.executeCommand(ECommandName.DRAW_TEMPLATE);
	}

	public getModel(): GamePreloaderSceneModel {
		return this._model;
	}

	public getView(): GamePreloaderSceneView {
		return this._view;
	}

	public getController(): GamePreloaderSceneController {
		return this._controller;
	}

	private createModel(): void {
		this._model = new GamePreloaderSceneModel();
	}

	private createController(): void {
		this._controller = new GamePreloaderSceneController(this);
	}

	private createView(): void {
		this._view = new GamePreloaderSceneView();
	}

	private registerCommands(): void {
		this._controller.registerCommand(ECommandName.DRAW_TEMPLATE, GamePreloaderSceneDrawTemplateCommand);
		this._controller.registerCommand(ECommandName.LOAD_ASSETS, GamePreloaderSceneLoadAssetsCommand);
		this._controller.registerCommand(ECommandName.LOADING_COMPLETED, GamePreloaderSceneLoadingCompletedCommand);
	}

	private registerEventListeners(): void {
		this._model.loader.onAssetsLoaded.add(() => {
			this._controller.executeCommand(ECommandName.LOADING_COMPLETED);
		});
	}

	private startLoading(): void {
		this._controller.executeCommand(ECommandName.LOAD_ASSETS);
	}
}
