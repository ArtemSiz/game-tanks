import {ESoundNames} from "../../../../enum/ESoundNames";
import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GamePreloaderSceneModel} from "../../model/GamePreloaderSceneModel";
import {GamePreloaderSceneView} from "../../view/GamePreloaderSceneView";

export class GamePreloaderSceneLoadAssetsCommand
	extends AbstractCommand<GamePreloaderSceneModel, GamePreloaderSceneView> {
	public execute(): void {
		const loader = this.model.loader;
		loader.loader.add(ESoundNames.SHOT, ESoundNames.SHOT);
		loader.loader.add(ESoundNames.EXPLODE, ESoundNames.EXPLODE);
		loader.loader.add(ESoundNames.BONUS, ESoundNames.BONUS);
		loader.loader.add(ESoundNames.HIT, ESoundNames.HIT);
		loader.loader.add(ESoundNames.WIN, ESoundNames.WIN);
		loader.loader.add(ESoundNames.LOSE, ESoundNames.LOSE);
		loader.loadAssets("spritesheet", "assets/img/spritesheet.json");
	}
}
