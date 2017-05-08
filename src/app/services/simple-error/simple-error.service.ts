import { Injectable } from '@angular/core';
import { EventBusService, Constants } from 'core/core.module';

@Injectable()
export class SimpleErrorService {
	private eventBus: EventBusService;
	private constants: Constants;
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus  = eventBus;
		this.constants = constants;
	}
	
	public raiseError(title: string, message: string, context: Object): void {
		this.eventBus.raise(this.constants.eventBusEvents.ERROR_EVENT_NAME, context, [title, message]);
	}
	
	public closeWindow(): void {
		this.eventBus.raise(this.constants.eventBusEvents.ERROR_EVENT_NAME_CLOSE, null, []);
	}
}
