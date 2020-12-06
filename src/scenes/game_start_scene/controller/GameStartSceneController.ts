import {isNil} from "lodash";
import {TFunctionMap} from "../../../type/TFunctionMap";
import {GameStartSceneContext} from "../GameStartSceneContext";

export class GameStartSceneController {
	private _commandMap: TFunctionMap;
	private _context: GameStartSceneContext;

	constructor(context: GameStartSceneContext) {
		this._commandMap = {};
		// tslint:disable-next-line:no-console
		console.log("init GameStartSceneContext");
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

	public get context(): GameStartSceneContext {
		return this._context;
	}

	public set context(value: GameStartSceneContext) {
		this._context = value;
	}
}
