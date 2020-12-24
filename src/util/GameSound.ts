import { ESoundNames } from "../enum/ESoundNames";
import { ISound } from "../interface/ISound";
import { SoundManager } from "./SoundManager";

export class GameSound extends SoundManager implements ISound {

	public hit(): void {
		this.play(ESoundNames.HIT);
	}

	public shot(): void {
		this.play(ESoundNames.SHOT);
	}

	public win(): void {
		this.play(ESoundNames.WIN);
	}

	public lose(): void {
		this.play(ESoundNames.LOSE);
	}

	public bonus(): void {
		this.play(ESoundNames.BONUS);
	}

	public explode(): void {
		this.play(ESoundNames.EXPLODE);
	}
}
