import {IPoint} from "pixi.js";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IComponent} from "../../interface/IComponent";
import {TMapAssets} from "../../type/TMapAssets";
import {TWall} from "../../type/TWall";
import {Util} from "../../util/Util";
import {AbstractComponent} from "../AbstractComponent";
import {BaseComponent} from "../BaseComponent";
import {GrassComponent} from "../GrassComponent";
import {EnemyTankComponent} from "../tank/EnemyTankComponent";
import {PlayerTankComponent} from "../tank/PlayerTankComponent";
import {WaterComponent} from "../WaterComponent";

export class MapComponent extends AbstractComponent implements IComponent {
	public name: string = EUiComponentName.MAP;
	public base: BaseComponent;
	public player: PlayerTankComponent;
	public water: Map<string, WaterComponent>;
	public enemies: Map<string, EnemyTankComponent>;
	public emptyCells: Array<IPoint>;
	public walls: Map<string, TWall>;
	public grass: Map<string, GrassComponent>;

	constructor(config: TMapAssets) {
		super();
		this.base = config.base;
		this.player = config.player;
		this.water = config.waterComponents;
		this.enemies = config.enemies;
		this.emptyCells = config.emptyCells;
		this.walls = config.walls;
		this.grass = config.grass;
		this.drawMap();
	}

	private drawMap(): void {
		const walls: Array<TWall> = Util.mapToArray(this.walls);
		const water: Array<WaterComponent> = Util.mapToArray(this.water);
		const leaves: Array<GrassComponent> = Util.mapToArray(this.grass);
		const enemies: Array<EnemyTankComponent> = Util.mapToArray(this.enemies);
		this.addChild(...walls, ...water, ...leaves, this.base, ...enemies, this.player);
	}
}
