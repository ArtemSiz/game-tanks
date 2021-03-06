import {ETankDirection} from "../enum/ETankDirection";
import {IMovingComponent} from "../interface/IMovingComponent";

export class MovementService {
	protected context: IMovingComponent;

	constructor(context: IMovingComponent) {
		this.context = context;
	}

	public move(delta: number): void {
		this.context.x += this.context.vx * this.context.speed * delta;
		this.context.y += this.context.vy * this.context.speed * delta;
	}

	public stopMove() {
		this.context.vx = 0;
		this.context.vy = 0;
	}

	public setDirection(direction: number): void {
		switch (direction) {
			case ETankDirection.UP:
				this.goUp();
				break;
			case ETankDirection.DOWN:
				this.goDown();
				break;
			case ETankDirection.LEFT:
				this.goLeft();
				break;
			case ETankDirection.RIGHT:
				this.goRight();
				break;
		}
	}

	public goUp(): void {
		this.context.vx = 0;
		this.context.vy = -this.context.velocity;
	}

	public goRight(): void {
		this.context.vx = this.context.velocity;
		this.context.vy = 0;
	}

	public goDown(): void {
		this.context.vx = 0;
		this.context.vy = this.context.velocity;
	}

	public goLeft(): void {
		this.context.vx = -this.context.velocity;
		this.context.vy = 0;
	}
}
