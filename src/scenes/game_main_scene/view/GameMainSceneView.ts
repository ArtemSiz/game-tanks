import {map} from "lodash";
import {Container, IResourceDictionary, Sprite} from "pixi.js";
import {IComponent} from "../../../interface/IComponent";
import {TNJDimensions} from "../../../type/TNJDimensions";
import {MapComponent} from "../../../ui_components/map/MapComponent";
import {MapGenerator} from "../../../ui_components/map/MapGenerator";
import {BasicSceneView} from "../../basic_scene/view/BasicSceneView";
import Texture = PIXI.Texture;

export class GameMainSceneView extends BasicSceneView {
	public textures: IResourceDictionary = {};
	private _mapGenerator: MapGenerator;

	constructor(sceneSize: TNJDimensions) {
		super(sceneSize);
		this.content.interactive = true;
		this.content.sortableChildren = true;
		this._mapGenerator = new MapGenerator(this.createComponent.bind(this));
	}

	public drawTemplate(battlefield: MapComponent): void {
		this.app.stage.addChild(this.content);
		this.nodeScene = document.createElement("div");
		this.nodeScene.className = "main-scene";
		this.nodeScene.id = "main-scene";
		this.nodeScene.appendChild(this.app.view);
		document.body.append(this.nodeScene);
		this.content.addChild(battlefield);
	}

	public alignComponentCenterX(component: Container | Sprite): void {
		component.x = (this.screenSize.width - component.width) / 2;
	}

	public alignComponentCenterY(component: Container | Sprite): void {
		component.y = (this.screenSize.height - component.height) / 2;
	}

	public generateMap(schema: Array<Array<number>>): MapComponent {
		return this._mapGenerator.generateMap(schema);
	}

	public createComponent<T extends IComponent>(component: T): T {
		if (component.requiredTextures) {
			const textures: Texture | Array<Texture> = this.getTextures(component.requiredTextures);
			Array.isArray(textures) ? component.setTextureSet(textures) : component.setTexture(textures);
			return component;
		}
		return component;
	}

	public getTextures(textureNames: string | Array<string>): Texture | Array<Texture> {
		const sheet = this.textures["spritesheet"].spritesheet;
		if (this.textures) {
			if (Array.isArray(textureNames)) {
				return map(textureNames, (name: string) => {
					return sheet.textures[`${name}`];
				});
			}
			return sheet.textures[`${textureNames}`];
		}
		throw new Error("Textures has not been loaded!");
	}
}
