import {Container, Sprite, Texture} from "pixi.js";
import {v4 as uuidv4} from "uuid";
import {IComponent} from "../interface/IComponent";

export abstract class AbstractComponent extends Container implements IComponent {
	public name: string;
	public readonly id: string = uuidv4();
	public sprite: Sprite;
	protected texture: Texture;
	protected textureSet: Array<Texture> = [];
	protected spriteSet: Array<Sprite> = [];
	public requiredTextures: string | Array<string>;

	public setTexture(texture: Texture): void {
		this.texture = texture;
		this.sprite = new Sprite(texture);
		this.addChild(this.sprite);
	}

	public setTextureSet(textures: Array<Texture>): void {
		this.textureSet = [...textures];
		this.textureSet.forEach((texture: Texture) => {
			this.spriteSet.push(new Sprite(texture));
		});
	}

	public get halfWidth(): number {
		return this.width / 2;
	}

	public get halfHeight(): number {
		return this.height / 2;
	}

	public get centerX(): number {
		return this.x + this.halfWidth;
	}

	public get centerY(): number {
		return this.y + this.halfHeight;
	}
}
