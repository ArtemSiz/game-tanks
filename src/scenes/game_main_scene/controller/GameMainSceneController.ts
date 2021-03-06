import {isNil} from "lodash";
import {TFunctionMap} from "../../../type/TFunctionMap";
import {BasicSceneController} from "../../basic_scene/controller/BasicSceneController";
import {GameMainSceneContext} from "../GameMainSceneContext";

export class GameMainSceneController extends BasicSceneController {
	private _commandMap: TFunctionMap;
	private _context: GameMainSceneContext;

	constructor(context: GameMainSceneContext) {
		super();
		this._commandMap = {};
		this._context = context;
	}

	public registerCommand(name: string, classImpl: Function): void {
		if (this.hasCommand(name)) {
			throw new Error("Error register command:" + name + ", already registered");
		}
		this._commandMap[name] = classImpl;
	}

	public executeCommand(name: string): void {
		if (!this.hasCommand(name)) {
			throw new Error("Error execute not registered command.");
		}
		let cmdConstructor: any = this._commandMap[name];
		const cmd = new cmdConstructor(this.context.getModel(), this.context.getView());
		cmd.execute();
	}

	public hasCommand(name: string): boolean {
		return !isNil(this._commandMap[name]);
	}

	public get context(): GameMainSceneContext {
		return this._context;
	}

	public set context(value: GameMainSceneContext) {
		this._context = value;
	}
}
