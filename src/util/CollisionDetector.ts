import {ETankDirection} from "../enum/ETankDirection";
import {IComponent} from "../interface/IComponent";
import {IMovingComponent} from "../interface/IMovingComponent";

export class CollisionDetector {
	public static hitTestRectangle(c1: IComponent, c2: IComponent): boolean {
		let hit: boolean;
		const diffX: number = c1.centerX - c2.centerX;
		const diffY: number = c1.centerY - c2.centerY;
		const combinedHalfWidths: number = c1.halfWidth + c2.halfWidth;
		const combinedHalfHeights: number = c1.halfHeight + c2.halfHeight;

		if (Math.abs(diffX) < combinedHalfWidths && Math.abs(diffY) < combinedHalfHeights) {
			hit = true;
		} else {
			hit = false;
		}

		return hit;
	}

	public static identifyHitSide(moving: IMovingComponent, fixed: IComponent): string {
		if (moving.y < fixed.y + fixed.height && moving.getDirection() === ETankDirection.UP) {
			return "top";
		}
		if (moving.x + moving.width > fixed.x && moving.getDirection() === ETankDirection.RIGHT) {
			return "right";
		}
		if (moving.y + moving.height > fixed.y && moving.getDirection() === ETankDirection.DOWN) {
			return "bottom";
		}
		if (moving.x < fixed.x + fixed.width && moving.getDirection() === ETankDirection.LEFT) {
			return "left";
		}
	}

	public static preventCollision(moving: IMovingComponent, fixed: IComponent, collisionSide: string): void {
		switch (collisionSide) {
			case "top":
				moving.y = fixed.y + fixed.height + 1;
				break;
			case "right":
				moving.x = fixed.x - moving.width - 1;
				break;
			case "bottom":
				moving.y = fixed.y - moving.height - 1;
				break;
			case "left":
				moving.x = fixed.x + fixed.width + 1;
				break;
		}
	}
}
