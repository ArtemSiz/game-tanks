import {IComponent} from "./IComponent";
import {IMovingComponent} from "./IMovingComponent";
import {ITank} from "./ITank";

export interface IBullet extends IMovingComponent {
	isFriendlyTarget(target: IComponent): boolean;
	setInitialPoint(tank: ITank): void;
}
