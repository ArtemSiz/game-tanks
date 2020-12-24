import {ETextureName} from "../../enum/ETextureName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent";

export class SmallWallComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.SMALL_WALL;
	public requiredTextures: Array<string> = [
		ETextureName.SMALL_WALL_1,
		ETextureName.SMALL_WALL_2,
		ETextureName.SMALL_WALL_3,
		ETextureName.SMALL_WALL_4
	];
	public isDestroyed: boolean = false;
	public lifeCount: number = 1;

	public getDamage(): void {
		this.lifeCount -= 1;
		if (this.lifeCount === 0) {
			this.destroyComponent();
		}
	}

	public destroyComponent() {
		this.isDestroyed = true;
		this.visible = false;
	}

	public setTextureSet(textures: Array<PIXI.Texture>) {
		super.setTextureSet(textures);
		this.spriteSet[0].position.set(0, 0);
		this.spriteSet[1].position.set(18, 0);
		this.spriteSet[2].position.set(0, 18);
		this.spriteSet[3].position.set(18, 18);
		this.addChild(...this.spriteSet);
	}
}
