export abstract class AbstractContext<M, V, C> {
	public abstract getModel(): M;

	public abstract getView(): V;

	public abstract getController(): C;

	public updateFrame?(delta?: number): void;
}
