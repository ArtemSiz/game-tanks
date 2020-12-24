import {IComponent} from "./IComponent";

export interface IMovingComponent extends IComponent {
	speed: number;
	velocity: number;
	vx: number;
	vy: number;
	getDirection?(): number;
	hit(component: IComponent): boolean;
	preventCollision?(component: IComponent): void;
	move(delta: number): void;
	stopMove(): void;
	setDirection(direction: number): void;
}
