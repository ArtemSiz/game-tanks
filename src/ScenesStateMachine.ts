import {GameEndSceneContext} from "./scenes/game_end_scene/GameEndSceneContext";
import {GameMainSceneContext} from "./scenes/game_main_scene/GameMainSceneContext";
import {GamePreloaderSceneContext} from "./scenes/game_preloader_scene/GamePreloaderSceneContext";
import {GameStartSceneContext} from "./scenes/game_start_scene/GameStartSceneContext";
import {TScene} from "./type/TScene";

class ScenesStateMachine {
	public states: Array<TScene>;
	private _current: TScene;
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
	}

	public get currentScene(): TScene {
		return this._current;
	}
}

export const scenesStateMachine = new ScenesStateMachine();
