import {Signal} from "signals";
import {IBonus} from "../../../interface/IBonus";
import {IBullet} from "../../../interface/IBullet";
import {ISound} from "../../../interface/ISound";
import {ITank} from "../../../interface/ITank";
import {TWall} from "../../../type/TWall";
import {BaseComponent} from "../../../ui_components/BaseComponent";
import {GrassComponent} from "../../../ui_components/GrassComponent";
import {MapComponent} from "../../../ui_components/map/MapComponent";
import {EnemyTankComponent} from "../../../ui_components/tank/EnemyTankComponent";
import {PlayerTankComponent} from "../../../ui_components/tank/PlayerTankComponent";
import {WaterComponent} from "../../../ui_components/WaterComponent";
import {BasicSceneModel} from "../../basic_scene/model/BasicSceneModel";

export class GameMainSceneModel extends BasicSceneModel {
	public playerVelocity: number = 1;
	public enemyVelocity: number = 1;
	public bulletVelocity: number = 5;
	public onGameDataReceived: Signal = new Signal();
	public onGameOver: Signal = new Signal();
	public player: PlayerTankComponent;
	public enemies: Map<string, EnemyTankComponent>;
	public waters: Map<string, WaterComponent>;
	public grass: Map<string, GrassComponent>;
	public walls: Map<string, TWall>;
	public base: BaseComponent;
	public battlefield: MapComponent;
	public bullets: Map<string, IBullet> = new Map();
	public bonuses: Map<string, IBonus> = new Map();
	public activeTanks: Map<string, ITank>;
	private _soundManager: ISound;
	private _totalKills: number = 0;
	private readonly _isMuteByDefault: boolean = false;

	public injectSoundManager(soundManager: ISound): void {
		this._soundManager = soundManager;
		this._soundManager.isMute = this._isMuteByDefault;
	}

	public get soundManager(): ISound {
		return this._soundManager;
	}

	public addKill(): void {
		this._totalKills += 1;
	}
}
