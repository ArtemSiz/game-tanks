import {IPoint, Point} from "pixi.js";
import {ETankDirection} from "../../enum/ETankDirection";
import {IComponent} from "../../interface/IComponent";
import {IMovingComponent} from "../../interface/IMovingComponent";
import {ITank} from "../../interface/ITank";
import {CollisionDetector} from "../../util/CollisionDetector";
import {MovementService} from "../../util/MovementService";
import {AbstractComponent} from "../AbstractComponent";

export abstract class AbstractBulletComponent extends AbstractComponent implements IMovingComponent {
	public abstract requiredTextures: string | Array<string>;
	public isDestroyed: boolean = false;
	public vx: number = 0;
	public vy: number = 0;
	public velocity = 1;
	public speed: number = 1;
	protected readonly movement = new MovementService(this);

	public abstract isFriendlyTarget(target: IComponent): boolean;

	public hit(component: IComponent): boolean {
		return CollisionDetector.hitTestRectangle(this, component);
	}

	public break(): void {
		this.x = -100;
		this.visible = false;
		this.isDestroyed = true;
	}

	public move(delta: number): void {
		this.movement.move(delta);
	}

	public stopMove(): void {
		this.movement.stopMove();
	}

	public setInitialPoint(tank: ITank): void {
		const initialPoint: IPoint = this.getInitialPoint(tank);
		this.position.set(initialPoint.x, initialPoint.y);
	}

	public setDirection(direction: number): void {
		this.movement.setDirection(direction);
	}

	protected getInitialPoint(tank: ITank): IPoint {
		switch (tank.getDirection()) {
			case ETankDirection.UP:
				return new Point(tank.x + tank.halfWidth - this.halfWidth, tank.y - this.height);
			case ETankDirection.DOWN:
				return new Point(tank.x + tank.halfWidth - this.halfWidth, tank.y + tank.height);
			case ETankDirection.LEFT:
				return new Point(tank.x - this.width, tank.y + tank.halfHeight - this.halfHeight);
			case ETankDirection.RIGHT:
				return new Point(tank.x + tank.width, tank.y + tank.halfHeight - this.halfHeight);
		}
	}
}
