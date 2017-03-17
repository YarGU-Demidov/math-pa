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
		const argumentsArray = args.slice();
		
		if (this.additionalContext) {
			argumentsArray.push(this.additionalContext);
		}
		
		this.handler.apply(context, argumentsArray);
	}
}
