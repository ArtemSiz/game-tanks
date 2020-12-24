import {AnimatedSprite} from "pixi.js";
import {ETextureName} from "../enum/ETextureName";
import {EUiComponentName} from "../enum/EUiComponentName";
import {IComponent} from "../interface/IComponent";
import {AbstractComponent} from "./AbstractComponent";

export class ExplosionComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.EXPLOSION;
	public isDestroyed: boolean;
	public sprite: AnimatedSprite;
	public requiredTextures: string | Array<string> = ExplosionComponent.generateTextureNames();
	private static _frames: number = 16;

	public setTextureSet(textures: Array<PIXI.Texture>): void {
		this.textureSet = [...textures];
		this.configureSprite();
	}

	private configureSprite() {
		this.sprite = new AnimatedSprite(this.textureSet);
		this.sprite.animationSpeed = 0.4;
		this.sprite.play();
		this.sprite.loop = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.position.set(0, 0);
		this.addChild(this.sprite);
		this.sprite.onComplete = () => this.onComplete();
	}

	private onComplete(): void {
		this.x = -100;
		this.visible = false;
	}

	private static generateTextureNames(): Array<string> {
		let textures: Array<string> = [];
		for (let i = 1; i <= ExplosionComponent._frames; i++) {
			textures.push(`${ETextureName.EXPLODE}_${i}`);
		}
		return textures;
	}
}
