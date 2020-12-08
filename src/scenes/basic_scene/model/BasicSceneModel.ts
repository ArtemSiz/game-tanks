import {AssetsLoaderProxy} from "../../../util/proxy/AssetsLoaderProxy";

export class BasicSceneModel {
	public sceneSize = {width : 1024, height : 768};
	public loader!: AssetsLoaderProxy;

	constructor() {
		this.initLoader();
	}

	private initLoader() {
		this.loader = new AssetsLoaderProxy();
	}
}
