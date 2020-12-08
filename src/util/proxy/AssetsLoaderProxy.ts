import {IResourceDictionary, Loader} from "pixi.js";
import {Signal} from "signals";

export class AssetsLoaderProxy {
	public onAssetsLoaded!: Signal;
	private _loader!: Loader;
	private _exist: boolean = false;

	constructor() {
		this.initLoader();
		this.initLoaderEvents();
	}

	public get resources(): IResourceDictionary {
		return this._loader.resources;
	}

	public loadAssets(nameAsset: string, path: string): void {
		this._loader.add(nameAsset, path)
			.load();
	}

	private initLoader(): void {
		this.onAssetsLoaded = new Signal();
		this._loader = Loader.shared;
	}

	private initLoaderEvents(): void {
		this._loader.onProgress.add((loader: Loader) => {
			// tslint:disable-next-line:no-console
			console.log("progress==", loader.progress);
		});

		this._loader.onError.add((error: Error, loader: Loader) => {
				// tslint:disable-next-line:no-console
				console.log(error);
			}
		);
		this._loader.onComplete.add(() => {
			this.onAssetsLoaded.dispatch();
		});
	}
}
