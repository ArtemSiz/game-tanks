import {IPoint} from "pixi.js";
import {ECommandName} from "../../enum/ECommandName";
import {EUiComponentName} from "../../enum/EUiComponentName";
import {IBonus} from "../../interface/IBonus";
import {IBullet} from "../../interface/IBullet";
import {ITank} from "../../interface/ITank";
import {TWall} from "../../type/TWall";
import {BaseComponent} from "../../ui_components/BaseComponent";
import {BonusImmortalComponent} from "../../ui_components/bonus/BonusImmortalComponent";
import {BonusLifeComponent} from "../../ui_components/bonus/BonusLifeComponent";
import {BonusSlowComponent} from "../../ui_components/bonus/BonusSlowComponent";
import {BonusSpeedComponent} from "../../ui_components/bonus/BonusSpeedComponent";
import {ExplosionComponent} from "../../ui_components/ExplosionComponent";
import {WaterComponent} from "../../ui_components/WaterComponent";
import {Util} from "../../util/Util";
import {AbstractContext} from "../mvc/implementations/AbstractContext";
import {GameMainSceneCheckStatusGameCommand} from "./controller/commands/GameMainSceneCheckStatusGameCommand";
import {GameMainSceneDrawCommand} from "./controller/commands/GameMainSceneDrawCommand";
import {GameMainSceneUpdateFrameCommand} from "./controller/commands/GameMainSceneUpdateFrameCommand";
import {GameMainSceneController} from "./controller/GameMainSceneController";
import {GameMainSceneModel} from "./model/GameMainSceneModel";
import {GameMainSceneView} from "./view/GameMainSceneView";

const BONUSES: Array<new () => IBonus> = [
	BonusLifeComponent,
	BonusImmortalComponent,
	BonusSpeedComponent,
	BonusSlowComponent
];

export class GameMainSceneContext
	extends AbstractContext<GameMainSceneModel, GameMainSceneView, GameMainSceneController> {
	private _model!: GameMainSceneModel;
	private _view!: GameMainSceneView;
	private _controller!: GameMainSceneController;

	private bonusAppearanceTimer: number = 0;
	private readonly bonusAppearanceInterval: number = 60 * 10;

	public initialize() {
		this.createController();
		this.createModel();
		this.createView();
		this.registerCommands();
		this.registerEventListeners();
		this._model.onGameDataReceived.dispatch();

	}

	public startGame(): void {
		this._controller.executeCommand(ECommandName.MAIN_SCENE_DRAW_TEMPLATE);
		this._controller.executeCommand(ECommandName.MAIN_SCENE_UPDATE_FRAME);
	}

	public getModel(): GameMainSceneModel {
		return this._model;
	}

	public getView(): GameMainSceneView {
		return this._view;
	}

	public getController(): GameMainSceneController {
		return this._controller;
	}

	public updateFrame(delta: number): void {
		this.addBonusesDuringTime(delta);

		// Moving tanks
		this._model.activeTanks.forEach((tank: ITank) => {
			tank.move(delta);
			tank.updateBonusTimers(delta);
			tank.preventCollision(this._model.base);

			// Detect and apply bonuses
			this._model.bonuses.forEach((bonus: IBonus) => {
				if (tank.hit(bonus)) {
					tank.applyBonus(bonus);
					this._model.soundManager.bonus();
					this._model.bonuses.delete(bonus.id);
				}
			});
		});

		// Detecting collision with walls, including hitting by bullets
		this._model.walls.forEach((brick: TWall) => {
			// Collision tank and wall
			this._model.activeTanks.forEach((tank: ITank) => {
				if (tank.name === EUiComponentName.PLAYER_TANK && tank.hit(brick)) {
					this._model.soundManager.hit();
				}
				tank.preventCollision(brick);
			});

			// Hitting walls
			this._model.bullets.forEach((bullet: IBullet) => {
				if (this.bulletHit(bullet, brick) && brick.isDestroyed) {
					this._model.walls.delete(brick.id);
				}
			});
		});

		this._model.waters.forEach((water: WaterComponent) => {
			this._model.activeTanks.forEach((tank: ITank) => {
				if (tank.hit(water)) {
					tank.break();
				}
			});
		});

		this._model.bullets.forEach((bullet: IBullet) => {
			bullet.move(delta);

			// Hitting tanks
			this._model.activeTanks.forEach((tank: ITank) => {
				if (!bullet.isFriendlyTarget(tank)) {
					this.bulletHit(bullet, tank);
				}
			});

			// Hitting a base
			if (!bullet.isFriendlyTarget(this._model.base)) {
				this.bulletHit(bullet, this._model.base);
			}
		});
	}

	private bulletHit(bullet: IBullet, component: TWall | ITank | BaseComponent): boolean {
		if (bullet.hit(component)) {
			this.explode(bullet);
			component.getDamage();
			if (component instanceof BaseComponent) {
				this._model.onGameOver.dispatch({isWin: false});
			}
			return true;
		}
		return false;
	}

	private explode(bullet: IBullet): void {
		const explosion = this._view.createComponent(new ExplosionComponent());
		explosion.position.set(bullet.x, bullet.y);
		bullet.break();
		this._model.bullets.delete(bullet.id);
		this._model.battlefield.addChild(explosion);
		this._model.soundManager.explode();
	}

	private addBonusesDuringTime(delta: number): void {
		this.bonusAppearanceTimer += delta;
		if (this.bonusAppearanceTimer >= this.bonusAppearanceInterval) {
			this.bonusAppearanceTimer = 0;
			this.generateRandomBonus();
		}
	}

	private generateRandomBonus(): void {
		const selectedBonus: new () => IBonus = Util.randomItemInArray(BONUSES);
		const bonus: IBonus = this._view.createComponent(new selectedBonus());
		const randomPosition: IPoint = Util.randomItemInArray(this._model.battlefield.emptyCells);
		bonus.position.set(randomPosition.x, randomPosition.y);
		this._model.bonuses.set(bonus.id, bonus);
		this._model.battlefield.addChild(bonus);
	}

	private createModel(): void {
		this._model = new GameMainSceneModel();
	}

	private createView(): void {
		this._view = new GameMainSceneView(this._model.sceneSize);
	}

	private createController(): void {
		this._controller = new GameMainSceneController(this);
	}

	private registerCommands(): void {
		this._controller.registerCommand(ECommandName.MAIN_SCENE_DRAW_TEMPLATE, GameMainSceneDrawCommand);
		this._controller.registerCommand(ECommandName.MAIN_SCENE_UPDATE_FRAME, GameMainSceneUpdateFrameCommand);
		this._controller.registerCommand(ECommandName.CHECK_STATUS_GAME, GameMainSceneCheckStatusGameCommand);
	}

	private registerEventListeners(): void {
		this._model.onGameDataReceived.add(() => {
			this.startGame();
			this._controller.executeCommand(ECommandName.CHECK_STATUS_GAME);
		});
	}
}
