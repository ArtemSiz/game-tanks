import {IResourceDictionary, Loader} from "pixi.js";
import {Signal} from "signals";

export class AssetsLoaderProxy {
	public onAssetsLoaded!: Signal;
	public onAssetsLoadingProgress!: Signal;
	private static _exist: boolean = false;
	private static _instance: AssetsLoaderProxy;
	private _loader: Loader;

	constructor() {
		if (AssetsLoaderProxy._exist) {
			return AssetsLoaderProxy._instance;
		}
		AssetsLoaderProxy._instance = this;
		AssetsLoaderProxy._exist = true;
		this.initSignals();
		this.initLoader();
		this.initLoaderEvents();
	}

	public get resources(): IResourceDictionary {
		return this._loader.resources;
	}

	public get loader(): Loader {
		return this._loader;
	}

	public loadAssets(nameAsset: string, path: string): void {
		this._loader.add(nameAsset, path)
			.load();
	}

	private initSignals(): void {
		this.onAssetsLoaded = new Signal();
		this.onAssetsLoadingProgress = new Signal();
	}

	private initLoader(): void {
		this._loader = Loader.shared;
	}

	private initLoaderEvents(): void {
		this._loader.onProgress.add((loader: Loader) => {
			this.onAssetsLoadingProgress.dispatch(loader.progress);
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
