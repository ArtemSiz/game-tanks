import {Container, Texture} from "pixi.js";

export interface IComponent extends Container, ICollisionProps {
	id: string;
	name: string;
	requiredTextures?: string | Array<string>;
	isDestroyed?: boolean;
	setTexture(texture: Texture): void;
	setTextureSet(textures: Array<Texture>): void;
	getDamage?(): void;
	break?(): void;
}

interface ICollisionProps {
	centerX: number;
	centerY: number;
	halfWidth: number;
	halfHeight: number;
}
