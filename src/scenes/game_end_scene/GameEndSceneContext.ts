import {ECommandName} from "../../enum/ECommandName";
import {ISound} from "../../interface/ISound";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GameEndSceneDrawTemplateCommand} from "./controller/commands/GameEndSceneDrawTemplateCommand";
import {GameEndSceneController} from "./controller/GameEndSceneController";
import {GameEndSceneModel} from "./model/GameEndSceneModel";
import {GameEndSceneView} from "./view/GameEndSceneView";

export class GameEndSceneContext
	extends AbstractContext<GameEndSceneModel, GameEndSceneView, GameEndSceneController> {
	private _model: GameEndSceneModel;
	private _view: GameEndSceneView;
	private _soundManager: ISound;
	private _controller: GameEndSceneController;

	public initialize(status?: boolean, soundManager?: ISound) {
		this.createController();
		this.createModel();
		this._model.isWin = status;
		this._soundManager = soundManager;
		this.createView();
		this.registerCommands();
		this.drawTemplate();
		this.playSound();
	}

	public drawTemplate(): void {
		this._controller.executeCommand(ECommandName.END_SCENE_DRAW_TEMPLATE);
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
		this._view = new GameEndSceneView(this._model.sceneSize);
	}

	private createController(): void {
		this._controller = new GameEndSceneController(this);
	}

	private registerCommands(): void {
		this._controller.registerCommand(ECommandName.END_SCENE_DRAW_TEMPLATE, GameEndSceneDrawTemplateCommand);
	}

	private playSound(): void {
		if (this._model.isWin) {
			this._soundManager.win();
		} else {
			this._soundManager.lose();
		}
	}
}
