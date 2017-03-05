export class Handler {
	private id: number;
	private handler: Function;
	private additionalContext: Object;

	constructor(id: number, handler: Function, additionalContext: Object = null) {
		this.id                = id;
		this.handler           = handler;
		this.additionalContext = additionalContext;
	}

	public getId(): number {
		return this.id;
	}

	public raise(context: Object, args: Object[]) {
		if (this.additionalContext) {
			args.push(this.additionalContext);
		}
		this.handler.apply(context, args);
	}
}
