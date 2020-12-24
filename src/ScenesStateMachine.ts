import {isNil} from "lodash";
import {Ticker} from "pixi.js";
import {GameEndSceneContext} from "./scenes/game_end_scene/GameEndSceneContext";
import {GameMainSceneContext} from "./scenes/game_main_scene/GameMainSceneContext";
import {GamePreloaderSceneContext} from "./scenes/game_preloader_scene/GamePreloaderSceneContext";
import {GameStartSceneContext} from "./scenes/game_start_scene/GameStartSceneContext";
import {TContext} from "./type/TContext";

class ScenesStateMachine {
	public states: Array<TContext>;
	private _current: TContext;
	private _ticker: Ticker;
	constructor() {
		this.states = [
			new GameStartSceneContext(),
			new GamePreloaderSceneContext(),
			new GameMainSceneContext(),
			new GameEndSceneContext()
		];
		this._current = this.states[0];
	}

	public change() {
		const  total: number = this.states.length;
		let index: number = this.states.findIndex(scene => scene === this._current);
		if (index + 1 < total) {
			this._current = this.states[index + 1];
		} else {
			this._current = this.states[0];
		}
		this.createTicker();
	}

	public get currentContext(): TContext {
		return this._current;
	}

	public createTicker(): void {
		this._ticker = Ticker.shared;
	}

	public tickerStop(): void {
		this._ticker.stop();
	}

	public onUpdateFrame() {
		if (!isNil(this._current) && this._current.updateFrame) {
			this._ticker.add(this._current.updateFrame, this._current);
		}
	}
}

export const scenesStateMachine = new ScenesStateMachine();
