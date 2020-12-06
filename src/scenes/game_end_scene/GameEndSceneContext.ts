import {ECommandName} from "../../enum/ECommandName";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GameEndSceneDrawTemplateCommand} from "./controller/commands/GameEndSceneDrawTemplateCommand";
import {GameEndSceneController} from "./controller/GameEndSceneController";
import {GameEndSceneModel} from "./model/GameEndSceneModel";
import {GameEndSceneView} from "./view/GameEndSceneView";

export class GameEndSceneContext
	extends AbstractContext<GameEndSceneModel, GameEndSceneView, GameEndSceneController> {
	private _model!: GameEndSceneModel;
	private _view!: GameEndSceneView;
	private _controller!: GameEndSceneController;

	public initialize() {
		// tslint:disable-next-line:no-console
		console.log("init GameEndSceneContext");
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		// TODO It's temp
		this.drawTemplate();
	}

	public drawTemplate(): void {
		this._controller.executeCommand(ECommandName.DRAW_TEMPLATE);
	}

	public getModel(): GameEndSceneModel {
		return this._model;
	}

	public getView(): GameEndSceneView {
		return this._view;
	}

	public getController(): GameEndSceneController {
		return this._controller;
	}

	private createModel(): void {
		this._model = new GameEndSceneModel();
	}

	private createView(): void {
		this._view = new GameEndSceneView();
	}

	private createController(): void {
		this._controller = new GameEndSceneController(this);
	}

	private registerCommands(): void {
		this._controller!.registerCommand(ECommandName.DRAW_TEMPLATE, GameEndSceneDrawTemplateCommand);
	}
}
