import { Injectable } from '@angular/core';
import { EventBusService } from '../message-bus-service/event-bus.service';
import { Constants } from '../constants-service/constants.service';

@Injectable()
export class LoadingIndicatorService {
	private eventBus: EventBusService;
	private constants: Constants;
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus = eventBus;
		this.constants = constants;
	}
	
	public show(): void {
		this.eventBus.raise(this.constants.eventBusEvents.INDICATOR.SHOW, null, []);
	}
	
	public hide(): void {
		this.eventBus.raise(this.constants.eventBusEvents.INDICATOR.HIDE, null, []);
	}
	
}
