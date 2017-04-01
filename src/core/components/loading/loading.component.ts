import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../services/message-bus-service/event-bus.service';
import { Constants } from '../../services/constants-service/constants.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector   : 'loading',
	templateUrl: 'loading.component.html',
	styleUrls  : ['loading.component.sass'],
	animations : [
		trigger('visibility', [
			state('false', style({
				opacity: 0,
				display: 'none'
			})),
			state('true', style({
				opacity: 1,
				display: 'block'
			})),
			transition('* => *', animate('250ms ease-in'))
		])
	]
})
export class LoadingComponent implements OnInit {
	private eventBus: EventBusService;
	private constants: Constants;
	
	public visible: boolean = false;
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus = eventBus;
		this.constants = constants;
		
		eventBus.createEventIfNotExists(constants.eventBusEvents.INDICATOR.SHOW);
		eventBus.createEventIfNotExists(constants.eventBusEvents.INDICATOR.HIDE);
		
		eventBus.subscribe(constants.eventBusEvents.INDICATOR.SHOW, this.onShowHandler, this);
		eventBus.subscribe(constants.eventBusEvents.INDICATOR.HIDE, this.onHideHandler, this);
	}
	
	private onShowHandler(self: LoadingComponent): void {
		self.visible = true;
	}
	
	private onHideHandler(self: LoadingComponent): void {
		self.visible = false;
	}
	
	public ngOnInit() {
	
	}
}