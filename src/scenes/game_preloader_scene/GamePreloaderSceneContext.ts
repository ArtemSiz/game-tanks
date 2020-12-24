import {ECommandName} from "../../enum/ECommandName";
import {LoadingBarComponent} from "../../ui_components/loadingBar/LoadingBarComponent";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GamePreloaderSceneDrawTemplateCommand} from "./controller/commands/GamePreloaderSceneDrawTemplateCommand";
import {GamePreloaderSceneLoadAssetsCommand} from "./controller/commands/GamePreloaderSceneLoadAssetsCommand";
import {GamePreloaderSceneLoadingCompletedCommand} from "./controller/commands/GamePreloaderSceneLoadingCompletedCommand";
import {GamePreloaderSceneController} from "./controller/GamePreloaderSceneController";
import {GamePreloaderSceneModel} from "./model/GamePreloaderSceneModel";
import {GamePreloaderSceneView} from "./view/GamePreloaderSceneView";


export class GamePreloaderSceneContext extends
	AbstractContext<GamePreloaderSceneModel, GamePreloaderSceneView, GamePreloaderSceneController> {
	private _model: GamePreloaderSceneModel;
	private _view: GamePreloaderSceneView;
	private _controller: GamePreloaderSceneController;
	private _loadingBar: LoadingBarComponent;

	public initialize() {
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		this.addLoadingBar();
		this.drawTemplate();
		this.startLoading();
		this.registerEventListeners();
	}

	public drawTemplate(): void {
		this._controller.executeCommand(ECommandName.PRELOADER_SCENE_DRAW_TEMPLATE);
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

	public updateFrame(): void {
		this._loadingBar.updateProgress(this._model.loadingProgress);
	}

	private addLoadingBar(): void {
		this._loadingBar = new LoadingBarComponent();
		this._view.alignComponentCenterX(this._loadingBar);
		this._view.alignComponentCenterY(this._loadingBar);
		this._view.content.addChild(this._loadingBar);
	}

	private createModel(): void {
		this._model = new GamePreloaderSceneModel();
	}

	private createController(): void {
		this._controller = new GamePreloaderSceneController(this);
	}

	private createView(): void {
		this._view = new GamePreloaderSceneView(this._model.sceneSize);
	}

	private registerCommands(): void {
		this._controller.registerCommand(ECommandName.PRELOADER_SCENE_DRAW_TEMPLATE, GamePreloaderSceneDrawTemplateCommand);
		this._controller.registerCommand(ECommandName.LOAD_ASSETS, GamePreloaderSceneLoadAssetsCommand);
		this._controller.registerCommand(ECommandName.LOADING_COMPLETED, GamePreloaderSceneLoadingCompletedCommand);
	}

	private registerEventListeners(): void {
		this._model.loader.onAssetsLoaded.add(() => {
			this._controller.executeCommand(ECommandName.LOADING_COMPLETED);
		});
		this._model.loader.onAssetsLoadingProgress.add((progress) => {
			this._model.loadingProgress = progress;
		});
	}

	private startLoading(): void {
		this._controller.executeCommand(ECommandName.LOAD_ASSETS);
	}
}
