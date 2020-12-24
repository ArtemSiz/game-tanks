import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IMovingComponent} from "../../interface/IMovingComponent";
import {AbstractTankComponent} from "./AbstractTankComponent";

export class PlayerTankComponent extends AbstractTankComponent implements IMovingComponent {
	public name: string = EUiComponentName.PLAYER_TANK;
	public requiredTextures: string = ETextureName.PLAYER_TANK;
}
