import {ETextureName} from "../enum/ETextureName";
import {EUiComponentName} from "../enum/EUiComponentName";
import {IComponent} from "../interface/IComponent";
import {AbstractComponent} from "./AbstractComponent";

export class WaterComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.WATER;
	public requiredTextures: string = ETextureName.WATER;
}
