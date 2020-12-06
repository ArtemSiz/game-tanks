export abstract class AbstractCommand<M, V> {
	private _view!: V;
	private _model!: M;

	constructor(model: M, view: V) {
		this.init(model, view);
	}

	protected get view(): V {
		return this._view;
	}

	protected set view(value: V) {
		this._view = value;
	}

	protected get model(): M {
		return this._model;
	}

	protected set model(value: M) {
		this._model = value;
	}

	protected init(model: M, view: V): void {
		this.model = model;
		this.view = view;
	}
}
