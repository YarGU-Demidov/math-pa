import { Injectable } from '@angular/core';
import { EventBusService } from 'core/services/message-bus-service/event-bus.service';
import { Constants } from 'core/services/constants-service/constants.service';

@Injectable()
export class LoadingIndicatorService {
	private eventBus: EventBusService;
	private constants: Constants;
	
	private timeoutIds: number[] = [];
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus  = eventBus;
		this.constants = constants;
	}
	
	public show(): number {
		const timeoutId = <any>setTimeout(() => {
			this.eventBus.raise(this.constants.eventBusEvents.INDICATOR.SHOW, null, []);
		}, 500);
		
		this.addTimeout(timeoutId);
		
		return timeoutId;
	}
	
	public hide(timeoutId?: number): void {
		if ( timeoutId ) {
			this.removeTimeout(timeoutId);
		}
		
		setTimeout(() => {
			if ( this.timeoutIds.length > 0 ) {
				return;
			}
			this.eventBus.raise(this.constants.eventBusEvents.INDICATOR.HIDE, null, []);
		});
	}
	
	private addTimeout(id: number): void {
		this.timeoutIds.push(id);
	}
	
	private removeTimeout(id: number) {
		const ids = this.timeoutIds.filter(idItem => idItem === id);
		if ( ids.length > 0 ) {
			for ( const idItem of ids ) {
				clearTimeout(idItem);
				this.timeoutIds.splice(this.timeoutIds.indexOf(idItem), 1);
			}
		}
	}
}
