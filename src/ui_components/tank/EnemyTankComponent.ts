import {Texture} from "pixi.js";
import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {ITank} from "../../interface/ITank";
import {Util} from "../../util/Util";
import {AbstractTankComponent} from "./AbstractTankComponent";

export class EnemyTankComponent extends AbstractTankComponent implements ITank {
	public name: string = EUiComponentName.ENEMY_TANK;
	public requiredTextures: Array<string> = [
		ETextureName.ENEMY_BLUE,
		ETextureName.ENEMY_RED,
		ETextureName.ENEMY_WHITE
	];

	public setTextureSet(texture: Array<Texture>): void {
		const randomTexture: Texture = Util.randomItemInArray(texture);
		super.setTexture(randomTexture);
		this.configureSprite();
	}
}
