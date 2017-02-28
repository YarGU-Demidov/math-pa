import { Handler } from './handler';

export class HandlersStorage {
	private handlers: Array<Handler>;
	
	public constructor() {
		this.handlers = [];
	}
	
	public add(id: number, handler: Function): void {
		this.handlers.push(new Handler(id, handler));
	}
	
	public containsId(id: number): boolean {
		const handlersWithSelectedId = this.getHandlerWithId(id);
		
		return handlersWithSelectedId !== null;
	}
	
	public remove(id: number): void {
		const handler = this.getHandlerWithId(id);
		const idx     = this.handlers.lastIndexOf(handler);
		this.handlers.splice(idx, 1);
	}
	
	public raise(context: Object, args: Object[]): void {
		this.handlers.forEach((handler) => handler.raise(context, args));
	}
	
	public removeAll(): void {
		this.handlers = [];
	}
	
	private getHandlerWithId(id: number): Handler {
		let handlers = this.handlers.filter((handlerId) => handlerId.getId() == id);
		
		if (!handlers)
			throw new Error(`There's no handler with id: ${id}.`);
		if (handlers.length != 1)
			throw new Error(`Too much handlers with id: ${id}.`);
		
		return handlers[0];
	}
	
}
