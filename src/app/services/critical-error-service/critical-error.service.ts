import { Injectable } from '@angular/core';
import { EventBusService, Constants } from 'core/core.module';

@Injectable()
export class CriticalErrorService {
	private eventBus: EventBusService;
	private constants: Constants;
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus  = eventBus;
		this.constants = constants;
	}
	
	public raiseError(message: string, context: Object): void {
		this.eventBus.raise(this.constants.eventBusEvents.CRITICAL_ERROR_EVENT_NAME, context, [message]);
	}
}
