export class Handler {
	private id: number;
	private handler: Function;
	
	constructor(id: number, handler: Function) {
		this.id      = id;
		this.handler = handler;
	}
	
	public getId(): number {
		return this.id;
	}
	
	public raise(context: Object, args: Object[]) {
		this.handler.apply(context, args);
	}
}
