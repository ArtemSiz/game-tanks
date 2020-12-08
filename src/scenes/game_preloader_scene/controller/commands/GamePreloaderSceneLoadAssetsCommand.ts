import {AssetsLoaderProxy} from "../../../../util/proxy/AssetsLoaderProxy";
import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GamePreloaderSceneModel} from "../../model/GamePreloaderSceneModel";
import {GamePreloaderSceneView} from "../../view/GamePreloaderSceneView";

export class GamePreloaderSceneLoadAssetsCommand
	extends AbstractCommand<GamePreloaderSceneModel, GamePreloaderSceneView> {
	public execute(): void {
		// tslint:disable-next-line:no-console
		console.log("from GamePreloaderSceneLoadAssetsCommand");
		const loader = this.model.loader;
		loader.loadAssets("spritesheet", "../../../../../assets/img/spritesheet.json");
		// tslint:disable-next-line:no-console
		console.log("loader.resources==", loader.resources);
	}
}
