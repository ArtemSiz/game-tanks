import {forEach, isNil} from "lodash";
import {IPoint, Point} from "pixi.js";
import {ETankDirection} from "../../enum/ETankDirection";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IComponent} from "../../interface/IComponent";
import {TMapAssets} from "../../type/TMapAssets";
import {TWall} from "../../type/TWall";
import {BaseComponent} from "../BaseComponent";
import {GrassComponent} from "../GrassComponent";
import {EnemyTankComponent} from "../tank/EnemyTankComponent";
import {PlayerTankComponent} from "../tank/PlayerTankComponent";
import {SmallWallComponent} from "../wall/SmallWallComponent";
import {WallComponent} from "../wall/WallComponent";
import {WaterComponent} from "../WaterComponent";
import {MapComponent} from "./MapComponent";

type TComponentConstructor = new (...params: Array<any>) => any;

const componentConstructors: Array<TComponentConstructor> = [null,
	SmallWallComponent,
	WallComponent,
	WaterComponent,
	GrassComponent,
	BaseComponent,
	PlayerTankComponent,
	EnemyTankComponent
];

export class MapGenerator {
	private _base!: BaseComponent;
	private _player!: PlayerTankComponent;
	private _waterComponents: Map<string, WaterComponent> = new Map();
	private _enemies: Map<string, EnemyTankComponent> = new Map();
	private _emptyCells: Array<IPoint> = [];
	private _walls: Map<string, TWall> = new Map();
	private _grass: Map<string, GrassComponent> = new Map();
	private readonly _cellSize: number = 36;
	private _componentConstructors: Array<TComponentConstructor> = componentConstructors;
	private readonly _componentsCreator: Function;

	constructor(componentsCreator: Function) {
		this._componentsCreator = componentsCreator;
	}

	public generateMap(schema: Array<Array<number>>): MapComponent {
		this.createMapPlan(schema);
		return new MapComponent(this.mapAssets);
	}

	private createMapPlan(plan: Array<Array<number>>): void {
		forEach(plan, (row: Array<number>, rowIndex: number) => {
			return forEach(row, (cell: number, cellIndex: number) => {
				const selectComponent: TComponentConstructor = this._componentConstructors[cell];
				const point = new Point(cellIndex * this._cellSize, rowIndex * this._cellSize);
				if (!isNil(selectComponent)) {
					const component: IComponent = this._componentsCreator(new selectComponent());
					component.position.set(point.x, point.y);
					if (component.name === EUiComponentName.ENEMY_TANK) {
						(component as EnemyTankComponent).setDirection(ETankDirection.DOWN);
						this.addEmptyCell(point);
					}
					this.groupComponents(component);
				} else {
					this.addEmptyCell(point);
				}
			});
		});
	}

	private addEmptyCell(point: IPoint): void {
		this._emptyCells.push(point);
	}

	private groupComponents(component: IComponent): void {
		switch (component.name) {
			case EUiComponentName.PLAYER_TANK:
				this._player = component as PlayerTankComponent;
				break;
			case EUiComponentName.BASE:
				this._base = component as BaseComponent;
				break;
			case EUiComponentName.WATER:
				this._waterComponents.set(component.id, component as WaterComponent);
				break;
			case EUiComponentName.ENEMY_TANK:
				this._enemies.set(component.id, component as EnemyTankComponent);
				break;
			case EUiComponentName.SMALL_WALL:
			case EUiComponentName.WALL:
				this._walls.set(component.id, component as TWall);
				break;
			case EUiComponentName.GRASS:
				this._grass.set(component.id, component as GrassComponent);
				break;
		}
	}

	private get mapAssets(): TMapAssets {
		return {
			base: this._base,
			player: this._player,
			waterComponents: this._waterComponents,
			enemies: this._enemies,
			emptyCells: this._emptyCells,
			walls: this._walls,
			grass: this._grass
		};
	}
}
