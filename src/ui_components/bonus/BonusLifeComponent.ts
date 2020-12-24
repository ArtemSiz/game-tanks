import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IBonus} from "../../interface/IBonus";
import {ITank} from "../../interface/ITank";
import {AbstractComponent} from "../AbstractComponent";

export class BonusLifeComponent extends AbstractComponent implements IBonus {
	public name: string = EUiComponentName.BONUS_LIFE;
	public requiredTextures: string = ETextureName.BONUS_LIFE;
	public timer: number = 0;
	public timeout: number = 0;

	public upgrade(tank: ITank): void {
		tank.lifePoints += 1;
	}

	public restore(tank: ITank): void {
		// Bonus live is added forever, so this method is unnecessary
	}

	public hide(): void {
		this.x = -100;
		this.visible = false;
	}
}
