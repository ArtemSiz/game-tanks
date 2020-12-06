import {ECommandName} from "../../enum/ECommandName";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GameMainSceneDrawTemplateCommand} from "./controller/commands/GameMainSceneDrawTemplateCommand";
import {GameMainSceneController} from "./controller/GameMainSceneController";
import {GameMainSceneModel} from "./model/GameMainSceneModel";
import {GameMainSceneView} from "./view/GameMainSceneView";

export class GameMainSceneContext
	extends AbstractContext<GameMainSceneModel, GameMainSceneView, GameMainSceneController> {
	private _model!: GameMainSceneModel;
	private _view!: GameMainSceneView;
	private _controller!: GameMainSceneController;

	public initialize() {
		// tslint:disable-next-line:no-console
		console.log("init GameMainSceneContext");
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		// TODO It's temp
		this._model.onGameDataReceived.add(() => {
			this.startLoading();
		});
		this._model.onGameDataReceived.dispatch();

	}

	public startLoading(): void {
		this._controller.executeCommand(ECommandName.DRAW_TEMPLATE);
	}

	public getModel(): GameMainSceneModel {
		return this._model;
	}

	public getView(): GameMainSceneView {
		return this._view;
	}

	public getController(): GameMainSceneController {
		return this._controller;
	}

	private createModel(): void {
		this._model = new GameMainSceneModel();
	}

	private createView(): void {
		this._view = new GameMainSceneView();
	}

	private createController(): void {
		this._controller = new GameMainSceneController(this);
	}

	private registerCommands(): void {
		this._controller!.registerCommand(ECommandName.DRAW_TEMPLATE, GameMainSceneDrawTemplateCommand);
	}
}
