import { Injectable } from '@angular/core';
import { HandlersStorage } from './handler-storage';
import { EventsStorage } from './events-storage-interface';

@Injectable()
export class EventBusService {
	private lastId: number;
	private events: EventsStorage;
	
	public constructor() {
		if (window['__eventBusCount'] && typeof window['__eventBusCount'] === 'number') {
			window['__eventBusCount']++;
		} else {
			window['__eventBusCount'] = 1;
		}
		
		if (window['__eventBusCount'] > 1) {
			throw new Error(`There's too much Event Buses. You need to use already created.`);
		}
		
		this.events = {};
		this.lastId = 1;
	}
	
	/**
	 * Checks if event exists.
	 * @param {string} eventName Event name.
	 *
	 * @return {boolean} Returns true if event exists, otherwise - false.
	 */
	public eventExists(eventName: string): boolean {
		return !!this.events[eventName];
	}
	
	/**
	 * Creates event.
	 * @param {string} eventName Event name.
	 *
	 * @return {EventBusService} Current service .
	 */
	public createEvent(eventName: string): EventBusService {
		if (this.eventExists(eventName)) {
			throw Error(`Event ${eventName} already exists.`);
		}
		
		this.events[eventName] = new HandlersStorage();
		
		return this;
	}
	
	/**
	 * Creates event if it does not exists.
	 * @param {string} eventName Event name.
	 *
	 * @return {EventBusService} Current service .
	 */
	public createEventIfNotExists(eventName: string): EventBusService {
		return this.eventExists(eventName)
			? this
			: this.createEvent(eventName);
	}
	
	/**
	 * Allows to subscribe to concrete event.
	 * @param {string} eventName Event name.
	 * @param {Function} handler Your event handler.
	 * @param additionalContext Your additional context.
	 * @return {number} Event Id.
	 */
	public subscribe(eventName: string, handler: Function, additionalContext: Object = null): number {
		let eventHandlers = this.events[eventName];
		const id          = this.lastId++;
		
		if (!eventHandlers) {
			this.createEvent(eventName);
			eventHandlers = this.events[eventName];
		}
		
		eventHandlers.add(id, handler, additionalContext);
		
		return id;
	}
	
	/**
	 * Raises event with context and args.
	 * @param {string} eventName Event name.
	 * @param {Object} context Your context for handlers.
	 * @param {Array} args Your args for handlers.
	 */
	public raise(eventName: string, context: Object, args: Object[]): void {
		const handlers = this.events[eventName];
		if (handlers) {
			handlers.raise(context, args);
		} else {
			throw new Error(`There's no event with name ${eventName}.`);
		}
	}
	
	/**
	 * Unsubscribes your single handler or all of your handlers from event.
	 * @param {number|string} idOrName Id of your handler or event name.
	 */
	public unsubscribe(idOrName: number|string): void {
		if (typeof idOrName === 'number') {
			const id: number = idOrName;
			for ( const eventName in this.events ) {
				if (this.events.hasOwnProperty(eventName)) {
					const event = this.events[eventName];
					
					if (event.containsId(id)) {
						event.remove(id);
						
						return;
					}
				}
			}
		} else {
			this.events[idOrName].removeAll();
		}
	}
}
