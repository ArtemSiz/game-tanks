import {EUiComponentName} from "../../enum/EUiComponentName";
import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent";
import {LoadingBarBG} from "./LoadingBarBG";
import {LoadingBarProgress} from "./LoadingBarProgress";
import {Rectangle} from "./Rectangle";

export class LoadingBarComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.LOADING_BAR;
	private readonly _bg: Rectangle;
	private readonly _bar: Rectangle;
	private _progress: number = 0;

	constructor() {
		super();
		this._bg = new LoadingBarBG().draw();
		this._bar = new LoadingBarProgress().draw();
		this._bar.position.set(5, 5);
		this.updateProgress(this._progress);
		this.addChild(this._bg, this._bar);
	}

	public updateProgress(progress: number): void {
		this._progress = progress;
		this._bar.width = Math.ceil((this._bar.defaultWidth / 100) * progress);
	}
}
