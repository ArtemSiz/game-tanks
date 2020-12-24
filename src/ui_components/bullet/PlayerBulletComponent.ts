import {Container} from "pixi.js";
import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IMovingComponent} from "../../interface/IMovingComponent";
import {AbstractBulletComponent} from "./AbstractBulletComponent";

export class PlayerBulletComponent extends AbstractBulletComponent implements IMovingComponent {
	public name: string = EUiComponentName.PLAYER_BULLET;
	public requiredTextures: string = ETextureName.PLAYER_BULLET;

	public isFriendlyTarget(target: Container): boolean {
		return target.name === EUiComponentName.PLAYER_TANK || target.name === EUiComponentName.BASE;
	}
}
