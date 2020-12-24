import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent";

export class WallComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.WALL;
	public requiredTextures: string = ETextureName.WALL;
	public lifeCount: number = 1;
	public readonly isIndestructible: boolean = true;
	public isDestroyed: boolean = false;

	public getDamage(): void {
		// Indestructible brick
	}
}
