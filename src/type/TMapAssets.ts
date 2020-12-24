import {BaseComponent} from "../ui_components/BaseComponent";
import {GrassComponent} from "../ui_components/GrassComponent";
import {EnemyTankComponent} from "../ui_components/tank/EnemyTankComponent";
import {PlayerTankComponent} from "../ui_components/tank/PlayerTankComponent";
import {WaterComponent} from "../ui_components/WaterComponent";
import {TWall} from "./TWall";
import IPoint = PIXI.IPoint;

export type TMapAssets = {
	player: PlayerTankComponent;
	base: BaseComponent;
	waterComponents: Map<string, WaterComponent>;
	enemies: Map<string, EnemyTankComponent>;
	emptyCells: Array<IPoint>;
	walls: Map<string, TWall>;
	grass: Map<string, GrassComponent>;
};
