import {Container} from "pixi.js";
import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IMovingComponent} from "../../interface/IMovingComponent";
import {AbstractBulletComponent} from "./AbstractBulletComponent";

export class EnemyBulletComponent extends AbstractBulletComponent implements IMovingComponent {
	public name: string = EUiComponentName.BONUS_LIFE;
	public requiredTextures: string = ETextureName.ENEMY_BULLET;

	public isFriendlyTarget(target: Container): boolean {
		return target.name === EUiComponentName.ENEMY_TANK;
	}
}
