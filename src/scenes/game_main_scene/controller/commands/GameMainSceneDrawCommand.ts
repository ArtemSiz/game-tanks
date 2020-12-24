import {EEventName} from "../../../../enum/EEventName";
import {EUiComponentName} from "../../../../enum/EUiComponentName";
import {IBullet} from "../../../../interface/IBullet";
import {ITank} from "../../../../interface/ITank";
import {EnemyBulletComponent} from "../../../../ui_components/bullet/EnemyBulletComponent";
import {PlayerBulletComponent} from "../../../../ui_components/bullet/PlayerBulletComponent";
import {levelSchema} from "../../../../ui_components/map/levelSchema";
import {TankActionsControlledProxyCreator} from "../../../../ui_components/tank/controllers/TankActionsControlledProxyCreator";
import {TankActionsController} from "../../../../ui_components/tank/controllers/TankActionsController";
import {TankKeyboardController} from "../../../../ui_components/tank/controllers/TankKeyboardController";
import {EnemyTankComponent} from "../../../../ui_components/tank/EnemyTankComponent";
import {GameSound} from "../../../../util/GameSound";
import {AbstractCommand} from "../../../mvc/implementations/AbstractCommand";
import {GameMainSceneModel} from "../../model/GameMainSceneModel";
import {GameMainSceneView} from "../../view/GameMainSceneView";

export class GameMainSceneDrawCommand extends AbstractCommand<GameMainSceneModel, GameMainSceneView> {

	public execute(): void {
		this.view.textures = this.model.loader.resources;
		this.createSoundManager();
		this.createMap();
		this.createComponents();
		this.configureTanks();
		this.registerEventListeners();
		this.view.drawTemplate(this.model.battlefield);
	}

	private createSoundManager(): void {
		this.model.injectSoundManager(new GameSound(this.view.textures));
	}

	private createMap(): void {
		this.model.battlefield = this.view.generateMap(levelSchema);
	}

	private createComponents(): void {
		this.model.player = this.model.battlefield.player;
		this.model.enemies = this.model.battlefield.enemies;
		this.model.waters = this.model.battlefield.water;
		this.model.grass = this.model.battlefield.grass;
		this.model.base = this.model.battlefield.base;
		this.model.walls = this.model.battlefield.walls;
		this.view.alignComponentCenterX(this.model.battlefield);
		this.view.alignComponentCenterY(this.model.battlefield);
	}

	private configureTanks(): void {
		this.model.player.velocity = this.model.playerVelocity;
		this.model.activeTanks = new Map();
		this.model.activeTanks.set(this.model.player.id, this.model.player);
		this.model.enemies.forEach((enemy: EnemyTankComponent) => {
			const controlledEnemyCreator = new TankActionsControlledProxyCreator(
				new TankActionsController(enemy, this.model.base)
			);
			const controlledEnemy: ITank = controlledEnemyCreator.create(enemy);
			controlledEnemy.velocity = this.model.enemyVelocity;
			this.model.activeTanks.set(controlledEnemy.id, controlledEnemy);
		});
	}

	private registerEventListeners(): void {
		this.model.player.addControl(new TankKeyboardController());
		this.model.activeTanks.forEach((tank: ITank) => {
			tank.on(EEventName.TANK_FIRE, () => {
				this.tankFireHandle(tank);
			});
			tank.on(EEventName.TANK_DESTROYED, () => {
				this.tankDestroyedHandle(tank);
			});
		});
	}

	private tankFireHandle(tank: ITank): void {
		this.drawBullet(tank);
		this.model.soundManager.shot();
	}

	private tankDestroyedHandle(tank: ITank): void {
		this.model.activeTanks.delete(tank.id);
		if (tank.name === EUiComponentName.PLAYER_TANK) {
			this.model.onGameOver.dispatch({isWin: false});
		} else {
			this.model.addKill();
		}
		if (this.model.activeTanks.size === 1 && !this.model.player.isDestroyed) {
			this.model.onGameOver.dispatch({isWin: true});
		}
	}

	private drawBullet(tank: ITank): void {
		const bullet: IBullet = tank.name === EUiComponentName.PLAYER_TANK
			? this.view.createComponent(new PlayerBulletComponent()) : this.view.createComponent(new EnemyBulletComponent());
		bullet.velocity = this.model.bulletVelocity;
		bullet.setInitialPoint(tank);
		bullet.setDirection(tank.getDirection());
		this.model.battlefield.addChild(bullet);
		this.model.bullets.set(bullet.id, bullet);
	}
}
