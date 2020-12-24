import {isFunction} from "lodash";
import {IActionsController} from "../../../interface/IActionsController";
import {IComponent} from "../../../interface/IComponent";
import {ITank} from "../../../interface/ITank";
import {CollisionDetector} from "../../../util/CollisionDetector";

export class TankActionsControlledProxyCreator {
	private readonly _controller: IActionsController;

	constructor(controller: IActionsController) {
		this._controller = controller;
	}

	public create(tank: ITank): ITank {
		const handler = {
			get: (target: ITank, prop: keyof ITank, receiver: any) => {
				if (target[prop]) {
					switch (prop) {
						case "move":
							return this.createMoveProxy(target[prop], tank);
						case "preventCollision":
							return this.createPreventCollisionProxy(target[prop], tank);
						default:
							if (isFunction(target[prop])) {
								return (target[prop] as Function).bind(target);
							}
							return Reflect.get(target, prop, receiver);
					}
				}
			}
		};
		return new Proxy(tank, handler);
	}

	private createMoveProxy(originalMethod: Function, tank: ITank): (delta: number) => void {
		return (delta: number) => {
			this._controller.autoFire();
			this._controller.autoMove();
			originalMethod.call(tank, delta);
		};
	}

	private createPreventCollisionProxy(originalMethod: Function, tank: ITank): (component: IComponent) => void {
		return (component: IComponent) => {
			if (tank.hit(component)) {
				this._controller.collision = CollisionDetector.identifyHitSide(tank, component);
				originalMethod.call(tank, component);
			}
		};
	}
}
