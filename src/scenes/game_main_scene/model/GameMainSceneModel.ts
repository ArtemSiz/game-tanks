import {Signal} from "signals";
import {BasicSceneModel} from "../../basic_scene/model/BasicSceneModel";

export class GameMainSceneModel extends BasicSceneModel {
	public availableScene: Array<string> = ["Loading", "Menu", "highScore", "game"];
	public highScore: number = 0;
	public notDefeated: boolean = true;
	public playerWon: boolean = true;
	public enemyCount: number = 10;
	public enemyLifeCount: number = 1;
	public playerlifeCount: number = 1;
	public playerSpeed: number = 10;
	public enemySpeed: number = 10;

	public onGameDataReceived: Signal = new Signal();

	constructor() {
		super();
		// tslint:disable-next-line:no-console
		console.log("init GameMainSceneModel");
		// tslint:disable-next-line:no-console
		console.log("scene size==", this.sceneSize);
	}
}
