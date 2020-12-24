import {ETextureName} from "../enum/ETextureName";
import {EUiComponentName} from "../enum/EUiComponentName";
import {IComponent} from "../interface/IComponent";
import {AbstractComponent} from "./AbstractComponent";

export class BaseComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.BASE;
	public requiredTextures: string = ETextureName.EAGLE;
	public lifeCount: number = 1;
	public isDestroyed: boolean = false;

	public getDamage(): void {
		this.lifeCount -= 1;
		if (this.lifeCount === 0) {
			this.gameOver();
		}
	}

	private gameOver(): void {
		this.visible = false;
		this.x = -100;
		this.isDestroyed = true;
	}
}
