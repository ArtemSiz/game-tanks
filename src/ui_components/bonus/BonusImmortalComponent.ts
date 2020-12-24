import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IBonus} from "../../interface/IBonus";
import {ITank} from "../../interface/ITank";
import {AbstractComponent} from "../AbstractComponent";

export class BonusImmortalComponent extends AbstractComponent implements IBonus {
	public name: string = EUiComponentName.BONUS_IMMORTAL;
	public requiredTextures: string = ETextureName.BONUS_IMMORTAL;
	public timer: number = 0;
	public timeout: number = 60 * 2;
	private _originalLifePoints: number;

	public upgrade(tank: ITank): void {
		this._originalLifePoints = tank.lifePoints;
		tank.lifePoints = 999999;
		tank.alpha = 0.5;
		// tslint:disable-next-line:no-console
		console.time("BonusImmortal");
	}

	public restore(tank: ITank): void {
		tank.lifePoints = this._originalLifePoints;
		tank.alpha = 1;
		// tslint:disable-next-line:no-console
		console.timeEnd("BonusImmortal");
	}

	public hide(): void {
		this.x = -100;
		this.visible = false;
	}
}
