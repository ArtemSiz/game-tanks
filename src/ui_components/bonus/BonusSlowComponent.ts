import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IBonus} from "../../interface/IBonus";
import {ITank} from "../../interface/ITank";
import {AbstractComponent} from "../AbstractComponent";

export class BonusSlowComponent extends AbstractComponent implements IBonus {
	public name: string = EUiComponentName.BONUS_SLOW;
	public requiredTextures: string = ETextureName.BONUS_SLOW;
	public timer: number = 0;
	public timeout: number = 60 * 4;
	private _valueToIncrease = 0.5;

	public upgrade(tank: ITank): void {
		tank.speed -= this._valueToIncrease;
	}

	public restore(tank: ITank): void {
		tank.speed += this._valueToIncrease;
	}

	public hide(): void {
		this.x = -100;
		this.visible = false;
	}
}
