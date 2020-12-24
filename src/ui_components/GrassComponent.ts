import {ETextureName} from "../enum/ETextureName";
import {EUiComponentName} from "../enum/EUiComponentName";
import {IComponent} from "../interface/IComponent";
import {AbstractComponent} from "./AbstractComponent";

export class GrassComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.GRASS;
	public requiredTextures: string = ETextureName.GRASS;

	constructor() {
		super();
		this.zIndex = 3;
	}
}
